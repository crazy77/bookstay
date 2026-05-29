export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://haemyo.vercel.app';

/** 홈 히어로·메타 공통 한 줄 */
export const SITE_LEAD = '한림항 골목, 책과 바다가 맞닿는 북스테이';

export const SITE_NAME_LINE = '해묘(海猫) · 갈매기를 부르는 다른 이름';

/** 검색·SNS 메타 (책방 X, 북스테이) */
export const SITE_DESCRIPTION =
  '제주 한림항 골목, 책과 바다가 맞닿는 북스테이 · 해묘서가.';

export const SITE_OG_DESCRIPTION =
  '제주 한림 북스테이 해묘서가 — 갈매기를 부르는 다른 이름, 해묘(海猫).';

/** OG·카카오 링크 미리보기 — 버전 올리면 캐시 갱신 */
export const SITE_OG_IMAGE = {
  url: '/assets/og-image.png?v=6',
  width: 1200,
  height: 630,
  alt: '해묘서가 BOOKSTAY',
} as const;

export const INSTAGRAM_URL = 'https://www.instagram.com/bookstay_haemyo';
export const INSTAGRAM_DM_URL = 'https://ig.me/m/bookstay_haemyo';

export const KAKAO_TRANSIT_URL = 'https://kko.to/UpwYBL_n3J';
export const KAKAO_CAR_URL = 'https://kko.to/BullgJyS7h';

export const WIFI = {
  ssid: 'fanta',
  password: '12121212',
  qrUrl:
    'https://api.qrserver.com/v1/create-qr-code/?data=WIFI%3AT%3AWPA%3BS%3Afanta%3BP%3A12121212%3B%3B&size=300x300&margin=10',
} as const;
