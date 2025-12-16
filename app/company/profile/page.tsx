/**
 * app/5dmgmt/company/profile/page.tsx
 *
 * 【Phase 30】会社概要ページ
 */

import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '会社概要 | 五次元経営',
  description: '五次元経営株式会社の会社概要。',
};

const companyInfo = [
  { label: '商号', value: '五次元経営株式会社' },
  { label: '英文名', value: '5D Management Inc.' },
  { label: '設立', value: '2024年' },
  { label: '代表取締役', value: '（お問い合わせください）' },
  { label: '所在地', value: '東京都（詳細はお問い合わせください）' },
  { label: '事業内容', value: '経営コンサルティング、コーチング、教育研修事業、ソフトウェア開発' },
  { label: 'URL', value: 'https://www.5dmgmt.com/' },
];

export default function ProfilePage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero} style={{ paddingBottom: '2rem' }}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>会社概要</h1>
          </div>
        </section>

        {/* Company Info Section */}
        <section className={styles.section} style={{ paddingTop: '1rem' }}>
          <div className={styles.container}>
            <div style={{
              maxWidth: '700px',
              margin: '0 auto',
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid var(--lp-border)'
            }}>
              <dl style={{ margin: 0 }}>
                {companyInfo.map((item, index) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      padding: '1rem 0',
                      borderBottom: index < companyInfo.length - 1 ? '1px solid var(--lp-border)' : 'none',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}
                  >
                    <dt style={{
                      width: '140px',
                      fontWeight: 600,
                      color: 'var(--lp-text-primary)',
                      flexShrink: 0
                    }}>
                      {item.label}
                    </dt>
                    <dd style={{
                      margin: 0,
                      color: 'var(--lp-text-secondary)',
                      flex: 1
                    }}>
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Mission</p>
              <h2 className={styles.sectionTitle}>ミッション</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{
                fontSize: '1.25rem',
                lineHeight: 1.8,
                color: 'var(--lp-text-primary)'
              }}>
                経営者の意識レベルを上げ、<br />
                「ごきげん経営」を日本に広める
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Vision</p>
              <h2 className={styles.sectionTitle}>ビジョン</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                私たちは、経営者の意識レベルが変われば、
                組織が変わり、社会が変わると信じています。
              </p>
              <p style={{ color: 'var(--lp-text-secondary)' }}>
                「爆運帯」（意識レベル500以上）の経営者が増えることで、
                従業員が自発的に輝き、顧客が自然と集まる会社が増える。
                そんな日本を目指しています。
              </p>
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />
    </div>
  );
}
