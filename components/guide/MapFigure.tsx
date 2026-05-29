'use client';

import { useState } from 'react';
import type { LocaleText } from '@/lib/locale';

export function MapFigure({
  alt,
  caption,
}: {
  alt: LocaleText;
  caption: LocaleText;
}) {
  const [missing, setMissing] = useState(false);

  return (
    <figure className={`map-figure single-map${missing ? ' map-missing' : ''}`}>
      <picture>
        <source
          media="(max-width: 600px)"
          srcSet="/assets/map-detail-mobile.png"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/map-detail.png"
          alt={alt.ko}
          onError={() => setMissing(true)}
        />
      </picture>
      <figcaption className="toggle">
        <span lang="ko">{caption.ko}</span>
        <span lang="en">{caption.en}</span>
        <span lang="zh">{caption.zh}</span>
      </figcaption>
    </figure>
  );
}
