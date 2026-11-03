import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-yGqlMOgg.mjs";
import { i as isComplete, n as emptyProfile, t as authMiddleware } from "./italy-store-DMlPga00.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/network.functions-Rw1Qi_0K.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var PEOPLE = [
	{
		id: "amara",
		name: "Amara Okonkwo",
		age: 29,
		city: "Rome",
		role: "Curator",
		photo: "/portraits/amara.jpg",
		bio: "I am in Rome for a year, hanging a show about migration and cloth. Lagos is home; Trastevere is where my keys are. I like long walks, sharp opinions, and people who answer the question they were asked. If we meet, I will have read your biography all the way through.",
		email: "amara@letters.italywe.app",
		phone: "+39 333 010 2201",
		accepts: true,
		interests: [
			"Galleries",
			"Walking",
			"Cloth"
		]
	},
	{
		id: "marco",
		name: "Marco Bellini",
		age: 32,
		city: "Milan",
		role: "Sommelier",
		photo: "/portraits/marco.jpg",
		bio: "I run the floor at a wine bar in Isola and I taste for a living, which sounds glamorous and is mostly standing up. Sundays I take the train out of the city and come back with something pickled. I am looking for a person, not a plus-one. Tell me what you actually do with a free evening.",
		email: "marco@letters.italywe.app",
		phone: "+39 333 010 2202",
		accepts: false,
		interests: [
			"Wine",
			"Trains",
			"Late dinner"
		]
	},
	{
		id: "chiara",
		name: "Chiara Esposito",
		age: 27,
		city: "Naples",
		role: "Ceramicist",
		photo: "/portraits/chiara.jpg",
		bio: "I throw bowls in a studio that smells like rain and I sell them when they survive the kiln. I grew up near the port and I still eat dinner late. I want to meet someone patient enough for a messy table and honest enough to say if they are staying in Naples.",
		email: "chiara@letters.italywe.app",
		phone: "+39 333 010 2203",
		accepts: false,
		interests: [
			"Clay",
			"The port",
			"Late dinner"
		]
	},
	{
		id: "sofia",
		name: "Sofia Marino",
		age: 26,
		city: "Palermo",
		role: "Marine biologist",
		photo: "/portraits/sofia.jpg",
		bio: "I count seagrass and I argue with fishing boats, politely, for work. On land I swim before the city wakes and cook too much fish for one person. I would like to meet someone who can talk about a real day, not a highlight. I am in Palermo through the spring.",
		email: "sofia@letters.italywe.app",
		phone: "+39 333 010 2204",
		accepts: true,
		interests: [
			"The sea",
			"Early swims",
			"Cooking"
		]
	},
	{
		id: "alessandro",
		name: "Alessandro Conti",
		age: 31,
		city: "Turin",
		role: "Pianist",
		photo: "/portraits/alessandro.jpg",
		bio: "I play late sets in a room that holds forty people if they like each other. Days are scales and bad coffee. I am not mysterious, I am just awake at the wrong hours. If you write to me, tell me a song you return to when the week has been long.",
		email: "alessandro@letters.italywe.app",
		phone: "+39 333 010 2205",
		accepts: false,
		interests: [
			"Piano",
			"Night sets",
			"Bad coffee"
		]
	},
	{
		id: "elena",
		name: "Elena Vitali",
		age: 28,
		city: "Bologna",
		role: "Food writer",
		photo: "/portraits/elena.jpg",
		bio: "I write about ordinary kitchens, not tasting menus. I live above a bakery and I know the baker's dog by name. I want company that can split a plate and also split a silence. If you are visiting, say which night — I keep my table small on purpose.",
		email: "elena@letters.italywe.app",
		phone: "+39 333 010 2206",
		accepts: false,
		interests: [
			"Kitchens",
			"Writing",
			"Small tables"
		]
	},
	{
		id: "luca",
		name: "Luca Ferrara",
		age: 34,
		city: "Florence",
		role: "Bookbinder",
		photo: "/portraits/luca.jpg",
		bio: "I bind books by hand in a shop that is too cold in January and exactly right the rest of the year. I read slowly and I like people who can be quiet without making it a performance. If we meet, it will probably be a walk and a coffee that turns into the afternoon.",
		email: "luca@letters.italywe.app",
		phone: "+39 333 010 2207",
		accepts: true,
		interests: [
			"Books",
			"Walks",
			"Quiet"
		]
	},
	{
		id: "giulia",
		name: "Giulia Rossi",
		age: 29,
		city: "Rome",
		role: "Architect",
		photo: "/portraits/giulia.jpg",
		bio: "I restore small apartments in Testaccio and I am terrible at leaving a site before the light goes. Most weeks I walk the river after work and argue with myself about tile. I want someone who will sit through a long dinner and not treat plans like a spreadsheet. If you are only in Rome for a weekend, say so — I still like a clear invitation.",
		email: "giulia@letters.italywe.app",
		phone: "+39 333 010 2208",
		accepts: true,
		interests: [
			"Buildings",
			"The river",
			"Long dinners"
		]
	}
];
var SOCIAL = {
	amara: {
		whatsapp: "+39 333 010 2201",
		telegram: "amarawe",
		x: "amarawe",
		snapchat: "",
		facebook: "",
		tiktok: "",
		instagram: "amara.cloth",
		gift: "A note from the gallery"
	},
	marco: {
		whatsapp: "+39 333 010 2202",
		telegram: "marcobellini",
		x: "marcowine",
		snapchat: "",
		facebook: "Marco Bellini",
		tiktok: "",
		instagram: "",
		gift: "A glass, on the house"
	},
	chiara: {
		whatsapp: "+39 333 010 2203",
		telegram: "chiaraclay",
		x: "chiaraclay",
		snapchat: "chiaraclay",
		facebook: "",
		tiktok: "chiaraclay",
		instagram: "chiara.pots",
		gift: "A small bowl"
	},
	sofia: {
		whatsapp: "+39 333 010 2204",
		telegram: "sofiamarino",
		x: "sofiasea",
		snapchat: "",
		facebook: "",
		tiktok: "",
		instagram: "sofia.sea",
		gift: "A morning swim"
	},
	alessandro: {
		whatsapp: "+39 333 010 2205",
		telegram: "aleconti",
		x: "alepiano",
		snapchat: "",
		facebook: "",
		tiktok: "",
		instagram: "",
		gift: "A late set"
	},
	elena: {
		whatsapp: "+39 333 010 2206",
		telegram: "elenavitale",
		x: "elenakitchen",
		snapchat: "",
		facebook: "",
		tiktok: "elenakitchen",
		instagram: "elena.table",
		gift: "A seat at a small table"
	},
	luca: {
		whatsapp: "+39 333 010 2207",
		telegram: "lucaferrara",
		x: "lucabinds",
		snapchat: "",
		facebook: "",
		tiktok: "",
		instagram: "",
		gift: "A walk and a coffee"
	},
	giulia: {
		whatsapp: "+39 333 010 2208",
		telegram: "giuliarossi",
		x: "giuliarome",
		snapchat: "",
		facebook: "",
		tiktok: "",
		instagram: "giulia.rome",
		gift: "A walk by the river"
	}
};
var PHOTO_MAX = 28e4;
function strings(value) {
	try {
		const parsed = JSON.parse(value);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((item) => typeof item === "string");
	} catch {
		return [];
	}
}
function toProfile(row) {
	return {
		...emptyProfile(),
		name: row.name,
		headline: row.headline,
		age: row.age,
		city: row.city,
		bio: row.bio,
		gender: row.gender,
		ethnicity: row.ethnicity,
		height: row.height,
		bodyType: row.body_type,
		education: row.education,
		lookingFor: row.looking_for,
		relationship: row.relationship,
		children: row.children,
		smoking: row.smoking,
		drinking: row.drinking,
		hobbies: strings(row.hobbies),
		voiceBio: row.voice_bio,
		contactsOpen: row.contacts_open,
		email: row.email,
		phone: row.phone,
		whatsapp: row.whatsapp,
		telegram: row.telegram,
		x: row.x,
		snapchat: row.snapchat,
		facebook: row.facebook,
		tiktok: row.tiktok,
		instagram: row.instagram,
		avatar: row.avatar,
		photos: strings(row.photos).slice(0, 4)
	};
}
function toContact(row) {
	return {
		email: row.email,
		phone: row.phone,
		whatsapp: row.whatsapp,
		telegram: row.telegram,
		x: row.x,
		snapchat: row.snapchat,
		facebook: row.facebook,
		tiktok: row.tiktok,
		instagram: row.instagram
	};
}
function toCard(row, extra) {
	const age = Number(row.age);
	const photos = strings(row.photos);
	return {
		id: row.user_id,
		name: row.name,
		age: Number.isFinite(age) ? age : 0,
		city: row.city,
		role: row.headline || row.gender || "Member",
		photo: row.avatar || photos[0] || "/portraits/sofia.jpg",
		bio: row.bio,
		interests: strings(row.hobbies).slice(0, 4),
		sample: row.sample,
		accepts: extra.accepts,
		gift: row.sample ? SOCIAL[row.user_id.replace(/^sample:/, "")]?.gift ?? "A small note" : "A yes",
		incoming: extra.incoming,
		contact: extra.contact,
		lastMessage: extra.lastMessage ?? ""
	};
}
function clip(value, max) {
	return value.trim().slice(0, max);
}
function cleanProfile(input) {
	return {
		...emptyProfile(),
		name: clip(input.name ?? "", 40),
		headline: clip(input.headline ?? "", 80),
		age: clip(input.age ?? "", 3),
		city: clip(input.city ?? "", 40),
		bio: clip(input.bio ?? "", 600),
		gender: clip(input.gender ?? "", 24),
		ethnicity: clip(input.ethnicity ?? "", 40),
		height: clip(input.height ?? "", 24),
		bodyType: clip(input.bodyType ?? "", 24),
		education: clip(input.education ?? "", 40),
		lookingFor: clip(input.lookingFor ?? "", 40),
		relationship: clip(input.relationship ?? "", 40),
		children: clip(input.children ?? "", 40),
		smoking: clip(input.smoking ?? "", 24),
		drinking: clip(input.drinking ?? "", 24),
		hobbies: (input.hobbies ?? []).filter((item) => typeof item === "string").slice(0, 12),
		voiceBio: input.voiceBio === true,
		contactsOpen: input.contactsOpen !== false,
		email: clip(input.email ?? "", 80),
		phone: clip(input.phone ?? "", 24),
		whatsapp: clip(input.whatsapp ?? "", 24),
		telegram: clip(input.telegram ?? "", 32),
		x: clip(input.x ?? "", 15),
		snapchat: clip(input.snapchat ?? "", 32),
		facebook: clip(input.facebook ?? "", 50),
		tiktok: clip(input.tiktok ?? "", 24),
		instagram: clip(input.instagram ?? "", 30),
		avatar: input.avatar ?? "",
		photos: (input.photos ?? []).filter((item) => typeof item === "string").slice(0, 4)
	};
}
async function seedSamples() {
	const sql = await getSql();
	for (const person of PEOPLE) {
		const social = SOCIAL[person.id];
		await sql`
      insert into profiles (
        user_id, name, headline, age, city, bio, hobbies, contacts_open,
        email, phone, whatsapp, telegram, x, snapchat, facebook, tiktok, instagram,
        avatar, sample, accepts, complete
      ) values (
        ${`sample:${person.id}`}, ${person.name}, ${person.role}, ${String(person.age)}, ${person.city}, ${person.bio},
        ${JSON.stringify(person.interests)}, true,
        ${person.email}, ${person.phone}, ${social?.whatsapp ?? person.phone}, ${social?.telegram ?? ""},
        ${social?.x ?? ""}, ${social?.snapchat ?? ""}, ${social?.facebook ?? ""}, ${social?.tiktok ?? ""},
        ${social?.instagram ?? ""}, ${person.photo}, true, ${person.accepts}, true
      )
      on conflict (user_id) do nothing
    `;
	}
}
async function agreedWith(me, row) {
	if (row.sample) return row.accepts;
	return (await (await getSql())`
    select from_id from asks where from_id = ${row.user_id} and to_id = ${me} limit 1
  `).length > 0;
}
var loadNetwork_createServerFn_handler = createServerRpc({
	id: "c84ff05f384553e4735f2df6ec8710e16e0da068f3a634d644fd4bf8fe4c1b3c",
	name: "loadNetwork",
	filename: "src/lib/network.functions.ts"
}, (opts) => loadNetwork.__executeServer(opts));
var loadNetwork = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadNetwork_createServerFn_handler, async ({ context }) => {
	await seedSamples();
	const sql = await getSql();
	const me = context.userId;
	const mine = await sql`select * from profiles where user_id = ${me} limit 1`;
	const deckRows = await sql`
      select * from profiles
      where complete = true
        and user_id <> ${me}
        and user_id not in (select target_id from passes where user_id = ${me})
        and user_id not in (select to_id from asks where from_id = ${me})
      order by sample desc, updated_at desc
    `;
	const meetingRows = await sql`
      select p.* from profiles p
      join asks a on a.to_id = p.user_id
      where a.from_id = ${me}
      order by a.created_at desc
    `;
	const incomingRows = await sql`
      select p.* from profiles p
      join asks a on a.from_id = p.user_id
      where a.to_id = ${me}
        and p.user_id not in (select to_id from asks where from_id = ${me})
      order by a.created_at desc
    `;
	async function cardFor(row, incoming) {
		const mineAsked = !incoming;
		const theyAsked = incoming || await agreedWith(me, row);
		const agreed = row.sample ? mineAsked && row.accepts : mineAsked && theyAsked;
		const contact = agreed && row.contacts_open ? toContact(row) : null;
		let lastMessage = "";
		if (agreed) lastMessage = (await sql`
          select body from chats where pair_key = ${pairKey(me, row.user_id)} order by id desc limit 1
        `)[0]?.body ?? "";
		return toCard(row, {
			accepts: agreed,
			incoming,
			contact,
			lastMessage
		});
	}
	return {
		profile: mine[0] ? toProfile(mine[0]) : null,
		deck: deckRows.map((row) => toCard(row, {
			accepts: false,
			incoming: false,
			contact: null
		})),
		meetings: await Promise.all(meetingRows.map((row) => cardFor(row, false))),
		incoming: await Promise.all(incomingRows.map((row) => cardFor(row, true)))
	};
});
var saveMine_createServerFn_handler = createServerRpc({
	id: "2ca65d03cd38927d95dbe81b7012789cc209e43b03a313925f6eed869cb4f7ed",
	name: "saveMine",
	filename: "src/lib/network.functions.ts"
}, (opts) => saveMine.__executeServer(opts));
var saveMine = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => cleanProfile(input)).handler(saveMine_createServerFn_handler, async ({ context, data }) => {
	if (data.avatar.length > PHOTO_MAX || data.photos.some((photo) => photo.length > PHOTO_MAX)) throw new Error("A photo is too large. Try a smaller one.");
	const complete = isComplete(data);
	await (await getSql())`
      insert into profiles (
        user_id, name, headline, age, city, bio, gender, ethnicity, height, body_type, education,
        looking_for, relationship, children, smoking, drinking, hobbies, voice_bio, contacts_open,
        email, phone, whatsapp, telegram, x, snapchat, facebook, tiktok, instagram, avatar, photos,
        sample, accepts, complete, updated_at
      ) values (
        ${context.userId}, ${data.name}, ${data.headline}, ${data.age}, ${data.city}, ${data.bio},
        ${data.gender}, ${data.ethnicity}, ${data.height}, ${data.bodyType}, ${data.education},
        ${data.lookingFor}, ${data.relationship}, ${data.children}, ${data.smoking}, ${data.drinking},
        ${JSON.stringify(data.hobbies)}, ${data.voiceBio}, ${data.contactsOpen},
        ${data.email}, ${data.phone}, ${data.whatsapp}, ${data.telegram}, ${data.x}, ${data.snapchat},
        ${data.facebook}, ${data.tiktok}, ${data.instagram}, ${data.avatar}, ${JSON.stringify(data.photos)},
        false, false, ${complete}, now()
      )
      on conflict (user_id) do update set
        name = excluded.name,
        headline = excluded.headline,
        age = excluded.age,
        city = excluded.city,
        bio = excluded.bio,
        gender = excluded.gender,
        ethnicity = excluded.ethnicity,
        height = excluded.height,
        body_type = excluded.body_type,
        education = excluded.education,
        looking_for = excluded.looking_for,
        relationship = excluded.relationship,
        children = excluded.children,
        smoking = excluded.smoking,
        drinking = excluded.drinking,
        hobbies = excluded.hobbies,
        voice_bio = excluded.voice_bio,
        contacts_open = excluded.contacts_open,
        email = excluded.email,
        phone = excluded.phone,
        whatsapp = excluded.whatsapp,
        telegram = excluded.telegram,
        x = excluded.x,
        snapchat = excluded.snapchat,
        facebook = excluded.facebook,
        tiktok = excluded.tiktok,
        instagram = excluded.instagram,
        avatar = excluded.avatar,
        photos = excluded.photos,
        sample = false,
        complete = excluded.complete,
        updated_at = now()
    `;
	return { complete };
});
var askToMeet_createServerFn_handler = createServerRpc({
	id: "241b2b02d7e6aa823c08abfe74a490a941d075d1016a8e411403a2d51a058089",
	name: "askToMeet",
	filename: "src/lib/network.functions.ts"
}, (opts) => askToMeet.__executeServer(opts));
var askToMeet = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id.trim()).handler(askToMeet_createServerFn_handler, async ({ context, data: id }) => {
	if (!id || id === context.userId) return {
		agreed: false,
		contact: null
	};
	const sql = await getSql();
	if (!(await sql`
      select complete from profiles where user_id = ${context.userId} limit 1
    `)[0]?.complete) throw new Error("Finish your biography and a contact before asking to meet.");
	const target = await sql`select * from profiles where user_id = ${id} and complete = true limit 1`;
	if (!target[0]) return {
		agreed: false,
		contact: null
	};
	await sql`insert into asks (from_id, to_id) values (${context.userId}, ${id}) on conflict do nothing`;
	const agreed = await agreedWith(context.userId, target[0]);
	return {
		agreed,
		contact: agreed && target[0].contacts_open ? toContact(target[0]) : null
	};
});
var passOn_createServerFn_handler = createServerRpc({
	id: "17568884f910e80f3195bc70ccf8ba6c918283e0b2ecb7ac9cebf93f1b55d6a9",
	name: "passOn",
	filename: "src/lib/network.functions.ts"
}, (opts) => passOn.__executeServer(opts));
var passOn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id.trim()).handler(passOn_createServerFn_handler, async ({ context, data: id }) => {
	if (!id) return;
	await (await getSql())`insert into passes (user_id, target_id) values (${context.userId}, ${id}) on conflict do nothing`;
});
var resetPasses_createServerFn_handler = createServerRpc({
	id: "9b8207b367f6a803683b116a682e8a4a92810f1896fbfe7d8f14a96a0be05989",
	name: "resetPasses",
	filename: "src/lib/network.functions.ts"
}, (opts) => resetPasses.__executeServer(opts));
var resetPasses = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(resetPasses_createServerFn_handler, async ({ context }) => {
	await (await getSql())`delete from passes where user_id = ${context.userId}`;
});
function pairKey(a, b) {
	return [a, b].sort().join("|");
}
var SAMPLE_REPLY = {
	"sample:amara": "I read the whole biography. Thursday after the gallery, if you are still in Rome.",
	"sample:sofia": "Come before the city wakes. I will be at the water.",
	"sample:luca": "A walk and a coffee, then. I close the shop at four.",
	"sample:giulia": "I can do a long dinner. Say which night, and if you are only here for the weekend."
};
async function matchedWith(me, otherId) {
	if (!otherId || otherId === me) return null;
	const sql = await getSql();
	if (!(await sql`
    select from_id from asks where from_id = ${me} and to_id = ${otherId} limit 1
  `)[0]) return null;
	const target = await sql`select * from profiles where user_id = ${otherId} and complete = true limit 1`;
	if (!target[0]) return null;
	return (target[0].sample ? target[0].accepts : await agreedWith(me, target[0])) ? target[0] : null;
}
async function readThread(me, otherId) {
	return (await (await getSql())`
    select id, from_id, body from chats
    where pair_key = ${pairKey(me, otherId)}
    order by id asc
    limit 80
  `).map((row) => ({
		id: Number(row.id),
		fromId: row.from_id,
		body: row.body,
		mine: row.from_id === me
	}));
}
var loadThread_createServerFn_handler = createServerRpc({
	id: "0e71b8b0b120f1125750c5fa91b5a2d5c693ce72ab0060d9d85eebce339a5124",
	name: "loadThread",
	filename: "src/lib/network.functions.ts"
}, (opts) => loadThread.__executeServer(opts));
var loadThread = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((otherId) => otherId.trim()).handler(loadThread_createServerFn_handler, async ({ context, data: otherId }) => {
	if (!await matchedWith(context.userId, otherId)) return [];
	return readThread(context.userId, otherId);
});
var sendMessage_createServerFn_handler = createServerRpc({
	id: "66b1e7f734c5f0eb85f59b8925bcf45117f7ca780ca584d9fb0126f9d09d9b9a",
	name: "sendMessage",
	filename: "src/lib/network.functions.ts"
}, (opts) => sendMessage.__executeServer(opts));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	otherId: input.otherId.trim(),
	body: input.body.trim().slice(0, 500)
})).handler(sendMessage_createServerFn_handler, async ({ context, data }) => {
	if (!data.body) return [];
	const match = await matchedWith(context.userId, data.otherId);
	if (!match) throw new Error("Chat opens after you both agree to meet.");
	const sql = await getSql();
	const key = pairKey(context.userId, data.otherId);
	await sql`
      insert into chats (pair_key, from_id, to_id, body)
      values (${key}, ${context.userId}, ${data.otherId}, ${data.body})
    `;
	if (match.sample && SAMPLE_REPLY[match.user_id]) {
		if (!(await sql`
        select id from chats where pair_key = ${key} and from_id = ${match.user_id} limit 1
      `)[0]) await sql`
          insert into chats (pair_key, from_id, to_id, body)
          values (${key}, ${match.user_id}, ${context.userId}, ${SAMPLE_REPLY[match.user_id]})
        `;
	}
	return readThread(context.userId, data.otherId);
});
//#endregion
export { askToMeet_createServerFn_handler, loadNetwork_createServerFn_handler, loadThread_createServerFn_handler, passOn_createServerFn_handler, resetPasses_createServerFn_handler, saveMine_createServerFn_handler, sendMessage_createServerFn_handler };
