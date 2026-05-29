import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import type { FoodCatalog } from '@/data/food-catalog';
import { requireAdmin } from '@/lib/admin-auth';
import { defaultFoodCatalog, normalizeCatalog } from '@/lib/food-catalog';

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { data, error } = await auth.admin
    .from('food_catalog')
    .select('payload')
    .eq('id', 'default')
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    catalog: data ? normalizeCatalog((data as { payload: FoodCatalog }).payload) : defaultFoodCatalog(),
  });
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = (await request.json()) as { catalog?: FoodCatalog; seedDefaults?: boolean };
  const catalog = body.seedDefaults ? defaultFoodCatalog() : body.catalog;

  if (!catalog) return NextResponse.json({ error: 'missing_catalog' }, { status: 400 });

  const { error } = await auth.admin.from('food_catalog').upsert(
    {
      id: 'default',
      payload: normalizeCatalog(catalog),
      published: true,
      updated_by: auth.user.id,
    },
    { onConflict: 'id' },
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/guide');
  return NextResponse.json({ ok: true });
}
