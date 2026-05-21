'use client';

import { useState } from 'react';
import { MAP_CAPTION } from '@/data/guide-i18n';

export function MapFigure() {
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
          alt="대림1길 골목 진입 상세도"
          onError={() => setMissing(true)}
        />
      </picture>
      <figcaption className="toggle">
        <span lang="ko">{MAP_CAPTION.ko}</span>
        <span lang="en">{MAP_CAPTION.en}</span>
        <span lang="zh">{MAP_CAPTION.zh}</span>
      </figcaption>
    </figure>
  );
}
