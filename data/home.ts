export type HomeHeroSlide = {
  src: string;
  caption: string;
};

/** 홈 대표 사진 슬라이드 — CMS가 없을 때 사용하는 기본값 */
export const HOME_HERO_SLIDES: HomeHeroSlide[] = [
  {
    src: '/assets/hero.png',
    caption: '해묘서가 침실',
  },
  {
    src: '/assets/hero2.png',
    caption: '해묘서가 창문 정원',
  },
] as const;
