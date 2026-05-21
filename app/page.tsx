import type { Metadata } from 'next';
import { HomeFooter, HomePage } from '@/components/home/HomePage';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: '해묘서가 · 제주 한림항 북스테이',
  description: '제주 한림항 앞 작은 책방, 해묘서가. 책과 바다와 음악만 남는 밤.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: '해묘서가 · BOOKSTAY',
    description: '제주 한림항 앞 작은 책방, 갈매기를 부르는 다른 이름.',
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
