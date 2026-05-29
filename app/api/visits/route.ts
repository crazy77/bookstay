import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { path } = (await request.json()) as { path?: string };
    const pagePath = path?.startsWith('/') ? path : '/';
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.rpc('increment_visit_count', {
      page_path_input: pagePath,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    await supabase.from('content_entries').select('key').limit(1);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
