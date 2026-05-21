export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://haemyo.vercel.app';

export const NAVER_BOOK_URL =
  process.env.NEXT_PUBLIC_NAVER_BOOK_URL ??
  'https://booking.naver.com/booking/3/bizes/1573091/items/7340362';

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
