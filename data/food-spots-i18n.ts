import type { LocaleText } from '@/lib/locale';

/** 도보·차량 거리 라벨 */
export function walkMin(minutes: number, far = false): LocaleText {
  return far
    ? {
        ko: `도보 ${minutes}분 · 택시 권장`,
        en: `${minutes} min walk · taxi recommended`,
        zh: `步行 ${minutes} 分钟 · 建议打车`,
      }
    : {
        ko: `도보 ${minutes}분`,
        en: `${minutes} min walk`,
        zh: `步行 ${minutes} 分钟`,
      };
}

export const WALK_DRIVE: LocaleText = {
  ko: '차량 이동',
  en: 'By car',
  zh: '需驾车',
};

export const FOOD_INTRO: LocaleText = {
  ko: '해묘서가는 읍내 중심가에 가까워 도보로 로컬 맛집 탐방이 가능합니다. 해묘서가에 머무시는 동안 이 리스트를 참조해서 맛있는 여행을 떠나 보세요.',
  en: 'Haemyo is close to the town center, so you can explore local spots on foot. While you stay with us, use this list for a tasty little trip around the neighborhood.',
  zh: '海猫书斋靠近邑内中心，步行即可探访本地小店。入住期间不妨按这份清单，来一趟轻松的美食小旅行。',
};

export const FOOD_NOTE: LocaleText = {
  ko: '※ 영업시간·휴무일·메뉴는 변동될 수 있으니 방문 전에 확인해 주세요.',
  en: '※ Hours, closed days, and menus may change — please confirm before you visit.',
  zh: '※ 营业时间、休息日及菜单可能变动，前往前请先确认。',
};

export const FOOD_DRIVE_NOTE: LocaleText = {
  ko: '해묘서가에서 걸어갈 수 있는 곳은 아니지만 꼭 추천해 드리고 싶은 곳이 있어요.',
  en: 'These are not within walking distance from Haemyo, but we still wanted to share them.',
  zh: '以下地点无法从书斋步行到达，但我们仍想向您推荐。',
};
