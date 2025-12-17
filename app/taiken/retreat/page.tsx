/**
 * app/5dmgmt/taiken/retreat/page.tsx
 *
 * 経営者リトリートページ（1泊2日）
 */

import Link from 'next/link';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '経営者リトリート | 五次元経営',
  description: '1泊2日の経営者向けリトリート。日常を離れ、意識レベルを集中的に上げる合宿プログラム。',
};

const scheduleDay1 = [
  { time: '13:00', content: '集合・オリエンテーション' },
  { time: '14:00', content: '意識レベル測定（Before）' },
  { time: '15:00', content: '環境整備ワークショップ' },
  { time: '17:00', content: 'イマココ意識 集中トレーニング' },
  { time: '19:00', content: '夕食・交流会' },
  { time: '21:00', content: '夜の瞑想セッション' },
];

const scheduleDay2 = [
  { time: '06:00', content: '朝の瞑想（任意）' },
  { time: '08:00', content: '朝食' },
  { time: '09:00', content: '経営者同士の対話セッション' },
  { time: '11:00', content: '統合セッション' },
  { time: '12:00', content: '意識レベル測定（After）' },
  { time: '13:00', content: 'クロージング・昼食後解散' },
];

export default function RetreatPage() {
  return (
    <>
      {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>日常を離れ、本来の自己と出会う</p>
            <h1 className={styles.heroTitle}>経営者リトリート</h1>
            <p className={styles.heroLead}>
              1泊2日で、意識レベルを集中的に上げる。<br />
              環境を変え、仲間と共に、深い変容を体験する。
            </p>
          </div>
        </section>

        {/* Why Retreat Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Why Retreat?</p>
              <h2 className={styles.sectionTitle}>なぜリトリートなのか</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                日常の中で意識レベルを上げることは可能ですが、非常に難しいです。
                慣れた環境、慣れた人間関係、慣れた思考パターンが、
                あなたを「今まで通り」に引き戻そうとするからです。
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                リトリートでは、物理的に日常から離れることで、
                この引力から一時的に解放されます。
                新しい環境、新しい仲間、新しい体験が、
                意識の変容を加速させます。
              </p>
              <p>
                1泊2日という凝縮された時間でも、集中的に取り組むことで、
                意識レベルを50-100上げることが可能です。
                そして、その変化を「体」で覚えることで、
                日常に戻ってからも維持しやすくなります。
              </p>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section className={`${styles.section} ${styles.architectureSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Schedule</p>
              <h2 className={styles.sectionTitle}>スケジュール（例）</h2>
              <p className={styles.sectionLead}>
                参加者の状況に応じて、内容は調整されます
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              {/* Day 1 */}
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid var(--lp-border)'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '2px solid var(--lp-primary)'
                }}>
                  Day 1
                </h3>
                {scheduleDay1.map((item) => (
                  <div key={item.time} style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '0.5rem 0',
                    fontSize: '0.875rem'
                  }}>
                    <span style={{
                      color: 'var(--lp-primary)',
                      fontWeight: 500,
                      width: '50px',
                      flexShrink: 0
                    }}>
                      {item.time}
                    </span>
                    <span style={{ color: 'var(--lp-text-secondary)' }}>
                      {item.content}
                    </span>
                  </div>
                ))}
              </div>

              {/* Day 2 */}
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid var(--lp-border)'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '2px solid var(--lp-primary)'
                }}>
                  Day 2
                </h3>
                {scheduleDay2.map((item) => (
                  <div key={item.time} style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '0.5rem 0',
                    fontSize: '0.875rem'
                  }}>
                    <span style={{
                      color: 'var(--lp-primary)',
                      fontWeight: 500,
                      width: '50px',
                      flexShrink: 0
                    }}>
                      {item.time}
                    </span>
                    <span style={{ color: 'var(--lp-text-secondary)' }}>
                      {item.content}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Details</p>
              <h2 className={styles.sectionTitle}>開催概要</h2>
            </div>

            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              background: '#fafafa',
              padding: '2rem',
              borderRadius: '12px'
            }}>
              <dl style={{ margin: 0 }}>
                <div style={{
                  display: 'flex',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--lp-border)'
                }}>
                  <dt style={{
                    width: '120px',
                    fontWeight: 600,
                    color: 'var(--lp-text-primary)'
                  }}>
                    日程
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--lp-text-secondary)' }}>
                    1泊2日
                  </dd>
                </div>
                <div style={{
                  display: 'flex',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--lp-border)'
                }}>
                  <dt style={{
                    width: '120px',
                    fontWeight: 600,
                    color: 'var(--lp-text-primary)'
                  }}>
                    定員
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--lp-text-secondary)' }}>
                    6名（少人数制）
                  </dd>
                </div>
                <div style={{
                  display: 'flex',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--lp-border)'
                }}>
                  <dt style={{
                    width: '120px',
                    fontWeight: 600,
                    color: 'var(--lp-text-primary)'
                  }}>
                    対象
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--lp-text-secondary)' }}>
                    経営者・役員
                  </dd>
                </div>
                <div style={{
                  display: 'flex',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--lp-border)'
                }}>
                  <dt style={{
                    width: '120px',
                    fontWeight: 600,
                    color: 'var(--lp-text-primary)'
                  }}>
                    場所
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--lp-text-secondary)' }}>
                    関東近郊（詳細は申込後にご案内）
                  </dd>
                </div>
                <div style={{
                  display: 'flex',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--lp-border)'
                }}>
                  <dt style={{
                    width: '120px',
                    fontWeight: 600,
                    color: 'var(--lp-text-primary)'
                  }}>
                    料金
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--lp-text-secondary)' }}>
                    <strong style={{ color: 'var(--lp-primary)', fontSize: '1.125rem' }}>20万円〜</strong>
                    <span style={{ fontSize: '0.875rem', marginLeft: '8px' }}>（詳細はお問い合わせ）</span>
                  </dd>
                </div>
                <div style={{
                  display: 'flex',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--lp-border)'
                }}>
                  <dt style={{
                    width: '120px',
                    fontWeight: 600,
                    color: 'var(--lp-text-primary)'
                  }}>
                    含まれるもの
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--lp-text-secondary)' }}>
                    宿泊費、食事（3食）、プログラム費、意識レベル測定
                  </dd>
                </div>
                <div style={{
                  display: 'flex',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--lp-border)'
                }}>
                  <dt style={{
                    width: '120px',
                    fontWeight: 600,
                    color: 'var(--lp-text-primary)'
                  }}>
                    勧誘
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--lp-text-secondary)' }}>
                    <span style={{ color: '#16a34a', fontWeight: 500 }}>一切なし</span>（体験後の判断は自由）
                  </dd>
                </div>
                <div style={{
                  display: 'flex',
                  padding: '1rem 0'
                }}>
                  <dt style={{
                    width: '120px',
                    fontWeight: 600,
                    color: 'var(--lp-text-primary)'
                  }}>
                    キャンセル
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--lp-text-secondary)' }}>
                    7日前まで無料、それ以降は50%
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>まずはお問い合わせから</h2>
              <p className={styles.ctaLead}>
                リトリートについてのご質問、開催日程の確認など、<br />
                お気軽にお問い合わせください。
              </p>
              <Link href="/company/contact" className={styles.ctaBtn}>
                お問い合わせ
              </Link>
            </div>
          </div>
        </section>
    </>
  );
}
