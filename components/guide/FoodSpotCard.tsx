import Image from 'next/image';
import type { ReactNode } from 'react';
import { FOOD_SPOT_PHOTOS, type FoodSpotPhotoSlug } from '@/data/food-spot-photos';
import type { LocaleText } from '@/lib/locale';
import { foodSpotSlug } from '@/lib/food-spot-slug';

function MapPinLink({ mapQuery }: { mapQuery: string }) {
  return (
    <a
      className="place-link"
      href={`https://map.kakao.com/?q=${encodeURIComponent(mapQuery)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${mapQuery} · Kakao Map`}
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
  name: LocaleText;
  walk: LocaleText;
  walkClass?: string;
  desc: LocaleText<ReactNode>;
  addr?: LocaleText;
};

export function FoodSpotCard({ spot }: { spot: FoodSpotData }) {
  const slug = foodSpotSlug(spot.mapQuery);
  const photo =
    slug && slug in FOOD_SPOT_PHOTOS
      ? FOOD_SPOT_PHOTOS[slug as FoodSpotPhotoSlug]
      : undefined;

  return (
    <article className="food-spot" data-place={spot.mapQuery}>
      <header className="food-spot-head">
        <h4 className="food-spot-name toggle">
          <span lang="ko">{spot.name.ko}</span>
          <span lang="en">{spot.name.en}</span>
          <span lang="zh">{spot.name.zh}</span>
        </h4>
        <div className="food-spot-meta">
          <span
            className={`food-walk toggle${spot.walkClass ? ` ${spot.walkClass}` : ''}`}
          >
            <span lang="ko">{spot.walk.ko}</span>
            <span lang="en">{spot.walk.en}</span>
            <span lang="zh">{spot.walk.zh}</span>
          </span>
          <MapPinLink mapQuery={spot.mapQuery} />
        </div>
      </header>
      <div className={`food-spot-body${photo ? ' food-spot-body--with-photo' : ''}`}>
        {photo ? (
          <figure className="food-spot-photo">
            <Image
              src={photo.src}
              alt={spot.name.ko}
              width={112}
              height={112}
              sizes="112px"
              className="food-spot-photo__img"
            />
          </figure>
        ) : null}
        <div className="food-spot-text">
          <div className="food-desc toggle">
            <div lang="ko">{spot.desc.ko}</div>
            <div lang="en">{spot.desc.en}</div>
            <div lang="zh">{spot.desc.zh}</div>
          </div>
          {spot.addr ? (
            <p className="food-addr toggle">
              <span lang="ko">{spot.addr.ko}</span>
              <span lang="en">{spot.addr.en}</span>
              <span lang="zh">{spot.addr.zh}</span>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
