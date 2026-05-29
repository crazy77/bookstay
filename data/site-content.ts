import type { LocaleText } from '@/lib/locale';

export type Locale = keyof LocaleText;

export type RichSegment =
  | string
  | {
      text: string;
      strong?: boolean;
      code?: boolean;
      href?: string;
      external?: boolean;
    };

export type RichLine = RichSegment[];
export type LocaleContentValue = string | string[] | RichLine[];
export type ContentInputType = 'text' | 'textarea' | 'list' | 'rich_list';

export type ContentEntryDefinition = {
  key: string;
  category: string;
  label: string;
  inputType: ContentInputType;
  localeValues: LocaleText<LocaleContentValue>;
};

export type ContentMap = Record<string, LocaleText<LocaleContentValue>>;

export const DEFAULT_CONTENT_ENTRIES = [
  {
    key: 'home.siteNameLine',
    category: 'home',
    label: '홈 · 소개 문구',
    inputType: 'text',
    localeValues: {
      ko: '해묘(海猫) · 갈매기를 부르는 다른 이름',
      en: 'Haemyo · another name for a seagull',
      zh: '海猫 · 海鸥的另一种名字',
    },
  },
  {
    key: 'home.guideLink',
    category: 'home',
    label: '홈 · 이용 안내 링크',
    inputType: 'text',
    localeValues: { ko: '이용 안내', en: 'Guest guide', zh: '入住指南' },
  },
  {
    key: 'home.footerBusinessNumber',
    category: 'home',
    label: '홈 · 사업자등록번호',
    inputType: 'text',
    localeValues: {
      ko: '사업자등록번호 506-21-96197',
      en: 'Business registration no. 506-21-96197',
      zh: '营业执照号码 506-21-96197',
    },
  },
  {
    key: 'guide.heroCopy',
    category: 'guide',
    label: '가이드 · 첫 안내 문구',
    inputType: 'list',
    localeValues: {
      ko: [
        '안녕하세요, 해묘서가를 찾아주셔서 진심으로 감사드립니다.',
        '비록 오래된 구옥이지만 머무시는 동안 편히 쉬었다 가실 수 있도록 최선을 다하겠습니다.',
        '쾌적하고 안전한 휴식을 위해 아래 안내 사항을 꼭 확인해 주세요.',
      ],
      en: [
        'Thank you sincerely for choosing Haemyo.',
        'Though it is an old house, we will do our best so you can rest comfortably during your stay.',
        'Please read the guidelines below for a pleasant and safe visit.',
      ],
      zh: [
        '您好，衷心感谢您选择海猫书斋。',
        '虽是一栋老宅，我们仍将尽力让您住得舒适惬意。',
        '为保障您的舒适与安全，请务必阅读以下须知。',
      ],
    },
  },
  {
    key: 'guide.title.hero',
    category: 'guide',
    label: '가이드 · 히어로 제목',
    inputType: 'text',
    localeValues: {
      ko: '해묘서가에 오신 것을 환영합니다',
      en: 'Welcome to Haemyo',
      zh: '欢迎光临海猫书斋',
    },
  },
  {
    key: 'guide.title.checkin',
    category: 'guide',
    label: '가이드 · 체크인 섹션 제목',
    inputType: 'text',
    localeValues: {
      ko: '체크인 & 체크아웃',
      en: 'Check-in & Check-out',
      zh: '入住与退房',
    },
  },
  {
    key: 'guide.checkinRules',
    category: 'guide',
    label: '가이드 · 체크인 규칙',
    inputType: 'rich_list',
    localeValues: {
      ko: [
        [
          '체크인 시간은 ',
          { text: '오후 4시', strong: true },
          ', 체크아웃 시간은 ',
          { text: '오전 11시', strong: true },
          '입니다.',
        ],
        [
          '정오 이후 트렁크나 짐을 맡기실 수 있습니다. 객실 준비가 일찍 끝날 경우 얼리 체크인이 가능하며 메시지로 안내해 드립니다.',
        ],
        ['대문과 현관 도어락 비밀번호는 입실 당일 발송해 드립니다.'],
      ],
      en: [
        [
          'Check-in ',
          { text: '4:00 PM', strong: true },
          ' · Check-out ',
          { text: '11:00 AM', strong: true },
          '.',
        ],
        [
          'Luggage drop-off is available after noon. If the room is ready early, we may offer early check-in and will notify you by message.',
        ],
        ['Gate and entrance door-lock codes are sent on the day of arrival.'],
      ],
      zh: [
        [
          '入住时间为 ',
          { text: '下午4点', strong: true },
          '，退房时间为 ',
          { text: '上午11点', strong: true },
          '。',
        ],
        ['中午以后可寄存行李。若客房提前准备好，可安排提前入住，我们会发消息通知您。'],
        ['大门和入户门密码将在入住当天发送给您。'],
      ],
    },
  },
  {
    key: 'guide.title.arrival',
    category: 'guide',
    label: '가이드 · 오시는 길 섹션 제목',
    inputType: 'text',
    localeValues: {
      ko: '주차 및 오시는 길',
      en: 'Parking & directions',
      zh: '停车与交通',
    },
  },
  {
    key: 'guide.block.parking',
    category: 'guide',
    label: '가이드 · 주차 소제목',
    inputType: 'text',
    localeValues: { ko: '주차', en: 'Parking', zh: '停车' },
  },
  {
    key: 'guide.parkingText',
    category: 'guide',
    label: '가이드 · 주차',
    inputType: 'textarea',
    localeValues: {
      ko: '주차는 도보 1분 거리에 있는 공영주차장을 이용할 수 있습니다. 도로 양옆에 공간이 있을 경우 그곳에 주차하셔도 됩니다.',
      en: 'Use the public parking lot about a 1-minute walk away, or park along the roadside where space is available.',
      zh: '步行约1分钟处有公共停车场可供使用。若路边有空位，也可停于路边。',
    },
  },
  {
    key: 'guide.block.transit',
    category: 'guide',
    label: '가이드 · 대중교통 소제목',
    inputType: 'text',
    localeValues: { ko: '대중교통', en: 'By transit', zh: '公共交通' },
  },
  {
    key: 'guide.transitRules',
    category: 'guide',
    label: '가이드 · 대중교통 안내',
    inputType: 'rich_list',
    localeValues: {
      ko: [
        [{ text: '202번', strong: true }, ' 제주버스터미널 방면 · 한림천주교회 정류장 하차'],
        [{ text: '202번', strong: true }, ' 서귀포 방면 · 한림매일시장 입구 정류장 하차'],
        [{ text: '102번', strong: true }, ' 급행버스 · 양방향 모두 한림환승정류장 하차'],
      ],
      en: [
        [{ text: 'Bus 202', strong: true }, ' toward Jeju Bus Terminal · get off at Hallim Catholic Church stop'],
        [{ text: 'Bus 202', strong: true }, ' toward Seogwipo · get off at Hallim Maeil Market entrance stop'],
        [{ text: 'Bus 102', strong: true }, ' express · both directions, get off at Hallim transfer stop'],
      ],
      zh: [
        [{ text: '202路', strong: true }, ' 往济州巴士总站方向 · 在翰林天主教堂站下车'],
        [{ text: '202路', strong: true }, ' 往西归浦方向 · 在翰林每日市场入口站下车'],
        [{ text: '102路', strong: true }, ' 急行巴士 · 双向均在翰林换乘站下车'],
      ],
    },
  },
  {
    key: 'guide.address',
    category: 'guide',
    label: '가이드 · 주소',
    inputType: 'rich_list',
    localeValues: {
      ko: [[{ text: '주소', strong: true }, ' · 제주특별자치도 제주시 한림읍 대림1길 1-1']],
      en: [[{ text: 'Address', strong: true }, ' · 1-1 Daerim 1-gil, Hallim-eup, Jeju-si, Jeju-do']],
      zh: [[{ text: '地址', strong: true }, ' · 济州特别自治道济州市翰林邑大林1街1-1']],
    },
  },
  {
    key: 'guide.route.transit',
    category: 'guide',
    label: '가이드 · 대중교통 길찾기 버튼',
    inputType: 'text',
    localeValues: {
      ko: '대중교통 길찾기',
      en: 'By transit',
      zh: '公共交通路线',
    },
  },
  {
    key: 'guide.route.car',
    category: 'guide',
    label: '가이드 · 자동차 길찾기 버튼',
    inputType: 'text',
    localeValues: {
      ko: '자동차 길찾기',
      en: 'By car',
      zh: '驾车路线',
    },
  },
  {
    key: 'guide.route.meta',
    category: 'guide',
    label: '가이드 · 길찾기 버튼 보조문구',
    inputType: 'text',
    localeValues: {
      ko: '제주공항 → 해묘서가 · KakaoMap',
      en: 'Jeju Airport → Haemyo · KakaoMap',
      zh: '济州机场 → 海猫书斋 · KakaoMap',
    },
  },
  {
    key: 'guide.mapAlt',
    category: 'guide',
    label: '가이드 · 지도 이미지 대체텍스트',
    inputType: 'text',
    localeValues: {
      ko: '대림1길 골목 진입 상세도',
      en: 'Daerim 1-gil alley entrance detail map',
      zh: '大林1街巷弄入口详细图',
    },
  },
  {
    key: 'guide.mapCaption',
    category: 'guide',
    label: '가이드 · 지도 캡션',
    inputType: 'text',
    localeValues: {
      ko: '골목 진입 상세 — 대림1길 1-1',
      en: 'Alley detail · Daerim 1-gil 1-1',
      zh: '巷弄入口示意 — 大林1街 1-1',
    },
  },
  {
    key: 'guide.routeCallout',
    category: 'guide',
    label: '가이드 · 골목 진입 안내',
    inputType: 'rich_list',
    localeValues: {
      ko: [
        [
          '※ 대림1길은 좁은 골목입니다. 한림로에서 대림1길 표지판을 보고 진입한 뒤, 골목 안쪽 ',
          { text: '1-1번지', strong: true },
          '까지 천천히 들어오시면 해묘서가 대문이 있습니다.',
        ],
      ],
      en: [
        [
          'Note · Daerim 1-gil is a narrow alley. Once you turn from Hallim-ro, walk slowly into the alley to ',
          { text: 'building 1-1', strong: true },
          ' — Haemyo is on your right.',
        ],
      ],
      zh: [
        [
          '大林1街是一条狭窄小巷。从翰林路看到大林1街标识后进入，慢慢走到巷内 ',
          { text: '1-1号', strong: true },
          '，即可看到海猫书斋的大门。',
        ],
      ],
    },
  },
  {
    key: 'guide.title.library',
    category: 'guide',
    label: '가이드 · 서가 섹션 제목',
    inputType: 'text',
    localeValues: {
      ko: '서가 이용 안내',
      en: 'The library',
      zh: '书坊须知',
    },
  },
  {
    key: 'guide.libraryParagraphs',
    category: 'guide',
    label: '가이드 · 서가 이용 안내',
    inputType: 'rich_list',
    localeValues: {
      ko: [
        [
          '책장에 비치된 모든 책은 자유롭게 읽으실 수 있습니다. 다음 손님을 위해 읽고 난 뒤 ',
          { text: '제자리에 놓아주시면', strong: true },
          ' 감사하겠습니다.',
        ],
        ['해묘서가에 비치된 책에는 호스트 부부의 소중한 추억이 깃들어 있습니다. 혹시라도 집에 데려가지 말아주세요.'],
        [
          { text: '봄가을서가', strong: true },
          '는 사계절 이용 가능하지만 여름엔 덥고 겨울엔 춥습니다. 외부 창고 공간이라 냉난방이 어려운 점 양해 부탁드립니다.',
        ],
      ],
      en: [
        [
          'Every book on the shelves is yours to read during your stay. When you are finished, ',
          { text: 'please return it to its place', strong: true },
          ' for the next guest.',
        ],
        ['These books hold precious memories for us as hosts. Please do not take any book home with you.'],
        [
          'The ',
          { text: 'Spring-Autumn room', strong: true },
          ' is open year-round but hot in summer and cold in winter (outdoor storage space, no HVAC).',
        ],
      ],
      zh: [
        ['书架上所有书籍均可自由阅读。阅后请放回原位，方便下一位客人。'],
        ['书斋里的书承载着房东夫妇珍贵的回忆，请勿带走。'],
        ['春秋书斋全年可用，但夏天较热、冬天较冷。因属外部仓库空间，无法供暖或制冷，敬请谅解。'],
      ],
    },
  },
  {
    key: 'guide.title.room',
    category: 'guide',
    label: '가이드 · 객실 섹션 제목',
    inputType: 'text',
    localeValues: {
      ko: '객실 이용 안내',
      en: 'Room guide',
      zh: '客房须知',
    },
  },
  {
    key: 'guide.roomRules',
    category: 'guide',
    label: '가이드 · 객실 이용 안내',
    inputType: 'rich_list',
    localeValues: {
      ko: [
        [
          '해묘서가는 좋은 이웃과 담벼락을 나누고 있습니다. 마당에서 발생하는 소음은 곧바로 담을 넘어 이웃의 귓가로 생생하게 달려가니, ',
          { text: '늦은 시간에는 특히 조심', strong: true },
          '해 주시면 감사하겠습니다.',
        ],
        ['해묘서가 바로 앞에는 한림항이 있어요. 가끔 밤에 들리는 소리는 만선을 꿈꾸며 출항하는 배들이 밤바다에 내뿜는 뱃고동 소리입니다. 놀라지 않으셔도 돼요.'],
        [
          '취사는 금지합니다. 외부 음식 반입은 자유롭습니다. 아래 ',
          { text: '도보맛집', href: '/guide#food' },
          ' 리스트를 참고해 방문하시거나 포장해 즐기셔도 좋습니다.',
        ],
        [
          '서재는 별도 방문 없이 ',
          { text: '커튼', strong: true },
          '으로 나눈 공간입니다. 쉬실 때나 밤에는 커튼을 내려 주시면 시선·소음 모두 조금 더 편하실 거예요.',
        ],
        ['흡연은 평상 옆에 마련된 재떨이를 이용해 주세요.'],
        ['제주에는 돌, 바람, 여자 뿐만 아니라 온갖 벌레들도 많습니다. 주기적인 방역을 통해 최대한 집 안에 들어오지 못하게 막고 있으나, 작은 빈틈을 놓치지 않고 기어코 들어오고야마는 녀석들도 있습니다. 너그러이 양해해 주시되, 큰 벌레가 나타나 퇴치가 어려울 경우엔 연락 주세요.'],
        ['대문 도어락은 자동으로 닫히지 않으니 직접 닫아 주세요.'],
      ],
      en: [
        [
          'We share a wall with good neighbors — sound from the yard travels easily. Please be especially ',
          { text: 'quiet at night', strong: true },
          '.',
        ],
        ['Hallim Port is right in front of Haemyo. On some nights you may hear ship horns — boats setting out on the dark sea, dreaming of a full hold. Nothing to worry about.'],
        [
          'Cooking is not allowed. Outside food is welcome — see our ',
          { text: 'walking-distance food guide', href: '/guide#food' },
          ' or bring takeout.',
        ],
        [
          'The study has no separate door — a ',
          { text: 'curtain', strong: true },
          ' divides the space. Please draw it closed when you rest, especially at night, for a bit more privacy and quiet.',
        ],
        ['Please smoke only at the ashtray beside the platform.'],
        ['Jeju has its share of insects despite regular pest control. Please understand; contact us if a large bug appears and is hard to remove.'],
        ['The main gate lock does not close by itself — please shut it manually.'],
      ],
      zh: [
        [
          '海猫书斋与邻居仅一墙之隔，庭院内的声音极易传到邻居耳中，敬请尤其注意 ',
          { text: '夜间保持安静', strong: true },
          '。',
        ],
        ['海猫书斋正对着翰林港。偶尔夜晚听到的，是满载而归之梦驱使船只驶离时，在夜海上鸣响的汽笛。不必惊慌。'],
        [
          '禁止做饭。外食可自由带入。可参考下方 ',
          { text: '步行美食', href: '/guide#food' },
          ' 列表，到店用餐或打包带回。',
        ],
        [
          '书斋与客房之间无独立门，以 ',
          { text: '窗帘', strong: true },
          ' 隔断。休息时或夜间请拉下窗帘，可获得更多隐私与安静。',
        ],
        ['吸烟请使用平床旁准备的烟灰缸。'],
        ['济州不仅有石头、风和女人，也有许多虫子。我们会定期防虫，尽量避免虫子进入室内，但仍可能有小虫从缝隙进入，敬请谅解。若出现较大的虫子且难以处理，请联系我们。'],
        ['大门门锁不会自动闭合，请手动关好。'],
      ],
    },
  },
  {
    key: 'guide.block.wifi',
    category: 'guide',
    label: '가이드 · 와이파이 소제목',
    inputType: 'text',
    localeValues: { ko: '와이파이', en: 'WiFi', zh: '无线网络' },
  },
  {
    key: 'guide.wifi.networkLabel',
    category: 'guide',
    label: '가이드 · 와이파이 네트워크 라벨',
    inputType: 'text',
    localeValues: { ko: '네트워크', en: 'Network', zh: '网络名称' },
  },
  {
    key: 'guide.wifi.ssid',
    category: 'guide',
    label: '가이드 · 와이파이 네트워크',
    inputType: 'text',
    localeValues: { ko: 'fanta', en: 'fanta', zh: 'fanta' },
  },
  {
    key: 'guide.wifi.passwordLabel',
    category: 'guide',
    label: '가이드 · 와이파이 비밀번호 라벨',
    inputType: 'text',
    localeValues: { ko: '비밀번호', en: 'Password', zh: '密码' },
  },
  {
    key: 'guide.wifi.password',
    category: 'guide',
    label: '가이드 · 와이파이 비밀번호',
    inputType: 'text',
    localeValues: { ko: '12121212', en: '12121212', zh: '12121212' },
  },
  {
    key: 'guide.wifi.copyLabel',
    category: 'guide',
    label: '가이드 · 와이파이 복사 버튼',
    inputType: 'text',
    localeValues: { ko: '비밀번호 복사', en: 'Copy password', zh: '复制密码' },
  },
  {
    key: 'guide.wifi.note',
    category: 'guide',
    label: '가이드 · 와이파이 안내 문구',
    inputType: 'text',
    localeValues: {
      ko: 'QR을 카메라로 스캔하면 자동 연결됩니다.',
      en: 'Scan the QR with your camera to connect automatically.',
      zh: '用相机扫描二维码即可自动连接。',
    },
  },
  {
    key: 'guide.block.speaker',
    category: 'guide',
    label: '가이드 · 스피커 소제목',
    inputType: 'text',
    localeValues: {
      ko: '스피커 사용법',
      en: 'Room audio · Marshall Acton III',
      zh: '音响使用 · Marshall Acton III',
    },
  },
  {
    key: 'guide.speakerSteps',
    category: 'guide',
    label: '가이드 · 스피커 사용법',
    inputType: 'rich_list',
    localeValues: {
      ko: [
        [{ text: '전원', strong: true }, ' · 상단 우측 토글을 위로 ↑'],
        [{ text: '페어링', strong: true }, ' · SOURCE 버튼을 길게 눌러 BT LED가 빨간색으로 깜박일 때까지'],
        [{ text: '연결', strong: true }, ' · 휴대폰 블루투스에서 ', { text: 'ACTON III', code: true }, ' 선택'],
      ],
      en: [
        [{ text: 'Power', strong: true }, ' · Flip the right toggle up ↑'],
        [{ text: 'Pair', strong: true }, ' · Hold SOURCE until the BT LED pulses red'],
        [{ text: 'Connect', strong: true }, ' · Select ', { text: 'ACTON III', code: true }, " in your phone's Bluetooth settings"],
      ],
      zh: [
        [{ text: '电源', strong: true }, ' · 将右上方拨杆向上拨'],
        [{ text: '配对', strong: true }, ' · 长按 SOURCE 直到 BT LED 闪红灯'],
        [{ text: '连接', strong: true }, ' · 在手机蓝牙中选择 ', { text: 'ACTON III', code: true }],
      ],
    },
  },
  {
    key: 'guide.speakerNotes',
    category: 'guide',
    label: '가이드 · 스피커 주의사항',
    inputType: 'list',
    localeValues: {
      ko: ['22시 이후에는 음량 5 이하로 부탁드립니다', '10분 미사용 시 자동 절전 모드'],
      en: ['After 10 pm · please keep the volume at 5 or below', 'Auto-standby kicks in after 10 minutes of inactivity'],
      zh: ['晚上10点以后请将音量保持在5以下', '10分钟未使用时会自动进入待机模式'],
    },
  },
  {
    key: 'guide.title.food',
    category: 'guide',
    label: '가이드 · 도보맛집 섹션 제목',
    inputType: 'text',
    localeValues: {
      ko: '도보맛집',
      en: 'Host picks',
      zh: '步行美食',
    },
  },
  {
    key: 'guide.foodIntro',
    category: 'guide',
    label: '가이드 · 도보맛집 소개',
    inputType: 'textarea',
    localeValues: {
      ko: '해묘서가는 읍내 중심가에 가까워 도보로 로컬 맛집 탐방이 가능합니다. 해묘서가에 머무시는 동안 이 리스트를 참조해서 맛있는 여행을 떠나 보세요.',
      en: 'Haemyo is close to the town center, so you can explore local spots on foot. While you stay with us, use this list for a tasty little trip around the neighborhood.',
      zh: '海猫书斋靠近邑内中心，步行即可探访本地小店。入住期间不妨按这份清单，来一趟轻松的美食小旅行。',
    },
  },
  {
    key: 'guide.foodNote',
    category: 'guide',
    label: '가이드 · 도보맛집 주의',
    inputType: 'textarea',
    localeValues: {
      ko: '※ 영업시간·휴무일·메뉴는 변동될 수 있으니 방문 전에 확인해 주세요.',
      en: '※ Hours, closed days, and menus may change — please confirm before you visit.',
      zh: '※ 营业时间、休息日及菜单可能变动，前往前请先确认。',
    },
  },
  {
    key: 'guide.nav.checkin',
    category: 'guide',
    label: '가이드 내비 · 체크인',
    inputType: 'text',
    localeValues: { ko: '체크인', en: 'Check-in', zh: '入住' },
  },
  {
    key: 'guide.nav.arrival',
    category: 'guide',
    label: '가이드 내비 · 오시는 길',
    inputType: 'text',
    localeValues: { ko: '오시는 길', en: 'Directions', zh: '交通' },
  },
  {
    key: 'guide.nav.library',
    category: 'guide',
    label: '가이드 내비 · 서가',
    inputType: 'text',
    localeValues: { ko: '서가', en: 'Library', zh: '书坊' },
  },
  {
    key: 'guide.nav.room',
    category: 'guide',
    label: '가이드 내비 · 객실',
    inputType: 'text',
    localeValues: { ko: '객실', en: 'Room', zh: '客房' },
  },
  {
    key: 'guide.nav.food',
    category: 'guide',
    label: '가이드 내비 · 도보맛집',
    inputType: 'text',
    localeValues: { ko: '도보맛집', en: 'Food', zh: '美食' },
  },
  {
    key: 'guide.footerDmPrompt',
    category: 'guide',
    label: '가이드 푸터 · 연락 안내',
    inputType: 'text',
    localeValues: {
      ko: '궁금한 점은 DM 주세요.',
      en: 'Questions? Send us a DM.',
      zh: '如有疑问，请私信联系我们。',
    },
  },
  {
    key: 'guide.footerCheckinLabel',
    category: 'guide',
    label: '가이드 푸터 · 체크인 라벨',
    inputType: 'text',
    localeValues: { ko: '체크인', en: 'Check-in', zh: '入住' },
  },
  {
    key: 'guide.footerCheckin',
    category: 'guide',
    label: '가이드 푸터 · 체크인 시간',
    inputType: 'text',
    localeValues: { ko: '오후 4시', en: '4:00 PM', zh: '下午4点' },
  },
  {
    key: 'guide.footerCheckoutLabel',
    category: 'guide',
    label: '가이드 푸터 · 체크아웃 라벨',
    inputType: 'text',
    localeValues: { ko: '체크아웃', en: 'Check-out', zh: '退房' },
  },
  {
    key: 'guide.footerCheckout',
    category: 'guide',
    label: '가이드 푸터 · 체크아웃 시간',
    inputType: 'text',
    localeValues: { ko: '오전 11시', en: '11:00 AM', zh: '上午11点' },
  },
] satisfies ContentEntryDefinition[];

export const DEFAULT_CONTENT = DEFAULT_CONTENT_ENTRIES.reduce<ContentMap>(
  (acc, entry) => {
    acc[entry.key] = entry.localeValues;
    return acc;
  },
  {},
);

export function contentValue<T extends LocaleContentValue>(
  content: ContentMap,
  key: string,
): LocaleText<T> {
  return (content[key] ?? DEFAULT_CONTENT[key]) as LocaleText<T>;
}
