/**
 * app/5dmgmt/company/contact/page.tsx
 *
 * 【Phase 30】お問い合わせページ
 */

import Link from 'next/link';
import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import ContactForm from '@/components/contact/ContactForm';
import styles from '@/components/landing/LandingPage.module.css';

export const metadata = {
  title: 'お問い合わせ | 五次元経営',
  description: '五次元経営株式会社へのお問い合わせ。体験セッション、リトリート、その他のご質問はこちらから。',
};

const inquiryTypes = [
  '体験セッションについて',
  'リトリートについて',
  '法人向けサービスについて',
  'その他',
];

export default function ContactPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero} style={{ paddingBottom: '2rem' }}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>お問い合わせ</h1>
            <p className={styles.heroLead}>
              ご質問・ご相談はこちらからお気軽にどうぞ
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className={styles.section} style={{ paddingTop: '1rem' }}>
          <div className={styles.container}>
            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              <ContactForm inquiryTypes={inquiryTypes} />
            </div>
          </div>
        </section>

        {/* Other Options Section */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Other Options</p>
              <h2 className={styles.sectionTitle}>まずは診断から</h2>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{
                marginBottom: '1.5rem',
                color: 'var(--lp-text-secondary)',
                lineHeight: 1.8
              }}>
                お問い合わせの前に、まずは無料の運気診断で<br />
                今の意識レベルを確認してみませんか？
              </p>
              <Link href="/unki/shindan" className={`${styles.btn} ${styles.btnPrimary}`}>
                運気診断を受ける（無料）
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />
    </div>
  );
}
