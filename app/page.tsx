import type { Metadata } from 'next';
import { HomeFooter, HomePage } from '@/components/home/HomePage';
import { HomeTopbar } from '@/components/home/HomeTopbar';
import {
  SITE_DESCRIPTION,
  SITE_OG_DESCRIPTION,
  SITE_OG_IMAGE,
  SITE_URL,
} from '@/lib/site';

export const metadata: Metadata = {
  title: '해묘서가 · 제주 한림항 북스테이',
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: '해묘서가 · BOOKSTAY',
    description: SITE_OG_DESCRIPTION,
    url: SITE_URL,
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: '해묘서가 · BOOKSTAY',
    description: SITE_OG_DESCRIPTION,
    images: [SITE_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeTopbar />
      <HomePage />
      <HomeFooter />
    </div>
  );
}
