alter table public.content_entries
drop constraint if exists content_entries_input_type_check;

alter table public.content_entries
add constraint content_entries_input_type_check
check (input_type in ('text', 'textarea', 'list', 'rich_list', 'image', 'image_list'));
