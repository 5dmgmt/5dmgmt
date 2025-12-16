/**
 * app/5dmgmt/unki/shukuyo/page.tsx
 *
 * 【Phase 30】宿曜鑑定ページ
 */

import Link from 'next/link';
import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import styles from '@/components/landing/LandingPage.module.css';

export const metadata = {
  title: '宿曜鑑定 | 五次元経営',
  description: '生年月日から導く潜在意識の設計図。27宿の特性と意識レベル向上の方向性を解読します。',
};

export default function ShukuyoPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>生まれた瞬間に刻まれた設計図</p>
            <h1 className={styles.heroTitle}>宿曜鑑定</h1>
            <p className={styles.heroLead}>
              月の位置が決める、27の宿（しゅく）。<br />
              占いではなく、潜在意識のパターンを知る地図です。
            </p>
          </div>
        </section>

        {/* Coming Soon */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>準備中</h2>
              <p className={styles.ctaLead}>
                宿曜鑑定機能は現在準備中です。<br />
                まずは運気診断で、今の意識レベルを測定してみてください。
              </p>
              <Link href="/unki/shindan" className={styles.ctaBtn}>
                経営者運気診断を受ける（無料）
              </Link>
            </div>
          </div>
        </section>

        {/* About Shukuyo */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>About</p>
              <h2 className={styles.sectionTitle}>宿曜とは</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                宿曜は、インドで生まれ、中国・日本で発展した占術です。
                生まれた日の月の位置から27の宿を割り出し、その人の本質を読み解きます。
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                西洋占星術が太陽を中心とするのに対し、宿曜は月を重視します。
                月は潜在意識、感情、直感を象徴するため、表面的な性格ではなく、
                「無意識のパターン」を知るのに適しています。
              </p>
              <p>
                五次元経営では、宿曜を「占い」としてではなく、
                意識レベルを上げやすい方向性を見つけるための「地図」として活用しています。
              </p>
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />
    </div>
  );
}
