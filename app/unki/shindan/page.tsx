/**
 * app/unki/shindan/page.tsx
 *
 * 【Phase 30】経営者運気診断ページ
 * - ConsciousnessDiagnosis コンポーネントを表示
 * - SoftwareApplication JSON-LD（診断ツールページ用）
 */

import ConsciousnessDiagnosis from '@/components/diagnosis/ConsciousnessDiagnosis';
import Script from 'next/script';
import styles from '@/components/landing/LandingPage.module.css';

export const metadata = {
  title: '経営者運気診断 | 五次元経営',
  description: 'ホーキンズ博士の意識レベルに基づく経営者向け運気診断。3分で今の意識レベルを測定します。',
};

// SoftwareApplication JSON-LD（診断ツール用）
const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '経営者運気診断',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
  },
  description: 'ホーキンズ博士の意識レベルに基づく経営者向け運気診断。3分で今の意識レベルを測定します。',
  provider: {
    '@type': 'Organization',
    name: '五次元経営株式会社',
  },
};

export default function ShindanPage() {
  return (
    <>
      <Script
        id="software-app-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      {/* Hero Section */}
        <section className={styles.hero} style={{ paddingBottom: '2rem' }}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>3分で現在地を知る</p>
            <h1 className={styles.heroTitle}>経営者運気診断</h1>
            <p className={styles.heroLead}>
              10の質問に直感で答えてください。<br />
              考えすぎないことが、正確な測定のコツです。
            </p>
          </div>
        </section>

        {/* Diagnosis Section */}
        <section className={styles.section} style={{ paddingTop: '1rem' }}>
          <div className={styles.container}>
            <ConsciousnessDiagnosis />
          </div>
        </section>
    </>
  );
}
