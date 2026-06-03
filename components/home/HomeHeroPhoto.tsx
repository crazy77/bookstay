'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { HomeHeroSlide } from '@/data/home';
import { cn } from '@/lib/cn';

const ROTATE_MS = 5000;
const SWIPE_THRESHOLD_PX = 48;

type HomeHeroPhotoProps = {
  slides: HomeHeroSlide[];
  onPhotoReady?: (ready: boolean) => void;
};

export function HomeHeroPhoto({ slides, onPhotoReady }: HomeHeroPhotoProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set());
  const pointerStartX = useRef<number | null>(null);
  const hasImage = loaded.size > 0;
  const slideCount = slides.length;
  const canNavigate = slideCount > 1;

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

  useEffect(() => {
    setActiveIndex((index) => (slideCount ? Math.min(index, slideCount - 1) : 0));
  }, [slideCount]);

  const showPrevious = useCallback(() => {
    if (!canNavigate) return;
    setActiveIndex((index) => (index - 1 + slideCount) % slideCount);
  }, [canNavigate, slideCount]);

  const showNext = useCallback(() => {
    if (!canNavigate) return;
    setActiveIndex((index) => (index + 1) % slideCount);
  }, [canNavigate, slideCount]);

  const handleTouchEnd = (clientX: number) => {
    const startX = pointerStartX.current;
    pointerStartX.current = null;
    if (startX === null || !canNavigate) return;

    const distance = clientX - startX;
    if (Math.abs(distance) < SWIPE_THRESHOLD_PX) return;
    if (distance > 0) {
      showPrevious();
    } else {
      showNext();
    }
  };

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

  const active = slides[activeIndex];
  const activeCaption = active?.caption?.trim();

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

        <div
          className="home-hero-photo__media relative aspect-3/2 w-full touch-pan-y overflow-hidden"
          onPointerDown={(event) => {
            if (event.pointerType === 'mouse') return;
            pointerStartX.current = event.clientX;
          }}
          onPointerUp={(event) => {
            if (event.pointerType === 'mouse') return;
            handleTouchEnd(event.clientX);
          }}
          onPointerCancel={() => {
            pointerStartX.current = null;
          }}
        >
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

          {slides.map((slide, index) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.caption?.trim() || `해묘서가 대표 사진 ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 32rem"
              className={cn(
                'home-hero-photo__slide object-cover transition-opacity duration-700 ease-in-out',
                index === activeIndex && hasImage ? 'opacity-100' : 'opacity-0',
              )}
              style={{ objectPosition: '50% 50%' }}
              onLoad={() => markLoaded(index)}
              onError={() => markFailed(index)}
              priority={index === 0}
            />
          ))}

          {hasImage && canNavigate ? (
            <>
              <button
                className="home-hero-photo__nav home-hero-photo__nav--prev"
                type="button"
                aria-label="이전 대표 사진"
                onClick={showPrevious}
              >
                ‹
              </button>
              <button
                className="home-hero-photo__nav home-hero-photo__nav--next"
                type="button"
                aria-label="다음 대표 사진"
                onClick={showNext}
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        {hasImage && activeCaption ? (
          <figcaption
            className="home-hero-photo__caption"
            aria-live="polite"
            aria-atomic="true"
          >
            {activeCaption}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}
