'use client';

import type { ReactNode } from 'react';

type AdminHeaderProps = {
  title: string;
  status: string;
  active: 'content' | 'food';
  primaryLabel: string;
  primaryDisabled?: boolean;
  onPrimary: () => void;
  menuItems: ReactNode;
  children: ReactNode;
};

export function AdminHeader({
  title,
  status,
  active,
  primaryLabel,
  primaryDisabled,
  onPrimary,
  menuItems,
  children,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#d8d0c1] bg-[#f7f3ea]/95 px-3 py-2 backdrop-blur md:px-5 md:py-3">
      <div className="mx-auto flex max-w-7xl flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-semibold md:text-xl">{title}</h1>
              <span className="hidden text-xs uppercase tracking-[0.18em] text-[#746c60] md:inline">
                bookstay admin
              </span>
            </div>
            <p className="truncate text-[0.72rem] text-[#746c60] md:text-xs">{status}</p>
          </div>

          <nav className="flex shrink-0 rounded-md border border-[#bdb3a2] bg-white p-0.5">
            <a
              className={`rounded px-2.5 py-1.5 text-xs md:text-sm ${
                active === 'content' ? 'bg-[#2f4f46] text-white' : 'text-[#4b443b]'
              }`}
              href="/admin/content"
            >
              문구
            </a>
            <a
              className={`rounded px-2.5 py-1.5 text-xs md:text-sm ${
                active === 'food' ? 'bg-[#2f4f46] text-white' : 'text-[#4b443b]'
              }`}
              href="/admin/food"
            >
              맛집
            </a>
          </nav>

          <button
            className="shrink-0 rounded-md bg-[#2f4f46] px-3 py-2 text-xs font-medium text-white disabled:opacity-50 md:text-sm"
            type="button"
            onClick={onPrimary}
            disabled={primaryDisabled}
          >
            {primaryLabel}
          </button>

          <details className="relative shrink-0">
            <summary
              aria-label="더보기"
              className="list-none rounded-md border border-[#bdb3a2] bg-white px-2.5 py-2 text-sm marker:hidden"
            >
              ⋯
            </summary>
            <div className="absolute right-0 mt-2 flex min-w-40 flex-col gap-1 rounded-md border border-[#d8d0c1] bg-white p-2 shadow-lg">
              {menuItems}
            </div>
          </details>
        </div>

        <div className="rounded-md border border-[#d8d0c1] bg-white p-2">{children}</div>
      </div>
    </header>
  );
}

export function AdminMenuButton({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className="rounded px-3 py-2 text-left text-sm hover:bg-[#f1eadf] disabled:opacity-50"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
