'use client';

import Link from 'next/link';
import { ThemePicker } from '@/components/ui/ThemePicker';

/** 홈 — 테마 미리보기용 얇은 헤더 (결정 후 제거 가능) */
export function HomeTopbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" href="/">
          <span className="brand-ko">해묘서가</span>
          <span className="brand-en">BOOKSTAY</span>
        </Link>
        <div className="topbar-actions">
          <ThemePicker />
        </div>
      </div>
    </header>
  );
}
