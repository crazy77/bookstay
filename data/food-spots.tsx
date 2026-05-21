import type { FoodSpotData } from '@/components/guide/FoodSpotCard';
import {
  FOOD_DRIVE_NOTE,
  walkMin,
  WALK_DRIVE,
} from '@/data/food-spots-i18n';
import { FOOD_CAT_TITLE_ZH, FOOD_SPOT_ZH } from '@/data/food-spots.zh';
import type { LocaleText } from '@/lib/locale';

export type FoodCategory = {
  title: LocaleText;
  note?: LocaleText;
  drive?: boolean;
  spots: FoodSpotData[];
};

const addr = (line: string): LocaleText => ({ ko: line, en: line, zh: line });

type FoodCategoryRaw = {
  title: { ko: string; en: string };
  note?: LocaleText;
  drive?: boolean;
  spots: Array<
    Omit<FoodSpotData, 'name' | 'desc'> & {
      name: { ko: string; en: string };
      desc: { ko: FoodSpotData['desc']['ko']; en: FoodSpotData['desc']['en'] };
    }
  >;
};

function withZh(category: FoodCategoryRaw): FoodCategory {
  return {
    ...category,
    title: {
      ...category.title,
      zh: FOOD_CAT_TITLE_ZH[category.title.ko as keyof typeof FOOD_CAT_TITLE_ZH],
    },
    spots: category.spots.map((spot) => {
      const zh = FOOD_SPOT_ZH[spot.mapQuery as keyof typeof FOOD_SPOT_ZH];
      return {
        ...spot,
        name: { ...spot.name, zh: zh.name },
        desc: { ...spot.desc, zh: zh.desc },
      };
    }),
  };
}

const FOOD_CATEGORIES_RAW: FoodCategoryRaw[] = [
  {
    title: { ko: '카페 / 베이커리', en: 'Cafés & bakeries' },
    spots: [
      {
        mapQuery: '제주 한림 마이크로 하비타트',
        name: { ko: '마이크로 하비타트', en: 'Micro Habitat' },
        walk: walkMin(2),
        desc: {
          ko: '최근 한림에서 가장 뜨거운 핫플 카페. 커피 맛도 일품이지만 직접 만든 디저트가 아주 맛있어요. 오전 8시에 문을 열기 때문에 아침에 방문해 조식을 드시기에도 좋습니다. 수제 잠봉 포카차 샌드위치에 향기로운 커피를 곁들이면 항구의 아침이 활짝 깨어 날 거예요.',
          en: 'The hottest new café in Hallim. Great coffee and house-made desserts. Opens at 8 am — nice for breakfast. A jamón focaccia sandwich and coffee by the harbor is a fine way to start the day.',
        },
        addr: addr('제주 제주시 한림읍 한수풀로 11 1층'),
      },
      {
        mapQuery: '제주 한림 여러분 제과점',
        name: { ko: '여러분 제과점', en: 'Yeoreobun Bakery' },
        walk: walkMin(4),
        desc: {
          ko: '크로플과 크루아상에 아메리카노를 곁들인 모닝 메뉴를 판매하는 아담한 제과점이에요. 각종 스콘과 에그타르트, 옛날식 사라다빵도 있습니다. 작은 시골 제과점의 귀엽고 활기찬 분위기가 참 좋아요.',
          en: 'A cozy bakery with morning sets — croffles, croissants, and americano. Scones, egg tarts, and old-style salad bread too. Small-town charm and a lively vibe.',
        },
        addr: addr('제주 제주시 한림읍 한림로 702 1층'),
      },
      {
        mapQuery: '제주 한림 희도 카페',
        name: { ko: '희도', en: 'Heedo' },
        walk: walkMin(7),
        desc: {
          ko: '한림 유일의 차 전문 카페입니다. 아늑하고 고풍스러운 인테리어가 마음을 편안하게 만들어주는 곳이에요. 주인장이 추천해 준 품질 좋은 차를 즐길 수 있고, 커피도 맛있습니다. 안에는 소품과 의류 코너도 있어서 구경하는 재미도 쏠쏠해요.',
          en: 'Hallim’s tea-focused café. Calm, classic interior. Fine teas chosen by the owner, plus good coffee. Gift and clothing corners worth browsing.',
        },
        addr: addr('제주 제주시 한림읍 한림로14길 3 초록대문'),
      },
    ],
  },
  {
    title: { ko: '음식점', en: 'Restaurants' },
    spots: [
      {
        mapQuery: '제주 한림 등대 아구찜',
        name: { ko: '등대 아구찜', en: 'Deungdae Agujjim' },
        walk: walkMin(10),
        desc: {
          ko: '제주 최고의(어쩌면 전국 최고의) 아구찜을 파는 곳. 손님이 올 때마다 항상 1순위로 데려가는 집이기도 해요. 등대 아구찜 때문에 제주를 다시 찾는 분들도 많을 만큼 맛 하나는 보장된 집입니다. 최근 매스컴을 타서 식사 시간에 가면 웨이팅하셔야 해요. 식사 시간을 피해서 방문하시길 권합니다.',
          en: 'Among the best agujjim (braised monkfish) on the island — a host favorite every time. Worth the hype; some guests return to Jeju just for this. Recently busy at peak meal hours — try off-peak times.',
        },
        addr: addr('제주 제주시 한림읍 한림해안로 145-2'),
      },
      {
        mapQuery: '제주 한림칼국수',
        name: { ko: '한림칼국수', en: 'Hallim Kalguksu' },
        walk: walkMin(10),
        desc: {
          ko: '등대 아구찜 옆에 있는 칼국수 맛집이에요. 보말칼국수가 유명한데 보말전도 아주 맛있어요. 바삭하게 구운 보말전에 싱그러운 제주 막걸리 한잔 걸치고 한림항을 산책하면 여행 온 기분이 물씬 풍길 거예요.',
          en: 'Next to Deungdae Agujjim. Known for abalone kalguksu; the abalone jeon (pancake) is excellent too. Crispy jeon, a glass of Jeju makgeolli, then a stroll by the port.',
        },
        addr: addr('제주 제주시 한림읍 한림해안로 141'),
      },
      {
        mapQuery: '제주 한림쥐치전문점',
        name: { ko: '한림쥐치전문점', en: 'Hallim Jwichi' },
        walk: walkMin(5),
        desc: {
          ko: '작지만 단단한 로컬 횟집이에요. 단촐하지만 깔끔한 밑반찬 맛이 좋고 선장님이 직접 잡은 자연산 회만 취급합니다. 이름은 쥐치 전문점이지만 쥐치 철이 아닐 때는 다른 생선을 먹을 수 있어요. 생선뼈를 우려낸 국물로 끓인 어미역 수제비도 꼭 맛보시길.',
          en: 'Small, solid local sashimi house. Simple room, clean banchan, wild-caught fish from the captain. Named for jwichi (pearlfish) but other fish off-season. Try the mom-guk sujebi in fish-bone broth.',
        },
        addr: addr('제주 제주시 한림읍 한림로 698'),
      },
      {
        mapQuery: '제주 한림 사형제 횟집',
        name: { ko: '사형제 횟집', en: 'Sahyungje Raw Fish' },
        walk: walkMin(10),
        desc: {
          ko: '회 자체보다 곁들여 나오는 스끼다시 먹는 재미가 더 크신 분께 당당하게 추천드릴 수 있는 집입니다. 정말 다양한 종류의 스끼다시가 폭격처럼 쏟아져서 정신을 차릴 수 없는 곳이에요.',
          en: 'If you love the side dishes as much as the fish, this is the place. An endless parade of banchan — almost overwhelming, in the best way.',
        },
        addr: addr('제주 제주시 한림읍 한림상로 273'),
      },
      {
        mapQuery: '제주 한림 수협',
        name: { ko: '한림 수협', en: 'Hallim Fisheries Co-op' },
        walk: walkMin(10),
        desc: {
          ko: '다른 거 다 필요 없고 싱싱한 회를 가성비 좋게 실컷 먹겠다! 하시는 분께서는 한림 수협을 방문해 보세요. 직접 골라 회를 뜰 수도 있고 여러 종류를 모아 떠놓은 모듬회를 구입할 수도 있습니다. 안에서 먹을 수 있지만 상차림비와 실내 분위기를 생각하면 포장해서 해묘서가에서 즐기시길 권합니다. 수협 안에는 마트도 있어서 이것저것 장보기 편리해요.',
          en: 'Fresh sashimi, good value — pick your fish or buy assorted platters. You can eat in, but we suggest takeout to enjoy at Haemyo (table charge and atmosphere). There’s a market inside for groceries.',
        },
        addr: addr('제주 제주시 한림읍 한림해안로 141-4'),
      },
      {
        mapQuery: '제주 한림 보영 중국집',
        name: { ko: '보영', en: 'Boyoung Chinese' },
        walk: walkMin(5),
        desc: {
          ko: '역사와 전통을 자랑하는 화상 중국집. 제주까지 와서 웬 중국집이야? 하실 수 있지만 아는 맛이 가장 무서운 법이잖아요. 간짬뽕이 특히 유명한데 간짜장과 고추짬뽕도 맛있어요. 요리도 훌륭합니다.',
          en: 'Old-school Chinese with real history. “Chinese food in Jeju?” — yes, and it’s good. Famous for gan jjamppong; gan jjajang and chili jjamppong are strong too.',
        },
        addr: addr('제주 제주시 한림읍 한림로 692-1'),
      },
      {
        mapQuery: '제주 한림 산지해장국',
        name: { ko: '산지해장국', en: 'Sanji Haejangguk' },
        walk: walkMin(10),
        desc: {
          ko: '제주에는 여러 해장국집이 있지만 산지해장국 특유의 푸짐한 내장탕은 그중에서도 손에 꼽힙니다. 제주의 해장국집은 거의 오후 3시면 문을 닫으니 즐기시려면 그 전에 가셔야 해요. (하지만 제가 제일 좋아하는 해장국집은 대춘해장국이에요. 공항에서 해묘서가 오는 길에 막내딸점이 있으니 렌트하셔서 오시는 분께서는 들러 보시길 권합니다.)',
          en: 'One of the heartiest hangover soups on the island. Most haejangguk places close around 3 pm — go before then. (Our personal favorite is Daechun Haejangguk — Maknaedal branch on the way from the airport if you’re driving.)',
        },
        addr: addr('제주 제주시 한림읍 한림로3길 8-9 1층'),
      },
      {
        mapQuery: '제주 한림 이서순대국밥',
        name: { ko: '이서순대국밥', en: 'Iseo Sundae' },
        walk: walkMin(5),
        desc: {
          ko: (
            <>
              직접 만든 피순대를 맛볼 수 있는 곳이에요. 제주의 전통 순대는 찹쌀순대인데 제
              개인적으로는 찹쌀순대보다 피순대가 더 부드럽고 풍미가 좋은 것 같아요. (참,
              피순대 맛집으로는 애월읍에 있는 <strong>부두식당</strong>도 아주
              괜찮습니다. 피순대 좋아하시면 애월 읍내 구경 나가신 김에 드셔 보세요.) 바로
              붙어 있는 한림매일시장 안에는 유명한 보람순대국밥과 풍년순대국밥이 있어요.
              하지만 위생 상태가 별로 좋지 않아 추천드리지는 못해요.
            </>
          ),
          en: (
            <>
              House-made blood sundae. Jeju tradition is glutinous-rice sundae; we prefer
              the softer, richer blood style. (Also try <strong>Budusikdang</strong> in
              Aewol if you’re out that way.) Inside Hallim Maeil Market nearby are Boram
              and Punggyeon sundae shops — we don’t recommend them for hygiene reasons.
            </>
          ),
        },
        addr: addr('제주 제주시 한림읍 한림해안로 162'),
      },
      {
        mapQuery: '제주 한림 보리밥',
        name: { ko: '보리밥', en: 'Boribap' },
        walk: walkMin(4),
        desc: {
          ko: '깔끔하고 정갈한 맛에 인기가 높은 집입니다. 몸과 마음이 모두 건강해지는 맛! 비양도로 가는 배를 탈 수 있는 선착장 바로 앞에 있으니 비양도 가실 분은 이곳에서 식사를 해결해도 좋습니다.',
          en: 'Clean, wholesome barley rice — popular for simple, comforting food. Right by the ferry pier to Biyangdo if you’re heading over.',
        },
        addr: addr('제주 제주시 한림읍 한림해안로 204 2층'),
      },
      {
        mapQuery: '제주 한림 한라축산정육식당',
        name: { ko: '한라축산정육식당', en: 'Halla Butcher & Grill' },
        walk: walkMin(20, true),
        walkClass: 'food-walk--far',
        desc: {
          ko: '한림읍에서 가장 질 좋고 신선한 고기를 먹을 수 있는 곳. 해묘서가에서는 도보 20분 거리라서 택시를 타고 다녀오시는 걸 추천드립니다. 정육점에서 고기를 사서 옆에 있는 식당에서 구워 먹는 시스템이에요. 제주산 돼지와 소고기 모두 즐길 수 있습니다.',
          en: 'Top-quality meat in town — buy at the butcher, grill next door. About 20 minutes on foot from Haemyo; a taxi is easier. Jeju pork and beef.',
        },
        addr: addr('제주 제주시 한림읍 한림상로 84'),
      },
      {
        mapQuery: '제주 한림 영림흑돼지가든',
        name: { ko: '영림흑돼지가든', en: 'Yeongrim Black Pork' },
        walk: walkMin(5),
        desc: {
          ko: '한림성당 옆에 자리한 로컬 고깃집이에요. 언제나 주민들로 북적이는 정겨운 곳이기도 합니다. 제주에는 마을마다 생갈비 맛집이 하나씩 있는데 한림에서는 영림이 바로 그런 곳이 아닐까 싶어요.',
          en: 'Local grill by Hallim church — busy with neighbors. Every Jeju village has its pork-rib spot; in Hallim, this might be it.',
        },
        addr: addr('제주 제주시 한림읍 한수풀로 30'),
      },
      {
        mapQuery: '제주 한림 쌍둥이 국수',
        name: { ko: '쌍둥이 국수', en: 'Ssangdungi Guksu' },
        walk: walkMin(3),
        desc: {
          ko: '새로 개업한 깔끔하고 청결한 국수집. 멸고국수가 특히 맛있어요. 가게가 넓고 사장님께서도 매우 친절하셔서 혼밥하기에 좋습니다.',
          en: 'New, clean noodle shop. Dried-anchovy guksu is the star. Spacious and friendly — good for solo diners.',
        },
        addr: addr('제주 제주시 한림읍 한림로19길 4 1층 102호'),
      },
      {
        mapQuery: '제주 한림 비타민 국수',
        name: { ko: '비타민 국수', en: 'Vitamin Guksu' },
        walk: walkMin(10),
        desc: {
          ko: '한림에서 가장 유명한 고기국수집. 예전에는 오후 장사만 했는데 최근엔 오전 장사로 바꿨어요. 3시 이전에 가야 드실 수 있습니다.',
          en: 'Hallim’s famous meat guksu. Used to open afternoons only — now mornings; go before 3 pm.',
        },
        addr: addr('제주 제주시 한림읍 한림로 661'),
      },
    ],
  },
  {
    title: { ko: '치킨 · 호프', en: 'Chicken & beer' },
    spots: [
      {
        mapQuery: '제주 한림 오늘도 치킨과 맥주가 좋다',
        name: { ko: '오늘도 치킨과 맥주가 좋다', en: 'Chicken & Beer Today' },
        walk: walkMin(10),
        desc: {
          ko: '치킨에 일가견이 있는 해묘서가 호스트가 감히 제주에서 최고로 꼽는 치킨집이에요. 겉은 바삭하고 속은 촉촉한 크리스피 스타일 치킨을 수제 피클과 곁들여 먹으면 맛이 아주 좋습니다. 여름과 가을엔 야장도 열어서 바깥 바람 맞으며 치맥하는 낭만도 즐길 수 있어요.',
          en: 'The host’s top chicken pick on the island. Crispy outside, juicy inside — great with house pickles. Outdoor tables in summer and fall for beer on the breeze.',
        },
        addr: addr('제주 제주시 한림읍 사가길 22'),
      },
      {
        mapQuery: '제주 한림 중독불닭',
        name: { ko: '중독불닭', en: 'Jungdok Fire Chicken' },
        walk: walkMin(10),
        desc: {
          ko: '한림 주민들의 성지와도 같은 곳. 동네 주민들이 술 먹다 서로 만나 인사하는 곳. 진정한 한림 로컬의 분위기를 느낄 수 있는 곳. 불닭집이지만 후라이드 치킨이 맛있는 곳.',
          en: 'A neighborhood institution — locals run into each other over drinks. Real Hallim vibe. Fire chicken on the menu, but the fried chicken is the surprise hit.',
        },
        addr: addr('제주 제주시 한림읍 한림로 684-1'),
      },
      {
        mapQuery: '제주 한림 남문숯불바베큐 치킨',
        name: { ko: '남문숯불바베큐&치킨', en: 'Nammon BBQ Chicken' },
        walk: walkMin(8),
        desc: {
          ko: '바베큐 치킨의 정석을 보여주는 곳. 소금구이와 양념구이 모두 맛있어요. 후라이드 치킨도 뒤지지 않습니다.',
          en: 'BBQ chicken done right — salt and sauce both work. Fried chicken holds its own too.',
        },
      },
    ],
  },
  {
    title: { ko: '와인 · 맥주', en: 'Wine & beer' },
    note: FOOD_DRIVE_NOTE,
    drive: true,
    spots: [
      {
        mapQuery: '제주 애월 부아르 와인상점',
        name: { ko: '부아르 와인상점', en: 'Buar Wine Shop' },
        walk: WALK_DRIVE,
        walkClass: 'food-walk--drive',
        desc: {
          ko: '곽지 해수욕장 초입에 위치한 와인 보틀숍입니다. 와인에 조예가 깊은 사장님께 맛있고 저렴한 와인을 추천받을 수 있어요. 부아르는 사막의 오아시스처럼 작은 서점 공간을 품고 있어요. 부아르에서 와인 한 병 사서 해묘서가에서 한잔 즐기시면 어떨까요? 향기로운 술과 함께 해묘서가의 밤도 향기롭게 익어 갈 거예요.',
          en: 'Wine shop near Gwakji Beach. The owner knows their bottles — good picks at fair prices. A tiny book nook inside. Grab a bottle and enjoy an evening back at Haemyo.',
        },
        addr: addr('제주 제주시 애월읍 일주서로 5939 1층'),
      },
      {
        mapQuery: '제주 한림 기영상회',
        name: { ko: '기영상회', en: 'Giyeong Bottle Shop' },
        walk: WALK_DRIVE,
        walkClass: 'food-walk--drive',
        desc: {
          ko: '협재 해수욕장에 위치한 제주 최고의 맥주 보틀숍. 서울에서도 구하기 힘든 다양한 맥주를 갖추고 있어요. 요새 크래프트 맥주 씬 자체가 전반적인 침체여서 예전 같진 않지만, 그래도 맥주를 사랑하는 분께서는 그냥 지나칠 수 없는 곳입니다.',
          en: 'Near Hyeopjae Beach — one of Jeju’s best beer bottle shops. Hard-to-find labels even Seoul lacks. Craft beer has cooled off lately, but enthusiasts still shouldn’t skip it.',
        },
        addr: addr('제주 제주시 한림읍 한림로 345 기영상회'),
      },
    ],
  },
];

export const FOOD_CATEGORIES: FoodCategory[] = FOOD_CATEGORIES_RAW.map(withZh);
