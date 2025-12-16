/**
 * app/layout.tsx
 *
 * 五次元経営マーケティングサイト ルートレイアウト
 */

import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: {
    default: '五次元経営株式会社 | 爆運帯＝ごきげん経営',
    template: '%s | 五次元経営',
  },
  description: '爆運帯＝ごきげん経営。運気が変わると、会社の空気も、成果も、自然に変わる。',
  keywords: ['五次元経営', '運気', 'ごきげん経営', '爆運帯', '経営コンサルティング', '宿曜', '風水', 'イマココ意識'],
  authors: [{ name: '五次元経営株式会社' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://www.5dmgmt.com',
    siteName: '五次元経営株式会社',
    title: '五次元経営株式会社 | 爆運帯＝ごきげん経営',
    description: '爆運帯＝ごきげん経営。運気が変わると、会社の空気も、成果も、自然に変わる。',
  },
  twitter: {
    card: 'summary_large_image',
    title: '五次元経営株式会社',
    description: '爆運帯＝ごきげん経営',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.5dmgmt.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body>{children}</body>
    </html>
  );
}
