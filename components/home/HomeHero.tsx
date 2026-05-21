'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HomeBookCta } from '@/components/home/HomeBookCta';
import { HomeHeroPhoto } from '@/components/home/HomeHeroPhoto';
import { Seagull } from '@/components/ui/Seagull';
import { cn } from '@/lib/cn';
import { SITE_LEAD, SITE_NAME_LINE } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';

export function HomeHero() {
  const [hasHeroPhoto, setHasHeroPhoto] = useState(false);

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-xl text-center',
        hasHeroPhoto && '[&_.home-logo]:mb-2',
      )}
    >
      <div className="home-logo mb-3 flex w-full justify-center">
        <Logo variant="home" />
      </div>

      <div className="mx-auto max-w-md">
        <h1 className="font-serif-ko text-lg font-medium leading-relaxed tracking-wide text-ink md:text-xl">
          {SITE_LEAD}
        </h1>
        <p className="mt-2 font-serif-ko text-sm tracking-widest text-ink-muted">
          {SITE_NAME_LINE}
        </p>
      </div>

      <div className="mx-auto mt-5 w-full max-w-xs">
        <HomeBookCta />
      </div>

      <HomeHeroPhoto onPhotoReady={setHasHeroPhoto} />

      <p className="mt-4 font-serif-ko text-sm tracking-widest">
        <Link
          href="/guide"
          className="text-ink-secondary no-underline decoration-border-muted underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          이용 안내
        </Link>
      </p>

      <Seagull className="mt-8" />
    </section>
  );
}
