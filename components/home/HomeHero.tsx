'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HomeBookCta } from '@/components/home/HomeBookCta';
import { HomeHeroPhoto } from '@/components/home/HomeHeroPhoto';
import { cn } from '@/lib/cn';
import { Logo } from '@/components/ui/Logo';
import type { HomeHeroSlide } from '@/data/home';
import type { LocaleText } from '@/lib/locale';

export function HomeHero({
  siteNameLine,
  guideLink,
  naverBookUrl,
  heroSlides,
}: {
  siteNameLine: LocaleText;
  guideLink: string;
  naverBookUrl: string;
  heroSlides: HomeHeroSlide[];
}) {
  const [hasHeroPhoto, setHasHeroPhoto] = useState(false);

  return (
    <section className="mx-auto w-full max-w-xl text-center">
      <div
        className={cn(
          'home-logo flex w-full justify-center',
          hasHeroPhoto ? 'mb-2' : 'mb-3',
        )}
      >
        <Logo variant="home" />
      </div>

      <HomeHeroPhoto slides={heroSlides} onPhotoReady={setHasHeroPhoto} />

      <div className="mx-auto mt-5 max-w-md">
        {/* <h1 className="font-serif-ko text-lg font-medium leading-relaxed tracking-wide text-ink md:text-xl">
          {SITE_LEAD}
        </h1> */}
        <p className="mt-2 font-serif-ko text-sm tracking-widest text-ink-muted">
          {siteNameLine.ko}
        </p>
      </div>

      <div className="mx-auto mt-5 w-full max-w-xs">
        <HomeBookCta href={naverBookUrl} />
      </div>

      <p className="mt-4 font-serif-ko text-sm tracking-widest">
        <Link
          href="/guide"
          className="text-ink-secondary no-underline decoration-border-muted underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          {guideLink}
        </Link>
      </p>
    </section>
  );
}
