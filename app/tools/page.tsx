/**
 * app/tools/page.tsx
 *
 * 整った後の道具 インデックスページ
 * 問いかけ型：「気づきを日常でどう維持しますか？」
 */

import Link from 'next/link';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '整った後の道具 | 五次元経営',
  description: '気づきを日常で維持するためのツール。意識が整った経営者のための実践的サポート。',
};

const tools = [
  {
    title: 'Founders Direct',
    question: '「重要だけど緊急じゃない」ことに、時間を使えていますか？',
    description: '日々の忙しさが、あなたを「今」から引き離します。AIが雑務を整理し、本当に大切なことに集中できる環境を作ります。',
    features: [
      'AI経営アシスタント',
      'OKR自動生成',
      'タスク優先順位の最適化',
    ],
    href: 'https://app.foundersdirect.jp/',
    cta: 'サービスを見る',
    tag: 'SaaS',
  },
  {
    title: '経営者コーチング',
    question: '一人で、気づきを維持できますか？',
    description: '日常に戻ると、慣れたパターンに引き戻されます。定期的な対話が、気づきを維持し、深める助けになります。',
    features: [
      '月2回の1on1セッション',
      '意識レベル定期測定',
      'チャットサポート',
    ],
    href: '/company/contact',
    cta: 'お問い合わせ',
    tag: 'Coaching',
  },
];

export default function ToolsIndexPage() {
  return (
    <>
      {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>
              気づきを日常で<br />
              どう維持しますか？
            </h1>
            <p className={styles.heroLead}>
              セッションやリトリートで、気づきは深まります。<br />
              でも、日常に戻ると、すぐに忘れてしまう。<br />
              <br />
              これは、あなたの問題ではありません。<br />
              環境と仕組みの問題です。
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {tools.map((tool, index) => (
                <div
                  key={tool.title}
                  style={{
                    padding: '2.5rem',
                    background: 'white',
                    borderRadius: '16px',
                    marginBottom: index < tools.length - 1 ? '2rem' : 0,
                    border: '1px solid var(--lp-border)',
                  }}
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
                    {tool.tag}
                  </span>

                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--lp-text-primary)',
                    marginBottom: '0.5rem',
                  }}>
                    {tool.question}
                  </h2>

                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--lp-text-muted)',
                    marginBottom: '1rem',
                  }}>
                    {tool.title}
                  </p>

                  <p style={{
                    lineHeight: 1.8,
                    color: 'var(--lp-text-secondary)',
                    marginBottom: '1.5rem',
                  }}>
                    {tool.description}
                  </p>

                  <div style={{
                    backgroundColor: '#fafafa',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem'
                  }}>
                    <ul style={{
                      margin: 0,
                      paddingLeft: '1.25rem',
                      fontSize: '0.875rem',
                      lineHeight: 1.8,
                      color: 'var(--lp-text-secondary)',
                    }}>
                      {tool.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={tool.href}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                  >
                    {tool.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Question Section */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: 500,
                color: 'var(--lp-text-primary)',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}>
                道具に頼っていいのか？
              </p>
              <p style={{
                lineHeight: 2,
                color: 'var(--lp-text-secondary)',
              }}>
                気づきは、道具では得られません。<br />
                でも、気づきを「維持する」ことは、<br />
                環境と仕組みに大きく左右されます。<br />
                <br />
                道具は、あなたを助けるためにあります。<br />
                使うか使わないかは、あなたが決めてください。
              </p>

              <div style={{ marginTop: '2.5rem' }}>
                <Link href="/unki/shindan" className={`${styles.btn} ${styles.btnPrimary}`}>
                  まずは今の状態を知る
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
