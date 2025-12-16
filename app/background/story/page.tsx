/**
 * app/5dmgmt/background/story/page.tsx
 *
 * 【Phase 30】五次元経営ストーリーページ
 * - 元サイト(www.5dmgmt.com/story/)の内容を移植
 */

import Link from 'next/link';
import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '五次元経営ストーリー | 五次元経営',
  description: 'なぜ、整えても崩れるのか？構造の再演を終わらせる鍵。ペインボディという無意識の感情構造が人生や経営にいかに影響するかを描く物語。',
};

const chapters = [
  {
    number: 1,
    title: '親密な関係が壊れる理由',
    content: `表面的な関係では問題が起きないのに、心理的距離が近づくと反応が起きるのはなぜか。それは過去の「記憶に触れる距離」に無意識が反応するためです。

相手の言葉が「かつての痛みの記憶」を再生させ、本人の意思とは関係なく感情が暴発します。

親密さとは「未処理の感情構造への接触」であり、反応しているのは「今のあなた」ではなく「過去の構造」なのです。`,
  },
  {
    number: 2,
    title: 'ペインボディとは何か',
    content: `エックハルト・トール著『ニュー・アース』の概念を採用します。

ペインボディは、過去に処理されなかった感情が人格化し、特定のトリガーで自動反応する独立した構造体です。

「怒っている」のではなく「怒りの構造が再生されている」状態。

三次元（思考）では解決できず、五次元（今ここの意識）のレベルからしか統合できません。`,
  },
  {
    number: 3,
    title: '経営と組織への影響',
    content: `組織の空気は経営者の内的状態でできています。

ペインボディが未統合なままだと：
・緊張と防衛で満ちた職場
・本音が語られない環境
・再演のドラマが繰り返される

「外側で起きることは、内側から始まっている」

これが五次元経営の原理です。`,
  },
  {
    number: 4,
    title: '歴史と国家レベルの再演',
    content: `戦争、差別、虐殺といった歴史的悲劇は、理屈ではなく「集合ペインボディ」の再演です。

過去の痛みが「正義」に姿を変えて、同じドラマが繰り返される構造が存在します。

日本文化の「我慢」「察する」「自己犠牲」といった価値観も、この集合構造の表現です。`,
  },
  {
    number: 5,
    title: 'フィクションと集合無意識',
    content: `『ファンタスティック・ビースト』のオブスキュラスや『呪術廻戦』の呪霊は、抑圧された感情が人格化したペインボディの象徴です。

フィクションは集合無意識の「現在地」を可視化しています。

視聴者が涙するのは「自分の構造が映っているから」です。`,
  },
  {
    number: 6,
    title: '著者の実体験',
    content: `五次元経営の創始者・望月貴生の二度の離婚と再構築の経験。

第一の結婚：完璧さを演じ、本音を抑圧。かつての家庭と同じ空気を再演。

第二の結婚：痛みの共鳴から成立した関係が、感情の戦場へと化す。

靖国神社での転機：「全託」という行為を通じて、構造から離脱し五次元経営の原型が降りてくる。

「自分の人生を自分が演じていた」と思っていたが、実は「ペインボディが舵を握っていた」という気づき。`,
  },
  {
    number: 7,
    title: '波動による引き寄せ',
    content: `表面では取り繕えても、内側の「状態」が他者を引き寄せます。

著者が立ち上げた「経営加速会議」には、著者自身と同じペインボディ構造を持つ人たちが自然と集まりました。

その中には若くして命を閉じた人も。

「未処理の感情は身体に圧縮され、『強制終了』をかける」という事象。`,
  },
  {
    number: 8,
    title: '構造の三層マップ',
    content: `ペインボディは三つの層で構成されています：

・個人レベル：幼少期の傷、抑圧された本音
・家系レベル：親世代からの感情エネルギーの継承
・国家レベル：歴史的に処理されない痛みの再演

8つのペインボディエネルギー構造：
共鳴型、飢餓型、浄化型、集合型、転写型、同調型、封印型、寄生型`,
  },
  {
    number: 9,
    title: '統合の4ステップ',
    content: `実践プロセス：

1. 気づき — 反応している主体を問い直す
2. 沈黙 — 反応に乗らず、感じる
3. 身体で感じる — 思考から感覚へ戻る
4. 統合 — 判断せず、ただ一緒にいてあげる

「沈黙が『場の再構築』をもたらす」`,
  },
  {
    number: 10,
    title: '存在から経営へ',
    content: `過去は変えられない。

しかし、「誰がこの構造を終わらせるか」は今ここで選べます。

「存在として『終わらせる』と静かに選んだとき」、人生と経営が変わります。

五次元経営は、その選択を支援するためにあります。`,
  },
];

export default function StoryPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>Origin Story</p>
            <h1 className={styles.heroTitle}>五次元経営ストーリー</h1>
            <p className={styles.heroLead}>
              なぜ、整えても崩れるのか？<br />
              構造の再演を終わらせる鍵
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 2,
                color: 'var(--5d-text)',
                marginBottom: '2rem'
              }}>
                繰り返される同じパターン。<br />
                距離がある関係はうまくいくのに、親密になると壊れる。<br />
                <br />
                それは個人の欠陥ではなく、「構造」の問題です。<br />
                この物語は、その構造を解き明かし、<br />
                終わらせる方法を示します。
              </p>
            </div>
          </div>
        </section>

        {/* Chapters */}
        {chapters.map((chapter, index) => (
          <section
            key={chapter.number}
            className={styles.section}
            style={{
              backgroundColor: index % 2 === 0 ? 'var(--5d-bg-white)' : 'var(--5d-bg-section)',
            }}
          >
            <div className={styles.container}>
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'var(--5d-primary)',
                    color: 'white',
                    borderRadius: '50%',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {chapter.number}
                  </span>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--5d-primary)',
                    margin: 0,
                  }}>
                    {chapter.title}
                  </h2>
                </div>
                <div style={{
                  paddingLeft: '64px',
                  lineHeight: 2,
                  color: 'var(--5d-text)',
                  whiteSpace: 'pre-line',
                }}>
                  {chapter.content}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Summary */}
        <section className={`${styles.section} ${styles.architectureSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Summary</p>
              <h2 className={styles.sectionTitle}>五次元とは</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              <div style={{
                backgroundColor: 'var(--5d-bg-white)',
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  color: 'var(--5d-primary)',
                  marginBottom: '0.5rem'
                }}>
                  三次元
                </h3>
                <p style={{ color: 'var(--5d-text-muted)', margin: 0 }}>
                  思考・時間
                </p>
              </div>
              <div style={{
                backgroundColor: 'var(--5d-bg-white)',
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  color: 'var(--5d-primary)',
                  marginBottom: '0.5rem'
                }}>
                  四次元
                </h3>
                <p style={{ color: 'var(--5d-text-muted)', margin: 0 }}>
                  感情・記憶
                </p>
              </div>
              <div style={{
                backgroundColor: 'var(--5d-accent)',
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center',
                color: 'white',
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  marginBottom: '0.5rem'
                }}>
                  五次元
                </h3>
                <p style={{ margin: 0, opacity: 0.9 }}>
                  沈黙・選択・在り方
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>イマココ意識体験セッション</h2>
              <p className={styles.ctaLead}>
                あなたの宿曜を読解し、意識状態を可視化します。<br />
                50分のセッションで、五次元への入口を体験してください。
              </p>
              <Link href="/taiken/imakoko" className={styles.ctaBtn}>
                体験セッションの詳細を見る
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />
    </div>
  );
}
