/** mapQuery → public/assets/food/{slug}.webp 파일명 */
export const FOOD_SPOT_SLUGS: Record<string, string> = {
  '제주 한림 마이크로 하비타트': 'micro-habitat',
  '제주 한림 여러분 제과점': 'yeoreobun-bakery',
  '제주 한림 희도 카페': 'heedo',
  '제주 한림 등대 아구찜': 'deungdae-agujjim',
  '제주 한림칼국수': 'hallim-kalguksu',
  '제주 한림쥐치전문점': 'hallim-jwichi',
  '제주 한림 사형제 횟집': 'sahyungje',
  '제주 한림 수협': 'hallim-suhyup',
  '제주 한림 보영 중국집': 'boyoung',
  '제주 한림 산지해장국': 'sanji-haejangguk',
  '제주 한림 이서순대국밥': 'iseo-sundae',
  '제주 한림 보리밥': 'boribap',
  '제주 한림 한라축산정육식당': 'halla-butcher',
  '제주 한림 영림흑돼지가든': 'yeongrim-pork',
  '제주 한림 쌍둥이 국수': 'ssangdungi-guksu',
  '제주 한림 비타민 국수': 'vitamin-guksu',
  '제주 한림 오늘도 치킨과 맥주가 좋다': 'chicken-beer-today',
  '제주 한림 중독불닭': 'jungdok-chicken',
  '제주 한림 남문숯불바베큐 치킨': 'nammon-bbq',
  '제주 애월 부아르 와인상점': 'buar-wine',
  '제주 한림 기영상회': 'giyeong-bottle',
};

export function foodSpotSlug(mapQuery: string): string | undefined {
  return FOOD_SPOT_SLUGS[mapQuery];
}
