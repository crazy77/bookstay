#!/usr/bin/env bun
/**
 * docs/food-spots-photo-research.md + data/food-links-from-research.json
 * 조사 문서에 적힌 링크만 사용 (네이버 지도 검색·타일 스크래핑 없음)
 *
 * 우선순위: downloadUrl → visitjeju → diningcode rid → page/blog/shop URL
 *          → naverPlaceId(네이버 통합검색 리뷰 사진)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dir, '..');
const OUT = join(ROOT, 'public/assets/food');
const LINKS = JSON.parse(
  readFileSync(join(ROOT, 'data/food-links-from-research.json'), 'utf8'),
);
const SOURCES = JSON.parse(
  readFileSync(join(ROOT, 'data/food-photo-sources.json'), 'utf8'),
);

const MIN = 10_000;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

mkdirSync(OUT, { recursive: true });

async function fetchText(url, extraHeaders = {}) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, ...extraHeaders },
    signal: AbortSignal.timeout(25000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function fetchBuf(url, extraHeaders = {}) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Referer: 'https://www.naver.com/', ...extraHeaders },
    signal: AbortSignal.timeout(25000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < MIN) throw new Error(`too small ${buf.length}`);
  return buf;
}

async function fromDiningcode(rid) {
  const html = await fetchText(
    `https://www.diningcode.com/profile.php?rid=${rid}`,
  );
  const url = html.match(
    /https:\/\/d12zq4w4guyljn\.cloudfront\.net\/750_750_[^"'\s]+\.webp/,
  )?.[0];
  if (!url) throw new Error('no diningcode img');
  return fetchBuf(url);
}

async function fromVisitJeju(id) {
  const html = await fetchText(
    `https://www.visitjeju.net/kr/detail/view?contentsid=${id}`,
  );
  const url = html.match(
    /https:\/\/api\.cdn\.visitjeju\.net\/photomng\/imgpath\/[^"'\s]+\.webp/,
  )?.[0];
  if (!url) throw new Error('no visitjeju img');
  return fetchBuf(url);
}

async function fromDirectUrl(url) {
  return fetchBuf(url);
}

async function fromPageImages(pageUrl) {
  const html = await fetchText(pageUrl);
  const urls = [
    ...html.matchAll(/https?:\/\/[^"'\s)]+\.(?:jpg|jpeg|png|webp)/gi),
  ].map((m) => m[0].replace(/\\u002F/g, '/'));
  const foodish = urls.filter(
    (u) =>
      !u.includes('icon') &&
      !u.includes('logo') &&
      !u.includes('emoji') &&
      !u.includes('tistory.io/icon') &&
      !u.includes('subtle-dots') &&
      !u.includes('dot_bg') &&
      (u.includes('postfiles') ||
        u.includes('blogfiles') ||
        u.includes('cloudfront') ||
        u.includes('pstatic') ||
        u.includes('kakaocdn') ||
        u.includes('funjeju.com/data') ||
        u.includes('make.shop') ||
        u.includes('cloudfront.net/posts')),
  );
  for (const url of foodish.sort((a, b) => b.length - a.length)) {
    try {
      return await fetchBuf(url, {
        Referer: pageUrl,
      });
    } catch {
      /* next */
    }
  }
  throw new Error('no page img');
}

/** 네이버 통합검색 place/ID + 리뷰 썸네일 (조사 문서 naverSearchUrl 대안) */
async function fromNaverSearchPhotos(placeId, naverQuery, imageSkip = 0) {
  const q = encodeURIComponent(naverQuery);
  const html = await fetchText(`https://search.naver.com/search.naver?query=${q}`);
  const pid =
    placeId ||
    html.match(/place\/(\d{6,})/)?.[1] ||
    html.match(/restaurant\/(\d{6,})/)?.[1];
  if (!pid) throw new Error('no place id');

  const raw = [
    ...html.matchAll(
      /https:\/\/search\.pstatic\.net\/common\/\?[^"'\s]+/g,
    ),
  ].map((m) => m[0].replace(/&amp;/g, '&'));

  const candidates = [];
  const seenSrc = new Set();
  for (const proxy of raw) {
    const srcM = proxy.match(/src=([^&]+)/);
    if (!srcM) continue;
    const src = decodeURIComponent(srcM[1]);
    if (src.includes('profileImage') || src.includes('blogpfthumb')) continue;
    if (/\.gif/i.test(src)) continue;
    if (
      !src.includes('ldb-phinf') &&
      !src.includes('blogfiles') &&
      !src.includes('postfiles') &&
      !src.includes('pstatic.net')
    )
      continue;
    if (seenSrc.has(src)) continue;
    seenSrc.add(src);
    const large = proxy
      .replace(/type=f\d+_\d+/, 'type=f640_380')
      .replace(/type=ff\d+_\d+/, 'type=f640_380');
    candidates.push(large);
  }

  const uniq = candidates;
  const ordered = uniq.slice(imageSkip).concat(uniq.slice(0, imageSkip));
  for (const url of ordered) {
    try {
      return await fetchBuf(url);
    } catch {
      /* */
    }
  }
  throw new Error(`no search photos (place ${pid})`);
}

let ok = 0;
const skip = new Set();

for (const row of LINKS) {
  const dest = join(OUT, `${row.slug}.webp`);
  if (existsSync(dest) && readFileSync(dest).length >= MIN) {
    skip.add(row.slug);
    continue;
  }

  const srcMeta = SOURCES.find((s) => s.slug === row.slug);
  const directUrl = srcMeta?.downloadUrl;

  process.stdout.write(`${row.slug} … `);
  try {
    let buf;
    if (directUrl) {
      buf = await fromDirectUrl(directUrl);
    } else if (row.visitJejuId) {
      buf = await fromVisitJeju(row.visitJejuId);
    } else if (row.diningcodeRid) {
      buf = await fromDiningcode(row.diningcodeRid);
    } else if (row.funjejuUrl) {
      buf = await fromPageImages(row.funjejuUrl);
    } else if (row.pageUrl || row.blogUrl || row.shopUrl) {
      buf = await fromPageImages(row.pageUrl || row.blogUrl || row.shopUrl);
    } else if (row.naverPlaceId || row.naverQuery) {
      buf = await fromNaverSearchPhotos(
        row.naverPlaceId,
        row.naverQuery || srcMeta?.naverSearch || row.nameKo,
        row.naverImageSkip ?? 0,
      );
    } else {
      throw new Error('no link in research json');
    }
    writeFileSync(dest, buf);
    console.log(`ok ${Math.round(buf.length / 1024)}KB`);
    ok++;
  } catch (e) {
    console.log(`FAIL ${e.message}`);
    if (row.fallbackDiningcodeRid) {
      try {
        const buf = await fromDiningcode(row.fallbackDiningcodeRid);
        writeFileSync(dest, buf);
        console.log(`  → fallback diningcode ok`);
        ok++;
      } catch {
        /* */
      }
    }
  }
  await Bun.sleep(400);
}

const entries = [];
for (const row of LINKS) {
  const p = join(OUT, `${row.slug}.webp`);
  if (!existsSync(p) || readFileSync(p).length < MIN) continue;
  const src = SOURCES.find((s) => s.slug === row.slug);
  entries.push(
    `  '${row.slug}': { src: '/assets/food/${row.slug}.webp', mapQuery: ${JSON.stringify(src?.mapQuery ?? '')}, nameKo: ${JSON.stringify(row.nameKo)} },`,
  );
}

writeFileSync(
  join(ROOT, 'data/food-spot-photos.ts'),
  [
    '/** @generated scripts/download-from-research.mjs */',
    '',
    'export const FOOD_SPOT_PHOTOS = {',
    ...entries,
    '} as const;',
    '',
    'export type FoodSpotPhotoSlug = keyof typeof FOOD_SPOT_PHOTOS;',
    '',
  ].join('\n'),
);

const total = LINKS.filter((r) => {
  const p = join(OUT, `${r.slug}.webp`);
  return existsSync(p) && readFileSync(p).length >= MIN;
}).length;

console.log(
  `\n${total}/${LINKS.length} on disk (${ok} new this run, ${skip.size} skipped existing)`,
);
