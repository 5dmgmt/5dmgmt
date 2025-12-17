/**
 * components/story/StoryChapters7to8.tsx
 *
 * ストーリーページ - 第7章・第8章
 */

import styles from '@/components/landing/LandingPage.module.css';

const painBodyTypes = [
  { num: 1, name: '共鳴型', desc: '自分の中の未統合感情が他者と共鳴し、感情が再演される' },
  { num: 2, name: '飢餓型', desc: '他者のペインボディがあなたの反応を求めてエネルギーを吸収しようとする' },
  { num: 3, name: '浄化型', desc: 'あなたの静けさに反応して相手のペインボディが排出・暴発する' },
  { num: 4, name: '集合型', desc: '国家・民族・文化・宗教などの集合意識に埋もれた未解放の痛みが表出する' },
  { num: 5, name: '転写型', desc: '自分の感情を他者に無意識に演じさせて再現する（例：スケープゴート）' },
  { num: 6, name: '同調型', desc: '群衆心理・社会構造によって暴走的なエネルギー場が形成される' },
  { num: 7, name: '封印型', desc: '長期の抑圧・否認により人格から分離し幽体化した痛みが突然暴発する' },
  { num: 8, name: '寄生型', desc: '自己イメージと融合し、「それが自分だ」と思い込んでいる状態' },
];

export default function StoryChapters7to8() {
  return (
    <>
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
                      <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid var(--lp-border)' }}>No</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid var(--lp-border)' }}>名称</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid var(--lp-border)' }}>概要</th>
                    </tr>
                  </thead>
                  <tbody>
                    {painBodyTypes.map((item, index) => (
                      <tr key={item.num} style={{ background: index % 2 === 0 ? 'white' : '#f8f9fa' }}>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>{item.num}</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>{item.name}</td>
                        <td style={{ padding: '0.75rem', border: '1px solid var(--lp-border)' }}>{item.desc}</td>
                      </tr>
                    ))}
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
    </>
  );
}
