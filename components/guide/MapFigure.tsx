'use client';

import { useState } from 'react';

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
        <span lang="ko">골목 진입 상세 — 대림1길 1-1</span>
        <span lang="en">Alley detail · Daerim 1-gil 1-1</span>
      </figcaption>
    </figure>
  );
}
