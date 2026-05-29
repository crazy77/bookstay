import { DEFAULT_CONTENT, DEFAULT_CONTENT_ENTRIES, type ContentMap } from '@/data/site-content';
import { getSupabasePublicServer } from '@/lib/supabase';

type ContentRow = {
  key: string;
  locale_values: ContentMap[string];
};

export async function getSiteContent(): Promise<ContentMap> {
  const supabase = getSupabasePublicServer();
  if (!supabase) return DEFAULT_CONTENT;

  const { data, error } = await supabase
    .from('content_entries')
    .select('key, locale_values')
    .eq('published', true);

  if (error || !data) return DEFAULT_CONTENT;

  const overrides = (data as ContentRow[]).reduce<ContentMap>((acc, row) => {
    acc[row.key] = row.locale_values;
    return acc;
  }, {});

  return { ...DEFAULT_CONTENT, ...overrides };
}

export function defaultContentRows() {
  return DEFAULT_CONTENT_ENTRIES.map((entry) => ({
    key: entry.key,
    category: entry.category,
    label: entry.label,
    input_type: entry.inputType,
    locale_values: entry.localeValues,
    published: true,
  }));
}
