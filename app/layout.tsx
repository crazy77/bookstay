import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Noto_Serif_KR } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const notoSerif = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://haemyo.vercel.app',
  ),
  title: {
    default: '해묘서가 · 제주 한림항 북스테이',
    template: '%s · 해묘서가',
  },
  description: '제주 한림항 앞 작은 책방, 해묘서가. 책과 바다와 음악만 남는 밤.',
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    siteName: '해묘서가',
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/assets/og-image.png?v=2', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      data-lang="ko"
      className={`${cormorant.variable} ${notoSerif.variable} ${inter.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
