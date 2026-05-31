import Link from 'next/link';
import Image from 'next/image';
import { BlockHead, CardHead } from '@/components/ui/CardHead';
import {
  LocalizedLines,
  LocalizedList,
  LocalizedRichParagraphs,
  LocalizedRichList,
  LocalizedText,
} from '@/components/content/LocalizedContent';
import { CopyButton } from '@/components/ui/CopyButton';
import { Logo } from '@/components/ui/Logo';
import { Seagull } from '@/components/ui/Seagull';
import { FoodCatalogSpotCard } from '@/components/guide/FoodSpotCard';
import { MapFigure } from '@/components/guide/MapFigure';
import type { FoodCatalogCategory } from '@/data/food-catalog';
import { contentValue, type ContentMap, type RichLine } from '@/data/site-content';
import { KAKAO_CAR_URL, KAKAO_TRANSIT_URL } from '@/lib/site';

export function GuideContent({
  content,
  foodCategories,
}: {
  content: ContentMap;
  foodCategories: FoodCatalogCategory[];
}) {
  const heroTitle = contentValue<string>(content, 'guide.title.hero');
  const heroCopy = contentValue<string[]>(content, 'guide.heroCopy');
  const checkinTitle = contentValue<string>(content, 'guide.title.checkin');
  const checkinRules = contentValue<RichLine[] | string[]>(content, 'guide.checkinRules');
  const arrivalTitle = contentValue<string>(content, 'guide.title.arrival');
  const parkingTitle = contentValue<string>(content, 'guide.block.parking');
  const parkingText = contentValue<string>(content, 'guide.parkingText');
  const transitTitle = contentValue<string>(content, 'guide.block.transit');
  const transitRules = contentValue<RichLine[] | string[]>(content, 'guide.transitRules');
  const address = contentValue<RichLine[] | string[]>(content, 'guide.address');
  const routeTransit = contentValue<string>(content, 'guide.route.transit');
  const routeCar = contentValue<string>(content, 'guide.route.car');
  const routeMeta = contentValue<string>(content, 'guide.route.meta');
  const mapAlt = contentValue<string>(content, 'guide.mapAlt');
  const mapCaption = contentValue<string>(content, 'guide.mapCaption');
  const routeCallout = contentValue<RichLine[] | string[]>(content, 'guide.routeCallout');
  const libraryTitle = contentValue<string>(content, 'guide.title.library');
  const libraryParagraphs = contentValue<RichLine[] | string[]>(
    content,
    'guide.libraryParagraphs',
  );
  const roomTitle = contentValue<string>(content, 'guide.title.room');
  const roomRules = contentValue<RichLine[] | string[]>(content, 'guide.roomRules');
  const wifiTitle = contentValue<string>(content, 'guide.block.wifi');
  const wifiNetworkLabel = contentValue<string>(content, 'guide.wifi.networkLabel');
  const wifiSsid = contentValue<string>(content, 'guide.wifi.ssid').ko;
  const wifiPasswordLabel = contentValue<string>(content, 'guide.wifi.passwordLabel');
  const wifiPassword = contentValue<string>(content, 'guide.wifi.password').ko;
  const wifiCopyLabel = contentValue<string>(content, 'guide.wifi.copyLabel');
  const wifiNote = contentValue<string>(content, 'guide.wifi.note');
  const wifiQrUrl = makeWifiQrUrl(wifiSsid, wifiPassword);
  const speakerTitle = contentValue<string>(content, 'guide.block.speaker');
  const speakerSteps = contentValue<RichLine[] | string[]>(content, 'guide.speakerSteps');
  const speakerNotes = contentValue<string[]>(content, 'guide.speakerNotes');
  const foodTitle = contentValue<string>(content, 'guide.title.food');
  const foodIntro = contentValue<string>(content, 'guide.foodIntro');
  const foodNote = contentValue<string>(content, 'guide.foodNote');

  return (
    <main id="top">
      <section className="hero">
        <div className="hero-logo">
          <Logo />
        </div>
        <h1 className="hero-title toggle">
          <span lang="ko">{heroTitle.ko}</span>
          <span lang="en">{heroTitle.en}</span>
          <span lang="zh">{heroTitle.zh}</span>
        </h1>
        <LocalizedLines value={heroCopy} className="hero-copy" />
        <Seagull />
      </section>

      <section id="checkin" className="card">
        <CardHead title={checkinTitle} />
        <div className="block-body toggle">
          <LocalizedRichList value={checkinRules} />
        </div>
      </section>

      <section id="arrival" className="card">
        <CardHead title={arrivalTitle} />
        <div className="card-block">
          <BlockHead title={parkingTitle} />
          <div className="block-body toggle">
            <LocalizedText value={parkingText} as="p" />
          </div>
        </div>
        <div className="card-block">
          <BlockHead title={transitTitle} />
          <LocalizedRichList value={transitRules} className="block-list" />
        </div>
        <div className="address toggle">
          <LocalizedRichParagraphs value={address} />
        </div>
        <div className="route-buttons">
          <a
            className="route-btn toggle"
            href={KAKAO_TRANSIT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span lang="en" className="route-btn-label">
              {routeTransit.en}
            </span>
            <span lang="ko" className="route-btn-label">
              {routeTransit.ko}
            </span>
            <span lang="zh" className="route-btn-label">
              {routeTransit.zh}
            </span>
            <span className="route-btn-meta toggle">
              <span lang="ko">{routeMeta.ko}</span>
              <span lang="en">{routeMeta.en}</span>
              <span lang="zh">{routeMeta.zh}</span>
            </span>
          </a>
          <a
            className="route-btn toggle"
            href={KAKAO_CAR_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span lang="en" className="route-btn-label">
              {routeCar.en}
            </span>
            <span lang="ko" className="route-btn-label">
              {routeCar.ko}
            </span>
            <span lang="zh" className="route-btn-label">
              {routeCar.zh}
            </span>
            <span className="route-btn-meta toggle">
              <span lang="ko">{routeMeta.ko}</span>
              <span lang="en">{routeMeta.en}</span>
              <span lang="zh">{routeMeta.zh}</span>
            </span>
          </a>
        </div>
        <MapFigure alt={mapAlt} caption={mapCaption} />
        <div className="callout toggle">
          <LocalizedRichParagraphs value={routeCallout} />
        </div>
      </section>

      <section id="library" className="card">
        <CardHead title={libraryTitle} />
        <div className="block-body toggle">
          <LocalizedRichList value={libraryParagraphs} />
        </div>
      </section>

      <section id="room" className="card">
        <CardHead title={roomTitle} />
        <div className="card-block">
          <div className="block-body toggle">
            <LocalizedRichList value={roomRules} />
          </div>
        </div>

        <div className="card-block" id="wifi">
          <BlockHead title={wifiTitle} />
          <div className="wifi-grid">
            <div className="wifi-main">
              <dl>
                <dt className="toggle">
                  <span lang="ko">{wifiNetworkLabel.ko}</span>
                  <span lang="en">{wifiNetworkLabel.en}</span>
                  <span lang="zh">{wifiNetworkLabel.zh}</span>
                </dt>
                <dd>
                  <code>{wifiSsid}</code>
                </dd>
                <dt className="toggle">
                  <span lang="ko">{wifiPasswordLabel.ko}</span>
                  <span lang="en">{wifiPasswordLabel.en}</span>
                  <span lang="zh">{wifiPasswordLabel.zh}</span>
                </dt>
                <dd className="wifi-password">
                  <code>{wifiPassword}</code>
                  <CopyButton text={wifiPassword} labels={wifiCopyLabel} />
                </dd>
              </dl>
              <p className="wifi-note toggle">
                <span lang="ko">{wifiNote.ko}</span>
                <span lang="en">{wifiNote.en}</span>
                <span lang="zh">{wifiNote.zh}</span>
              </p>
            </div>
            <div className="wifi-qr">
              <Image
                src={wifiQrUrl}
                alt="WiFi QR"
                width={88}
                height={88}
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="card-block" id="speaker">
          <BlockHead title={speakerTitle} />
          <LocalizedRichList value={speakerSteps} ordered className="block-list" />
          <div className="callout speaker-notes toggle">
            <LocalizedList value={speakerNotes} />
          </div>
        </div>
      </section>

      <section id="food" className="card food-guide">
        <CardHead title={foodTitle} />
        <p className="food-intro toggle">
          <span lang="ko">{foodIntro.ko}</span>
          <span lang="en">{foodIntro.en}</span>
          <span lang="zh">{foodIntro.zh}</span>
        </p>
        {foodCategories.map((cat) => (
          <div
            key={cat.title.ko}
            className={`food-category${cat.drive ? ' food-category--drive' : ''}`}
          >
            <h3 className="food-cat-head toggle">
              <span lang="ko">{cat.title.ko}</span>
              <span lang="en">{cat.title.en}</span>
              <span lang="zh">{cat.title.zh}</span>
            </h3>
            {cat.note ? (
              <p className="food-cat-note toggle">
                <span lang="ko">{cat.note.ko}</span>
                <span lang="en">{cat.note.en}</span>
                <span lang="zh">{cat.note.zh}</span>
              </p>
            ) : null}
            {cat.spots.map((spot) => (
              <FoodCatalogSpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        ))}
        <p className="food-note toggle">
          <span lang="ko">{foodNote.ko}</span>
          <span lang="en">{foodNote.en}</span>
          <span lang="zh">{foodNote.zh}</span>
        </p>
      </section>
    </main>
  );
}

function makeWifiQrUrl(ssid: string, password: string) {
  const data = encodeURIComponent(`WIFI:T:WPA;S:${ssid};P:${password};;`);
  return `https://api.qrserver.com/v1/create-qr-code/?data=${data}&size=300x300&margin=10`;
}
