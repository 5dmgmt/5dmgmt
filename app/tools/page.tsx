/**
 * app/5dmgmt/tools/page.tsx
 *
 * 【Phase 30】整った後の道具 インデックスページ
 */

import Link from 'next/link';
import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '整った後の道具 | 五次元経営',
  description: '意識レベルが整った経営者のための実践ツール。AIによる第二領域の自動化から、経営ダッシュボードまで。',
};

const tools = [
  {
    title: 'Founders Direct',
    description: '経営者の第二領域を支援するクラウドサービス。AIが日々のタスクを整理し、「重要だが緊急でない」仕事に集中できる環境を作ります。',
    features: [
      'AI経営アシスタント',
      'OKR自動生成',
      'タスク優先順位の最適化',
      '経営ダッシュボード',
    ],
    href: 'https://app.foundersdirect.jp/',
    cta: 'サービスを見る',
    tag: 'SaaS',
  },
  {
    title: '経営者コーチング',
    description: '月2回の1on1セッションで、意識レベルの維持と向上をサポート。経営の悩みを、意識の観点から解決します。',
    features: [
      '月2回のコーチングセッション',
      '意識レベル定期測定',
      'チャットサポート',
      '経営課題の意識的解決',
    ],
    href: '/company/contact',
    cta: 'お問い合わせ',
    tag: 'Coaching',
  },
];

export default function ToolsIndexPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>意識が整った後に使う道具</p>
            <h1 className={styles.heroTitle}>整った後の道具</h1>
            <p className={styles.heroLead}>
              意識レベルが低い状態でツールを使っても、<br />
              「忙しさ」が増すだけです。<br />
              <br />
              整ってから使う道具は、成果を何倍にもします。
            </p>
          </div>
        </section>

        {/* Why After Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Why After?</p>
              <h2 className={styles.sectionTitle}>なぜ「整った後」なのか</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                多くの経営者がAIツールや生産性ツールを導入しますが、
                期待した効果が出ないことがあります。
                ツールが悪いのではなく、使う側の意識が整っていないからです。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                意識レベル200以下では、恐怖や焦りからツールを「もっと効率よく」使おうとします。
                結果、タスクは増え、「忙しさ」が加速します。
              </p>
              <p style={{ color: 'var(--lp-text-secondary)' }}>
                意識レベル400以上になると、ツールは「手放す」ために使えます。
                本当に重要なことに集中し、それ以外はAIや仕組みに任せる。
                ツールが、自由の道具になります。
              </p>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className={`${styles.section} ${styles.architectureSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Tools</p>
              <h2 className={styles.sectionTitle}>提供ツール</h2>
            </div>

            <div className={styles.featuresGrid} style={{ maxWidth: '900px', margin: '0 auto' }}>
              {tools.map((tool) => (
                <div key={tool.title} className={styles.featureCard} style={{ padding: '2rem' }}>
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

                  <h3 style={{ marginBottom: '1rem' }}>{tool.title}</h3>
                  <p style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>{tool.description}</p>

                  <div style={{
                    backgroundColor: '#fafafa',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem'
                  }}>
                    <p style={{
                      fontSize: '0.75rem',
                      color: 'var(--lp-text-muted)',
                      marginBottom: '0.5rem'
                    }}>
                      機能
                    </p>
                    <ul style={{
                      margin: 0,
                      paddingLeft: '1.25rem',
                      fontSize: '0.875rem',
                      lineHeight: 1.8
                    }}>
                      {tool.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={tool.href}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    style={{ display: 'inline-block' }}
                  >
                    {tool.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>まずは意識を整える</h2>
              <p className={styles.ctaLead}>
                ツールの効果を最大化するために、<br />
                まずは今の意識レベルを確認しましょう。
              </p>
              <Link href="/unki/shindan" className={styles.ctaBtn}>
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
