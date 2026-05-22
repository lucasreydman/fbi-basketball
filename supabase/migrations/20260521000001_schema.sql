-- FBI Basketball — redraft schema
-- No auth coupling, no RLS gates: this is a free public tool for now.
-- Lockdown + admin layer added later (security/auth pass).

create type public.list_surface as enum ('points', 'cats');
create type public.list_status  as enum ('draft', 'published', 'archived');

create table public.players (
  id              serial primary key,
  full_name       text not null,
  slug            text not null unique,
  team            text,
  position        text,
  age             numeric(4,1),
  external_nba_id int,
  created_at      timestamptz not null default now()
);
create index on public.players (full_name);

create table public.ranked_lists (
  id           uuid primary key default gen_random_uuid(),
  surface      public.list_surface not null,
  status       public.list_status not null default 'draft',
  version      int not null,
  published_at timestamptz,
  notes        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create unique index ranked_lists_one_draft on public.ranked_lists (surface)
  where status = 'draft';
create unique index ranked_lists_one_published on public.ranked_lists (surface)
  where status = 'published';

create table public.ranking_entries (
  list_id     uuid not null references public.ranked_lists on delete cascade,
  player_id   int  not null references public.players,
  rank        int  not null,
  tier        int,
  value       numeric,
  change_n    int  default 0,
  extras      jsonb not null default '{}',
  notes       text,
  primary key (list_id, player_id)
);
create index on public.ranking_entries (list_id, rank);

create table public.trade_calc_versions (
  id            uuid primary key default gen_random_uuid(),
  status        public.list_status not null default 'draft',
  version       int not null,
  published_at  timestamptz,
  notes         text,
  premium_curve jsonb not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create unique index trade_calc_one_draft on public.trade_calc_versions (status)
  where status = 'draft';
create unique index trade_calc_one_published on public.trade_calc_versions (status)
  where status = 'published';

create table public.trade_values (
  calc_id    uuid not null references public.trade_calc_versions on delete cascade,
  player_id  int  not null references public.players,
  value      numeric not null,
  primary key (calc_id, player_id)
);
create index on public.trade_values (calc_id);

-- updated_at trigger
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger ranked_lists_touch
  before update on public.ranked_lists
  for each row execute function public.touch_updated_at();
create trigger trade_calc_versions_touch
  before update on public.trade_calc_versions
  for each row execute function public.touch_updated_at();

-- Public read everywhere for now (tool is free / open).
alter table public.players            enable row level security;
alter table public.ranked_lists       enable row level security;
alter table public.ranking_entries    enable row level security;
alter table public.trade_calc_versions enable row level security;
alter table public.trade_values       enable row level security;

create policy players_read    on public.players            for select using (true);
create policy lists_read      on public.ranked_lists       for select using (status = 'published');
create policy entries_read    on public.ranking_entries    for select using (
  exists (select 1 from public.ranked_lists rl where rl.id = list_id and rl.status = 'published')
);
create policy calc_read       on public.trade_calc_versions for select using (status = 'published');
create policy calc_vals_read  on public.trade_values        for select using (
  exists (select 1 from public.trade_calc_versions v where v.id = calc_id and v.status = 'published')
);
