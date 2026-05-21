import Link from 'next/link';
import type { ReactNode } from 'react';
import { INSTAGRAM_DM_URL } from '@/lib/site';

export const GUIDE_ZH = {
  heroCopy: (
    <>
      您好，衷心感谢您选择海猫书斋。
      <br />
      虽是一栋老宅，我们仍将尽力让您住得舒适惬意。
      <br />
      为保障您的舒适与安全，请务必阅读以下须知。
    </>
  ),

  checkin: [
    <li key="1">
      入住时间为 <strong>下午3点</strong>，退房时间为 <strong>上午11点</strong>。
    </li>,
    <li key="2">
      中午以后可寄存行李。若客房提前准备好，可安排提前入住，我们会发消息通知您。
    </li>,
    <li key="3">大门和入户门密码将在入住当天发送给您。</li>,
  ] satisfies ReactNode[],

  parking: (
    <>
      步行约1分钟处有公共停车场可供使用。若路边有空位，也可停于路边。
    </>
  ),

  transit: [
    <li key="1">
      <strong>202路</strong> 往济州巴士总站方向 · 在翰林天主教堂站下车
    </li>,
    <li key="2">
      <strong>202路</strong> 往西归浦方向 · 在翰林每日市场入口站下车
    </li>,
    <li key="3">
      <strong>102路</strong> 急行巴士 · 双向均在翰林换乘站下车
    </li>,
  ] satisfies ReactNode[],

  address: (
    <>
      <strong>地址</strong> · 济州特别自治道济州市翰林邑大林1街 1-1
    </>
  ),

  routeCallout: (
    <>
      ※ 大林1街是狭窄巷弄。从翰林路看到大林1街路牌后进入，沿巷弄慢行至{' '}
      <strong>1-1号</strong>，即可看到海猫书斋大门。
    </>
  ),

  library: [
    <>
      书架上所有书籍均可自由阅读。阅后请 <strong>放回原位</strong>
      ，方便下一位客人。
    </>,
    <>
      书斋里的书承载着房东夫妇珍贵的回忆，请勿带走。
    </>,
    <>
      <strong>春秋书斋</strong>{' '}
      全年开放，但夏季较热、冬季较冷，为室外仓储空间，无法提供冷暖空调，敬请谅解。
    </>,
  ] satisfies ReactNode[],

  room: [
    <li key="1">
      海猫书斋与邻居仅一墙之隔，庭院内的声音极易传到邻居耳中，敬请尤其注意{' '}
      <strong>夜间保持安静</strong>。
    </li>,
    <li key="2">
      海猫书斋正对着翰林港。偶尔夜晚听到的，是满载而归之梦驱使船只驶离时，在夜海上鸣响的汽笛。不必惊慌。
    </li>,
    <li key="3">
      仅允许入住 <strong>6晚及以上</strong> 的客人做饭。外食可自由带入。可参考下方{' '}
      <Link href="/guide#food">步行美食</Link> 列表，到店用餐或打包带回。
    </li>,
    <li key="4">
      书斋与客房之间无独立门，以 <strong>窗帘</strong>{' '}
      隔断。休息时或夜间请拉下窗帘，可获得更多隐私与安静。
    </li>,
    <li key="5">请在平台旁设置的烟灰缸处吸烟。</li>,
    <li key="6">
      济州不仅有石头、风和海女，还有各种小虫。我们定期消杀，但难免有漏网之鱼。敬请谅解；若出现大型昆虫且难以驱除，请联系我们。
    </li>,
    <li key="7">大门门锁不会自动关严，请自行关上。</li>,
  ] satisfies ReactNode[],

  wifiNote: '用相机扫描二维码即可自动连接。',

  speakerSteps: [
    <li key="1">
      <strong>电源</strong> · 将右上角拨钮向上拨 ↑
    </li>,
    <li key="2">
      <strong>配对</strong> · 长按 SOURCE 键，直至 BT 指示灯闪烁红光
    </li>,
    <li key="3">
      <strong>连接</strong> · 在手机蓝牙中选择 <code>ACTON III</code>
    </li>,
  ] satisfies ReactNode[],

  speakerCallout: [
    <li key="1">晚10点后请将音量调至 5 以下</li>,
    <li key="2">闲置 10 分钟后自动进入待机</li>,
  ] satisfies ReactNode[],

  footerMeta: (
    <>
      咨询 ·{' '}
      <a
        className="contact-link"
        href={INSTAGRAM_DM_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        @bookstay_haemyo DM
      </a>
      <br />
      退房 · <em>上午11点</em>
      <br />
      如有疑问，请随时通过 Instagram 私信联系我们。
    </>
  ),
} as const;

export const GUIDE_ZH_STRINGS = {
  heroTitle: '欢迎光临海猫书斋',
  parking: '步行约1分钟处有公共停车场可供使用。若路边有空位，也可停于路边。',
  wifiNote: '用相机扫描二维码即可自动连接。',
  routeCallout:
    '※ 大林1街是狭窄巷弄。从翰林路看到大林1街路牌后进入，沿巷弄慢行至 1-1 号，即可看到海猫书斋大门。',
  address: '济州特别自治道济州市翰林邑大林1街 1-1',
  addressLabel: '地址',
  foodLink: '步行美食',
  instagramDm: 'Instagram 私信',
  footerContact: '咨询',
  footerCheckout: '退房',
  footerCheckoutTime: '上午11点',
  footerLine2: '如有疑问，请随时通过 Instagram 私信联系我们。',
  checkin: [
    '入住时间为下午3点，退房时间为上午11点。',
    '中午以后可寄存行李。若客房提前准备好，可安排提前入住，我们会发消息通知您。',
    '大门和入户门密码将在入住当天发送给您。',
  ],
  transit: [
    '202路 往济州巴士总站方向 · 在翰林天主教堂站下车',
    '202路 往西归浦方向 · 在翰林每日市场入口站下车',
    '102路 急行巴士 · 双向均在翰林换乘站下车',
  ],
  library: [
    '书架上所有书籍均可自由阅读。阅后请放回原位，方便下一位客人。',
    '书斋里的书承载着房东夫妇珍贵的回忆，请勿带走。',
    '春秋书斋全年开放，但夏季较热、冬季较冷，为室外仓储空间，无法提供冷暖空调，敬请谅解。',
  ],
  speakerCallout: [
    '晚10点后请将音量调至 5 以下',
    '闲置 10 分钟后自动进入待机',
  ],
} as const;
