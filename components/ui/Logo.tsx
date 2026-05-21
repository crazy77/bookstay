'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

type LogoProps = {
  /** guide: 히어로 박스 안 · home: 워드마크 */
  variant?: 'guide' | 'home';
  className?: string;
};

const variantClass: Record<NonNullable<LogoProps['variant']>, string> = {
  guide: 'size-full object-contain',
  home: 'h-auto w-[6.5rem]',
};

export function Logo({ variant = 'guide', className }: LogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="font-serif-ko text-2xl tracking-[0.15em] text-ink">
        해묘서가
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn('site-logo block', variantClass[variant], className)}
      src="/assets/logo.png"
      alt="해묘서가 BOOKSTAY"
      onError={() => setFailed(true)}
    />
  );
}
