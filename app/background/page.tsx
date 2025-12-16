/**
 * app/5dmgmt/background/page.tsx
 *
 * 【Phase 30】背景を読む インデックスページ
 */

import Link from 'next/link';
import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '背景を読む | 五次元経営',
  description: '五次元経営の背景にある理論と哲学。ホーキンズ博士の意識レベル理論から五次元経営のストーリーまで。',
};

const articles = [
  {
    title: '五次元経営ストーリー',
    description: '創業者がなぜ「意識レベル」に辿り着いたのか。個人的な体験から五次元経営が生まれるまでの物語。',
    href: '/background/story',
    tag: 'Origin Story',
  },
  {
    title: 'ホーキンズ博士の研究',
    description: 'デビッド・R・ホーキンズ博士とは誰か。意識レベル理論の科学的背景と、経営への応用。',
    href: '/background/hawkins',
    tag: 'Theory',
  },
  {
    title: '五次元経営の全体像',
    description: 'イマココ意識、宿曜、風水。3つのアプローチがどのように連携し、意識レベルを上げるのか。',
    href: '/background/overview',
    tag: 'Framework',
  },
];

export default function BackgroundIndexPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>なぜ、意識レベルなのか</p>
            <h1 className={styles.heroTitle}>背景を読む</h1>
            <p className={styles.heroLead}>
              五次元経営は、思いつきではありません。<br />
              科学的研究、実践経験、そして個人的な探求が<br />
              結晶化したものです。
            </p>
          </div>
        </section>

        {/* Articles Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Articles</p>
              <h2 className={styles.sectionTitle}>記事一覧</h2>
            </div>

            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              {articles.map((article, index) => (
                <Link
                  key={article.title}
                  href={article.href}
                  style={{
                    display: 'block',
                    padding: '2rem',
                    background: 'white',
                    borderRadius: '12px',
                    marginBottom: index < articles.length - 1 ? '1.5rem' : 0,
                    border: '1px solid var(--lp-border)',
                    textDecoration: 'none',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                  }}
                  className="article-card"
                >
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--lp-primary)',
                    backgroundColor: 'var(--lp-primary-light)',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    display: 'inline-block',
                    marginBottom: '1rem',
                  }}>
                    {article.tag}
                  </span>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--lp-text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    {article.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'var(--lp-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>まずは体験から</h2>
              <p className={styles.ctaLead}>
                理論を知ることも大切ですが、<br />
                体験なしには本当の理解は得られません。
              </p>
              <Link href="/unki/shindan" className={styles.ctaBtn}>
                運気診断を受ける（無料）
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />

      <style>{`
        .article-card:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
