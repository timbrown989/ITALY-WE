-- Social feed and trust & safety tables.
create table if not exists social_posts (id bigserial primary key, user_id text not null references profiles(user_id) on delete cascade, body text not null default '', image_data text not null default '', hidden boolean not null default false, created_at timestamptz not null default now());
create index if not exists social_posts_created_idx on social_posts (created_at desc);
create table if not exists social_reports (id bigserial primary key, reporter_id text not null, target_type text not null check (target_type in ('post','profile')), target_id text not null, reason text not null, details text not null default '', status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')), created_at timestamptz not null default now(), reviewed_at timestamptz);
create index if not exists social_reports_status_idx on social_reports (status, created_at desc);
create table if not exists social_user_status (user_id text primary key, status text not null default 'active' check (status in ('active','suspended')), reason text not null default '', updated_at timestamptz not null default now());
