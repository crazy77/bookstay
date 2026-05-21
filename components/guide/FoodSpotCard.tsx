'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const PIN_SVG =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>';

export type FoodSpotData = {
  mapQuery: string;
  name: string;
  walk: string;
  walkClass?: string;
  desc: ReactNode;
  addr?: string;
};

export function FoodSpotCard({ spot }: { spot: FoodSpotData }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.querySelector('.place-link')) return;

    const link = document.createElement('a');
    link.href =
      'https://map.kakao.com/?q=' + encodeURIComponent(spot.mapQuery);
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'place-link';
    link.setAttribute('aria-label', spot.mapQuery + ' · 카카오맵');
    link.innerHTML = PIN_SVG;
    el.appendChild(link);
  }, [spot.mapQuery]);

  return (
    <article ref={ref} className="food-spot" data-place={spot.mapQuery}>
      <header className="food-spot-head">
        <h4 className="food-spot-name">{spot.name}</h4>
        <span className={`food-walk${spot.walkClass ? ` ${spot.walkClass}` : ''}`}>
          {spot.walk}
        </span>
      </header>
      <p className="food-desc">{spot.desc}</p>
      {spot.addr ? <p className="food-addr">{spot.addr}</p> : null}
    </article>
  );
}
