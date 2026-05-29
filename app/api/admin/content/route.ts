import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { DEFAULT_CONTENT_ENTRIES } from '@/data/site-content';
import { defaultContentRows } from '@/lib/content';
import { requireAdmin } from '@/lib/admin-auth';

type SaveEntry = {
  key: string;
  locale_values: unknown;
};

type ContentUpsertRow = {
  key: string;
  category: string;
  label: string;
  input_type: string;
  locale_values: unknown;
  published: boolean;
  updated_by?: string;
};

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { data, error } = await auth.admin
    .from('content_entries')
    .select('key, category, label, input_type, locale_values, updated_at')
    .order('category')
    .order('key');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rowsByKey = new Map((data ?? []).map((row) => [row.key, row]));
  const rows = defaultContentRows().map((row) => rowsByKey.get(row.key) ?? row);
  return NextResponse.json({ entries: rows, defaults: DEFAULT_CONTENT_ENTRIES });
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = (await request.json()) as { entries?: SaveEntry[]; seedDefaults?: boolean };
  const definitionsByKey = new Map(DEFAULT_CONTENT_ENTRIES.map((entry) => [entry.key, entry]));

  const rows: ContentUpsertRow[] = body.seedDefaults
    ? defaultContentRows()
    : (body.entries ?? []).map((entry) => {
        const definition = definitionsByKey.get(entry.key);
        if (!definition) throw new Error(`Unknown content key: ${entry.key}`);
        return {
          key: definition.key,
          category: definition.category,
          label: definition.label,
          input_type: definition.inputType,
          locale_values: entry.locale_values,
          published: true,
          updated_by: auth.user.id,
        };
      });

  if (!rows.length) {
    return NextResponse.json({ error: 'no_entries' }, { status: 400 });
  }

  const existing = await auth.admin
    .from('content_entries')
    .select('key, locale_values')
    .in(
      'key',
      rows.map((row) => row.key),
    );

  if (existing.data?.length) {
    const revisions = existing.data.map((row) => ({
      entry_key: row.key,
      locale_values: row.locale_values,
      changed_by: auth.user.id,
    }));
    await auth.admin.from('content_entry_revisions').insert(revisions);
  }

  const { error } = await auth.admin.from('content_entries').upsert(rows, {
    onConflict: 'key',
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/');
  revalidatePath('/guide');

  return NextResponse.json({ ok: true });
}
