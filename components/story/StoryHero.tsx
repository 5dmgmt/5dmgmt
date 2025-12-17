/**
 * components/story/StoryHero.tsx
 *
 * ストーリーページ - Hero + Introduction セクション
 */

import styles from '@/components/landing/LandingPage.module.css';

export default function StoryHero() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.heroCatch}>Origin Story</p>
          <h1 className={styles.heroTitle}>五次元経営ストーリー</h1>
          <p className={styles.heroLead}>
            なぜ、整えても崩れるのか？<br />
            &quot;構造&quot;の再演を終わらせる鍵
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '2rem', color: 'var(--lp-text-primary)' }}>
              これは、&quot;あなたのせいじゃなかった&quot;と気づく物語です
            </h2>

            <div style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                「なんでまた、こうなるのか」<br />
                「わかっているのに、止められない」──
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                そんな繰り返しに、<br />
                静かに、でも確実に疲れていませんか？
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                仕事も家庭も一生懸命やってきたのに、<br />
                なぜか&quot;同じ壁&quot;にぶつかってしまう。
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                その理由は、あなたの中の何かが&quot;間違っている&quot;からではありません。<br />
                <strong style={{ color: 'var(--5d-teal-dark)' }}>それは、「構造」のせいなのです。</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* あなたが悪いわけじゃない */}
      <section className={`${styles.section} ${styles.testimonialsSection}`}>
        <div className={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--5d-teal-dark)' }}>
              あなたが悪いわけじゃない
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2, color: 'var(--lp-text-secondary)', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>・人間関係が、なぜかいつも噛み合わない</li>
              <li style={{ marginBottom: '0.5rem' }}>・距離があるうちはうまくいくのに、心が近づくと壊れてしまう</li>
              <li style={{ marginBottom: '0.5rem' }}>・結果は出しているのに、なぜか満たされない</li>
            </ul>
            <p style={{ lineHeight: 2, color: 'var(--lp-text-secondary)', marginBottom: '1.5rem' }}>
              それは、意思や努力では変えられなかった。<br />
              なぜなら──<br />
              <strong>&quot;あなた&quot;ではなく、&quot;構造&quot;が動いていたからです。</strong>
            </p>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem', color: 'var(--5d-teal-dark)' }}>
              くり返されるのは、人格ではなく&quot;構造&quot;
            </h3>
            <p style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
              私たちはふだん、「思考」や「感情」で物事を解決しようとします。<br />
              でも実際には、もっと深い層──<br />
              <strong>無意識の構造が、現実を動かしているのです。</strong>
            </p>
            <p style={{ lineHeight: 2, color: 'var(--lp-text-secondary)', marginTop: '1rem' }}>
              このストーリーでは、<br />
              その構造を「次元」としてひもといていきます。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
