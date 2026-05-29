import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';

const BUCKET = 'food-images';

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const form = await request.formData();
  const file = form.get('file');
  const folder = String(form.get('folder') ?? 'food');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'missing_file' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'invalid_file_type' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const path = `${safePath(folder)}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const buffer = await file.arrayBuffer();

  const { error } = await auth.admin.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = auth.admin.storage.from(BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl, path });
}

function safePath(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9/_-]+/g, '-')
      .replace(/\/+/g, '/')
      .replace(/^\/|\/$/g, '') || 'food'
  );
}
