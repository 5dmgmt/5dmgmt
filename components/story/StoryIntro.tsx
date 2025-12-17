/**
 * components/story/StoryIntro.tsx
 *
 * ストーリーページ - 三つの次元構造 + 目次セクション
 */

import styles from '@/components/landing/LandingPage.module.css';

const tocItems = [
  { num: 1, title: 'なぜ、表面的な関係はうまくいっても、親密な関係では壊れてしまうのか？' },
  { num: 2, title: '"もう一人の自分"の正体とは？' },
  { num: 3, title: 'なぜ「仕事の問題」に見えて、本当は違うのか？' },
  { num: 4, title: 'なぜ国家や歴史も「感情の再演」をしているのか？' },
  { num: 5, title: 'なぜ『ファンタビ』や『呪術廻戦』の"闘"が、現実の私たちに共鳴するのか？' },
  { num: 6, title: '二度の離婚と、"全託"の瞬間に見えた構造' },
  { num: 7, title: '波動が引き寄せた経営者たちと、死のエネルギー' },
  { num: 8, title: 'ペインボディとは「構造」だった──経営・家系・国家の再演地図' },
  { num: 9, title: '反応を終わらせる統合プロセス' },
  { num: 10, title: 'あなたが、この物語を終わらせる側に立つとき' },
];

export default function StoryIntro() {
  return (
    <>
      {/* 三つの次元構造 */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>三つの&quot;次元構造&quot;を知っていますか？</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '12px', borderLeft: '4px solid #6c757d' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.75rem', color: '#495057' }}>三次元（思考・時間・問題化）</h3>
              <p style={{ color: 'var(--lp-text-secondary)', lineHeight: 1.8, margin: 0 }}>
                過去と未来に囚われ、「今ここ」から切断される。解決しようとするほど問題に巻き込まれる。
              </p>
            </div>
            <div style={{ padding: '1.5rem', background: '#fff3cd', borderRadius: '12px', borderLeft: '4px solid #ffc107' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.75rem', color: '#856404' }}>四次元（感情・記憶・共鳴）</h3>
              <p style={{ color: 'var(--lp-text-secondary)', lineHeight: 1.8, margin: 0 }}>
                個人の過去、家系、社会的記憶──未消化の痛みが&quot;波動&quot;で反応する世界。
              </p>
            </div>
            <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, var(--5d-teal-50) 0%, #e0f7fa 100%)', borderRadius: '12px', borderLeft: '4px solid var(--5d-teal)' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.75rem', color: 'var(--5d-teal-dark)' }}>五次元（沈黙・選択・在り方）</h3>
              <p style={{ color: 'var(--lp-text-secondary)', lineHeight: 1.8, margin: 0 }}>
                感情にも思考にも巻き込まれず、「今ここ」に根ざして存在できる意識状態。
              </p>
            </div>
          </div>

          <div style={{ maxWidth: '800px', margin: '2rem auto 0', padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--lp-text-secondary)', marginBottom: '1rem', lineHeight: 1.8 }}>
              「いかなる問題も、それが生まれた次元では解決できない」<br />
              <span style={{ fontSize: '0.9rem' }}>── アインシュタイン</span>
            </p>
            <p style={{ color: 'var(--lp-text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
              あなたが苦しんできたのは、<br />
              &quot;三次元&quot;や&quot;四次元&quot;の構造の中で、<br />
              五次元の方法が必要だったからです。
            </p>
            <p style={{ color: 'var(--5d-teal-dark)', fontWeight: 600, margin: 0 }}>
              つまり──<br />
              あなたが悪かったのではなく、次元が違っただけなのです。
            </p>
          </div>
        </div>
      </section>

      {/* どうすれば変わるのか */}
      <section className={`${styles.section} ${styles.testimonialsSection}`}>
        <div className={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--lp-text-primary)' }}>
              では、どうすれば変わるのか？
            </h2>
            <p style={{ lineHeight: 2, color: 'var(--lp-text-secondary)', marginBottom: '1.5rem' }}>
              変わるとは、「頑張って変わる」ことではありません。<br />
              ただ、「構造を見抜き」「選び直す」こと。
            </p>
            <p style={{ lineHeight: 2, color: 'var(--lp-text-secondary)', marginBottom: '1rem' }}>
              その入口が：
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
              <li style={{ padding: '1rem', background: 'white', borderRadius: '8px', marginBottom: '0.75rem', borderLeft: '3px solid var(--5d-teal)' }}>
                <strong style={{ color: 'var(--5d-teal-dark)' }}>宿曜（魂の設計図）</strong><br />
                <span style={{ color: 'var(--lp-text-secondary)' }}>エゴと時間の構造を宿曜を活用してほどいていきます。</span>
              </li>
              <li style={{ padding: '1rem', background: 'white', borderRadius: '8px', marginBottom: '0.75rem', borderLeft: '3px solid var(--5d-teal)' }}>
                <strong style={{ color: 'var(--5d-teal-dark)' }}>風水（場のエネルギー）</strong><br />
                <span style={{ color: 'var(--lp-text-secondary)' }}>感情と空間の構造を風水を活用してほどいていきます。</span>
              </li>
              <li style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '3px solid var(--5d-teal)' }}>
                <strong style={{ color: 'var(--5d-teal-dark)' }}>イマココの意識（思考を超えた存在の静けさ）</strong><br />
                <span style={{ color: 'var(--lp-text-secondary)' }}>三次元、四次元の構造をイマココの意識を活用してほどいていきます。</span>
              </li>
            </ul>
            <p style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
              五次元経営は、これらを通じて<br />
              <strong>&quot;次元から変える&quot;</strong>ためのアプローチです。
            </p>
          </div>
        </div>
      </section>

      {/* このストーリーがあなたに届けるもの */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--lp-text-primary)' }}>
              このストーリーがあなたに届けるもの
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
              <li style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--lp-border)', color: 'var(--lp-text-secondary)' }}>
                「自分のせいじゃなかった」と腑に落ちる安心
              </li>
              <li style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--lp-border)', color: 'var(--lp-text-secondary)' }}>
                再演を終わらせる構造的理解
              </li>
              <li style={{ padding: '0.75rem 0', color: 'var(--lp-text-secondary)' }}>
                経営・家族・人生すべてを&quot;イマココ&quot;から選び直す静けさ
              </li>
            </ul>

            <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, var(--5d-teal-50) 0%, #e0f7fa 100%)', borderRadius: '12px', marginBottom: '2rem' }}>
              <p style={{ fontWeight: 600, color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>
                安心してください。この構造は終わらせられます。
              </p>
              <p style={{ color: 'var(--lp-text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                読み終わる頃には、<br />
                あなたの中のどこかで、こう感じているはずです。
              </p>
              <p style={{ color: 'var(--5d-teal-dark)', fontStyle: 'italic', margin: 0 }}>
                「わたしが変わる必要はなかった」<br />
                「ただ、終わらせるだけでよかったんだ」
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 目次 */}
      <section className={`${styles.section} ${styles.testimonialsSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Contents</p>
            <h2 className={styles.sectionTitle}>目次</h2>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {tocItems.map((item) => (
                <a
                  key={item.num}
                  href={`#chapter${item.num}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    border: '1px solid var(--lp-border)',
                  }}
                >
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    background: 'var(--5d-teal)',
                    color: 'white',
                    borderRadius: '50%',
                    fontWeight: 600,
                    flexShrink: 0
                  }}>
                    {item.num}
                  </span>
                  <span style={{ color: 'var(--lp-text-primary)' }}>{item.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
