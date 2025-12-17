/**
 * components/story/StoryChapters1to2.tsx
 *
 * ストーリーページ - 第1章・第2章
 */

import styles from '@/components/landing/LandingPage.module.css';

export default function StoryChapters1to2() {
  return (
    <>
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
    </>
  );
}
