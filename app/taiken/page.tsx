/**
 * app/taiken/page.tsx
 *
 * 体験する インデックスページ
 * 問いかけ型：「思考の外に出たことはありますか？」
 * Service JSON-LD（サービス一覧ページ用）
 */

import Link from 'next/link';
import Script from 'next/script';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '体験する | 五次元経営',
  description: '思考の外にある静けさを体験する。イマココ体験セッションと経営者リトリート。',
};

// Service JSON-LD（サービス一覧ページ用）
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

const programs = [
  {
    title: 'イマココ体験セッション',
    question: '90分、思考を止められますか？',
    description: '考えることをやめる。それだけのことが、なぜこれほど難しいのか。このセッションでは、安全な環境で「思考の外」を体験します。',
    duration: '90分',
    format: 'オンライン / 対面',
    price: '無料（初回限定）',
    href: '/taiken/imakoko',
  },
  {
    title: '経営者リトリート',
    question: '日常を離れたとき、何が見えますか？',
    description: '慣れた環境が、あなたを「いつも通り」に引き戻します。1泊2日、物理的に離れることで、意識の変容が加速します。',
    duration: '1泊2日',
    format: '合宿形式',
    price: 'お問い合わせください',
    href: '/taiken/retreat',
  },
];

export default function TaikenIndexPage() {
  return (
    <>
      <Script
        id="services-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>
              思考の外に<br />
              出たことはありますか？
            </h1>
            <p className={styles.heroLead}>
              私たちは、ほとんどの時間を「考えること」に費やしています。<br />
              過去を分析し、未来を計画し、問題を解決しようとする。<br />
              <br />
              でも、考えていないとき、<br />
              あなたは何を感じていますか？
            </p>
          </div>
        </section>

        {/* Programs Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.cardContainer}>
              {programs.map((program) => (
                <div key={program.title} className={styles.serviceCard}>
                  <div className={styles.serviceCardTagGroup}>
                    <span className={styles.serviceCardTag}>{program.duration}</span>
                    <span className={styles.serviceCardTagMuted}>{program.format}</span>
                  </div>
                  <h2 className={styles.serviceCardQuestion}>{program.question}</h2>
                  <p className={styles.serviceCardTitle}>{program.title}</p>
                  <p className={styles.serviceCardDescription}>{program.description}</p>
                  <div className={styles.serviceCardFooter}>
                    <span className={styles.serviceCardPrice}>{program.price}</span>
                    <Link
                      href={program.href}
                      className={`${styles.btn} ${styles.btnPrimary}`}
                    >
                      詳細を見る
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Question Section */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.questionSection}>
              <p className={styles.questionTitle}>
                体験しないと、分からないのか？
              </p>
              <p className={styles.questionText}>
                はい。<br />
                <br />
                本を読んでも、「水の味」は分かりません。<br />
                説明を聞いても、「静けさ」は体験できません。<br />
                <br />
                一度でも「思考の外」を知ると、<br />
                そこに戻る道が見えるようになります。<br />
                <br />
                それが、体験する意味です。
              </p>
            </div>
          </div>
        </section>
    </>
  );
}
