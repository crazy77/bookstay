create table if not exists public.content_entries (
  key text primary key,
  category text not null,
  label text not null,
  input_type text not null check (input_type in ('text', 'textarea', 'list', 'rich_list')),
  locale_values jsonb not null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.content_entry_revisions (
  id bigserial primary key,
  entry_key text not null references public.content_entries(key) on delete cascade,
  locale_values jsonb not null,
  changed_at timestamptz not null default now(),
  changed_by uuid references auth.users(id) on delete set null
);

create table if not exists public.visit_counts (
  page_path text primary key,
  count bigint not null default 0,
  last_seen_at timestamptz not null default now()
);

create or replace function public.increment_visit_count(page_path_input text)
returns void
language plpgsql
as $$
begin
  insert into public.visit_counts (page_path, count, last_seen_at)
  values (page_path_input, 1, now())
  on conflict (page_path)
  do update set
    count = public.visit_counts.count + 1,
    last_seen_at = now();
end;
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists content_entries_set_updated_at on public.content_entries;
create trigger content_entries_set_updated_at
before update on public.content_entries
for each row execute function public.set_updated_at();

alter table public.content_entries enable row level security;
alter table public.content_entry_revisions enable row level security;
alter table public.visit_counts enable row level security;

drop policy if exists "Published content is publicly readable" on public.content_entries;
create policy "Published content is publicly readable"
on public.content_entries
for select
to anon, authenticated
using (published = true);

drop policy if exists "Visit counts are publicly readable" on public.visit_counts;
create policy "Visit counts are publicly readable"
on public.visit_counts
for select
to anon, authenticated
using (true);

revoke insert, update, delete on public.content_entries from anon, authenticated;
revoke all on public.content_entry_revisions from anon, authenticated;
revoke insert, update, delete on public.visit_counts from anon, authenticated;
