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
  },
  twitter: {
    card: 'summary_large_image',
    title: '五次元経営株式会社 | 意識が整う経営',
    description: '気づきを深め、運気を上げる五次元経営の実践プログラム',
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

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '「気づいている」とは、具体的にどういう状態ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '今、この文章を読んでいるあなた。その「読んでいる自分」に気づいていますか？思考ではなく、思考を見ている意識——それが「気づき」です。呼吸している自分、座っている自分、画面を見ている自分。それに気づいている「何か」が、あなたの本質です。',
      },
    },
    {
      '@type': 'Question',
      name: '気づきを深めると、本当に運気が上がりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ホーキンズ博士の研究では、意識レベル200を超えると、人生の様々な面で変化が起こりやすくなると言われています。「気づき」は、その意識レベルに影響を与えます。気づきが深まると、判断が冴え、人が集まり、機会が増える——そう感じる人が多いようです。',
      },
    },
    {
      '@type': 'Question',
      name: 'どのくらいで変化が現れますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '変化の現れ方は人それぞれです。本人は「何も変わっていない」と感じることが多いですが、周囲の人が先に気づくことも。気づいている人は、変化を追いかけません。',
      },
    },
    {
      '@type': 'Question',
      name: 'スピリチュアルですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'デビッド・ホーキンズ博士の意識研究をベースにしています。「気づき」は、瞑想や禅の世界で何千年も探求されてきたテーマ。五次元経営では、それを経営に応用しています。まずは体験してみて、ご自身で感じてください。',
      },
    },
  ],
};

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: '経営コンサルティング',
  provider: {
    '@type': 'Organization',
    name: '五次元経営株式会社',
  },
  areaServed: 'JP',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '五次元経営プログラム',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'イマココ体験セッション',
          description: '経営者向け90分のマインドフルネス体験セッション',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '宿曜鑑定',
          description: '宿曜占星術に基づく経営者向け鑑定サービス',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '経営者リトリート',
          description: '1泊2日の経営者向け意識変容プログラム',
        },
      },
    ],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
