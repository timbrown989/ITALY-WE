-- Optional 4-digit PIN gate for the wallet page. The hash is stored, not the digits.
-- No private keys, seeds, or balances are stored. The app cannot send or withdraw.
alter table member_wallets alter column address drop not null;
alter table member_wallets drop constraint if exists member_wallets_address_key;
create unique index if not exists member_wallets_address_unique on member_wallets (address) where address is not null and address <> '';
alter table member_wallets add column if not exists pin_hash text;
alter table member_wallets add column if not exists pin_set_at timestamptz;