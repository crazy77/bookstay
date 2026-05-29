import type { LocaleText } from '@/lib/locale';

export const GUIDE_HEAD = {
  hero: {
    ko: '해묘서가에 오신 것을 환영합니다',
    en: 'Welcome to Haemyo',
    zh: '欢迎光临海猫书斋',
  },
  checkin: {
    ko: '체크인 & 체크아웃',
    en: 'Check-in & Check-out',
    zh: '入住与退房',
  },
  arrival: {
    ko: '주차 및 오시는 길',
    en: 'Parking & directions',
    zh: '停车与交通',
  },
  library: {
    ko: '서가 이용 안내',
    en: 'The library',
    zh: '书坊须知',
  },
  room: {
    ko: '객실 이용 안내',
    en: 'Room guide',
    zh: '客房须知',
  },
  food: {
    ko: '도보맛집',
    en: 'Host picks',
    zh: '步行美食',
  },
} satisfies Record<string, LocaleText>;

export const GUIDE_BLOCK = {
  parking: { ko: '주차', en: 'Parking', zh: '停车' },
  transit: { ko: '대중교통', en: 'By transit', zh: '公共交通' },
  wifi: { ko: '와이파이', en: 'WiFi', zh: '无线网络' },
  speaker: {
    ko: '스피커 사용법',
    en: 'Room audio · Marshall Acton III',
    zh: '音响使用 · Marshall Acton III',
  },
} satisfies Record<string, LocaleText>;

export const GUIDE_NAV = [
  { href: '#checkin', label: { ko: '체크인', en: 'Check-in', zh: '入住' } },
  { href: '#arrival', label: { ko: '오시는 길', en: 'Directions', zh: '交通' } },
  { href: '#library', label: { ko: '서가', en: 'Library', zh: '书坊' } },
  { href: '#room', label: { ko: '객실', en: 'Room', zh: '客房' } },
  { href: '#food', label: { ko: '도보맛집', en: 'Food', zh: '美食' } },
] as const;

export const ROUTE_BTN = {
  transit: {
    ko: '대중교통 길찾기',
    en: 'By transit',
    zh: '公共交通路线',
  },
  car: {
    ko: '자동차 길찾기',
    en: 'By car',
    zh: '驾车路线',
  },
} satisfies Record<string, LocaleText>;

export const WIFI_LABELS = {
  network: { ko: '네트워크', en: 'Network', zh: '网络名称' },
  password: { ko: '비밀번호', en: 'Password', zh: '密码' },
  note: {
    ko: 'QR을 카메라로 스캔하면 자동 연결됩니다.',
    en: 'Scan the QR with your camera to connect automatically.',
    zh: '用相机扫描二维码即可自动连接。',
  },
  copy: {
    ko: '비밀번호 복사',
    en: 'Copy password',
    zh: '复制密码',
  },
} satisfies Record<string, LocaleText>;

export const MAP_CAPTION: LocaleText = {
  ko: '골목 진입 상세 — 대림1길 1-1',
  en: 'Alley detail · Daerim 1-gil 1-1',
  zh: '巷弄入口示意 — 大林1街 1-1',
};

export const FOOTER_META = {
  dmPrompt: {
    ko: '궁금한 점은 DM 주세요.',
    en: 'Questions? Send us a DM.',
    zh: '如有疑问，请私信联系我们。',
  },
  checkinLabel: { ko: '체크인', en: 'Check-in', zh: '入住' },
  checkin: { ko: '오후 4시', en: '4:00 PM', zh: '下午4点' },
  checkoutLabel: { ko: '체크아웃', en: 'Check-out', zh: '退房' },
  checkout: { ko: '오전 11시', en: '11:00 AM', zh: '上午11点' },
} satisfies Record<string, LocaleText>;
