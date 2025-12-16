/**
 * app/5dmgmt/company/page.tsx
 *
 * 【Phase 30】会社について インデックスページ
 */

import Link from 'next/link';
import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '会社について | 五次元経営',
  description: '五次元経営株式会社の会社概要、特定商取引法に基づく表記、お問い合わせ。',
};

const pages = [
  {
    title: '会社概要',
    description: '五次元経営株式会社の会社情報',
    href: '/5dmgmt/company/profile',
  },
  {
    title: '特定商取引法に基づく表記',
    description: '特定商取引法に基づく表示事項',
    href: '/5dmgmt/company/tokushoho',
  },
  {
    title: 'お問い合わせ',
    description: 'ご質問・ご相談はこちらから',
    href: '/5dmgmt/company/contact',
  },
];

export default function CompanyIndexPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>会社について</h1>
            <p className={styles.heroLead}>
              五次元経営株式会社
            </p>
          </div>
        </section>

        {/* Pages Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              {pages.map((page, index) => (
                <Link
                  key={page.title}
                  href={page.href}
                  style={{
                    display: 'block',
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    marginBottom: index < pages.length - 1 ? '1rem' : 0,
                    border: '1px solid var(--lp-border)',
                    textDecoration: 'none',
                    transition: 'box-shadow 0.2s',
                  }}
                  className="page-link"
                >
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--lp-text-primary)',
                    marginBottom: '0.25rem'
                  }}>
                    {page.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--lp-text-secondary)',
                    margin: 0
                  }}>
                    {page.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />

      <style>{`
        .page-link:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </div>
  );
}
