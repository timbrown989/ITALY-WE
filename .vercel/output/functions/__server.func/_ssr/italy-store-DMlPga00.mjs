import { n as createMiddleware } from "./ssr.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/italy-store-DMlPga00.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-1vAx-gM_.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-DnjrzSnz.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var KEY = "italy-we-v1";
function emptyProfile() {
	return {
		name: "",
		headline: "",
		age: "",
		city: "",
		bio: "",
		gender: "",
		ethnicity: "",
		height: "",
		bodyType: "",
		education: "",
		lookingFor: "",
		relationship: "",
		children: "",
		smoking: "",
		drinking: "",
		hobbies: [],
		voiceBio: false,
		contactsOpen: true,
		email: "",
		phone: "",
		whatsapp: "",
		telegram: "",
		x: "",
		snapchat: "",
		facebook: "",
		tiktok: "",
		instagram: "",
		avatar: "",
		photos: []
	};
}
function handle(value) {
	return value.trim().replace(/^@/, "");
}
function validHandle(value, max) {
	if (!value) return true;
	return value.length >= 2 && value.length <= max && /^[A-Za-z0-9._]+$/.test(value);
}
function validPhone(value) {
	return value.length === 0 || value.length >= 8 && value.length <= 15;
}
function hasReach(profile) {
	const email = profile.email.trim();
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length > 0 || validPhone(digits(profile.phone)) && digits(profile.phone).length > 0 || validPhone(digits(profile.whatsapp)) && digits(profile.whatsapp).length > 0 || validHandle(handle(profile.telegram), 32) && handle(profile.telegram).length > 0 || validHandle(handle(profile.x), 15) && handle(profile.x).length > 0 || validHandle(handle(profile.snapchat), 32) && handle(profile.snapchat).length > 0 || profile.facebook.trim().length >= 2 && profile.facebook.trim().length <= 50 || validHandle(handle(profile.tiktok), 24) && handle(profile.tiktok).length > 0 || validHandle(handle(profile.instagram), 30) && handle(profile.instagram).length > 0;
}
function digits(value) {
	return value.replace(/\D/g, "");
}
function validateProfile(profile) {
	const errors = {};
	const name = profile.name.trim();
	if (name.length < 2) errors.name = "Use the name you want people to see.";
	else if (name.length > 40) errors.name = "Keep it under 40 characters.";
	if (!profile.age.trim()) errors.age = "Add your age.";
	else {
		const age = Number(profile.age);
		if (!Number.isInteger(age) || age < 18 || age > 80) errors.age = "Italy We is for adults, 18 to 80.";
	}
	const city = profile.city.trim();
	if (city.length < 2) errors.city = "Which city should people meet you in?";
	else if (city.length > 40) errors.city = "Keep the city short.";
	if (profile.bio.trim().length < 80) errors.bio = `Write at least 80 characters. People meet the writing, not a headline.`;
	const email = profile.email.trim();
	const phone = digits(profile.phone);
	const whatsapp = digits(profile.whatsapp);
	const telegram = handle(profile.telegram);
	const x = handle(profile.x);
	const emailOk = email.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	const phoneOk = validPhone(phone);
	const whatsappOk = validPhone(whatsapp);
	const telegramOk = validHandle(telegram, 32);
	const xOk = validHandle(x, 15);
	const snapOk = validHandle(handle(profile.snapchat), 32);
	const tiktokOk = validHandle(handle(profile.tiktok), 24);
	const instagramOk = validHandle(handle(profile.instagram), 30);
	const facebook = profile.facebook.trim();
	const facebookOk = facebook.length === 0 || facebook.length >= 2 && facebook.length <= 50;
	if (!emailOk) errors.email = "That email does not look complete.";
	if (!phoneOk) errors.phone = "Use 8 to 15 digits.";
	if (!whatsappOk) errors.whatsapp = "Use 8 to 15 digits for WhatsApp.";
	if (!telegramOk) errors.telegram = "Use a Telegram username, letters and numbers only.";
	if (!xOk) errors.x = "Use an X username, 15 characters or fewer.";
	if (!snapOk) errors.snapchat = "Use a Snapchat username.";
	if (!tiktokOk) errors.tiktok = "Use a TikTok username.";
	if (!instagramOk) errors.instagram = "Use an Instagram username.";
	if (!facebookOk) errors.facebook = "Keep the Facebook name short.";
	if (emailOk && phoneOk && whatsappOk && telegramOk && xOk && snapOk && tiktokOk && instagramOk && facebookOk && !hasReach(profile)) {
		const need = "Add a WhatsApp number, a Telegram username, an X username, an email, or a phone.";
		errors.whatsapp = need;
		errors.telegram = need;
		errors.x = need;
	}
	return errors;
}
function profileScore(profile) {
	const checks = [
		profile.name.trim().length >= 2,
		profile.headline.trim().length >= 2,
		profile.bio.trim().length >= 80,
		profile.gender.length > 0,
		profile.age.trim().length > 0 && !validateProfile(profile).age,
		profile.city.trim().length >= 2,
		profile.ethnicity.length > 0,
		profile.height.length > 0,
		profile.bodyType.length > 0,
		profile.education.length > 0,
		profile.lookingFor.length > 0,
		profile.relationship.length > 0,
		profile.children.length > 0,
		profile.smoking.length > 0,
		profile.drinking.length > 0,
		profile.hobbies.length > 0,
		hasReach(profile),
		profile.avatar.length > 0
	];
	const filled = checks.filter(Boolean).length;
	return Math.round(filled / checks.length * 100);
}
function isComplete(profile) {
	return Object.keys(validateProfile(profile)).length === 0;
}
function strings(value) {
	if (!Array.isArray(value)) return [];
	return value.filter((item) => typeof item === "string");
}
function text(record, key, fallback) {
	const value = record[key];
	return typeof value === "string" ? value : fallback;
}
function readProfile(value) {
	const blank = emptyProfile();
	if (!value || typeof value !== "object") return blank;
	const record = value;
	return {
		...blank,
		name: text(record, "name", blank.name),
		headline: text(record, "headline", blank.headline),
		age: text(record, "age", blank.age),
		city: text(record, "city", blank.city),
		bio: text(record, "bio", blank.bio),
		gender: text(record, "gender", blank.gender),
		ethnicity: text(record, "ethnicity", blank.ethnicity),
		height: text(record, "height", blank.height),
		bodyType: text(record, "bodyType", blank.bodyType),
		education: text(record, "education", blank.education),
		lookingFor: text(record, "lookingFor", blank.lookingFor),
		relationship: text(record, "relationship", blank.relationship),
		children: text(record, "children", blank.children),
		smoking: text(record, "smoking", blank.smoking),
		drinking: text(record, "drinking", blank.drinking),
		hobbies: strings(record.hobbies),
		voiceBio: record.voiceBio === true,
		contactsOpen: record.contactsOpen !== false,
		email: text(record, "email", blank.email),
		phone: text(record, "phone", blank.phone),
		whatsapp: text(record, "whatsapp", blank.whatsapp),
		telegram: text(record, "telegram", blank.telegram),
		x: text(record, "x", blank.x),
		snapchat: text(record, "snapchat", blank.snapchat),
		facebook: text(record, "facebook", blank.facebook),
		tiktok: text(record, "tiktok", blank.tiktok),
		instagram: text(record, "instagram", blank.instagram),
		avatar: text(record, "avatar", blank.avatar),
		photos: strings(record.photos).slice(0, 4)
	};
}
function readPersisted() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const data = JSON.parse(raw);
		if (!data || typeof data !== "object") return null;
		const record = data;
		return {
			profile: readProfile(record.profile),
			passed: strings(record.passed),
			asked: strings(record.asked),
			seenIntro: record.seenIntro === true
		};
	} catch {
		return null;
	}
}
function writePersisted(state) {
	localStorage.setItem(KEY, JSON.stringify(state));
}
var blank = {
	profile: emptyProfile(),
	passed: [],
	asked: [],
	seenIntro: false
};
var useItaly = create((set, get) => ({
	...blank,
	hydrated: false,
	hydrate: () => {
		if (get().hydrated) return;
		set({
			...readPersisted() ?? blank,
			hydrated: true
		});
	},
	saveProfile: (profile, seenIntro) => {
		const next = {
			profile,
			passed: get().passed,
			asked: get().asked,
			seenIntro: seenIntro ?? get().seenIntro
		};
		writePersisted(next);
		set(next);
	},
	setSeenIntro: (seenIntro) => {
		writePersisted({
			profile: get().profile,
			passed: get().passed,
			asked: get().asked,
			seenIntro
		});
		set({ seenIntro });
	},
	pass: (id) => {
		if (get().passed.includes(id)) return;
		const next = {
			profile: get().profile,
			passed: [...get().passed, id],
			asked: get().asked,
			seenIntro: get().seenIntro
		};
		writePersisted(next);
		set({ passed: next.passed });
	},
	ask: (id) => {
		if (get().asked.includes(id)) return;
		const next = {
			profile: get().profile,
			passed: get().passed,
			asked: [...get().asked, id],
			seenIntro: get().seenIntro
		};
		writePersisted(next);
		set({ asked: next.asked });
	},
	resetPassed: () => {
		writePersisted({
			profile: get().profile,
			passed: [],
			asked: get().asked,
			seenIntro: get().seenIntro
		});
		set({ passed: [] });
	},
	resetAll: () => {
		localStorage.removeItem(KEY);
		set({ ...blank });
	}
}));
//#endregion
export { profileScore as a, isComplete as i, emptyProfile as n, useItaly as o, hasReach as r, validateProfile as s, authMiddleware as t };
