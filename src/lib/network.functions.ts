import { createServerFn } from "@tanstack/react-start";
import { PEOPLE, SOCIAL } from "@/data/people";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { emptyProfile, isComplete, type Profile } from "@/lib/italy-store";

export type Contact = {
  email: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  x: string;
  snapchat: string;
  facebook: string;
  tiktok: string;
  instagram: string;
};

export type NetworkCard = {
  id: string;
  name: string;
  age: number;
  city: string;
  role: string;
  photo: string;
  bio: string;
  interests: string[];
  sample: boolean;
  accepts: boolean;
  gift: string;
  incoming: boolean;
  contact: Contact | null;
  lastMessage: string;
};

export type ChatLine = {
  id: number;
  fromId: string;
  body: string;
  mine: boolean;
};

export type NetworkState = {
  profile: Profile | null;
  deck: NetworkCard[];
  meetings: NetworkCard[];
  incoming: NetworkCard[];
};

type ProfileRow = {
  user_id: string;
  name: string;
  headline: string;
  age: string;
  city: string;
  bio: string;
  gender: string;
  ethnicity: string;
  height: string;
  body_type: string;
  education: string;
  looking_for: string;
  relationship: string;
  children: string;
  smoking: string;
  drinking: string;
  hobbies: string;
  voice_bio: boolean;
  contacts_open: boolean;
  email: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  x: string;
  snapchat: string;
  facebook: string;
  tiktok: string;
  instagram: string;
  avatar: string;
  photos: string;
  sample: boolean;
  accepts: boolean;
  complete: boolean;
};

const PHOTO_MAX = 280_000;

function strings(value: string) {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

function toProfile(row: ProfileRow): Profile {
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
    photos: strings(row.photos).slice(0, 4),
  };
}

function toContact(row: ProfileRow): Contact {
  return {
    email: row.email,
    phone: row.phone,
    whatsapp: row.whatsapp,
    telegram: row.telegram,
    x: row.x,
    snapchat: row.snapchat,
    facebook: row.facebook,
    tiktok: row.tiktok,
    instagram: row.instagram,
  };
}

function toCard(row: ProfileRow, extra: { accepts: boolean; incoming: boolean; contact: Contact | null; lastMessage?: string }): NetworkCard {
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
    gift: row.sample ? (SOCIAL[row.user_id.replace(/^sample:/, "")]?.gift ?? "A small note") : "A yes",
    incoming: extra.incoming,
    contact: extra.contact,
    lastMessage: extra.lastMessage ?? "",
  };
}

function clip(value: string, max: number) {
  return value.trim().slice(0, max);
}

function cleanProfile(input: Profile): Profile {
  const blank = emptyProfile();
  return {
    ...blank,
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
    photos: (input.photos ?? []).filter((item) => typeof item === "string").slice(0, 4),
  };
}

async function seedSamples() {
  const sql = await getSql();
  for (const person of PEOPLE) {
    const social = SOCIAL[person.id];
    const id = `sample:${person.id}`;
    await sql`
      insert into profiles (
        user_id, name, headline, age, city, bio, hobbies, contacts_open,
        email, phone, whatsapp, telegram, x, snapchat, facebook, tiktok, instagram,
        avatar, sample, accepts, complete
      ) values (
        ${id}, ${person.name}, ${person.role}, ${String(person.age)}, ${person.city}, ${person.bio},
        ${JSON.stringify(person.interests)}, true,
        ${person.email}, ${person.phone}, ${social?.whatsapp ?? person.phone}, ${social?.telegram ?? ""},
        ${social?.x ?? ""}, ${social?.snapchat ?? ""}, ${social?.facebook ?? ""}, ${social?.tiktok ?? ""},
        ${social?.instagram ?? ""}, ${person.photo}, true, ${person.accepts}, true
      )
      on conflict (user_id) do nothing
    `;
  }
}

async function agreedWith(me: string, row: ProfileRow) {
  if (row.sample) return row.accepts;
  const sql = await getSql();
  const back = await sql<{ from_id: string }>`
    select from_id from asks where from_id = ${row.user_id} and to_id = ${me} limit 1
  `;
  return back.length > 0;
}

export const loadNetwork = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<NetworkState> => {
    await seedSamples();
    const sql = await getSql();
    const me = context.userId;
    const mine = await sql<ProfileRow>`select * from profiles where user_id = ${me} limit 1`;
    const deckRows = await sql<ProfileRow>`
      select * from profiles
      where complete = true
        and user_id <> ${me}
        and user_id not in (select target_id from passes where user_id = ${me})
        and user_id not in (select to_id from asks where from_id = ${me})
      order by sample desc, updated_at desc
    `;
    const meetingRows = await sql<ProfileRow>`
      select p.* from profiles p
      join asks a on a.to_id = p.user_id
      where a.from_id = ${me}
      order by a.created_at desc
    `;
    const incomingRows = await sql<ProfileRow>`
      select p.* from profiles p
      join asks a on a.from_id = p.user_id
      where a.to_id = ${me}
        and p.user_id not in (select to_id from asks where from_id = ${me})
      order by a.created_at desc
    `;

    async function cardFor(row: ProfileRow, incoming: boolean) {
      const mineAsked = !incoming;
      const theyAsked = incoming || (await agreedWith(me, row));
      const agreed = row.sample ? mineAsked && row.accepts : mineAsked && theyAsked;
      const contact = agreed && row.contacts_open ? toContact(row) : null;
      let lastMessage = "";
      if (agreed) {
        const latest = await sql<{ body: string }>`
          select body from chats where pair_key = ${pairKey(me, row.user_id)} order by id desc limit 1
        `;
        lastMessage = latest[0]?.body ?? "";
      }
      return toCard(row, { accepts: agreed, incoming, contact, lastMessage });
    }

    return {
      profile: mine[0] ? toProfile(mine[0]) : null,
      deck: deckRows.map((row) => toCard(row, { accepts: false, incoming: false, contact: null })),
      meetings: await Promise.all(meetingRows.map((row) => cardFor(row, false))),
      incoming: await Promise.all(incomingRows.map((row) => cardFor(row, true))),
    };
  });

export const saveMine = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: Profile) => cleanProfile(input))
  .handler(async ({ context, data }) => {
    if (data.avatar.length > PHOTO_MAX || data.photos.some((photo) => photo.length > PHOTO_MAX)) {
      throw new Error("A photo is too large. Try a smaller one.");
    }
    const complete = isComplete(data);
    const sql = await getSql();
    await sql`
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

export const askToMeet = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id.trim())
  .handler(async ({ context, data: id }) => {
    if (!id || id === context.userId) return { agreed: false, contact: null as Contact | null };
    const sql = await getSql();
    const mine = await sql<{ complete: boolean }>`
      select complete from profiles where user_id = ${context.userId} limit 1
    `;
    if (!mine[0]?.complete) throw new Error("Finish your biography and a contact before asking to meet.");
    const target = await sql<ProfileRow>`select * from profiles where user_id = ${id} and complete = true limit 1`;
    if (!target[0]) return { agreed: false, contact: null };
    await sql`insert into asks (from_id, to_id) values (${context.userId}, ${id}) on conflict do nothing`;
    const agreed = await agreedWith(context.userId, target[0]);
    const contact = agreed && target[0].contacts_open ? toContact(target[0]) : null;
    return { agreed, contact };
  });

export const passOn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id.trim())
  .handler(async ({ context, data: id }) => {
    if (!id) return;
    const sql = await getSql();
    await sql`insert into passes (user_id, target_id) values (${context.userId}, ${id}) on conflict do nothing`;
  });

export const resetPasses = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await sql`delete from passes where user_id = ${context.userId}`;
  });

function pairKey(a: string, b: string) {
  return [a, b].sort().join("|");
}

const SAMPLE_REPLY: Record<string, string> = {
  "sample:amara": "I read the whole biography. Thursday after the gallery, if you are still in Rome.",
  "sample:sofia": "Come before the city wakes. I will be at the water.",
  "sample:luca": "A walk and a coffee, then. I close the shop at four.",
  "sample:giulia": "I can do a long dinner. Say which night, and if you are only here for the weekend.",
};

async function matchedWith(me: string, otherId: string) {
  if (!otherId || otherId === me) return null;
  const sql = await getSql();
  const asked = await sql<{ from_id: string }>`
    select from_id from asks where from_id = ${me} and to_id = ${otherId} limit 1
  `;
  if (!asked[0]) return null;
  const target = await sql<ProfileRow>`select * from profiles where user_id = ${otherId} and complete = true limit 1`;
  if (!target[0]) return null;
  const agreed = target[0].sample ? target[0].accepts : await agreedWith(me, target[0]);
  return agreed ? target[0] : null;
}

async function readThread(me: string, otherId: string): Promise<ChatLine[]> {
  const sql = await getSql();
  const rows = await sql<{ id: number; from_id: string; body: string }>`
    select id, from_id, body from chats
    where pair_key = ${pairKey(me, otherId)}
    order by id asc
    limit 80
  `;
  return rows.map((row) => ({
    id: Number(row.id),
    fromId: row.from_id,
    body: row.body,
    mine: row.from_id === me,
  }));
}

export const loadThread = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((otherId: string) => otherId.trim())
  .handler(async ({ context, data: otherId }) => {
    const match = await matchedWith(context.userId, otherId);
    if (!match) return [] as ChatLine[];
    return readThread(context.userId, otherId);
  });

export const sendMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { otherId: string; body: string }) => ({
    otherId: input.otherId.trim(),
    body: input.body.trim().slice(0, 500),
  }))
  .handler(async ({ context, data }) => {
    if (!data.body) return [] as ChatLine[];
    const match = await matchedWith(context.userId, data.otherId);
    if (!match) throw new Error("Chat opens after you both agree to meet.");
    const sql = await getSql();
    const key = pairKey(context.userId, data.otherId);
    await sql`
      insert into chats (pair_key, from_id, to_id, body)
      values (${key}, ${context.userId}, ${data.otherId}, ${data.body})
    `;
    if (match.sample && SAMPLE_REPLY[match.user_id]) {
      const theirs = await sql<{ id: number }>`
        select id from chats where pair_key = ${key} and from_id = ${match.user_id} limit 1
      `;
      if (!theirs[0]) {
        await sql`
          insert into chats (pair_key, from_id, to_id, body)
          values (${key}, ${match.user_id}, ${context.userId}, ${SAMPLE_REPLY[match.user_id]})
        `;
      }
    }
    return readThread(context.userId, data.otherId);
  });
