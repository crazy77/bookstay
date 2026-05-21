'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { HOME_HERO_SLIDES } from '@/data/home';
import { cn } from '@/lib/cn';

const ROTATE_MS = 5000;

type HomeHeroPhotoProps = {
  onPhotoReady?: (ready: boolean) => void;
};

export function HomeHeroPhoto({ onPhotoReady }: HomeHeroPhotoProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set());
  const hasImage = loaded.size > 0;
  const slideCount = HOME_HERO_SLIDES.length;

  const notifyReady = useCallback(
    (ready: boolean) => {
      onPhotoReady?.(ready);
    },
    [onPhotoReady],
  );

  useEffect(() => {
    notifyReady(hasImage);
  }, [hasImage, notifyReady]);

  useEffect(() => {
    if (!hasImage || slideCount < 2) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slideCount);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [hasImage, slideCount]);

  const markLoaded = (index: number) => {
    setLoaded((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const markFailed = (index: number) => {
    setLoaded((prev) => {
      if (!prev.has(index)) return prev;
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  const active = HOME_HERO_SLIDES[activeIndex];

  return (
    <figure
      className={cn(
        'home-hero-photo mx-auto max-w-lg',
        hasImage ? 'mb-1 mt-3' : 'mt-4',
      )}
      aria-roledescription="carousel"
      aria-label="해묘서가 대표 사진"
    >
      <div className="home-hero-photo__frame">
        <span className="home-hero-photo__corner home-hero-photo__corner--tr" aria-hidden />
        <span className="home-hero-photo__corner home-hero-photo__corner--bl" aria-hidden />

        <div className="home-hero-photo__media relative aspect-3/2 w-full overflow-hidden">
          {!hasImage && (
            <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-1 border border-dashed border-border bg-gradient-to-br from-surface to-canvas font-serif-ko">
              <span className="text-[0.95rem] tracking-[0.12em] text-ink-secondary">
                대표 사진
              </span>
              <span className="font-sans text-[0.72rem] tracking-wide text-ink-muted">
                public/assets/hero.png
              </span>
            </div>
          )}

          {HOME_HERO_SLIDES.map((slide, index) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 640px) 100vw, 32rem"
              className={cn(
                'home-hero-photo__slide object-cover transition-opacity duration-700 ease-in-out',
                index === activeIndex && hasImage ? 'opacity-100' : 'opacity-0',
              )}
              style={{ objectPosition: slide.objectPosition }}
              onLoad={() => markLoaded(index)}
              onError={() => markFailed(index)}
              priority={index === 0}
            />
          ))}
        </div>

        {hasImage ? (
          <figcaption
            className="home-hero-photo__caption"
            aria-live="polite"
            aria-atomic="true"
          >
            {active.caption}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}
