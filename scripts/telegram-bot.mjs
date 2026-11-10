import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

function readToken(raw) {
  let value = (raw || "").trim();
  const fromUrl = value.match(/bot(\d+:[A-Za-z0-9_-]+)/i);
  if (fromUrl) return fromUrl[1];
  return value.replace(/^bot/i, "");
}

const token = readToken(process.env.TELEGRAM_BOT_TOKEN);
const checkOnly = process.argv.includes("--check");
const stateFile = process.env.TELEGRAM_STATE_FILE || "bot-state/chats.json";
const runMinutes = Number(process.env.RUN_MINUTES || 270);

function appUrl() {
  const configured = (process.env.ITALY_WE_APP_URL || "").trim().replace(/\/+$/, "");
  if (/^https:\/\/www\.italywe\.online$/i.test(configured)) return "https://www.italywe.online";
  return "https://italywe.online";
}

const openButton = () => [{ text: "Open Italy We", url: appUrl() }];

let state = { offset: 0 };
let stopping = false;

async function load() {
  try {
    const raw = JSON.parse(await readFile(stateFile, "utf8"));
    state = { offset: Number(raw.offset) || 0 };
  } catch {
    state = { offset: 0 };
  }
}

async function save() {
  await mkdir(dirname(stateFile), { recursive: true });
  const tmp = `${stateFile}.tmp`;
  await writeFile(tmp, JSON.stringify(state));
  await rename(tmp, stateFile);
}

async function api(method, body) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  return response.json();
}

async function say(chatId, text) {
  const result = await api("sendMessage", {
    chat_id: String(chatId),
    text,
    reply_markup: { inline_keyboard: [openButton()] },
  });
  if (!result.ok) console.error("send failed", result.description || "unknown");
}

function replyFor(command) {
  const url = appUrl();
  if (command === "/meet" || command === "/nearby") {
    return `Nearby is inside Italy We. It shows members who published their own profile and uploaded their own photos. There are no sample people.\n\n${url}`;
  }
  if (command === "/you") {
    return `Your profile is inside Italy We. Write your own name, age, city, and biography, and upload photos you choose. The bot does not create pictures.\n\n${url}`;
  }
  if (command === "/feed") {
    return `Posts stay inside Italy We after you sign in. This bot does not publish photos.\n\n${url}`;
  }
  if (command === "/wallet") {
    return `Italy We does not hold coins, and there is no public wallet page on the site yet. Open the app.\n\n${url}`;
  }
  if (command === "/privacy") {
    return `Account and contact rules are explained inside Italy We. A public privacy page is not on the site yet.\n\n${url}`;
  }
  return `Italy We does not invent people or photos. Open the site, create your account, and upload your own pictures.\n\n${url}`;
}

async function onText(chatId, text) {
  const command = text.trim().split(/\s|@/)[0].toLowerCase();
  const known = ["/start", "/help", "/meet", "/nearby", "/you", "/app", "/feed", "/wallet", "/privacy"];
  if (text.startsWith("/") && !known.includes(command)) {
    await say(chatId, "Use /start, /meet, /you, or /app. Photos are only the ones you upload in the app.");
    return;
  }
  await say(chatId, replyFor(command.startsWith("/") ? command : "/start"));
}

async function handleUpdate(update) {
  if (update.callback_query) {
    await api("answerCallbackQuery", { callback_query_id: update.callback_query.id });
    const chatId = String(update.callback_query.message?.chat?.id ?? "");
    if (chatId) await say(chatId, replyFor("/start"));
    return;
  }
  const message = update.message;
  const chatId = message?.chat?.id ? String(message.chat.id) : "";
  if (!chatId) return;
  if (message.photo) {
    await say(chatId, "This chat does not store photos. Upload your pictures in the app, on your own profile.");
    return;
  }
  const text = typeof message.text === "string" ? message.text.trim() : "";
  if (!text) return;
  await onText(chatId, text);
}

async function poll() {
  const cleared = await api("deleteWebhook", { drop_pending_updates: false });
  if (!cleared.ok) console.error("deleteWebhook failed", cleared.description || "unknown");
  console.log("listening, no generated photos");
  while (!stopping) {
    let data;
    try {
      data = await api("getUpdates", {
        offset: state.offset,
        timeout: 25,
        allowed_updates: ["message", "callback_query"],
      });
    } catch (error) {
      console.error("getUpdates failed", error instanceof Error ? error.message : "network");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      continue;
    }
    if (!data.ok) {
      console.error("getUpdates rejected", data.description || "unknown");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      continue;
    }
    for (const update of data.result ?? []) {
      state.offset = update.update_id + 1;
      await save();
      try {
        await handleUpdate(update);
      } catch (error) {
        console.error("update failed", error instanceof Error ? error.message : "error");
      }
    }
  }
  await save();
}

async function main() {
  if (!/^\d+:[A-Za-z0-9_-]+$/.test(token)) {
    console.error("TELEGRAM_BOT_TOKEN is missing or not a bot token");
    process.exit(1);
  }
  await load();
  const me = await api("getMe", {});
  if (!me.ok) {
    console.error("Telegram rejected the token", me.description || "unauthorized");
    process.exit(1);
  }
  console.log(`bot @${me.result?.username || "unknown"}`);
  if (checkOnly) return;
  await api("setMyCommands", {
    commands: [
      { command: "start", description: "Open Italy We and upload your own photos" },
      { command: "meet", description: "People nearby who published their own profile" },
      { command: "you", description: "Your profile and your own photos" },
      { command: "feed", description: "Posts stay inside the app" },
      { command: "wallet", description: "Italy We does not hold coins" },
      { command: "app", description: "Open https://italywe.online" },
    ],
  });
  const menuButton = await api("setChatMenuButton", {
    menu_button: { type: "web_app", text: "Open Italy We", web_app: { url: appUrl() } },
  });
  if (!menuButton.ok) console.error("setChatMenuButton failed", menuButton.description || "unknown");
  const timer = setTimeout(() => {
    stopping = true;
  }, runMinutes * 60 * 1000);
  timer.unref();
  await poll();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "failed");
  process.exit(1);
});
