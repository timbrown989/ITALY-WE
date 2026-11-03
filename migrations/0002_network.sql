-- Shared Italy We network. Contacts stay on the row and are never selected for the public deck.

create table if not exists profiles (
  user_id text primary key,
  name text not null default '',
  headline text not null default '',
  age text not null default '',
  city text not null default '',
  bio text not null default '',
  gender text not null default '',
  ethnicity text not null default '',
  height text not null default '',
  body_type text not null default '',
  education text not null default '',
  looking_for text not null default '',
  relationship text not null default '',
  children text not null default '',
  smoking text not null default '',
  drinking text not null default '',
  hobbies text not null default '[]',
  voice_bio boolean not null default false,
  contacts_open boolean not null default true,
  email text not null default '',
  phone text not null default '',
  whatsapp text not null default '',
  telegram text not null default '',
  x text not null default '',
  snapchat text not null default '',
  facebook text not null default '',
  tiktok text not null default '',
  instagram text not null default '',
  avatar text not null default '',
  photos text not null default '[]',
  sample boolean not null default false,
  accepts boolean not null default false,
  complete boolean not null default false,
  updated_at timestamptz not null default now()
);

create index if not exists profiles_complete_idx on profiles (complete);

create table if not exists asks (
  from_id text not null,
  to_id text not null,
  created_at timestamptz not null default now(),
  primary key (from_id, to_id)
);

create index if not exists asks_to_idx on asks (to_id);

create table if not exists passes (
  user_id text not null,
  target_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, target_id)
);
