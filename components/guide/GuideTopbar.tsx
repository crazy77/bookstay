'use client';

import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { LangToggle } from '@/components/ui/LangToggle';
import { ThemePicker } from '@/components/ui/ThemePicker';
import { GUIDE_NAV } from '@/data/guide-i18n';

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export function GuideTopbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" href="/">
          <span className="brand-ko">해묘서가</span>
          <span className="brand-en">BOOKSTAY</span>
        </Link>

        <nav
          className="anchor-nav anchor-nav--desktop"
          aria-label="섹션 이동"
        >
          {GUIDE_NAV.map(({ href, label }) => (
            <a key={href} href={href} className="toggle">
              <span lang="ko">{label.ko}</span>
              <span lang="en">{label.en}</span>
              <span lang="zh">{label.zh}</span>
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <ThemePicker />
          <LangToggle />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? '메뉴 닫기' : '섹션 메뉴'}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        className="anchor-nav anchor-nav--mobile"
        aria-label="섹션 이동"
        hidden={!open}
      >
        {GUIDE_NAV.map(({ href, label }) => (
          <a key={href} href={href} className="toggle" onClick={() => setOpen(false)}>
            <span lang="ko">{label.ko}</span>
            <span lang="en">{label.en}</span>
            <span lang="zh">{label.zh}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
