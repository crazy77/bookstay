# 해묘서가 (Haemyo Bookstay)

제주 한림항 북스테이 — Next.js App Router 사이트

## 개발

패키지 매니저: **[Bun](https://bun.sh)**

```bash
cp .env.example .env.local

bun install
bun dev
```

### dev 서버가 500 · `routes-manifest.json` / `124.js` 오류

코드 문제가 아니라 **`.next` 캐시가 HMR 중에 깨진 경우**가 많습니다. (`bun run build`를 dev가 켜진 채 돌리거나, 저장이 겹칠 때)

```bash
# 보통 이것만으로 충분 (캐시 삭제 후 dev)
bun run dev:fresh

# 또는
bun run clean && bun dev
```

`bun dev`는 시작할 때 깨진 `.next`가 보이면 **자동으로 한 번 지웁니다.** 실행 중에 500이 나면 프로세스를 끄고 `bun dev`(또는 `dev:fresh`)로 다시 켜면 됩니다.

- http://localhost:3000 — 홈
- http://localhost:3000/guide — 이용 안내

## 배포

Vercel · Framework Preset: **Next.js** (Install Command: `bun install`, Bun lockfile `bun.lock` 인식)

환경 변수:

- `NEXT_PUBLIC_SITE_URL` — 예: `https://haemyo.vercel.app`
- `NEXT_PUBLIC_NAVER_BOOK_URL` — 네이버 예약 URL

## 스타일 (Tailwind v4)

- **토큰** — `app/globals.css` `@theme` (canvas, surface, ink, accent, border, serif/sans 폰트)
- **가이드 패턴** — `app/styles/haemyo.css` `@layer components` (카드·맛집·topbar 등)
- **홈·UI** — `components/home/*`, `components/ui/button.tsx` 등 Tailwind 유틸리티 직접 사용
- **병합** — `lib/cn.ts` (`clsx` + `tailwind-merge`)

로고 크기: 홈 `Logo variant="home"` → `w-[6.5rem]` (한 곳만 수정)

### OG / 소셜 공유 이미지

`public/assets/og-image.png` (1200×630) — `logo.png` + **해묘서가 · BOOKSTAY**

```bash
bun run og:image
```

생성 후 `app/layout.tsx`의 `og-image.png?v=` 버전을 올리면 캐시 갱신됩니다.

## 구조

```
app/              페이지·globals.css·styles/haemyo.css
components/       UI·홈·가이드 섹션
data/             도보맛집 데이터
lib/              cn·사이트 URL
public/assets/    이미지
legacy/           이전 정적 HTML (styles.css 참고용)
```

## 다음 단계 (예정)

- `/rooms` · `/gallery`
- `/admin` + Supabase
