import { HomeHero } from '@/components/home/HomeHero';
import { contentValue, type ContentMap, type ImageListItem } from '@/data/site-content';
import type { HomeHeroSlide } from '@/data/home';
import { INSTAGRAM_DM_URL } from '@/lib/site';

export function HomePage({ content }: { content: ContentMap }) {
  const siteNameLine = contentValue<string>(content, 'home.siteNameLine');
  const guideLink = contentValue<string>(content, 'home.guideLink');
  const naverBookUrl = contentValue<string>(content, 'home.naverBookUrl');
  const heroSlides = getHomeHeroSlides(content);

  return (
    <main className="flex flex-1 items-start justify-center px-5 pt-7 pb-6 md:items-center md:px-6 md:py-12">
      <HomeHero
        siteNameLine={siteNameLine}
        guideLink={guideLink.ko}
        naverBookUrl={naverBookUrl.ko}
        heroSlides={heroSlides}
      />
    </main>
  );
}

function getHomeHeroSlides(content: ContentMap): HomeHeroSlide[] {
  const slides = contentValue<ImageListItem[]>(content, 'home.heroSlides').ko;
  if (!Array.isArray(slides)) return [];

  return slides
    .map((slide) => ({
      src: String(slide.src ?? '').trim(),
      caption: String(slide.caption ?? ''),
    }))
    .filter((slide) => slide.src);
}

export function HomeFooter({ content }: { content: ContentMap }) {
  const businessNumber = contentValue<string>(content, 'home.footerBusinessNumber');

  return (
    <footer className="border-t border-border-muted px-6 py-9 pb-12 text-center font-sans">
      <div className="mx-auto max-w-xl">
        <div className="mb-4 flex flex-col gap-1">
          <span className="font-serif-ko text-[1.05rem] font-medium tracking-widest text-ink">
            해묘서가
          </span>
          <span className="font-serif-en text-[0.7rem] italic tracking-[0.2em] text-ink-secondary">
            BOOKSTAY · HALLIM, JEJU
          </span>
        </div>
        <p className="mb-3 text-[0.78rem] tracking-wide">
          <a
            href={INSTAGRAM_DM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif-ko text-[0.82rem] tracking-widest text-ink-muted underline decoration-border-muted underline-offset-[3px] transition-colors hover:text-ink-secondary hover:decoration-ink-secondary"
          >
            @bookstay_haemyo DM
          </a>
        </p>
        <p className="m-0 text-[0.76rem] leading-loose tracking-wide text-ink-muted">
          {businessNumber.ko}
        </p>
      </div>
    </footer>
  );
}
