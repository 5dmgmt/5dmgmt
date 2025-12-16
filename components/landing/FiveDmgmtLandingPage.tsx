'use client';

/**
 * components/landing/5dmgmt/FiveDmgmtLandingPage.tsx
 *
 * 【Phase 30】五次元経営マーケティングサイト トップページ
 * - 既存のLandingPageスタイルを流用
 * - 五次元経営の世界観（静か、余白、ブレない）
 */

import Link from 'next/link';
import styles from './LandingPage.module.css';
import FiveDmgmtHeader from './FiveDmgmtHeader';
import FiveDmgmtFooter from './FiveDmgmtFooter';

// 運気帯域データ
const unkiBands = [
  { name: '低運気帯', scale: '20-199', traits: '恐れ・怒り', business: 'トラブル多発、不信' },
  { name: '中運気帯', scale: '200-399', traits: '努力・正しさ', business: '成果は出るが疲労' },
  { name: '高運気帯', scale: '400-499', traits: '理性・信頼', business: '組織文化が安定' },
  { name: '爆運帯', scale: '500-599', traits: '愛・感謝・喜び', business: '成果が自然に集まる' },
  { name: '統合帯', scale: '600+', traits: '平和', business: '存在が場を変える' },
];

// お客様の声
const testimonials = [
  {
    name: 'T氏',
    title: '不動産仲介会社社長',
    text: 'コロナで、手放すしかないところまで行った。棚卸し。環境整理。焦らず、淡々と動く。気づくと、大型案件が成約していた。',
  },
  {
    name: 'S氏',
    title: '営業サポート会社社長',
    text: '独立。焦り。成果が出ない。強みを「一枚の紙」に落とす。受注が流れるように決まる。3か月で1,400万円。',
  },
  {
    name: 'H氏',
    title: '化粧品受託製造会社社長',
    text: 'メイン取引先の不調。売上が10億円を割る。自宅と人間関係を整える。新たな取引が決まる。3か月で売上が30億円増えた。',
  },
];

// 3つのアプローチ
const approaches = [
  {
    title: 'イマココ意識',
    subtitle: '思考の外にある静けさ',
    description: '多くの経営者が「わかっているのに変えられない」のは、過去の恐怖やプライドに支配されているから。五次元経営は、この無意識のパターンを解放し、「今この瞬間」の意識で生きる道を示します。',
  },
  {
    title: '宿曜',
    subtitle: '生まれ持った設計図を知る',
    description: '意識レベルを上げやすい人と、上げにくい人がいます。その違いは、宿曜（生まれた時の月の位置）に刻まれています。占いではなく、潜在意識のパターンを可視化する地図。',
  },
  {
    title: '風水',
    subtitle: '場のエネルギーを整える',
    description: '意識レベル500以上の経営者の9割が、オフィスの「気の流れ」を重視しています。なぜなら、空間のエネルギーが意識レベルに直接影響するからです。',
  },
];

export default function FiveDmgmtLandingPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>戦略や努力の前に、あなた自身の運気を整える</p>
            <h1 className={styles.heroTitle}>
              爆運帯＝ごきげん経営
            </h1>
            <p className={styles.heroLead}>
              成果は出ている。でも、どこか重い。<br />
              正解は分かっている。それでも、疲れる。<br />
              <br />
              運気が変わると、会社の空気も、成果も、自然に変わる。
            </p>
            <div className={styles.heroActions}>
              <Link href="/unki/shindan" className={`${styles.btn} ${styles.btnPrimary}`}>
                経営者運気診断（無料）
              </Link>
              <Link href="/taiken" className={`${styles.btn} ${styles.btnSecondary}`}>
                体験セッション
              </Link>
            </div>
            <p className={styles.heroReassurance}>3分で現在地がわかる</p>
          </div>
        </section>

        {/* 運気帯域 Section */}
        <section className={`${styles.section} ${styles.architectureSection}`} id="unki-band">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Consciousness Level</p>
              <h2 className={styles.sectionTitle}>運気の階層構造</h2>
              <p className={styles.sectionLead}>
                運気は、気合や根性では上がりません。<br />
                帯域ごとに世界の見え方が変わります。
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.9375rem',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--lp-border)' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--lp-text-muted)' }}>帯域</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--lp-text-muted)' }}>スケール</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--lp-text-muted)' }}>特性</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--lp-text-muted)' }}>経営特徴</th>
                  </tr>
                </thead>
                <tbody>
                  {unkiBands.map((band, i) => (
                    <tr key={band.name} style={{
                      borderBottom: '1px solid var(--lp-border)',
                      backgroundColor: band.name === '爆運帯' ? 'var(--lp-primary-light)' : 'transparent',
                    }}>
                      <td style={{
                        padding: '12px 16px',
                        fontWeight: band.name === '爆運帯' ? 600 : 400,
                        color: band.name === '爆運帯' ? 'var(--lp-primary)' : 'var(--lp-text-primary)',
                      }}>
                        {band.name}
                      </td>
                      <td style={{ padding: '12px 16px' }}>{band.scale}</td>
                      <td style={{ padding: '12px 16px' }}>{band.traits}</td>
                      <td style={{ padding: '12px 16px' }}>{band.business}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/unki/shindan" className={`${styles.btn} ${styles.btnPrimary}`}>
                今の運気を診断する（無料）
              </Link>
            </div>
          </div>
        </section>

        {/* 3つのアプローチ Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Approach</p>
              <h2 className={styles.sectionTitle}>五次元経営の3つのアプローチ</h2>
            </div>

            <div className={styles.featuresGrid}>
              {approaches.map((approach) => (
                <div key={approach.title} className={styles.featureCard}>
                  <h3>{approach.title}</h3>
                  <p style={{ color: 'var(--lp-primary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    {approach.subtitle}
                  </p>
                  <p>{approach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* お客様の声 Section */}
        <section className={`${styles.section} ${styles.testimonialsSection}`} id="testimonials">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Testimonials</p>
              <h2 className={styles.sectionTitle}>お客様の変化</h2>
              <p className={styles.sectionLead}>
                静かに、しかし確かに
              </p>
            </div>

            <div className={styles.testimonialsGrid}>
              {testimonials.map((t) => (
                <div key={t.name} className={styles.testimonialCard}>
                  <div className={styles.testimonialQuote}>&ldquo;</div>
                  <p className={styles.testimonialText}>{t.text}</p>
                  <div className={styles.testimonialAuthor}>
                    <div>
                      <div className={styles.authorName}>{t.name}</div>
                      <div className={styles.authorTitle}>{t.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--lp-text-muted)', marginTop: '2rem' }}>
              ※個人の感想です。結果は状況により変わります。
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>まずは、測ってみてください</h2>
              <p className={styles.ctaLead}>
                今のあなたの運気は、どの帯域にありますか？<br />
                考える必要はありません。直感で答えるだけの、3分診断です。
              </p>
              <Link href="/unki/shindan" className={styles.ctaBtn}>
                経営者運気診断を受ける（無料）
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.section} id="faq">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>FAQ</p>
              <h2 className={styles.sectionTitle}>よくある質問</h2>
            </div>

            <div className={styles.faqAccordion}>
              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>運気（ホーキンズスケール）は、本当に変えられますか？</span>
                  <span className={styles.faqIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className={styles.faqAnswer}>
                  はい。適切なアプローチで3ヶ月で50-100上げることが可能です。
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>スピリチュアルですか？</span>
                  <span className={styles.faqIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className={styles.faqAnswer}>
                  違います。デビッド・ホーキンズ博士の科学的研究に基づいています。
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>どのくらいで成果が出ますか？</span>
                  <span className={styles.faqIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className={styles.faqAnswer}>
                  ホーキンズ・スケール200を超えた瞬間から、組織の空気が変わり始めます。
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />
    </div>
  );
}
