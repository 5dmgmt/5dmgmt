/**
 * app/5dmgmt/unki/shindan/page.tsx
 *
 * 【Phase 30】経営者運気診断ページ
 * - ConsciousnessDiagnosis コンポーネントを表示
 */

import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import ConsciousnessDiagnosis from '@/components/diagnosis/ConsciousnessDiagnosis';
import styles from '@/components/landing/LandingPage.module.css';

export const metadata = {
  title: '経営者運気診断 | 五次元経営',
  description: 'ホーキンズ博士の意識レベルに基づく経営者向け運気診断。3分で今の意識レベルを測定します。',
};

export default function ShindanPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
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
      </main>

      <FiveDmgmtFooter />
    </div>
  );
}
