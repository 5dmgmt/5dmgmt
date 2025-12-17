/**
 * app/5dmgmt/background/hawkins/page.tsx
 *
 * 【Phase 30】ホーキンズ博士の研究ページ
 */

import Link from 'next/link';
import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: 'ホーキンズ博士の意識レベル理論 | 意識の地図解説 | 五次元経営',
  description: 'デビッド・R・ホーキンズ博士の意識レベル理論を完全解説。1-1000の意識スケール、パワーとフォースの違い、経営への応用方法。',
  keywords: ['ホーキンズ', '意識レベル', '意識の地図', 'パワーかフォースか', 'Power vs Force', '意識スケール'],
  openGraph: {
    title: 'ホーキンズ博士の意識レベル理論 | 五次元経営',
    description: 'デビッド・R・ホーキンズ博士の意識レベル理論を完全解説。意識の地図と経営への応用。',
  },
};

const consciousnessLevels = [
  { level: '700-1000', name: '悟り', emotion: '言葉を超えた', description: '純粋な意識' },
  { level: '600', name: '平和', emotion: '至福', description: '完全な静寂' },
  { level: '540', name: '喜び', emotion: '穏やかさ', description: '内なる喜び' },
  { level: '500', name: '愛', emotion: '崇敬', description: '無条件の愛' },
  { level: '400', name: '理性', emotion: '理解', description: '知性と論理' },
  { level: '350', name: '受容', emotion: '許し', description: 'あるがままを受け入れる' },
  { level: '310', name: '意欲', emotion: '楽観', description: '前向きな意志' },
  { level: '250', name: '中立', emotion: '信頼', description: 'どちらでもいい' },
  { level: '200', name: '勇気', emotion: '肯定', description: 'パワーの始まり' },
  { level: '175', name: 'プライド', emotion: '軽蔑', description: '見栄と優越感' },
  { level: '150', name: '怒り', emotion: '憎しみ', description: '攻撃性' },
  { level: '125', name: '欲望', emotion: '渇望', description: '執着' },
  { level: '100', name: '恐怖', emotion: '不安', description: '脅威への反応' },
  { level: '75', name: '悲しみ', emotion: '後悔', description: '喪失感' },
  { level: '50', name: '無気力', emotion: '絶望', description: 'あきらめ' },
  { level: '30', name: '罪悪感', emotion: '非難', description: '自己破壊' },
  { level: '20', name: '恥', emotion: '屈辱', description: '存在否定' },
];

export default function HawkinsPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>Theory</p>
            <h1 className={styles.heroTitle}>ホーキンズ博士の研究</h1>
            <p className={styles.heroLead}>
              意識レベル理論の創始者<br />
              デビッド・R・ホーキンズ博士の研究について
            </p>
          </div>
        </section>

        {/* About Hawkins */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>About</p>
              <h2 className={styles.sectionTitle}>デビッド・R・ホーキンズ博士とは</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                デビッド・R・ホーキンズ（David R. Hawkins, 1927-2012）は、
                アメリカの精神科医、意識研究者、著作家です。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                50年以上の臨床経験と、数百万人規模の研究データから、
                人間の意識を1から1000のスケールで測定する方法を開発しました。
                この「意識の地図」は、著書『Power vs. Force』（邦題：パワーか、フォースか）で
                発表され、世界的なベストセラーとなりました。
              </p>
              <p style={{ color: 'var(--lp-text-secondary)' }}>
                ホーキンズ博士の研究は、キネシオロジー（筋肉反応テスト）を用いた
                独自の測定方法に基づいています。主観や信念ではなく、
                身体の反応を通じて意識レベルを客観的に測定できる点が特徴です。
              </p>
            </div>
          </div>
        </section>

        {/* Consciousness Scale */}
        <section className={`${styles.section} ${styles.architectureSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Scale</p>
              <h2 className={styles.sectionTitle}>意識レベルの地図</h2>
              <p className={styles.sectionLead}>
                200が分岐点。200以下は「フォース」、200以上は「パワー」の領域
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                maxWidth: '700px',
                margin: '0 auto',
                borderCollapse: 'collapse',
                fontSize: '0.875rem',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--lp-border)' }}>
                    <th style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--lp-text-muted)' }}>レベル</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--lp-text-muted)' }}>状態</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--lp-text-muted)' }}>感情</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--lp-text-muted)' }}>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  {consciousnessLevels.map((item) => {
                    const levelNum = parseInt(item.level.split('-')[0]);
                    const isAbove200 = levelNum >= 200;
                    const isHighlight = levelNum >= 500 && levelNum < 600;

                    return (
                      <tr key={item.level} style={{
                        borderBottom: '1px solid var(--lp-border)',
                        backgroundColor: isHighlight ? 'var(--lp-primary-light)' :
                                        levelNum === 200 ? '#e0f7fa' : 'transparent',
                      }}>
                        <td style={{
                          padding: '10px 12px',
                          fontWeight: 600,
                          color: isAbove200 ? 'var(--lp-primary)' : 'var(--lp-text-muted)',
                        }}>
                          {item.level}
                        </td>
                        <td style={{
                          padding: '10px 12px',
                          fontWeight: isHighlight ? 600 : 400,
                          color: isHighlight ? 'var(--lp-primary)' : 'var(--lp-text-primary)',
                        }}>
                          {item.name}
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--lp-text-secondary)' }}>
                          {item.emotion}
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--lp-text-secondary)' }}>
                          {item.description}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p style={{
              textAlign: 'center',
              fontSize: '0.875rem',
              color: 'var(--lp-text-muted)',
              marginTop: '1.5rem'
            }}>
              ※レベル200が「パワー」と「フォース」の分岐点
            </p>
          </div>
        </section>

        {/* Application to Business */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Application</p>
              <h2 className={styles.sectionTitle}>経営への応用</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                ホーキンズ博士の研究は、個人の意識だけでなく、
                組織や場のエネルギーにも応用できると言われています。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                経営者の意識は、組織全体に影響を与えるようです。
                恐怖や怒りをベースにした経営は、短期的には成果が出ることもありますが、
                長期的には疲弊を招きやすいと言われています。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                一方、愛や喜びをベースにした経営者のもとでは、
                従業員が自発的に動き、顧客も自然と集まってくる——
                そんな現象が起こりやすくなるようです。
              </p>
              <p style={{ color: 'var(--lp-text-secondary)' }}>
                五次元経営では、ホーキンズ博士の研究を実践的なフレームワークとして活用し、
                経営者の意識を「爆運帯」（500以上）に近づけていくことを目指しています。
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>今の意識レベルを測定する</h2>
              <p className={styles.ctaLead}>
                ホーキンズ・スケールに基づく10の質問で、<br />
                あなたの現在の意識レベルを診断します。
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
