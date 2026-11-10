-- Public wallet addresses only. No keys, seeds, or balances are stored.
create table if not exists member_wallets (
  user_id text primary key references profiles(user_id) on delete cascade,
  address text not null unique,
  updated_at timestamptz not null default now()
);
