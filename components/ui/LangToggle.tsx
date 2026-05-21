'use client';

import { useLang } from '@/providers/LangProvider';

/** 다음 전환 언어 라벨 (ko → EN → 中 → 한) */
const NEXT_LABEL = {
  ko: 'EN',
  en: '中',
  zh: '한',
} as const;

export function LangToggle() {
  const { lang, toggle } = useLang();

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggle}
      aria-label="언어 전환"
    >
      {NEXT_LABEL[lang]}
    </button>
  );
}
