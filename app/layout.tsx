import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Noto_Serif_KR } from 'next/font/google';
import { SITE_DESCRIPTION, SITE_OG_DESCRIPTION } from '@/lib/site';
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
  description: SITE_DESCRIPTION,
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    siteName: '해묘서가',
    description: SITE_OG_DESCRIPTION,
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/assets/og-image.png?v=5', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    description: SITE_OG_DESCRIPTION,
  },
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
