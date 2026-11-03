-- One Telegram bot per member. The token stays on this row and is never selected for other people.

create table if not exists telegram_bots (
  user_id text primary key,
  token text not null,
  username text not null default '',
  name text not null default '',
  chat_id text not null default '',
  updated_at timestamptz not null default now()
);
