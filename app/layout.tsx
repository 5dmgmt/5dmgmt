/**
 * app/layout.tsx
 *
 * 五次元経営マーケティングサイト ルートレイアウト
 * - GA4 トラッキング（環境変数 NEXT_PUBLIC_GA_ID で設定）
 */

import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import WebVitalsReporter from '@/components/WebVitalsReporter';
import styles from '@/components/landing/LandingPage.module.css';

// GA4 測定ID（環境変数から取得）
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: {
    default: '五次元経営株式会社 | 意識が整う経営',
    template: '%s | 五次元経営',
  },
  description: 'イマココ体験セッション・宿曜鑑定・経営者リトリート。気づきを深め、運気を上げる五次元経営の実践プログラム。',
  keywords: ['五次元経営', '運気', '意識レベル', '気づき', '経営者', '宿曜', 'イマココ', 'リトリート', 'ホーキンズ'],
  authors: [{ name: '五次元経営株式会社' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://www.5dmgmt.com',
    siteName: '五次元経営株式会社',
    title: '五次元経営株式会社 | 意識が整う経営',
    description: 'イマココ体験セッション・宿曜鑑定・経営者リトリート。気づきを深め、運気を上げる五次元経営の実践プログラム。',
    images: [
      {
        url: 'https://www.5dmgmt.com/logo.png',
        width: 1200,
        height: 630,
        alt: '五次元経営株式会社',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '五次元経営株式会社 | 意識が整う経営',
    description: '気づきを深め、運気を上げる五次元経営の実践プログラム',
    images: ['https://www.5dmgmt.com/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.5dmgmt.com',
  },
};

// 構造化データ（JSON-LD）
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '五次元経営株式会社',
  url: 'https://www.5dmgmt.com',
  logo: 'https://www.5dmgmt.com/logo.png',
  description: 'イマココ体験セッション・宿曜鑑定・経営者リトリート。気づきを深め、運気を上げる五次元経営の実践プログラム。',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'JP',
  },
  sameAs: [],
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        {/* GA4 トラッキング */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <WebVitalsReporter />
        <div className={`${styles.landingPage} five-d-page`}>
          <FiveDmgmtHeader />
          <main>{children}</main>
          <FiveDmgmtFooter />
        </div>
      </body>
    </html>
  );
}
