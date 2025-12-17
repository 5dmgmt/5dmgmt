/**
 * app/background/story/page.tsx
 *
 * 五次元経営ストーリーページ - 完全版
 */

import Link from 'next/link';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '五次元経営ストーリー | 五次元経営',
  description: 'なぜ、整えても崩れるのか？"構造"の再演を終わらせる鍵。これは、"あなたのせいじゃなかった"と気づく物語です。',
};

export default function StoryPage() {
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
                五次元経営®は、これらを通じて<br />
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
                {[
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
                ].map((item) => (
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

        {/* 第1章 */}
        <section id="chapter1" className={styles.section}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'var(--5d-teal)', color: 'white', borderRadius: '50%', fontSize: '1.25rem', fontWeight: 700 }}>1</span>
                <h2 style={{ margin: 0, color: 'var(--5d-teal-dark)', fontSize: '1.25rem' }}>
                  なぜ、表面的な関係はうまくいっても、親密な関係では壊れてしまうのか？
                </h2>
              </div>

              <div style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-text-primary)', marginBottom: '1rem' }}>一定の距離なら、なぜかうまくいく</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  部下、クライアント、取引先──<br />
                  一歩引いた関係なら、トラブルは起きない。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  けれど──<br />
                  <strong>相手がこちらの&quot;内側&quot;に触れた瞬間、</strong><br />
                  息苦しさが湧き上がり、感情が突如として噴き出す。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  「なんで今、こんなに反応してるんだろう？」
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  頭ではわかっているのに、心が勝手に動き出す。<br />
                  意思では、もう止められない──
                </p>

                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-text-primary)', marginBottom: '1rem' }}>それは、あなたのせいじゃない</h3>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・信頼したいのに、なぜか警戒してしまう</li>
                  <li>・怒りたくないのに、感情が暴れ出す</li>
                  <li>・壊したくないのに、関係が壊れてしまう</li>
                </ul>
                <p style={{ marginBottom: '2rem' }}>
                  <strong>これは、&quot;構造&quot;が作動しているサインです。</strong><br /><br />
                  表面的な関係では起きなかったのに、<br />
                  親密さ＝記憶への接触が始まった瞬間、<br />
                  あなたの&quot;中の誰か&quot;が反応し始めたのです。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>1-1. 表面的な関係なら、なぜ大丈夫なのか？</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  ビジネスでは、ある程度の距離が守られています。<br />
                  礼儀、役割、ポジション──すべてが&quot;間&quot;を保ってくれる。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  でも、相手がふとこちらに&quot;本音&quot;で近づいた瞬間──<br />
                  それまでのバランスが、崩れ始める。<br />
                  感情が勝手に動き出し、行動がコントロールできなくなる。<br /><br />
                  それはまるで、<strong>無意識の&quot;スイッチ&quot;</strong>が入ったかのよう。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>1-2. なぜ、距離が近づくと反応してしまうのか？</h4>
                <p style={{ marginBottom: '1rem' }}>
                  親密さとは、「記憶に触れる距離」。
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・顔色を伺っていた幼い日</li>
                  <li>・愛されるために頑張った日</li>
                  <li>・傷つけられても黙るしかなかった日</li>
                </ul>
                <p style={{ marginBottom: '2rem' }}>
                  それらの&quot;未処理の感情&quot;が、あなたの中に静かに置き去りにされていた。<br /><br />
                  そして今──<br />
                  目の前の相手の言葉やまなざしが、<br />
                  その&quot;過去のレコード&quot;を再生させてしまう。<br /><br />
                  あなたが反応しているのは、<br />
                  &quot;いまここ&quot;の誰かではなく、<br />
                  <strong>かつて痛みを残した「記憶の中の誰か」</strong>かもしれません。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>1-3. 感情のスイッチを押しているのは誰？</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  「あとで冷静になると、なんであんなに怒ったのか自分でもわからない…」<br />
                  そんな経験はありませんか？<br /><br />
                  その瞬間、反応していたのは<br />
                  <strong>あなた自身ではなく、&quot;もう一人の人格&quot;</strong>だった可能性があります。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  エックハルト・トールは、それを<strong>「ペインボディ」</strong>と呼びました。<br />
                  世界1600万部のベストセラーの著者であるエックハルト・トール。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  ペインボディ。それは、あなたの中に蓄積された痛みのエネルギーが<br />
                  人格のように動き出し、今を乗っ取ってしまう構造。
                </p>

                <div style={{ padding: '1.5rem', background: 'var(--5d-teal-50)', borderRadius: '12px', marginTop: '2rem' }}>
                  <p style={{ fontWeight: 600, color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>
                    この&quot;スイッチ&quot;の正体を、次章で明らかにします
                  </p>
                  <p style={{ color: 'var(--lp-text-secondary)', margin: 0 }}>
                    もしかしたら、<br />
                    あなたの人生を操っていたのは、あなたではなかったのかもしれません。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 第2章 */}
        <section id="chapter2" className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'var(--5d-teal)', color: 'white', borderRadius: '50%', fontSize: '1.25rem', fontWeight: 700 }}>2</span>
                <h2 style={{ margin: 0, color: 'var(--5d-teal-dark)', fontSize: '1.25rem' }}>
                  &quot;もう一人の自分&quot;の正体とは？
                </h2>
              </div>

              <div style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  「あのときの私は、私じゃなかった」<br /><br />
                  あとから思い出して、<br />
                  「あんなこと、なんで言ってしまったんだろう」<br />
                  「冷静に考えれば、あれはやりすぎだった…」
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  そんな&quot;後悔の余白&quot;に覚えがあるなら──<br />
                  その瞬間、あなたの中で&quot;誰か&quot;が動いていたのかもしれません。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  それは、&quot;あなた&quot;ではありません。<br />
                  <strong>あなたの中に棲む「構造」が、反応していたのです。</strong>
                </p>

                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-text-primary)', marginBottom: '1rem' }}>それが「ペインボディ」</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  世界的なイマココ意識の教師、エックハルト・トールはそれを<br />
                  「ペインボディ」＝感情の構造体と呼びました。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  怒り、悲しみ、無力感、自己否定──<br />
                  処理されなかった感情たちが蓄積され、<br />
                  まるで人格のように振る舞い、現実を操作しはじめる。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  そして、スイッチが入った瞬間──<br />
                  <strong>あなたの&quot;思考&quot;は四次元の&quot;感情構造&quot;に、完全に乗っ取られるのです。</strong>
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>これは、構造の問題です</h4>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>三次元（思考・正しさ）</strong>では、<br />
                  この感情の暴走に立ち向かうことはできません。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  どれだけ分析しても、説得しても、努力しても──<br />
                  四次元のペインボディには通じない。
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>四次元（記憶・波動・無意識）</strong>は、<br />
                  あなたの知らないところで共鳴し、反応を引き起こす。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  思考を飛び越えて、あなたを操作する。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  だからこそ必要なのが、<br />
                  <strong style={{ color: 'var(--5d-teal-dark)' }}>五次元（今ここ・沈黙・統合）という意識のフィールドです。</strong>
                </p>

                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)', marginBottom: '2rem' }}>
                  <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                    「いかなる問題も、それが生まれた次元では解決できない」──アインシュタイン
                  </p>
                  <p style={{ margin: 0 }}>
                    ペインボディという&quot;感情の構造&quot;は、<br />
                    五次元の意識からしか、溶かすことはできないのです。
                  </p>
                </div>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>2-1. ペインボディとは何か？</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  ペインボディとは、<br />
                  過去の痛み・怒り・悲しみが、エネルギー体として人格化したもの。
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・飲み込んだ本音</li>
                  <li>・言えなかった気持ち</li>
                  <li>・わかってもらえなかった想い</li>
                </ul>
                <p style={{ marginBottom: '1.5rem' }}>
                  それらが積み重なり、<br />
                  &quot;自動反応する構造&quot;として独立する。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  スイッチが入ると、<br />
                  あなたの思考・言葉・行動をまるで別人格のように支配する。<br /><br />
                  <strong>でもそれは、&quot;あなた&quot;ではありません。</strong><br />
                  気づいた瞬間、そこに新しいスペースが生まれます。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>2-2. 思考と感情がつくる「人格構造」</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  ペインボディは、「性格」ではありません。<br />
                  思考と感情の反復によって、&quot;構造&quot;として定着してしまったもの。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  あなたが怒りや不安に呑まれるとき、<br />
                  それは「今ここ」の選択ではなく、<br />
                  過去の記憶がスイッチを押しているのです。<br /><br />
                  そして多くの場合、私たちはその構造に気づかず、<br />
                  それを&quot;自分の一部&quot;だと勘違いして生きてしまう。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>2-3. なぜ、操られてしまうのか？</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  ペインボディは、<strong>今という瞬間を嫌います。</strong>
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  それは、&quot;今ここ&quot;の静けさにとどまると、<br />
                  その存在を保てなくなるからです。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  だから、<br />
                  過去に引きずり戻そうとし、<br />
                  未来を恐れさせようとする。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  思考が暴れ、感情が湧き上がり、<br />
                  あなたは気づかぬうちに、構造の中に閉じ込められる。
                </p>
                <p>
                  <strong>でも安心してください。</strong><br />
                  これは、あなたが&quot;弱い&quot;からではありません。<br />
                  あなたの中に、<br />
                  五次元の意識がまだ未起動だっただけなのです。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 第3章 */}
        <section id="chapter3" className={styles.section}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'var(--5d-teal)', color: 'white', borderRadius: '50%', fontSize: '1.25rem', fontWeight: 700 }}>3</span>
                <h2 style={{ margin: 0, color: 'var(--5d-teal-dark)', fontSize: '1.25rem' }}>
                  なぜ「仕事の問題」に見えて、本当は違うのか？
                </h2>
              </div>

              <div style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  「またこのパターン…」と思ったことはありませんか？
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・なぜか似たような衝突が何度も起きる</li>
                  <li>・最初は順調だった関係が、ある時点からこじれ出す</li>
                  <li>・部下やクライアントが&quot;前職のあの人&quot;にそっくりに見えてくる</li>
                </ul>
                <p style={{ marginBottom: '2rem' }}>
                  それは偶然ではありません。<br />
                  <strong>ペインボディの構造が、再び作動しただけなのです。</strong>
                </p>

                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-text-primary)', marginBottom: '1rem' }}>経営は、現実ではなく&quot;再演&quot;の舞台になる</h3>
                <p style={{ marginBottom: '2rem' }}>
                  あなたの内側で、あの&quot;もう一人の自分&quot;が動き出すとき──<br />
                  組織の空気もざわつき始めます。<br />
                  現実が、内側のドラマをまるで脚本どおりに演じ始めるのです。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>3-1. なぜ、同じような人間関係が繰り返されるのか？</h4>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・理不尽に反発してくる部下</li>
                  <li>・最初は従順だったのに、急に主導権を握ろうとする外注先</li>
                  <li>・気づけば、また&quot;力関係のドラマ&quot;に巻き込まれている</li>
                </ul>
                <p style={{ marginBottom: '1.5rem' }}>
                  相手が違っても、構図は同じ。<br />
                  あなたの反応も、いつも同じになっていないでしょうか？
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  「自分が我慢すればいい」<br />
                  「もう誰も信用できない」<br />
                  「こんなはずじゃなかった…」<br /><br />
                  <strong>これは偶然ではなく、無意識の再演劇です。</strong><br />
                  「記憶の構造」が、新しい現場に&quot;同じ場面&quot;をつくり出しているのです。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>3-2. 外側で起きることは、内側から始まっている</h4>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・組織の空気が重い</li>
                  <li>・社員のやる気が続かない</li>
                  <li>・離職が多く、本音が語られない</li>
                </ul>
                <p style={{ marginBottom: '1.5rem' }}>
                  これらは、表面的には&quot;経営課題&quot;に見えるかもしれません。<br />
                  でも実際には、あなたの内側にある&quot;構造&quot;の共鳴場で起きている可能性があります。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  <strong>ペインボディが未統合のままだと、そこに&quot;共鳴する役者&quot;たちが引き寄せられてきます。</strong><br /><br />
                  たとえば──<br />
                  「犠牲こそ美徳」という構造をもつ経営者のもとには、<br />
                  無意識に&quot;依存型&quot;や&quot;対立型&quot;のスタッフが集まりやすくなる。<br /><br />
                  つまり、<strong>組織の構造とは、リーダーの無意識が形になったもの</strong>なのです。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>3-3. 組織の空気は、リーダーの意識でできている</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  会社というのは、「場」そのもの。<br />
                  数字やノウハウ以上に、空気がすべてを動かします。<br />
                  その空気を決めているのが、経営者であるあなたの「内なる状態」。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  もしあなたが、怒りや焦り、無力感に呑まれていれば──<br />
                  組織はこうなります：
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・緊張が走る</li>
                  <li>・誰も本音を言えない</li>
                  <li>・責任転嫌が起こる</li>
                </ul>
                <p style={{ marginBottom: '1.5rem' }}>
                  社員たちは無意識に、あなたの&quot;波動&quot;を感じ取り動いているのです。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  <strong>波立つ水面には、何も映りません。</strong><br />
                  でも──リーダーの内側が静まったとき、<br />
                  その場には&quot;安心して映る空間&quot;が生まれます。<br /><br />
                  あなたが&quot;今ここ&quot;に立ち、構造を見抜きはじめたとき──<br />
                  組織の空気が変わり始めます。<br />
                  静かな創造性が、空間そのものに芽吹いてくるのです。
                </p>

                <div style={{ padding: '1.5rem', background: 'var(--5d-teal-50)', borderRadius: '12px', marginTop: '2rem' }}>
                  <p style={{ fontWeight: 600, color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>
                    次章では…
                  </p>
                  <p style={{ color: 'var(--lp-text-secondary)', margin: 0 }}>
                    このペインボディ構造が、私たち個人だけでなく──<br />
                    歴史や社会、国家のレベルでも発動していることを見ていきます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 第4章 */}
        <section id="chapter4" className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'var(--5d-teal)', color: 'white', borderRadius: '50%', fontSize: '1.25rem', fontWeight: 700 }}>4</span>
                <h2 style={{ margin: 0, color: 'var(--5d-teal-dark)', fontSize: '1.25rem' }}>
                  なぜ国家や歴史も「感情の再演」をしているのか？
                </h2>
              </div>

              <div style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-text-primary)', marginBottom: '1rem' }}>なぜ、戦争や差別は繰り返されるのか？</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  ナチス、黒人差別、スターリン、毛沢東、ポル・ポト…<br />
                  それらの背後にあるのは、どれも、理屈や正義では説明しきれない。<br />
                  <strong>「感情の爆発」によって起きた、再演の構造だった</strong>のです。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  それは個人のペインボディではなく、<br />
                  <strong>集団レベルに蓄積された&quot;集合ペインボディ&quot;</strong>。<br />
                  つまり、国家や民族にも「痛みの人格」があるということです。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>4-1. 戦争・差別・悲劇は、なぜ何度も起きるのか？</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  20世紀以降の世界を見れば明らかです。<br />
                  戦争、虐殺、テロ、核の投下、植民地支配──<br />
                  「正義」や「経済」の問題に見えて、その奥には、<strong>感情の未処理が爆発した構造</strong>があった。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  たとえば──<br />
                  ・ヒトラーは第一次大戦後のドイツの屈辱と怒りを背景に生まれた<br />
                  ・黒人差別の温床は、白人側の「脅かされる恐れ」だった<br />
                  ・スターリンや毛沢東の粛清は、理想の名を借りた&quot;痛みの反転&quot;<br /><br />
                  <strong>「過去の痛み」が、「正義」に姿を変えたとき──再演が始まる。</strong>
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>4-2. 集団ペインボディという&quot;無意識の構造&quot;</h4>
                <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '3px solid var(--5d-teal)' }}>
                  <p style={{ fontStyle: 'italic', margin: 0 }}>
                    「すべての集団──国、民族、宗教、性別──には、独自のペインボディがある」<br />
                    <span style={{ fontSize: '0.9rem' }}>── エックハルト・トール</span>
                  </p>
                </div>
                <p style={{ marginBottom: '1.5rem' }}>
                  これは、単なる社会学の話ではありません。<br />
                  <strong>感情の波動が、集合無意識の中で人格化して動くという現象</strong>です。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  無意識に引き継がれる&quot;痛みの記憶&quot;が、<br />
                  時代を超えて、再び舞台を整え、同じドラマを繰り返す。<br /><br />
                  ・苦しみを語り継ぐはずが、いつしか&quot;怒りを正当化する免罪符&quot;へと変わる<br />
                  ・「あのとき、被害を受けた」という記憶が、次の加害を生み出す正当性として使われる<br /><br />
                  こうして、歴史は何度でも&quot;始まってしまう&quot;のです。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>4-3. 経営判断に潜む&quot;日本人のペインボディ&quot;</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  日本にも、独自の集合的構造があります。<br />
                  「我慢」「察する」「空気を読む」「自己犠牲」──<br />
                  確かに美徳として語られることもあります。<br />
                  でもその奥には、<strong>抑圧と沈黙による構造的な痛み</strong>が潜んでいます。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  たとえば──<br />
                  ・原爆の&quot;被害&quot;は語られても、&quot;加害&quot;の記憶には触れられない<br />
                  ・一度の失敗で「社会的に死ぬ」文化<br />
                  ・本音を語るよりも、空気を壊さない方が大事にされる職場
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  これらの「無意識の文化」が、<br />
                  あなたの経営判断や組織風土にも滲み出ているかもしれません。<br /><br />
                  <strong>これは&quot;あなたの考え方のクセ&quot;ではありません。<br />
                  集合的な構造が、あなたの意思決定に入り込んでいるのです。</strong>
                </p>

                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-text-primary)', marginBottom: '1rem' }}>あなたの痛みは、あなただけのものではない</h3>
                <p style={{ marginBottom: '2rem' }}>
                  ペインボディとは、必ずしも&quot;あなた個人&quot;が抱えた痛みだけではありません。<br />
                  それは、<strong>【歴史と家系、社会からの&quot;痛みの継承&quot;】</strong>だった可能性もある。<br /><br />
                  「わたしは悪くない」ではなく、<br />
                  「これもまた、構造だった」と気づくこと。<br />
                  それが、気づきの第一歩となります。
                </p>

                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)', marginTop: '2rem' }}>
                  <p style={{ fontWeight: 600, color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>
                    次章では…
                  </p>
                  <p style={{ color: 'var(--lp-text-secondary)', margin: 0 }}>
                    映画やアニメなどのフィクションに描かれる&quot;闇&quot;の正体。<br />
                    それもまた、集合無意識の表現です。<br />
                    あなたが涙した&quot;あのキャラ&quot;には、あなた自身の&quot;もう一人&quot;が宿っていたのかもしれません。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 第5章 */}
        <section id="chapter5" className={styles.section}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'var(--5d-teal)', color: 'white', borderRadius: '50%', fontSize: '1.25rem', fontWeight: 700 }}>5</span>
                <h2 style={{ margin: 0, color: 'var(--5d-teal-dark)', fontSize: '1.25rem' }}>
                  なぜ『ファンタビ』や『呪術廻戦』の&quot;闇&quot;が、現実の私たちに共鳴するのか？
                </h2>
              </div>

              <div style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-text-primary)', marginBottom: '1rem' }}>フィクションは、感情の&quot;投影装置&quot;である</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  なぜ私たちは、あの&quot;暴走する存在&quot;に涙してしまうのでしょうか？
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  『ファンタスティック・ビースト』に登場する「オブスキュラス」<br />
                  『呪術廻戦』に登場する「呪霊」たち<br /><br />
                  あれは、ただの空想ではありません。<br />
                  <strong>感情の構造が人格化されたエネルギー体──つまり、ペインボディの物語</strong>なのです。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>5-1. オブスキュラスは、抑圧された&quot;本質の叫び&quot;</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  「魔法を使ってはいけない」<br />
                  そう言われて育った子どもが、<br />
                  自分の本質を押し殺し、ついにはエネルギーとして暴走してしまう──
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  言葉もない、姿もない<br />
                  けれど、怒りと悲しみだけが爆風のように現実を壊す<br />
                  それが、オブスキュラス。<br />
                  <strong>そして、それはあなたの中にもいるかもしれません。</strong>
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  子どもの頃、言えなかったこと。<br />
                  自分を守るために、抑え込んだ気持ち。<br />
                  理解されずに凍りついたままの本音。<br /><br />
                  それらが、言葉を持たないまま蓄積された結果、<br />
                  あなたの中にも、&quot;あれ&quot;が静かに棲んでいるのです。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>5-2. 呪霊は、集合ペインボディの象徴</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  『呪術廻戦』の世界では、<br />
                  人間の負の感情が「呪霊」として実体化します。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  中でも、漏瑚（じょうご）や真人（まひと）は、<br />
                  個人の怒りではなく、<strong>集団的な無念や恐怖のエネルギー</strong>から生まれた存在。<br />
                  彼らは&quot;ただの敵役&quot;ではありません。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  <strong>誰にも癒されなかった感情が、人格を持って現実に出てきた</strong>のです。<br /><br />
                  これはまさに、「集合ペインボディ」の構造<br />
                  共鳴 → 投影 → 具現化<br />
                  その3ステップで、エネルギーは場に影響を与え、やがて&quot;発症&quot;します。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>5-3. あなたの中にも、&quot;あれ&quot;がいる</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  なぜ、あの破壊的な存在に涙が出るのか？<br />
                  <strong>それは、あなたの中にいる&quot;あれ&quot;が共鳴しているから。</strong>
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・飲み込んだ怒り</li>
                  <li>・抑えた寂しさ</li>
                  <li>・誰にも言えなかった本音</li>
                </ul>
                <p style={{ marginBottom: '2rem' }}>
                  それらは今も、あなたの中で&quot;解放される日&quot;を静かに待っているのです。<br /><br />
                  フィクションは、空想ではありません。<br />
                  集合無意識の&quot;現在地&quot;を物語という形で可視化しているのです。<br /><br />
                  <strong>あなたが涙するのは、ストーリーが感動的だからではなく、<br />
                  そこに&quot;自分の構造&quot;が映っているからです。</strong>
                </p>

                <div style={{ padding: '1.5rem', background: 'var(--5d-teal-50)', borderRadius: '12px', marginTop: '2rem' }}>
                  <p style={{ fontWeight: 600, color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>
                    次章では…
                  </p>
                  <p style={{ color: 'var(--lp-text-secondary)', margin: 0 }}>
                    いよいよ、代表の望月貴生自身の体験──<br />
                    &quot;もう一人の自分&quot;との出会いと、そこからの崩壊、再構築。<br />
                    なぜ、二度も同じ失敗をしたのか？<br />
                    なぜ、最後に「全託」するしかなかったのか？<br />
                    あなた自身の構造と響き合う、&quot;ひとつの終わらせ方&quot;の実話をお届けします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 第6章 */}
        <section id="chapter6" className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'var(--5d-teal)', color: 'white', borderRadius: '50%', fontSize: '1.25rem', fontWeight: 700 }}>6</span>
                <h2 style={{ margin: 0, color: 'var(--5d-teal-dark)', fontSize: '1.25rem' }}>
                  二度の離婚と、&quot;全託&quot;の瞬間に見えた構造
                </h2>
              </div>

              <div style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-text-primary)', marginBottom: '1rem' }}>同じようで、違うはずの関係だった</h3>
                <p style={{ marginBottom: '2rem' }}>
                  私は、二度の離婚を経験しました。<br />
                  原因も相手も違ったはずなのに──<br />
                  終わってみれば、まったく同じ構図を再演していたのです。<br /><br />
                  その根っこには、もっと古いものがありました。<br />
                  それは、<strong>【母との関係から始まった&quot;生き残り戦略&quot;】</strong>でした。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>6-1. エリートでなければ、生きる価値がない</h4>
                <p style={{ marginBottom: '2rem' }}>
                  「九九ができなければ、戸塚ヨットスクール」<br />
                  「勉強ができないなら、うちの子ではない」<br />
                  「あなたができないと親族に顔向けできない」──<br /><br />
                  幼少期のわたしに刷り込まれたのは、<br />
                  <strong>&quot;存在&quot;ではなく、&quot;成果&quot;で生き残るというルール</strong>でした。<br /><br />
                  感情を消し、完璧を演じ、評価を得る。<br />
                  そうやって私は、怖さの代わりに優秀さを選んだのです。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>6-2. 銀行で&quot;死の恐怖&quot;を投影していたのは、自分自身だった</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  社会に出てからも、この構造は続きました。<br />
                  銀行に入り、成果を出し、昇進を重ねた私は──<br />
                  <strong>部下に、かつて自分が味わった「恐怖」を投影していたのです。</strong>
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  「その甘さでは終わる」<br />
                  「社会にいられなくなる」<br />
                  そうやって、部下を追い詰める言葉を投げていました。<br /><br />
                  けれど本当は──<br />
                  「弱さ」に反応していたのは、自分の中の&quot;見たくなかった子ども時代の自分&quot;でした。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>6-3. 一度目の結婚：完璧な仮面と、逃避する夜</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  外から見れば、立派な家庭。<br />
                  経済的にも安定し、責任感もある&quot;理想の夫&quot;。<br />
                  でもそこに、<strong>&quot;本当の私&quot;はいませんでした。</strong>
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  沈黙、緊張、無言の圧力──<br />
                  それは、かつての家庭と同じ空気だったのです。<br /><br />
                  やがて私は、外に&quot;心を脱げる場所&quot;を求めるようになりました。<br />
                  そして私は、「心を脱げる場所」として他の女性との関係に逃げたこともあります。<br />
                  それは「存在が許される」感覚を求めていたのです。<br /><br />
                  でも本音を語れなかった責任は、自分にありました。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>6-4. 二度目の結婚：共鳴から崩壊へ</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  今度こそ、「心を開ける」と思った再婚相手。<br />
                  でも、それは&quot;癒し&quot;ではなく、<strong>&quot;構造の共鳴&quot;</strong>でした。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  彼女もまた、私と同じ種類の傷を抱えていた。<br />
                  満たされない過去、無力感、被害者意識、怒りと防衛──<br />
                  最初は安らぎに見えた関係が、やがて&quot;感情の戦場&quot;へと姿を変えていきました。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  沈黙は「拒絶」に、優しさは「操作」に見えてしまう。<br /><br />
                  <strong>そこにいたのは、ふたりの「本体」ではなく、ふたりの「構造」でした。</strong><br />
                  そして、私は前よりもより深く壊れました。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>6-5. 靖国での&quot;全託&quot;と、構造が崩れた瞬間</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  すべてが壊れたあと、私は靖国神社にひとり向かいました。<br />
                  もう、どうにもならなかった。<br />
                  考える力も、感情を抱く余白もなかった。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  神前でただ、一言だけを差し出しました。<br />
                  <strong>「もう無理です。すべて、預けます。」</strong>
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  すると、その瞬間、思考がすべて静まりました。<br />
                  力が抜けていくと同時に、構造が音を立てて崩れ始めたのです。<br /><br />
                  私は「自分の人生を自分が演じていた」と思っていたけれど──<br />
                  <strong>舵を握っていたのは、ペインボディでした。</strong><br /><br />
                  &quot;全託&quot;とは、放棄ではありません。<br />
                  構造から離れ、今ここに帰還する唯一の行為だったのです。<br />
                  その&quot;構造&quot;を手放した瞬間、内側に静かに降りてきたのが、五次元経営の原型でした。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>6-6. 三度目の結婚と、五次元経営の共創へ</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  その後、現在の妻と出会い、ともに「五次元経営®」を立ち上げました。<br />
                  そこにあるのは、再演ではなくイマココの意識からの選択。<br />
                  痛みからの逃走ではなく、構造を見つめるまなざし。
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・思考の自動運転から降りる</li>
                  <li>・感情に巻き込まれず、ただ感じ切る</li>
                  <li>・&quot;イマココ&quot;の静けさから、存在を選び直す</li>
                </ul>
                <p>
                  それは「自己実現」ではなく、<br />
                  <strong>誰にも支配されない経営＝存在からの経営のはじまり</strong>でした。
                </p>

                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)', marginTop: '2rem' }}>
                  <p style={{ fontWeight: 600, color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>
                    次章では…
                  </p>
                  <p style={{ color: 'var(--lp-text-secondary)', margin: 0 }}>
                    同じように&quot;構造&quot;を抱える経営者たちとの出会いと、<br />
                    彼らと私がなぜ「波動で引き寄せ合っていたのか？」を見ていきます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 第7章 */}
        <section id="chapter7" className={styles.section}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'var(--5d-teal)', color: 'white', borderRadius: '50%', fontSize: '1.25rem', fontWeight: 700 }}>7</span>
                <h2 style={{ margin: 0, color: 'var(--5d-teal-dark)', fontSize: '1.25rem' }}>
                  波動が引き寄せた経営者たちと、死のエネルギー
                </h2>
              </div>

              <div style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-text-primary)', marginBottom: '1rem' }}>一見、成功しているように見える経営者たち</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  実績もある、人望もある、見た目は順調<br />
                  けれど、その内側は──<br />
                  どこか脆く、不安定で、孤独だった。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  気づけば、そんな経営者が私のまわりに自然と集まっていたのです。<br />
                  身体を壊す人、心を病む人、若くして命を落とす人──<br /><br />
                  <strong>それは偶然ではなく、波動の共鳴による引き寄せでした。</strong>
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>7-1. 再演のパターンは、波動で人を引き寄せる</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  「また同じような社員が入ってくる」<br />
                  「この外注、また前と似たような展開になりそう…」<br />
                  そう感じたことはありませんか？
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  それは、相性の問題ではなく──<br />
                  <strong>あなたの&quot;構造&quot;が、似た構造を持つ存在を引き寄せている</strong>のです。<br /><br />
                  波動とは、言葉ではなく&quot;状態&quot;そのもの。<br />
                  表面では取り繕えても、内側の質感はすべて伝わる。<br />
                  そしてその波動は、人だけでなく、出来事や流れそのものを呼び寄せます。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>7-2. 私が引き寄せた&quot;痛みの仲間&quot;たち</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  2010年、私は「経営加速会議」という朝食勉強会を立ち上げました。<br />
                  そこに集まってきたのは、かつての自分の断片のような人たちでした。
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・家族から「もっと頑張れ」と言われ続けた人</li>
                  <li>・パートナーと本音で向き合えていない人</li>
                  <li>・成果で空虚をごまかしてきた人</li>
                  <li>・期待に応えながら、どこかで&quot;もう疲れていた&quot;人</li>
                </ul>
                <p style={{ marginBottom: '2rem' }}>
                  彼らの発する言葉、口癖、態度、目線。<br />
                  すべてが、かつての私の&quot;波動&quot;と重なっていました。<br /><br />
                  <strong>私が無意識に発していた状態＝波動が、同じ構造を持つ&quot;仲間&quot;たちを引き寄せていたのです。</strong>
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>7-3. 若くして命を手放す仲間たち</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  その中には、病に倒れ、命を閉じた仲間も少なくありません。<br />
                  誰もが立派な実績を持ち、社会的には&quot;成功者&quot;と呼ばれる人たちでした。<br />
                  でも、心のどこかで──<br />
                  <strong>壊れかけていた。止まりたくても、止まれなかった。</strong>
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・弱さを見せられない社長という役割</li>
                  <li>・家族の期待に応え続けるプレッシャー</li>
                  <li>・怒りや哀しみを、正論や成果で覆い隠す習慣</li>
                </ul>
                <p style={{ marginBottom: '2rem' }}>
                  未処理の感情は、やがて身体に圧縮され、&quot;出口&quot;を求め始めます。<br /><br />
                  <strong>それが現れたのが、病だったのです。</strong><br />
                  ある意味、魂が身体に「強制終了」をかけたとも言える。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>7-4. 私が放っていた&quot;死の波動&quot;</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  私は、ようやく気づきました。<br />
                  なぜ&quot;同じような人&quot;が集まってきたのか？<br />
                  なぜ&quot;あの結末&quot;に向かってしまったのか？
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  <strong>それは、私自身の&quot;波動&quot;が引き寄せていたからだったのです。</strong><br /><br />
                  波動とは、&quot;選ばれた結果&quot;ではなく、&quot;選んでいる状態&quot;のこと。<br />
                  そしてそれは、変えられる。選び直せる。
                </p>

                <div style={{ padding: '1.5rem', background: 'var(--5d-teal-50)', borderRadius: '12px', marginTop: '2rem' }}>
                  <p style={{ fontWeight: 600, color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>
                    次章では…
                  </p>
                  <p style={{ color: 'var(--lp-text-secondary)', margin: 0 }}>
                    あなたの中にもある&quot;構造&quot;。<br />
                    それが家族、会社、国家にどう連鎖していくのか？<br />
                    次章では、ペインボディの統合の構造図を明らかにしていきます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 第8章 */}
        <section id="chapter8" className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'var(--5d-teal)', color: 'white', borderRadius: '50%', fontSize: '1.25rem', fontWeight: 700 }}>8</span>
                <h2 style={{ margin: 0, color: 'var(--5d-teal-dark)', fontSize: '1.25rem' }}>
                  ペインボディとは「構造」だった──経営・家系・国家の再演地図
                </h2>
              </div>

              <div style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-text-primary)', marginBottom: '1rem' }}>なぜ、何度も繰り返されるのか？</h3>
                <p style={{ marginBottom: '2rem' }}>
                  反応したくないのに、反応してしまう。<br />
                  相手は違うのに、いつも同じ展開になる。<br />
                  頭ではわかっているのに、身体が動いてしまう。<br /><br />
                  それはもう、「感情」の問題ではありません。<br />
                  <strong>&quot;構造&quot;が、あなたの内側で作動しているのです。</strong>
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>8-1. ペインボディとは「構造化された感情記憶」</h4>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>・ペインボディとは、過去に処理されずに凍結された感情エネルギー</li>
                  <li style={{ marginBottom: '0.5rem' }}>・それが&quot;人格のように&quot;独立し、特定のトリガーで再演される</li>
                  <li style={{ marginBottom: '0.5rem' }}>・本人は「自分の性格」や「繊細さ」のせいだと思っている</li>
                  <li>・実態は、<strong>構造が自動発動しているだけ</strong></li>
                </ul>
                <p style={{ marginBottom: '2rem' }}>
                  つまり：<br />
                  <strong>「怒っている」のではなく、「怒りの構造が再生されている」</strong>
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>8-2. 三層構造で見る：個人 → 家系 → 国家</h4>
                <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '3px solid var(--5d-teal)' }}>
                    <strong style={{ color: 'var(--5d-teal-dark)' }}>個人の構造</strong><br />
                    幼少期の傷、抑圧された本音、飲み込まれた感情<br />
                    トリガーに反応して「今の出来事」に重なり、暴発する
                  </div>
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '3px solid #ffc107' }}>
                    <strong style={{ color: '#856404' }}>家系の構造</strong><br />
                    父母、祖父母からの感情エネルギーの継承<br />
                    言葉にならなかった痛みが、次世代に&quot;磁場&quot;として伝わる
                  </div>
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '3px solid #6c757d' }}>
                    <strong style={{ color: '#495057' }}>国家・歴史の構造</strong><br />
                    集団として処理されなかった痛みが、再演される（戦争、差別、抑圧）<br />
                    社会的には語られず、「空気」として存在し、再現され続ける
                  </div>
                </div>
                <p style={{ marginBottom: '2rem' }}>
                  構造は、個人を超えて「場」となり、<br />
                  <strong>あなたの選択や現実さえも左右している</strong>のです。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>8-3. &quot;痛みの再演&quot;の8つのエネルギー構造</h4>
                <p style={{ marginBottom: '1rem' }}>
                  ペインボディが発動するとき、背景には&quot;感情&quot;ではなく、構造としてのエネルギーがあります。
                </p>
                <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--5d-teal)', color: 'white' }}>
                        <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid var(--lp-border)' }}>№</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid var(--lp-border)' }}>名称</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid var(--lp-border)' }}>概要</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ background: 'white' }}>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>①</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>共鳴型</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>自分の中の未統合感情が他者と共鳴し、感情が再演される</td>
                      </tr>
                      <tr style={{ background: '#f8f9fa' }}>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>②</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>飢餓型</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>他者のペインボディがあなたの反応を求めてエネルギーを吸収しようとする</td>
                      </tr>
                      <tr style={{ background: 'white' }}>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>③</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>浄化型</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>あなたの静けさに反応して相手のペインボディが排出・暴発する</td>
                      </tr>
                      <tr style={{ background: '#f8f9fa' }}>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>④</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>集合型</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>国家・民族・文化・宗教などの集合意識に埋もれた未解放の痛みが表出する</td>
                      </tr>
                      <tr style={{ background: 'white' }}>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>⑤</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>転写型</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>自分の感情を他者に無意識に演じさせて再現する（例：スケープゴート）</td>
                      </tr>
                      <tr style={{ background: '#f8f9fa' }}>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>⑥</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>同調型</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>群衆心理・社会構造によって暴走的なエネルギー場が形成される</td>
                      </tr>
                      <tr style={{ background: 'white' }}>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>⑦</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>封印型</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>長期の抑圧・否認により人格から分離し幽体化した痛みが突然暴発する</td>
                      </tr>
                      <tr style={{ background: '#f8f9fa' }}>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>⑧</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>寄生型</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>自己イメージと融合し、「それが自分だ」と思い込んでいる状態</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ marginBottom: '2rem' }}>
                  これらは性格ではなく、すべて<strong>&quot;構造の現象&quot;</strong>です。<br />
                  だからこそ、「我慢」や「説得」では変えられない。<br />
                  <strong>必要なのは、構造を見る意識です。</strong>
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>8-4. 組織に映し出される構造の写像</h4>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                  <li>・抑圧された社長の組織は、防衛と緊張で満ちる</li>
                  <li>・承認欲求に飲まれたリーダーの場には、反発や依存が集まる</li>
                  <li>・無力感を抱える経営者の会社には、同調と沈黙が伝播する</li>
                </ul>
                <p style={{ marginBottom: '2rem' }}>
                  <strong>組織の&quot;空気&quot;は、経営者の&quot;意識構造&quot;がつくる。</strong><br />
                  構造を変えることは、「経営を変えること」に直結します。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>8-5. 家族・家系という&quot;構造の磁場&quot;</h4>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・母の怒りを怖れ続けた幼少期</li>
                  <li>・父の失望を避けるための努力</li>
                  <li>・比較の中で固めた自我</li>
                </ul>
                <p style={{ marginBottom: '2rem' }}>
                  こうした記憶は、親密な関係・子育て・社員との関係に再演されます。<br /><br />
                  <strong>家系とは、「未処理の感情構造のリレー」であり、<br />
                  あなたは&quot;終わらせる者&quot;として今ここに存在しているのかもしれません。</strong>
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>8-6. 国家単位で爆発するペインボディ</h4>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・戦後日本に漂う&quot;加害を語れない空気&quot;</li>
                  <li>・黒人差別に宿る&quot;怒りの記憶&quot;</li>
                  <li>・正義の名で繰り返される&quot;犠牲の美学&quot;</li>
                </ul>
                <p style={{ marginBottom: '2rem' }}>
                  それは政治でも倫理でもなく、<strong>集合ペインボディの再演</strong>です。<br />
                  処理されなかった感情は、形を変えて繰り返される。<br />
                  歴史とは、記憶ではなく&quot;波&quot;の連続。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>8-7. 統合とは、「構造を終わらせる」こと</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  統合とは、戦うことでも、癒すことでもない。<br />
                  <strong>構造を&quot;終わらせる&quot;という静かな選択</strong>です。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  今、怒っているのは「私」か？<br />
                  それとも「構造」か？<br /><br />
                  その問いに気づき、沈黙のうちに反応をほどいていくとき──<br />
                  あなたは&quot;再演の場&quot;ではなく、<strong>&quot;統合の場&quot;に立っています。</strong>
                </p>

                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)', marginTop: '2rem' }}>
                  <p style={{ fontWeight: 600, color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>
                    次章では…
                  </p>
                  <p style={{ color: 'var(--lp-text-secondary)', margin: 0 }}>
                    この構造を終わらせるための、具体的な実践ステップをお伝えします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 第9章 */}
        <section id="chapter9" className={styles.section}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'var(--5d-teal)', color: 'white', borderRadius: '50%', fontSize: '1.25rem', fontWeight: 700 }}>9</span>
                <h2 style={{ margin: 0, color: 'var(--5d-teal-dark)', fontSize: '1.25rem' }}>
                  反応を終わらせる統合プロセス
                </h2>
              </div>

              <div style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
                <p style={{ marginBottom: '2rem' }}>
                  ここまでで、ペインボディという「もう一人の自分」の正体を知り、<br />
                  それが人間関係や経営、そして国家にまで広がる構造であることを見てきました。<br /><br />
                  では、どうすればそれを終わらせることができるのか？<br /><br />
                  ここからは、<strong>思考を超えた実践＝統合の4ステップ</strong>を紹介します。<br />
                  これは、誰にでもできる。<br />
                  しかし、誰も教えてくれなかった──<strong>&quot;再演を終わらせる方法&quot;</strong>です。
                </p>

                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-text-primary)', marginBottom: '1rem' }}>9-1. 気づき → 沈黙 → 身体 → 統合 の4ステップ</h3>

                <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ padding: '1.5rem', background: 'var(--5d-teal-50)', borderRadius: '12px' }}>
                    <h4 style={{ color: 'var(--5d-teal-dark)', marginBottom: '0.5rem' }}>ステップ1｜気づき</h4>
                    <p style={{ margin: 0 }}>
                      まずは、「自分が反応している」ことに気づくこと。<br />
                      これは&quot;怒らないようにする&quot;ことではありません。<br /><br />
                      <strong>「今、怒っているのは&quot;私&quot;なのか、&quot;過去の構造&quot;なのか？」</strong><br />
                      この問いが、再演の主導権を取り戻す鍵になります。
                    </p>
                  </div>
                  <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                    <h4 style={{ color: 'var(--5d-teal-dark)', marginBottom: '0.5rem' }}>ステップ2｜沈黙</h4>
                    <p style={{ margin: 0 }}>
                      気づいたあとは、反応を言葉にせず、沈黙する。<br />
                      沈黙とは、我慢ではありません。<br /><br />
                      <strong>「反応に乗らず、ただ感じる」</strong>こと。<br />
                      この空白が、思考の自動運転から降りる第一歩になります。
                    </p>
                  </div>
                  <div style={{ padding: '1.5rem', background: 'var(--5d-teal-50)', borderRadius: '12px' }}>
                    <h4 style={{ color: 'var(--5d-teal-dark)', marginBottom: '0.5rem' }}>ステップ3｜身体で感じる</h4>
                    <p style={{ margin: 0 }}>
                      その感情を、ただ身体で感じる。<br />
                      胸が痛い？喉が詰まる？胃が重い？<br /><br />
                      <strong>名前をつけずに、思考からエネルギー感覚へ戻る</strong>こと。<br />
                      これが統合への入り口です。
                    </p>
                  </div>
                  <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                    <h4 style={{ color: 'var(--5d-teal-dark)', marginBottom: '0.5rem' }}>ステップ4｜統合</h4>
                    <p style={{ margin: 0 }}>
                      そのまま、ただ一緒にいてあげる。<br />
                      追い払わない。否定しない。<br /><br />
                      <strong>「それを問題にしない」</strong>こと。<br />
                      そうすると、不思議とそのエネルギーは静かに溶けていくのです。
                    </p>
                  </div>
                </div>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>9-2. 沈黙がもたらす&quot;場の再構築&quot;</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  このプロセスは、決して&quot;ひとりで完結する内面作業&quot;ではありません。<br />
                  むしろ、経営の現場、家庭の空間、人と人との関係性──<br />
                  それこそが、統合の舞台であり、プレゼンスの&quot;実践場&quot;です。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  沈黙とは、「言葉を発しない」ことではなく、<br />
                  <strong>自動的に反応せずに&quot;在る&quot;こと。</strong>
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  あなた一人が、その沈黙に根ざすようになると、<br />
                  その場のエネルギー構造が静かに、だが確実に変わっていきます。<br /><br />
                  ・社内で怒りが伝播しなくなる<br />
                  ・家庭の緊張が言葉なくほぐれていく<br />
                  ・クライアントとの関係に、信頼の&quot;空間&quot;が生まれる<br /><br />
                  それは、沈黙が「何かを伝える力」ではなく、<br />
                  <strong>&quot;何かを変えてしまう場&quot;であるから</strong>です。<br /><br />
                  あなたの内側で統合された静けさは、<br />
                  見えない次元で周囲のペインボディをも鎮め、<br />
                  やがてその空間全体が、ひとつの癒しの器となっていきます。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>9-3. 存在から経営するとは？</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  「何をするか」よりも、<br />
                  <strong>「どのような在り方でそれを行うのか」</strong><br />
                  それが、五次元経営®の根幹にある問いです。
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・数字を見る前に、場に静けさはあるか？</li>
                  <li>・問題を解く前に、感情は抱きしめられているか？</li>
                  <li>・目標へ向かう前に、&quot;イマココ&quot;に還れているか？</li>
                </ul>
                <p>
                  経営とは、極めてパーソナルな道。<br />
                  同時に、意識の統合がもっとも実践される&quot;フィールド&quot;です。<br /><br />
                  あなたが「イマココ」で在ることに戻るとき──<br />
                  <strong>経営は、癒しと創造が同時に起こる&quot;場&quot;に変わっていきます。</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 第10章 */}
        <section id="chapter10" className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'var(--5d-teal)', color: 'white', borderRadius: '50%', fontSize: '1.25rem', fontWeight: 700 }}>10</span>
                <h2 style={{ margin: 0, color: 'var(--5d-teal-dark)', fontSize: '1.25rem' }}>
                  あなたが、この物語を終わらせる側に立つとき
                </h2>
              </div>

              <div style={{ lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  ここまで、ペインボディという「もう一人の自分」の存在とその構造を見てきました。<br />
                  それが、あなたの感情を操り、人間関係を壊し、経営判断にすら入り込んでいたこと。<br />
                  そして、それが家系や国家単位にまで波及するエネルギー構造であることも——
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  けれど、あなたは今、気づいています。<br /><br />
                  <strong>「このまま再演を続けたくない」</strong><br />
                  <strong>「ここで、自分が終わらせる側に立ちたい」</strong><br /><br />
                  過去を変えることはできません。<br />
                  でも、&quot;誰がこの構造を終わらせるか&quot;は、今ここで選ぶことができます。<br /><br />
                  思考でも感情でもなく、<br />
                  <strong>存在として「私は終わらせる」と静かに選んだとき、</strong><br />
                  あなたの中の何かが、静かに、しかし確実に変わりはじめるのです。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>10-1. 反応に人生を奪われてきたあなたへ</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  ふとした一言で怒りが爆発したこと、ありませんか？<br />
                  理性では「こんなに怒ることじゃない」とわかっていたのに、止められなかったこと。<br /><br />
                  後から振り返ると、<br />
                  「なぜあんなに過剰に反応したのか、覚えていない」<br /><br />
                  その瞬間、<strong>人生を動かしていたのは&quot;あなた&quot;ではなく、&quot;あなたの中の構造&quot;</strong>だったのです。
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  けれど今なら、<strong>「それを終わらせる選択」ができる。</strong><br />
                  それが、本来のあなたの&quot;はじまり&quot;になります。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>10-2. 経営と人生に&quot;真の静けさ&quot;を取り戻す</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  私たちは、「結果を出すこと」や「評価されること」のために、<br />
                  本来の静けさを置き去りにしてきました。
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  でも、本当に必要だったのは、<br />
                  思考でも、正論でも、感情の爆発でもなく——<br /><br />
                  <strong>静けさでした。</strong>
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  静けさとは、空白ではありません。<br />
                  静けさとは、<strong>真の意思決定が生まれる&quot;純粋な意識&quot;の場</strong>です。
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                  <li>・反応するのではなく、&quot;選ぶ&quot;こと</li>
                  <li>・感情に乗るのではなく、&quot;観る&quot;こと</li>
                  <li>・自動運転をやめ、舵を手に戻すこと</li>
                </ul>
                <p style={{ marginBottom: '2rem' }}>
                  経営とは、成果のための装置ではなく、<br />
                  <strong>自己の在り方を映す鏡です。</strong><br /><br />
                  整った意識からの経営は、<br />
                  結果として最も強く、しなやかなのです。
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--5d-teal-dark)', marginBottom: '1rem' }}>10-3. 今、ここから再演を終わらせよう</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  ペインボディを消す必要はありません。<br />
                  怒らない人になる必要もありません。<br /><br />
                  ただ、<strong>「再演を終わらせる」と静かに選べばいい。</strong>
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li>・自分の感情を責めないこと</li>
                  <li>・相手の反応に巻き込まれないこと</li>
                  <li>・静けさから人生を選び直すこと</li>
                </ul>
                <p style={{ marginBottom: '2rem' }}>
                  これだけで、物語は変わります。<br /><br />
                  <strong>あなたが再演を終わらせる側に立つことで、<br />
                  家族が変わり、組織が変わり、世界が変わっていきます。</strong><br /><br />
                  今ここから、新しい物語が始まります。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 終わりに */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>終わりに｜見えないものを、腑に落ちる体感へ</h2>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 2, color: 'var(--lp-text-secondary)' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                「なんとなくうまくいかない」<br />
                「何かがズレている気がする」<br />
                「理屈では説明できないけれど、心が疲れている」
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                もし、そんな違和感を抱えているなら、<br />
                それは目に見えない&quot;構造&quot;が、あなたを縛っているサインかもしれません。
              </p>
              <p style={{ marginBottom: '2rem' }}>
                五次元経営®は、<br />
                こうした<strong>&quot;反応の連鎖&quot;を引き起こす内的構造＝ペインボディ</strong>を、<br />
                思考ではなく、&quot;体感&quot;を通して統合していくプロセスです。
              </p>

              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--lp-text-primary)' }}>
                統合のための3つのアプローチ
              </h3>

              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                  <h4 style={{ color: 'var(--5d-teal-dark)', marginBottom: '0.5rem' }}>1. 宿曜 ─ 魂の設計図を読み解く</h4>
                  <p style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>（エゴと時間の構造をほどく）</p>
                  <p style={{ margin: 0 }}>
                    宿曜は、あなたが生まれた瞬間の「月の位置」に基づき、人生のリズム・人間関係の傾向・才能の所在を明らかにする叡智。<br />
                    「本来の自分」への理解が深まると、比較・自己否定が減り、ペインボディの反応も穏やかになります。
                  </p>
                </div>
                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                  <h4 style={{ color: 'var(--5d-teal-dark)', marginBottom: '0.5rem' }}>2. 風水 ─ 空間とモノの流れを整える</h4>
                  <p style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>（感情と空間の構造をほどく）</p>
                  <p style={{ margin: 0 }}>
                    感情の乱れは、しばしば&quot;場の構造&quot;と連動しています。<br />
                    五次元経営®では、「ゆるゆるマンダラ®風水」を採用。気の流れやモノの配置を整えることで、ペインボディが暴れにくい空間構造を創出します。
                  </p>
                </div>
                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                  <h4 style={{ color: 'var(--5d-teal-dark)', marginBottom: '0.5rem' }}>3. イマココの意識 ─ 思考の自動反応を手放す</h4>
                  <p style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>（三次元、四次元の構造をほどく）</p>
                  <p style={{ margin: 0 }}>
                    1on1対話を通して、「これは本当に今の私の望みか？」という問いから、「過去の構造」と「今ここにある意図」とを明確に切り分けていきます。<br />
                    意識状態を「今ここ」に整えることで、存在からの選択が可能になります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>『イマココ意識体験セッション』のご案内</h2>
              <p className={styles.ctaLead}>
                このページを最後まで読んでくださったあなたへ、<br />
                五次元経営®の本質を体感できるセッションをご用意しています。
              </p>

              <div style={{ maxWidth: '600px', margin: '0 auto 2rem', textAlign: 'left', color: 'white' }}>
                <p style={{ fontWeight: 600, marginBottom: '1rem' }}>セッション内容（50分）</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>・あなたの「宿曜」設計図を読み解く</li>
                  <li style={{ marginBottom: '0.5rem' }}>・今の意識状態を可視化する</li>
                  <li style={{ marginBottom: '0.5rem' }}>・感覚の地図を描き出す</li>
                  <li>・意識状態に応じたアクションを提示</li>
                </ul>
                <p style={{ fontWeight: 600, marginBottom: '1rem' }}>得られるもの</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>・存在に刻まれた強みと成長リズム</li>
                  <li style={{ marginBottom: '0.5rem' }}>・違和感の根本構造の理解</li>
                  <li>・自然に拡張していく方向性</li>
                </ul>
              </div>

              <Link href="/taiken/imakoko" className={styles.ctaBtn}>
                イマココ意識体験セッションに申し込む
              </Link>
            </div>
          </div>
        </section>
    </>
  );
}
