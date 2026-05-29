import type { Metadata } from 'next';
import { GuideContent } from '@/components/guide/GuideContent';
import { GuideFooter } from '@/components/guide/GuideFooter';
import { GuideTopbar } from '@/components/guide/GuideTopbar';
import { SmoothAnchor } from '@/components/guide/SmoothAnchor';
import { getSiteContent } from '@/lib/content';
import { SITE_OG_IMAGE, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: '게스트 안내',
  description:
    '제주 한림항 북스테이 해묘서가 — 체크인, 오시는 길, 객실, 도보맛집 안내',
  alternates: { canonical: `${SITE_URL}/guide` },
  openGraph: {
    title: '해묘서가 · 게스트 안내',
    description: '체크인, 오시는 길, 서가·객실 이용, 도보맛집까지 — 해묘서가 안내',
    url: `${SITE_URL}/guide`,
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: '해묘서가 · 게스트 안내',
    description: '해묘서가 이용 안내 — 한림 북스테이',
    images: [SITE_OG_IMAGE.url],
  },
};

export default async function GuidePage() {
  const content = await getSiteContent();

  return (
    <>
      <GuideTopbar content={content} />
      <SmoothAnchor />
      <GuideContent content={content} />
      <GuideFooter content={content} />
    </>
  );
}
