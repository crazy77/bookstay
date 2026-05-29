import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Noto_Serif_KR } from 'next/font/google';
import {
  SITE_DESCRIPTION,
  SITE_OG_DESCRIPTION,
  SITE_OG_IMAGE,
} from '@/lib/site';
import { VisitTracker } from '@/components/VisitTracker';
import { ThemeProvider } from '@/providers/ThemeProvider';
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
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    description: SITE_OG_DESCRIPTION,
    images: [SITE_OG_IMAGE.url],
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
      data-theme="cream"
      suppressHydrationWarning
      className={`${cormorant.variable} ${notoSerif.variable} ${inter.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('haemyo.theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
          <VisitTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}
