import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function readToken(raw) {
  let value = (raw || "").trim();
  const fromUrl = value.match(/bot(\d+:[A-Za-z0-9_-]+)/i);
  if (fromUrl) return fromUrl[1];
  return value.replace(/^bot/i, "");
}

const token = readToken(process.env.TELEGRAM_BOT_TOKEN);
const checkOnly = process.argv.includes("--check");
const stateFile = process.env.TELEGRAM_STATE_FILE || "bot-state/chats.json";
const portraitDir =
  process.env.PORTRAIT_DIR ||
  fileURLToPath(new URL("../public/portraits/", import.meta.url));
const runMinutes = Number(process.env.RUN_MINUTES || 270);

const people = [
  ["amara", "Amara Okonkwo", 29, "Rome", "Curator", "amara.jpg", "I am in Rome for a year, hanging a show about migration and cloth. Lagos is home. If we meet, I will have read your biography all the way through.", true, "Galleries, walking, cloth", "Telegram @amarawe\nWhatsApp +39 333 010 2201\nX @amarawe", "I read the whole biography. Thursday after the gallery, if you are still in Rome.", "Female"],
  ["marco", "Marco Bellini", 32, "Milan", "Sommelier", "marco.jpg", "I run the floor at a wine bar in Isola. Sundays I take the train out of the city. I am looking for a person, not a plus-one.", false, "Wine, trains, late dinner", "", "", "Male"],
  ["chiara", "Chiara Esposito", 27, "Naples", "Ceramicist", "chiara.jpg", "I throw bowls in a studio that smells like rain. I want someone patient enough for a messy table and honest about staying in Naples.", false, "Clay, the port, late dinner", "", "", "Female"],
  ["sofia", "Sofia Marino", 26, "Palermo", "Marine biologist", "sofia.jpg", "I count seagrass and I swim before the city wakes. I would like to meet someone who can talk about a real day. I am in Palermo through the spring.", true, "The sea, early swims, cooking", "Telegram @sofiamarino\nWhatsApp +39 333 010 2204\nX @sofiasea", "Come before the city wakes. I will be at the water.", "Female"],
  ["alessandro", "Alessandro Conti", 31, "Turin", "Pianist", "alessandro.jpg", "I play late sets in a room that holds forty people. If you write to me, tell me a song you return to when the week has been long.", false, "Piano, night sets, bad coffee", "", "", "Male"],
  ["elena", "Elena Vitali", 28, "Bologna", "Food writer", "elena.jpg", "I write about ordinary kitchens. I want company that can split a plate and also split a silence. If you are visiting, say which night.", false, "Kitchens, writing, small tables", "", "", "Female"],
  ["luca", "Luca Ferrara", 34, "Florence", "Bookbinder", "luca.jpg", "I bind books by hand. If we meet, it will probably be a walk and a coffee that turns into the afternoon.", true, "Books, walks, quiet", "Telegram @lucaferrara\nWhatsApp +39 333 010 2207\nX @lucabinds", "A walk and a coffee, then. I close the shop at four.", "Male"],
  ["giulia", "Giulia Rossi", 29, "Rome", "Architect", "giulia.jpg", "I restore small apartments in Testaccio. I want someone who will sit through a long dinner. If you are only in Rome for a weekend, say so.", true, "Buildings, the river, long dinners", "Telegram @giuliarossi\nWhatsApp +39 333 010 2208\nX @giuliarome", "I can do a long dinner. Say which night, and if you are only here for the weekend.", "Female"],
];

let state = { offset: 0, chats: {} };
let stopping = false;

function blank() {
  return { step: "cover", name: "", age: "", city: "", bio: "", contact: "", seen: [], match: "", told: {} };
}

function normalize(raw) {
  if (!raw || typeof raw !== "object") return { offset: 0, chats: {} };
  if (raw.chats && typeof raw.chats === "object") {
    return { offset: Number(raw.offset) || 0, chats: raw.chats };
  }
  return { offset: 0, chats: raw };
}

async function load() {
  try {
    state = normalize(JSON.parse(await readFile(stateFile, "utf8")));
  } catch {
    state = { offset: 0, chats: {} };
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

function keys(rows) {
  return { inline_keyboard: rows };
}

async function say(chatId, text, rows) {
  const result = await api("sendMessage", {
    chat_id: String(chatId),
    text,
    reply_markup: rows ? keys(rows) : undefined,
  });
  if (!result.ok) console.error("send failed", result.description || "unknown");
  return result;
}

async function showCover(chatId) {
  const row = state.chats[chatId] ?? blank();
  row.step = "cover";
  state.chats[chatId] = row;
  await save();
  await say(
    chatId,
    "Say who you are. Then meet someone.\n\nYour name, age from 18 to 80, and city.\nA biography of at least 80 characters.\nOne contact: WhatsApp, Telegram, X, email, or a phone.\n\nThen you see women nearby. Contact stays hidden until you both agree.",
    [[{ text: "Begin", callback_data: "begin" }]],
  );
}

function ready(row) {
  const age = Number(row.age);
  return (
    row.name.trim().length >= 2 &&
    Number.isInteger(age) &&
    age >= 18 &&
    age <= 80 &&
    row.city.trim().length >= 2 &&
    row.bio.trim().length >= 80 &&
    row.contact.trim().length >= 3
  );
}

function nextPerson(row) {
  const city = row.city.trim().toLowerCase();
  const open = people.filter((person) => person[11] === "Female" && !row.seen.includes(person[0]));
  const near = open.filter((person) => person[3].toLowerCase() === city);
  const person = near[0] ?? open[0] ?? null;
  return { person, nearby: Boolean(person && near[0]), far: Boolean(person && !near[0]) };
}

async function showPerson(chatId) {
  const row = state.chats[chatId];
  row.step = "deck";
  row.match = "";
  const found = nextPerson(row);
  const person = found.person;
  await save();
  if (!person) {
    await say(chatId, "No more women nearby. You have seen this round.", [[{ text: "Your profile", callback_data: "you" }]]);
    return;
  }
  const place = found.nearby
    ? `Nearby in ${person[3]}`
    : `No women in ${row.city} yet. ${person[1].split(" ")[0]} is in ${person[3]}.`;
  const caption = `${place}\n\n${person[1]}, ${person[2]}\n${person[4]}\n\n${person[6]}\n\n${person[8]}`;
  const markup = keys([
    [
      { text: "Pass", callback_data: `pass:${person[0]}` },
      { text: "Meet", callback_data: `meet:${person[0]}` },
    ],
    [{ text: "Your profile", callback_data: "you" }],
  ]);
  try {
    const bytes = await readFile(join(portraitDir, person[5]));
    const form = new FormData();
    form.set("chat_id", String(chatId));
    form.set("caption", caption.slice(0, 1000));
    form.set("reply_markup", JSON.stringify(markup));
    form.set("photo", new Blob([bytes]), "portrait.jpg");
    const response = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, { method: "POST", body: form });
    const data = await response.json();
    if (!data.ok) await say(chatId, caption, markup.inline_keyboard);
  } catch {
    await say(chatId, caption, markup.inline_keyboard);
  }
}

async function showYou(chatId) {
  const row = state.chats[chatId] ?? blank();
  state.chats[chatId] = row;
  row.step = ready(row) ? "deck" : row.step;
  await save();
  const lines = [
    row.name || "No name yet",
    row.age ? `${row.age}, ${row.city || "no city"}` : "Age and city still missing",
    row.bio ? row.bio : "No biography yet.",
    row.contact ? "Contact saved. Hidden until you both agree." : "No contact yet.",
  ];
  const buttons = ready(row)
    ? [[{ text: "Meet someone", callback_data: "deck" }]]
    : [[{ text: "Begin", callback_data: "begin" }]];
  await say(chatId, lines.join("\n\n"), buttons);
}

async function onText(chatId, text) {
  const row = state.chats[chatId] ?? blank();
  state.chats[chatId] = row;
  const value = text.trim();
  const command = value.startsWith("/") ? value.split(/\s|@/)[0] : value;
  if (command === "/start" || command === "/help") {
    if (!ready(row)) return showCover(chatId);
    return showPerson(chatId);
  }
  if (command === "/you") return showYou(chatId);
  if (command === "/meet" && ready(row)) return showPerson(chatId);
  if (command.startsWith("/")) return say(chatId, "Use /start, /meet, or /you.");

  if (row.step === "name") {
    if (value.length < 2 || value.length > 40) return say(chatId, "Use the name you want people to see. 2 to 40 characters.");
    row.name = value;
    row.step = "age";
    await save();
    return say(chatId, "Add your age. Italy We is for adults, 18 to 80.");
  }
  if (row.step === "age") {
    const age = Number(value);
    if (!Number.isInteger(age) || age < 18 || age > 80) return say(chatId, "Italy We is for adults, 18 to 80. Send just the number.");
    row.age = String(age);
    row.step = "city";
    await save();
    return say(chatId, "Which city should people meet you in?");
  }
  if (row.step === "city") {
    if (value.length < 2 || value.length > 40) return say(chatId, "Keep the city short.");
    row.city = value;
    row.step = "bio";
    await save();
    return say(chatId, "Write your biography. At least 80 characters. People meet the writing, not a headline.");
  }
  if (row.step === "bio") {
    if (value.length < 80) return say(chatId, `Write at least 80 characters. You have ${value.length}.`);
    row.bio = value.slice(0, 600);
    row.step = "contact";
    await save();
    return say(chatId, "Add one way to reach you: WhatsApp number, Telegram username, X username, email, or phone. It stays hidden until you both agree.");
  }
  if (row.step === "contact") {
    const digits = value.replace(/\D/g, "");
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const handle = /^@?[A-Za-z0-9._]{2,32}$/.test(value);
    if (!(email || (digits.length >= 8 && digits.length <= 15) || handle)) {
      return say(chatId, "That does not look like a username, email, or phone. Try again.");
    }
    row.contact = value.replace(/^@/, "").slice(0, 80);
    await save();
    await say(chatId, "You can meet someone now. Contacts stay hidden until you both agree.");
    return showPerson(chatId);
  }
  if (row.match) {
    const person = people.find((item) => item[0] === row.match);
    if (!person) return showPerson(chatId);
    if (row.told[person[0]]) return say(chatId, "They already answered. Meet someone else, or open Your profile.");
    row.told[person[0]] = true;
    await save();
    return say(chatId, person[10]);
  }
  if (!ready(row)) return showCover(chatId);
  return showPerson(chatId);
}

async function onButton(chatId, data) {
  const row = state.chats[chatId] ?? blank();
  state.chats[chatId] = row;
  if (data === "begin") {
    row.step = "name";
    await save();
    return say(chatId, "Use the name you want people to see.");
  }
  if (data === "you") return showYou(chatId);
  if (data === "deck") {
    if (!ready(row)) return showCover(chatId);
    return showPerson(chatId);
  }
  if (!ready(row)) return showCover(chatId);
  const [action, id] = data.split(":");
  const person = people.find((item) => item[0] === id);
  if (!person) return showPerson(chatId);
  if (!row.seen.includes(id)) row.seen.push(id);
  if (action === "pass") {
    await save();
    await say(chatId, `Passed on ${person[1].split(" ")[0]}.`);
    return showPerson(chatId);
  }
  if (action === "meet") {
    await save();
    if (!person[7]) {
      await say(chatId, `${person[1].split(" ")[0]} has not agreed. Contact stays hidden.`);
      return showPerson(chatId);
    }
    row.match = id;
    await save();
    return say(
      chatId,
      `${person[1].split(" ")[0]} read your biography and said yes.\n\n${person[9]}\n\nSample person. These contacts are fictional.\n\nWrite a message.`,
    );
  }
}

async function handleUpdate(update) {
  if (update.callback_query) {
    const query = update.callback_query;
    await api("answerCallbackQuery", { callback_query_id: query.id });
    const chatId = String(query.message?.chat?.id ?? "");
    if (chatId) await onButton(chatId, query.data || "");
    return;
  }
  const message = update.message;
  const chatId = message?.chat?.id ? String(message.chat.id) : "";
  const text = typeof message?.text === "string" ? message.text.trim() : "";
  if (!chatId || !text) return;
  await onText(chatId, text);
}

function startDeadline() {
  const timer = setTimeout(() => {
    stopping = true;
    console.log("run window ended");
  }, runMinutes * 60 * 1000);
  timer.unref();
}

async function poll() {
  const cleared = await api("deleteWebhook", { drop_pending_updates: false });
  if (!cleared.ok) console.error("deleteWebhook failed", cleared.description || "unknown");
  console.log("listening");
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
      if (String(data.description || "").includes("webhook")) {
        await api("deleteWebhook", { drop_pending_updates: false });
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      continue;
    }
    const updates = Array.isArray(data.result) ? data.result : [];
    for (const update of updates) {
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
      { command: "start", description: "Say who you are, then meet someone" },
      { command: "meet", description: "See the next person" },
      { command: "you", description: "Your biography and contact" },
    ],
  });
  startDeadline();
  await poll();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "failed");
  process.exit(1);
});
