/**
 * app/blog/page.tsx
 *
 * ブログ/コラム インデックスページ
 */

import Link from 'next/link';
import styles from '@/components/landing/LandingPage.module.css';

// ブログは6時間キャッシュ
export const revalidate = 21600;

export const metadata = {
  title: 'ブログ・コラム | 意識経営の実践知 | 五次元経営',
  description: '五次元経営のブログ・コラム。意識レベル、運気、宿曜、マインドフルネス経営についての記事を発信しています。',
  keywords: ['意識経営', '運気ブログ', '経営者コラム', 'マインドフルネス経営', '宿曜コラム'],
  openGraph: {
    title: 'ブログ・コラム | 五次元経営',
    description: '意識レベル、運気、宿曜、マインドフルネス経営についての記事。',
  },
};

// 記事データ
const articles = [
  {
    slug: 'team-relationship-shukuyo',
    title: 'チームの人間関係がギクシャク？宿曜で相性を知る',
    excerpt: 'チームの人間関係に悩む経営者へ。宿曜占星術を使って、メンバー同士の相性を理解し、最適な配置やコミュニケーション方法を見つける方法を解説します。',
    category: '宿曜',
    date: '2024-12-15',
    readTime: '6分',
  },
  {
    slug: 'motivation-consciousness-level',
    title: '部下のモチベーションが上がらない？意識レベルと動機づけの関係',
    excerpt: '部下のモチベーション管理に悩む経営者へ。ホーキンズ博士の意識レベル理論から、効果的な動機づけの方法を解説します。',
    category: '意識レベル',
    date: '2024-12-10',
    readTime: '7分',
  },
  {
    slug: 'business-decision-intuition',
    title: '経営判断に迷う？直感力を高める5つの方法',
    excerpt: '経営判断で迷いが多い経営者へ。データだけでは見えない「直感」を磨く方法を、意識研究の観点から解説します。',
    category: '意識レベル',
    date: '2024-12-05',
    readTime: '5分',
  },
  {
    slug: 'burnout-imakoko-recovery',
    title: '燃え尽き症候群かも？イマココで回復する方法',
    excerpt: '燃え尽き症候群の兆候を感じる経営者へ。「イマココ」の実践で心身を回復する方法を解説します。',
    category: 'マインドフルネス',
    date: '2024-11-30',
    readTime: '6分',
  },
  {
    slug: 'hiring-mismatch-shukuyo',
    title: '採用後のミスマッチを防ぐ：宿曜で適性を見る',
    excerpt: '採用のミスマッチに悩む経営者・人事へ。宿曜占星術を採用プロセスに活用する方法を解説します。',
    category: '宿曜',
    date: '2024-11-25',
    readTime: '7分',
  },
  {
    slug: 'leadership-consciousness',
    title: 'リーダーシップに自信がない？意識レベルとリーダーシップの関係',
    excerpt: 'リーダーシップに自信が持てない経営者へ。意識レベル理論から、本当のリーダーシップとは何かを解説します。',
    category: '意識レベル',
    date: '2024-11-20',
    readTime: '8分',
  },
  {
    slug: 'meeting-productivity-shukuyo',
    title: '会議が非生産的？チームの宿曜構成を見直す',
    excerpt: '会議の生産性に悩む経営者へ。チームメンバーの宿曜構成から、最適な会議のあり方を考えます。',
    category: '宿曜',
    date: '2024-11-15',
    readTime: '6分',
  },
  {
    slug: 'stress-sleep-mindfulness',
    title: 'ストレスで眠れない？マインドフルネス入門',
    excerpt: 'ストレスによる不眠に悩む経営者へ。マインドフルネスの基本と、睡眠改善への活用法を解説します。',
    category: 'マインドフルネス',
    date: '2024-11-10',
    readTime: '5分',
  },
  {
    slug: 'ma-integration-5d',
    title: 'M&A後の組織統合：五次元経営のアプローチ',
    excerpt: 'M&A後の組織統合（PMI）に悩む経営者へ。五次元経営の視点から、人と組織の統合を成功させる方法を解説します。',
    category: '経営',
    date: '2024-11-05',
    readTime: '8分',
  },
  {
    slug: 'corporate-culture-consciousness',
    title: '経営理念が浸透しない？意識レベルと企業文化の関係',
    excerpt: '経営理念の浸透に悩む経営者へ。意識レベル理論から、理念が自然に浸透する組織の作り方を解説します。',
    category: '意識レベル',
    date: '2024-11-01',
    readTime: '7分',
  },
];

export default function BlogIndexPage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.heroCatch}>Insights</p>
          <h1 className={styles.heroTitle}>
            ブログ・コラム
          </h1>
          <p className={styles.heroLead}>
            意識経営の実践知を、<br />
            記事でお届けします。
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {articles.map((article, index) => (
              <article
                key={article.slug}
                style={{
                  padding: '2rem',
                  background: 'white',
                  borderRadius: '12px',
                  marginBottom: index < articles.length - 1 ? '1.5rem' : 0,
                  border: '1px solid var(--lp-border)',
                }}
              >
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--lp-primary)',
                    backgroundColor: 'var(--lp-primary-light)',
                    padding: '4px 12px',
                    borderRadius: '100px',
                  }}>
                    {article.category}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--lp-text-muted)',
                    padding: '4px 0',
                  }}>
                    {article.date} ・ {article.readTime}で読める
                  </span>
                </div>

                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--lp-text-primary)',
                  marginBottom: '0.75rem',
                  lineHeight: 1.4,
                }}>
                  <Link
                    href={`/blog/${article.slug}`}
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    {article.title}
                  </Link>
                </h2>

                <p style={{
                  fontSize: '0.9375rem',
                  color: 'var(--lp-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}>
                  {article.excerpt}
                </p>

                <Link
                  href={`/blog/${article.slug}`}
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--lp-primary)',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  続きを読む →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>まずは今の状態を知る</h2>
            <p className={styles.ctaLead}>
              記事を読んで興味が湧いたら、<br />
              今のあなたの意識レベルを測定してみませんか？
            </p>
            <Link href="/unki/shindan" className={styles.ctaBtn}>
              運気診断を受ける（無料）
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
