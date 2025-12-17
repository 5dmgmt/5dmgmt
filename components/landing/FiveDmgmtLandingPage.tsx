/**
 * components/landing/5dmgmt/FiveDmgmtLandingPage.tsx
 *
 * 五次元経営マーケティングサイト トップページ
 * コンセプト：「今、気づいている」= 気づきの深さが運気になる
 */

import Link from 'next/link';
import styles from './LandingPage.module.css';

// 気づきと運気の相関データ
const awarenessLevels = [
  {
    awareness: '思考に巻き込まれている',
    band: '低運気帯',
    scale: '20-199',
    business: 'トラブル続き、人が離れる',
    highlight: false,
  },
  {
    awareness: '思考をコントロールしようとしている',
    band: '中運気帯',
    scale: '200-399',
    business: '成果は出るが、消耗する',
    highlight: false,
  },
  {
    awareness: '思考を観察できている',
    band: '高運気帯',
    scale: '400-499',
    business: '判断が冴え、信頼が集まる',
    highlight: false,
  },
  {
    awareness: '今、気づいている',
    band: '爆運帯',
    scale: '500-599',
    business: '成果が向こうから来る',
    highlight: true,
  },
  {
    awareness: '気づきそのものになっている',
    band: '統合帯',
    scale: '600+',
    business: '存在だけで場が変わる',
    highlight: false,
  },
];

// お客様の声
const testimonials = [
  {
    name: 'T氏',
    title: '不動産仲介会社社長',
    headline: '焦りを手放した瞬間、大型案件が決まった',
    text: 'コロナで追い詰められた。でも、焦っても何も変わらなかった。「今できること」だけに気づくようにした。すると、見えていなかった案件が、向こうから来た。',
  },
  {
    name: 'S氏',
    title: '営業サポート会社社長',
    headline: '「足りない」から「すでにある」へ',
    text: '独立して焦っていた。何かが足りないと思っていた。でも、今あるものに気づいたら、強みが見えた。思いがけない受注につながった。',
  },
  {
    name: 'H氏',
    title: '化粧品受託製造会社社長',
    headline: '問題を見るのをやめたら、答えが来た',
    text: 'メイン取引先の不調で売上激減。問題ばかり見ていた。環境を整え、今に集中したら、新たな取引先との縁が生まれた。',
  },
];

// 3つのアプローチ
const approaches = [
  {
    title: 'イマココ意識',
    subtitle: '気づきを深める',
    description: '過去の後悔、未来の不安——それらは全て、思考の中の出来事。「今、ここ」に戻るたび、気づきは深まり、運気は自然に上がっていきます。',
  },
  {
    title: '宿曜',
    subtitle: '気づきを妨げるパターンを知る',
    description: '同じところで引っかかるのは、無意識のパターンがあるから。宿曜は、その癖を可視化し、気づきへの道を短くします。',
  },
  {
    title: '風水',
    subtitle: '気づきやすい環境をつくる',
    description: '散らかった部屋で、今に気づくのは難しい。空間が整うと、意識も整い、運気の土台ができます。',
  },
];

export default function FiveDmgmtLandingPage() {
  return (
    <>
      {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroTarget}>経営者・人事責任者のための意識診断</p>
            <p className={styles.heroCatch}>努力で運気は上がらない</p>
            <h1 className={styles.heroTitle}>
              今、気づいている
            </h1>
            <p className={styles.heroSubtitle}>
              それだけで、運気は変わる
            </p>
            <p className={styles.heroLead}>
              頑張るほど、疲れる。考えるほど、迷う。<br />
              五次元経営は、その逆をいく。<br />
              今この瞬間に気づいている——その深さが、そのまま運気になる。
            </p>
            <p className={styles.heroValue}>3分の診断で、チームが変わる視点を手に入れる</p>
            <div className={styles.heroActions}>
              <Link href="/unki/shindan" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}>
                無料で診断する（3分）
              </Link>
            </div>
            <p className={styles.heroReassurance}>
              <Link href="/taiken" className={styles.heroSubLink}>体験セッションを見る</Link>
            </p>
          </div>
        </section>

        {/* 信頼の根拠 Section */}
        <section className={styles.trustSection}>
          <div className={styles.container}>
            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className={styles.trustContent}>
                  <div className={styles.trustValue}>JAPAN MENSA</div>
                  <div className={styles.trustLabel}>代表2名が会員</div>
                </div>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <div className={styles.trustContent}>
                  <div className={styles.trustValue}>160億円</div>
                  <div className={styles.trustLabel}>M&Aクローズ実績</div>
                </div>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className={styles.trustContent}>
                  <div className={styles.trustValue}>3ヶ月</div>
                  <div className={styles.trustLabel}>平均で成果が出る</div>
                </div>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className={styles.trustContent}>
                  <div className={styles.trustValue}>藤沢市</div>
                  <div className={styles.trustLabel}>0466-52-7722</div>
                </div>
              </div>
            </div>
            <p className={styles.trustNote}>
              <Link href="/company/profile" className={styles.trustLink}>会社概要を見る →</Link>
            </p>
          </div>
        </section>

        {/* 気づきと運気の相関 Section */}
        <section className={`${styles.section} ${styles.architectureSection}`} id="awareness">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Awareness = Fortune</p>
              <h2 className={styles.sectionTitle}>気づきの深さ = 運気の高さ</h2>
              <p className={styles.sectionLead}>
                ホーキンズ博士の研究によると、<br />
                「意識の状態」と「人生の質」には深い関係があるといいます。<br />
                <br />
                気づきが深まると、運気が変わる。<br />
                運気が変わると、経営も動き出す。
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
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--lp-text-muted)' }}>気づきの状態</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--lp-text-muted)' }}>運気帯</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--lp-text-muted)' }}>経営への現れ方</th>
                  </tr>
                </thead>
                <tbody>
                  {awarenessLevels.map((level) => (
                    <tr key={level.band} style={{
                      borderBottom: '1px solid var(--lp-border)',
                      backgroundColor: level.highlight ? 'var(--lp-primary-light)' : 'transparent',
                    }}>
                      <td style={{
                        padding: '12px 16px',
                        fontWeight: level.highlight ? 600 : 400,
                        color: level.highlight ? 'var(--lp-primary)' : 'var(--lp-text-primary)',
                      }}>
                        {level.awareness}
                      </td>
                      <td style={{
                        padding: '12px 16px',
                        fontWeight: level.highlight ? 600 : 400,
                      }}>
                        {level.band}
                        <span style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)', marginLeft: '8px' }}>
                          ({level.scale})
                        </span>
                      </td>
                      <td style={{
                        padding: '12px 16px',
                        fontWeight: level.highlight ? 600 : 400,
                      }}>
                        {level.business}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 補足説明 */}
            <div style={{
              marginTop: '2.5rem',
              padding: '2rem',
              background: 'var(--lp-bg-secondary)',
              borderRadius: '12px',
              borderLeft: '4px solid var(--lp-primary)',
            }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--lp-text-primary)' }}>
                気づきが深まると、なぜ運気が上がるのか？
              </h3>
              <p style={{ lineHeight: 1.8, color: 'var(--lp-text-secondary)' }}>
                思考に巻き込まれているとき、私たちは「問題」を見ています。<br />
                問題を見れば、問題が増えます。<br />
                <br />
                今、気づいているとき、私たちは「全体」を見ています。<br />
                全体を見れば、答えが自然に現れます。<br />
                <br />
                これが、気づきと運気の相関関係です。
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/unki/shindan" className={`${styles.btn} ${styles.btnPrimary}`}>
                今の気づきの深さを診断する（無料）
              </Link>
            </div>
          </div>
        </section>

        {/* 3つのアプローチ Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Three Gates</p>
              <h2 className={styles.sectionTitle}>気づきを深める3つの入り口</h2>
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
              <p className={styles.sectionTag}>Shifts</p>
              <h2 className={styles.sectionTitle}>気づいた人たちの変化</h2>
              <p className={styles.sectionLead}>
                静かに、しかし確かに
              </p>
            </div>

            <div className={styles.testimonialsGrid}>
              {testimonials.map((t) => (
                <div key={t.name} className={styles.testimonialCard}>
                  <div className={styles.testimonialQuote}>&ldquo;</div>
                  <p style={{
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: 'var(--lp-primary)',
                    marginBottom: '0.75rem',
                  }}>
                    {t.headline}
                  </p>
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
              ※個人の体験です。変化の現れ方は人により異なります。
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>まず、今の「気づきの深さ」を測る</h2>
              <p className={styles.ctaLead}>
                あなたは今、どのくらい「気づいて」いますか？<br />
                思考に巻き込まれていますか？<br />
                それとも、今この瞬間を見ていますか？<br />
                <br />
                3分の診断で、現在地がわかります。
              </p>
              <Link href="/unki/shindan" className={styles.ctaBtn}>
                運気診断を受ける（無料）
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
                  <span>「気づいている」とは、具体的にどういう状態ですか？</span>
                  <span className={styles.faqIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className={styles.faqAnswer}>
                  今、この文章を読んでいるあなた。その「読んでいる自分」に気づいていますか？
                  思考ではなく、思考を見ている意識——それが「気づき」です。
                  呼吸している自分、座っている自分、画面を見ている自分。
                  それに気づいている「何か」が、あなたの本質です。
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>気づきを深めると、本当に運気が上がりますか？</span>
                  <span className={styles.faqIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className={styles.faqAnswer}>
                  ホーキンズ博士の研究では、意識レベル200を超えると、
                  人生の様々な面で変化が起こりやすくなると言われています。
                  「気づき」は、その意識レベルに影響を与えます。
                  気づきが深まると、判断が冴え、人が集まり、機会が増える——そう感じる人が多いようです。
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>どのくらいで変化が現れますか？</span>
                  <span className={styles.faqIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className={styles.faqAnswer}>
                  変化の現れ方は人それぞれです。
                  本人は「何も変わっていない」と感じることが多いですが、
                  周囲の人が先に気づくことも。
                  気づいている人は、変化を追いかけません。
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
                  デビッド・ホーキンズ博士の意識研究をベースにしています。
                  「気づき」は、瞑想や禅の世界で何千年も探求されてきたテーマ。
                  五次元経営では、それを経営に応用しています。
                  まずは体験してみて、ご自身で感じてください。
                </div>
              </details>
            </div>
          </div>
        </section>
    </>
  );
}
