create table if not exists public.food_catalog (
  id text primary key default 'default' check (id = 'default'),
  payload jsonb not null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

drop trigger if exists food_catalog_set_updated_at on public.food_catalog;
create trigger food_catalog_set_updated_at
before update on public.food_catalog
for each row execute function public.set_updated_at();

alter table public.food_catalog enable row level security;

drop policy if exists "Published food catalog is publicly readable" on public.food_catalog;
create policy "Published food catalog is publicly readable"
on public.food_catalog
for select
to anon, authenticated
using (published = true);

grant select on public.food_catalog to anon, authenticated;
revoke insert, update, delete on public.food_catalog from anon, authenticated;
