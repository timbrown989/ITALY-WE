-- Chat after a match. pair_key is the two user ids sorted, so both people share one thread.

create table if not exists chats (
  id serial primary key,
  pair_key text not null,
  from_id text not null,
  to_id text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists chats_pair_idx on chats (pair_key, id);
