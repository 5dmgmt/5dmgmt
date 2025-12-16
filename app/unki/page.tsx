/**
 * app/5dmgmt/unki/page.tsx
 *
 * 【Phase 30】運気を知る インデックスページ
 * - ISR: 1時間ごとに再生成
 */

import Link from 'next/link';
import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '運気を知る | 五次元経営',
  description: 'ホーキンズ博士の意識レベルに基づく経営者運気診断と、宿曜による潜在意識パターンの解読。',
};

const services = [
  {
    title: '経営者運気診断',
    description: '3分で今の意識レベルを測定。ホーキンズ・スケールに基づく10の質問で、あなたの現在地を可視化します。',
    href: '/5dmgmt/unki/shindan',
    cta: '診断を受ける（無料）',
    tag: '3分・無料',
  },
  {
    title: '宿曜鑑定',
    description: '生年月日から導く、あなたの潜在意識の設計図。27宿の特性と、意識レベルを上げやすい方向性を解読します。',
    href: '/5dmgmt/unki/shukuyo',
    cta: '宿曜を調べる',
    tag: '生年月日から算出',
  },
];

export default function UnkiIndexPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>測れないものは、変えられない</p>
            <h1 className={styles.heroTitle}>運気を知る</h1>
            <p className={styles.heroLead}>
              経営の成果は、戦略や努力だけでは決まりません。<br />
              あなた自身の「意識レベル」が、すべてに影響しています。<br />
              <br />
              まずは、今の自分を知ることから。
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Services</p>
              <h2 className={styles.sectionTitle}>2つの測定アプローチ</h2>
            </div>

            <div className={styles.featuresGrid} style={{ maxWidth: '800px', margin: '0 auto' }}>
              {services.map((service) => (
                <div key={service.title} className={styles.featureCard}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--lp-primary)',
                    backgroundColor: 'var(--lp-primary-light)',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    display: 'inline-block',
                    marginBottom: '1rem',
                  }}>
                    {service.tag}
                  </span>
                  <h3>{service.title}</h3>
                  <p style={{ marginBottom: '1.5rem' }}>{service.description}</p>
                  <Link
                    href={service.href}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    style={{ display: 'inline-block' }}
                  >
                    {service.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explanation Section */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>About</p>
              <h2 className={styles.sectionTitle}>ホーキンズ・スケールとは</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                デビッド・R・ホーキンズ博士（1927-2012）は、精神科医として20年以上の臨床経験を経た後、
                キネシオロジー（筋肉反応テスト）を用いた意識研究を行いました。
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                その結果、人間の意識には「レベル」があり、それが1から1000のスケールで測定できることを発見。
                著書『Power vs. Force』（邦題：パワーか、フォースか）で発表しました。
              </p>
              <p>
                このスケールは、個人の意識だけでなく、組織や場のエネルギーにも適用できます。
                五次元経営では、このスケールを経営に応用し、「運気」として捉えています。
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>まずは3分で測定</h2>
              <p className={styles.ctaLead}>
                10の質問に直感で答えるだけ。<br />
                今のあなたの意識レベルがわかります。
              </p>
              <Link href="/unki/shindan" className={styles.ctaBtn}>
                経営者運気診断を受ける（無料）
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />
    </div>
  );
}
