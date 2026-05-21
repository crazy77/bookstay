#!/usr/bin/env bun
/**
 * food-photo-sources.json 의 downloadUrl → public/assets/food/{slug}.webp
 * 호스트 허락본: 같은 파일명으로 덮어쓰기
 *
 *   bun scripts/collect-food-photos.mjs
 *   bun scripts/collect-food-photos.mjs --import ./photos/micro-habitat.jpg
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, basename, extname } from 'path';

const ROOT = join(import.meta.dir, '..');
const OUT_DIR = join(ROOT, 'public/assets/food');
const SOURCES = join(ROOT, 'data/food-photo-sources.json');
const MANIFEST_OUT = join(ROOT, 'data/food-spot-photos.ts');

mkdirSync(OUT_DIR, { recursive: true });

const sources = JSON.parse(readFileSync(SOURCES, 'utf8'));

async function download(url, dest) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
}

const importArg = process.argv.indexOf('--import');
if (importArg !== -1) {
  const file = process.argv[importArg + 1];
  const slug = process.argv[importArg + 2];
  if (!file || !slug) {
    console.error('Usage: bun scripts/collect-food-photos.mjs --import <file> <slug>');
    process.exit(1);
  }
  const dest = join(OUT_DIR, `${slug}.webp`);
  const buf = readFileSync(file);
  writeFileSync(dest, buf);
  console.log(`imported → ${dest}`);
} else {
  for (const row of sources) {
    if (!row.downloadUrl) continue;
    const dest = join(OUT_DIR, `${row.slug}.webp`);
    process.stdout.write(`${row.slug} … `);
    try {
      await download(row.downloadUrl, dest);
      console.log('ok');
    } catch (e) {
      console.log(`fail (${e.message})`);
    }
  }
}

const credits = Object.fromEntries(
  sources.filter((r) => r.credit).map((r) => [r.slug, r.credit]),
);

const lines = ['/** @generated bun scripts/collect-food-photos.mjs */', ''];
const entries = [];
for (const row of sources) {
  const file = join(OUT_DIR, `${row.slug}.webp`);
  if (!existsSync(file)) continue;
  entries.push(
    `  '${row.slug}': { src: '/assets/food/${row.slug}.webp', mapQuery: ${JSON.stringify(row.mapQuery)}, nameKo: ${JSON.stringify(row.nameKo)}${row.credit ? `, credit: ${JSON.stringify(row.credit)}` : ''} },`,
  );
}

lines.push('export const FOOD_SPOT_PHOTOS = {');
lines.push(...entries);
lines.push('} as const;');
lines.push('');
lines.push('export type FoodSpotPhotoSlug = keyof typeof FOOD_SPOT_PHOTOS;');
lines.push('');

writeFileSync(MANIFEST_OUT, lines.join('\n'));
console.log(`manifest: ${entries.length} photos → data/food-spot-photos.ts`);
