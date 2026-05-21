'use client';

import Image from 'next/image';
import { useState } from 'react';
import { HOME_HERO_IMAGE } from '@/data/home';
import { cn } from '@/lib/cn';

type HomeHeroPhotoProps = {
  onPhotoReady?: (ready: boolean) => void;
};

export function HomeHeroPhoto({ onPhotoReady }: HomeHeroPhotoProps) {
  const [hasImage, setHasImage] = useState(false);

  const setReady = (ready: boolean) => {
    setHasImage(ready);
    onPhotoReady?.(ready);
  };

  return (
    <figure
      className={cn(
        'relative mx-auto mt-6 aspect-3/2 w-full max-w-lg overflow-hidden rounded-sm bg-surface',
        hasImage && 'mt-5',
      )}
    >
      {!hasImage && (
        <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-1 border border-dashed border-border bg-gradient-to-br from-surface to-canvas font-serif-ko">
          <span className="text-[0.95rem] tracking-[0.12em] text-ink-secondary">
            대표 사진
          </span>
          <span className="font-sans text-[0.72rem] tracking-wide text-ink-muted">
            public/assets/hero.jpg
          </span>
        </div>
      )}
      <Image
        src={HOME_HERO_IMAGE}
        alt="해묘서가"
        fill
        sizes="(max-width: 640px) 100vw, 32rem"
        className="object-cover"
        style={{ opacity: hasImage ? 1 : 0 }}
        onLoad={() => setReady(true)}
        onError={() => setReady(false)}
        priority
      />
    </figure>
  );
}
