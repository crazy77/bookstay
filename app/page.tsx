import type { Metadata } from 'next';
import { HomeFooter, HomePage } from '@/components/home/HomePage';
import { SITE_DESCRIPTION, SITE_OG_DESCRIPTION, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: '해묘서가 · 제주 한림항 북스테이',
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: '해묘서가 · BOOKSTAY',
    description: SITE_OG_DESCRIPTION,
    url: SITE_URL,
  },
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <HomePage />
      <HomeFooter />
    </div>
  );
}
