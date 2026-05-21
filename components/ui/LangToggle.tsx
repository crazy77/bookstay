'use client';

import { useLang } from '@/providers/LangProvider';

export function LangToggle() {
  const { toggle } = useLang();

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggle}
      aria-label="언어 전환"
    >
      <span className="lang-opt" data-lang-ko>
        EN
      </span>
      <span className="lang-opt" data-lang-en>
        한국어
      </span>
    </button>
  );
}
