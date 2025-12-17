/**
 * app/5dmgmt/taiken/imakoko/page.tsx
 *
 * 【Phase 30】イマココ体験セッションページ
 */

import Link from 'next/link';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: 'イマココ体験セッション | 五次元経営',
  description: '「思考の外にある静けさ」を体験する90分。初回無料のオンライン・対面セッション。',
};

const sessionContents = [
  {
    time: '0-15分',
    title: '現状確認',
    description: '今の意識レベルと、抱えている課題をヒアリング',
  },
  {
    time: '15-45分',
    title: 'イマココ体験',
    description: '誘導瞑想とワークを通じて「思考の外」を体験',
  },
  {
    time: '45-75分',
    title: '実践ワーク',
    description: '日常で意識レベルを保つための具体的な方法',
  },
  {
    time: '75-90分',
    title: '質疑応答',
    description: '疑問点の解消と今後のステップの確認',
  },
];

export default function ImakokoPage() {
  return (
    <>
      {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>思考の外にある静けさを、90分で体験する</p>
            <h1 className={styles.heroTitle}>イマココ体験セッション</h1>
            <p className={styles.heroLead}>
              忙しい経営者のための、90分の意識トレーニング。<br />
              オンラインでも対面でも、あなたのペースで。
            </p>
            <div className={styles.heroActions}>
              <Link href="/company/contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                セッションを予約する
              </Link>
            </div>
            <p className={styles.heroReassurance}>初回無料・オンライン対応可</p>
          </div>
        </section>

        {/* What is Imakoko Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>About</p>
              <h2 className={styles.sectionTitle}>「イマココ」とは</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                「イマココ」とは、過去への後悔や未来への不安から離れ、
                「今この瞬間」に完全に在る状態を指します。
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                多くの経営者が「わかっているのに変えられない」のは、
                無意識に過去のパターンを繰り返しているからです。
                過去の失敗への恐れ、成功への執着が、意識を「今」から引き離しています。
              </p>
              <p>
                イマココ意識に入ると、思考のノイズが静まり、直感が研ぎ澄まされます。
                問題が問題でなくなり、最適な解決策が自然に浮かんできます。
                この状態を、体験を通じて「知って」いただくのが、このセッションの目的です。
              </p>
            </div>
          </div>
        </section>

        {/* Session Flow Section */}
        <section className={`${styles.section} ${styles.architectureSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Session Flow</p>
              <h2 className={styles.sectionTitle}>セッションの流れ</h2>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              {sessionContents.map((item, index) => (
                <div
                  key={item.title}
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    padding: '1.5rem 0',
                    borderBottom: index < sessionContents.length - 1 ? '1px solid var(--lp-border)' : 'none',
                  }}
                >
                  <div style={{
                    flexShrink: 0,
                    width: '80px',
                    fontSize: '0.75rem',
                    color: 'var(--lp-primary)',
                    fontWeight: 600,
                  }}>
                    {item.time}
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                      color: 'var(--lp-text-primary)'
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      fontSize: '0.9375rem',
                      color: 'var(--lp-text-secondary)'
                    }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who is this for Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>For You?</p>
              <h2 className={styles.sectionTitle}>このセッションが向いている人</h2>
            </div>

            <div className={styles.featuresGrid} style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div className={styles.featureCard}>
                <h3>向いている人</h3>
                <ul style={{
                  margin: 0,
                  paddingLeft: '1.25rem',
                  lineHeight: 2,
                  color: 'var(--lp-text-secondary)'
                }}>
                  <li>成果は出ているが、どこか満たされない</li>
                  <li>思考が止まらず、休まらない</li>
                  <li>「もっと楽に経営したい」と感じる</li>
                  <li>スピリチュアルに興味はないが、効果があれば試したい</li>
                </ul>
              </div>
              <div className={styles.featureCard}>
                <h3>向いていない人</h3>
                <ul style={{
                  margin: 0,
                  paddingLeft: '1.25rem',
                  lineHeight: 2,
                  color: 'var(--lp-text-secondary)'
                }}>
                  <li>すぐに売上を上げる方法を求めている</li>
                  <li>自分を変える気がない</li>
                  <li>「証拠がないと信じない」という姿勢</li>
                  <li>90分の時間を確保できない</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>まずは体験から</h2>
              <p className={styles.ctaLead}>
                初回無料で、イマココ体験セッションを提供しています。<br />
                合う・合わないは、体験してから判断してください。
              </p>
              <Link href="/company/contact" className={styles.ctaBtn}>
                セッションを予約する（無料）
              </Link>
              <p style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: 'var(--lp-text-muted)'
              }}>
                無理な勧誘は一切ありません
              </p>
            </div>
          </div>
        </section>
    </>
  );
}
