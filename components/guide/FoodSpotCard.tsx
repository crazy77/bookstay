import type { ReactNode } from 'react';

function MapPinLink({ mapQuery }: { mapQuery: string }) {
  return (
    <a
      className="place-link"
      href={`https://map.kakao.com/?q=${encodeURIComponent(mapQuery)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${mapQuery} · 카카오맵`}
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
      </svg>
    </a>
  );
}

export type FoodSpotData = {
  mapQuery: string;
  name: string;
  walk: string;
  walkClass?: string;
  desc: ReactNode;
  addr?: string;
};

export function FoodSpotCard({ spot }: { spot: FoodSpotData }) {
  return (
    <article className="food-spot" data-place={spot.mapQuery}>
      <header className="food-spot-head">
        <h4 className="food-spot-name">{spot.name}</h4>
        <div className="food-spot-meta">
          <span
            className={`food-walk${spot.walkClass ? ` ${spot.walkClass}` : ''}`}
          >
            {spot.walk}
          </span>
          <MapPinLink mapQuery={spot.mapQuery} />
        </div>
      </header>
      <p className="food-desc">{spot.desc}</p>
      {spot.addr ? <p className="food-addr">{spot.addr}</p> : null}
    </article>
  );
}
