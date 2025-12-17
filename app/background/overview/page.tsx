/**
 * app/5dmgmt/background/overview/page.tsx
 *
 * 【Phase 30】五次元経営の全体像ページ
 */

import Link from 'next/link';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '五次元経営の全体像 | 五次元経営',
  description: 'イマココ意識、宿曜、風水。3つのアプローチがどのように連携し、意識レベルを上げるのか。',
};

const approaches = [
  {
    title: 'イマココ意識',
    subtitle: '内なる変容',
    description: '「今この瞬間」に意識を置くことで、過去の恐怖や未来への不安から解放されます。思考のノイズが静まり、直感が研ぎ澄まされる状態を作ります。',
    practices: [
      '瞑想・呼吸法',
      'マインドフルネス実践',
      '感情の観察と手放し',
      'プレゼンスの訓練',
    ],
    effect: '意識レベルの直接的な向上',
  },
  {
    title: '宿曜',
    subtitle: '自己理解',
    description: '生まれた日の月の位置から、27の宿を割り出します。占いではなく、潜在意識のパターンを知る地図として活用します。',
    practices: [
      '宿曜による自己分析',
      '強みと課題の特定',
      '相性と関係性の理解',
      '月のサイクル活用',
    ],
    effect: '効率的な意識向上の方向性',
  },
  {
    title: '風水',
    subtitle: '環境の調整',
    description: '空間のエネルギーが意識レベルに直接影響します。オフィスや自宅の「気の流れ」を整えることで、意識を上げやすい環境を作ります。',
    practices: [
      '不要物の断捨離',
      '空間の浄化',
      '配置の最適化',
      'エネルギーの流れの調整',
    ],
    effect: '意識レベルを保つ環境作り',
  },
];

export default function OverviewPage() {
  return (
    <>
      {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>Framework</p>
            <h1 className={styles.heroTitle}>五次元経営の全体像</h1>
            <p className={styles.heroLead}>
              3つのアプローチが連携し、<br />
              意識レベルを持続的に上げる
            </p>
          </div>
        </section>

        {/* Why 3 Approaches */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Why</p>
              <h2 className={styles.sectionTitle}>なぜ3つのアプローチが必要なのか</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                意識レベルを上げることは、瞑想だけでも、環境整備だけでも、
                知識を得ることだけでもできません。
                これらが連携して初めて、持続的な変容が起こります。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                <strong>イマココ意識</strong>は、意識レベルを直接上げる「エンジン」です。
                しかし、自分のパターンを知らなければ、効率的に進めません。
                <strong>宿曜</strong>は、その効率的な道筋を示す「地図」です。
              </p>
              <p style={{ color: 'var(--lp-text-secondary)' }}>
                そして、意識レベルを上げても、環境が整っていなければ、
                すぐに元に戻ってしまいます。
                <strong>風水</strong>は、上がった意識を保つ「土台」を作ります。
              </p>
            </div>
          </div>
        </section>

        {/* 3 Approaches Detail */}
        <section className={`${styles.section} ${styles.architectureSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Approaches</p>
              <h2 className={styles.sectionTitle}>3つのアプローチ</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {approaches.map((approach, index) => (
                <div key={approach.title} style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid var(--lp-border)',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--lp-primary)',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}>
                      {index + 1}
                    </span>
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--lp-text-primary)',
                        marginBottom: '0.125rem'
                      }}>
                        {approach.title}
                      </h3>
                      <p style={{
                        fontSize: '0.75rem',
                        color: 'var(--lp-primary)'
                      }}>
                        {approach.subtitle}
                      </p>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    color: 'var(--lp-text-secondary)',
                    marginBottom: '1.5rem'
                  }}>
                    {approach.description}
                  </p>

                  <div style={{
                    background: '#fafafa',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}>
                    <p style={{
                      fontSize: '0.75rem',
                      color: 'var(--lp-text-muted)',
                      marginBottom: '0.5rem'
                    }}>
                      主な実践
                    </p>
                    <ul style={{
                      margin: 0,
                      paddingLeft: '1rem',
                      fontSize: '0.875rem',
                      color: 'var(--lp-text-secondary)',
                      lineHeight: 1.8
                    }}>
                      {approach.practices.map((practice) => (
                        <li key={practice}>{practice}</li>
                      ))}
                    </ul>
                  </div>

                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--lp-primary)',
                    fontWeight: 500
                  }}>
                    {approach.effect}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Integration</p>
              <h2 className={styles.sectionTitle}>3つの連携</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                五次元経営では、この3つのアプローチを以下の順序で実践します。
              </p>

              <ol style={{
                paddingLeft: '1.5rem',
                color: 'var(--lp-text-secondary)',
                marginBottom: '1.5rem'
              }}>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>運気診断</strong>で現在の意識レベルを測定
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>宿曜鑑定</strong>で自分のパターンと方向性を把握
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>風水</strong>で環境を整え、上がりやすい土台を作る
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>イマココ意識</strong>の実践で意識レベルを上げる
                </li>
                <li>
                  定期的な<strong>測定</strong>で進捗を確認し、調整する
                </li>
              </ol>

              <p style={{ color: 'var(--lp-text-secondary)' }}>
                このサイクルを回すことで、意識レベルは着実に、持続的に上がっていきます。
                3ヶ月で50-100ポイントの向上が、多くの経営者で確認されています。
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>まずは現在地を知る</h2>
              <p className={styles.ctaLead}>
                3分の運気診断で、今の意識レベルを測定。<br />
                そこから、あなたに合ったアプローチが見えてきます。
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
