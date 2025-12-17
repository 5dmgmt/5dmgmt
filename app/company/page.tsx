/**
 * app/5dmgmt/company/page.tsx
 *
 * 【Phase 30】会社について インデックスページ
 */

import Link from 'next/link';
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
    href: '/company/profile',
  },
  {
    title: '特定商取引法に基づく表記',
    description: '特定商取引法に基づく表示事項',
    href: '/company/tokushoho',
  },
  {
    title: 'お問い合わせ',
    description: 'ご質問・ご相談はこちらから',
    href: '/company/contact',
  },
];

export default function CompanyIndexPage() {
  return (
    <>
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
            <div className={styles.cardContainerNarrow}>
              {pages.map((page) => (
                <Link
                  key={page.title}
                  href={page.href}
                  className={styles.linkCard}
                >
                  <h3 className={styles.linkCardTitle}>{page.title}</h3>
                  <p className={styles.linkCardDescription}>{page.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
    </>
  );
}
