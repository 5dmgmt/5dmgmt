/**
 * app/unki/shukuyo/page.tsx
 *
 * 宿曜鑑定ページ - WordPressサイトから完全移植
 */

import Link from 'next/link';
import { ShukuyoSenseibanWrapper, ShukuyoLookupWrapper, ShukuyoTodayFortuneWrapper } from '@/components/shukuyo/ShukuyoClientWrapper';
import styles from '@/components/landing/LandingPage.module.css';

export const metadata = {
  title: '宿曜鑑定 | 五次元経営',
  description: '生年月日から導く潜在意識の設計図。27宿の特性と意識レベル向上の方向性を解読します。',
};

export default function ShukuyoPage() {
  return (
    <>
      {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>宿曜×五次元経営</p>
            <h1 className={styles.heroTitle}>宿曜とは</h1>
          </div>
        </section>

        {/* 宿曜占い Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Lookup</p>
              <h2 className={styles.sectionTitle}>あなたの宿曜を調べる</h2>
            </div>
            <ShukuyoLookupWrapper />
          </div>
        </section>

        {/* 本日の運勢 Section */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Today Fortune</p>
              <h2 className={styles.sectionTitle}>本日の運勢</h2>
            </div>
            <ShukuyoTodayFortuneWrapper />
          </div>
        </section>

        {/* 宿曜盤 Section */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Senseiban</p>
              <h2 className={styles.sectionTitle}>― 宿曜盤アプリ ―</h2>
              <p className={styles.sectionLead}>
                自分を中心とした人間関係を知りたい方はこちらのアプリを
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', width: '100%', maxWidth: '500px', margin: '0 auto 2rem' }}>
              <ShukuyoSenseibanWrapper maxSize={500} />
            </div>

            {/* 使い方説明 */}
            <div style={{ maxWidth: '700px', margin: '0 auto', background: '#fff', padding: '24px', borderRadius: '12px', lineHeight: 1.8 }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--5d-text)' }}>使い方</h3>
              <p style={{ marginBottom: '1rem', color: 'var(--5d-text-secondary)' }}>
                外側の円（27宿）をドラッグまたはタッチで回転させることができます。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                あなたの宿を12時の位置（中央上）に合わせてください。中央に宿名が表示され、その宿から見た命・業・胎の関係が色付きで表示されます。
              </p>

              <h4 style={{ marginBottom: '0.75rem', color: 'var(--5d-text)' }}>円盤の色分け表示について</h4>
              <p style={{ marginBottom: '1rem', color: 'var(--5d-text-secondary)' }}>
                内側の円に表示される11種類の相性は、それぞれ固有の色で表現されています。<br />
                <strong>色の濃淡が相性の力関係を示しており、視覚的に相性の優劣を把握できます。</strong>
              </p>

              <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', color: 'var(--5d-text)' }}>パワーバランス（数値が高いほど有利）</h4>
              <p style={{ marginBottom: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                各相性のパワーバランスを数値で表現しています。<br />
                <strong>数値が高い方が優位な立場、低い方が受動的な立場</strong>を示します。
              </p>

              <h4 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--5d-text)' }}>11種類の相性とパワーバランス</h4>

              {/* 命の関係 */}
              <p style={{ fontWeight: 600, color: 'var(--5d-text)', marginBottom: '0.5rem' }}>【命の関係】特別な縁</p>
              <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                <li><span style={{ backgroundColor: '#FFD699', padding: '2px 8px', borderRadius: '3px' }}>命</span> <strong>パワー5</strong> - 同じ宿を持つ運命的な縁。出会いは稀（27分の1）で、強い因縁と共感。価値観が一致するが、似すぎて嫌悪に転じることも。</li>
              </ul>

              {/* 業・胎の関係 */}
              <p style={{ fontWeight: 600, color: 'var(--5d-text)', marginBottom: '0.5rem' }}>【業・胎の関係】前世と来世の因果（オレンジ系）</p>
              <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                <li><span style={{ backgroundColor: '#FFC166', padding: '2px 8px', borderRadius: '3px' }}>業</span> <strong>パワー7</strong> - 前世での自分。現世でも、気づけば支えを受け、背中を押されるような関係性。精神的な相性が高く、目に見えない力に守られているような不思議な縁。</li>
                <li style={{ marginTop: '0.5rem' }}><span style={{ backgroundColor: '#FFEBCC', padding: '2px 8px', borderRadius: '3px' }}>胎</span> <strong>パワー3</strong> - 来世での自分。放っておけず、つい手を差し伸べたくなる相手。精神的なつながりが深く、現実でも関わりが生まれやすい。</li>
              </ul>

              {/* 栄・親の関係 */}
              <p style={{ fontWeight: 600, color: 'var(--5d-text)', marginBottom: '0.5rem' }}>【栄・親の関係】繁栄と親愛（ピンク系）</p>
              <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                <li><span style={{ backgroundColor: '#FF9999', padding: '2px 8px', borderRadius: '3px' }}>栄</span> <strong>パワー5.5</strong> - 繁栄をもたらす。お互いにプラスを与え合い、協力関係が成り立つ最高の相性。友情から愛情へ自然に発展。</li>
                <li style={{ marginTop: '0.5rem' }}><span style={{ backgroundColor: '#FFCCCC', padding: '2px 8px', borderRadius: '3px' }}>親</span> <strong>パワー4.5</strong> - 親愛の関係。程よい距離感で相手を尊重できる。長く付き合うほどに深い信頼関係が築ける。</li>
              </ul>

              {/* 友・衰の関係 */}
              <p style={{ fontWeight: 600, color: 'var(--5d-text)', marginBottom: '0.5rem' }}>【友・衰の関係】ラヴァースの縁（緑系）</p>
              <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                <li><span style={{ backgroundColor: '#84FF84', padding: '2px 8px', borderRadius: '3px' }}>友</span> <strong>パワー8</strong> - 交友関係で優位な立場。損得抜きで惹かれ合う。共通の目標や趣味が一致し、楽しい時間を共有できる。</li>
                <li style={{ marginTop: '0.5rem' }}><span style={{ backgroundColor: '#C1FFC1', padding: '2px 8px', borderRadius: '3px' }}>衰</span> <strong>パワー2</strong> - 衰退の立場。運命的なシンパシーを感じるが、別名「悲恋宿」。困難や障害が多い。</li>
              </ul>

              {/* 安・壊の関係 */}
              <p style={{ fontWeight: 600, color: 'var(--5d-text)', marginBottom: '0.5rem' }}>【安・壊の関係】破壊と再生（紫系）</p>
              <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                <li><span style={{ backgroundColor: '#9999FF', padding: '2px 8px', borderRadius: '3px' }}>安</span> <strong>パワー9</strong> - 安定をもたらすが相手を破壊する。最も注意すべき相性。激しく燃えるが憎しみで終わることも。師弟関係では成長を促す。</li>
                <li style={{ marginTop: '0.5rem' }}><span style={{ backgroundColor: '#CCCCFF', padding: '2px 8px', borderRadius: '3px' }}>壊</span> <strong>パワー1</strong> - 相手から破壊される立場。破壊作用が強く、身も心も揺さぶられる。一皮剥けるきっかけになることも。</li>
              </ul>

              {/* 成・危の関係 */}
              <p style={{ fontWeight: 600, color: 'var(--5d-text)', marginBottom: '0.5rem' }}>【成・危の関係】ライバル関係（黄色系）</p>
              <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                <li><span style={{ backgroundColor: '#FFFF99', padding: '2px 8px', borderRadius: '3px' }}>成</span> <strong>パワー6</strong> - 達成・成就を表す。正反対の性格だが学び合える。ライバルとして切磋琢磨でき、仕事面で好相性。</li>
                <li style={{ marginTop: '0.5rem' }}><span style={{ backgroundColor: '#FFFFCC', padding: '2px 8px', borderRadius: '3px' }}>危</span> <strong>パワー4</strong> - 危険を表す。刺激的で学ぶ点が多い。ドライな関係だが、互いを尊重すれば長続きする。</li>
              </ul>

              <p style={{ marginTop: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                この色分けシステムにより、複雑な宿曜の相性を直感的に理解できます。
              </p>
            </div>
          </div>
        </section>

        {/* 見えない設計図 Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Design Blueprint</p>
              <h2 className={styles.sectionTitle}>見えない設計図を、今こそ受け取る</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.9 }}>
              <p style={{ marginBottom: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                生まれた瞬間、月はあなたに触れていた。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                宿曜占星術は、古代インドに起源を持ち、空海が日本に伝え、1300年以上にわたり伝承されてきた&quot;時間の叡智&quot;です。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                あなたがこの世に生まれた瞬間、月は「27の宿」のうち、特定のひとつに位置していました。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                月は「感情」「潜在意識」「魂の設計」を司る天体。その宿こそが、あなたの強み・ジレンマ・人生の流れを示す見えない&quot;人生の設計図&quot;なのです。
              </p>
            </div>
          </div>
        </section>

        {/* 無料鑑定 CTA */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>【今だけ】あなたの&quot;宿曜設計図&quot;を無料プレゼント</h2>
              <p className={styles.ctaLead}>
                《あなたの宿曜に基づいた鑑定シート》を無料でお届けしています。<br />
                ご自身の「宿」、隠れた強み、人生のテーマを簡潔にまとめた完全オリジナル鑑定レポートです。
              </p>
              <Link href="/company/contact" className={styles.ctaBtn}>
                無料｜あなたの宿曜鑑定を受け取る
              </Link>
            </div>
          </div>
        </section>

        {/* なぜ五次元経営が宿曜を取り入れるのか */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Why Shukuyo</p>
              <h2 className={styles.sectionTitle}>なぜ五次元経営が宿曜を取り入れるのか</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.9 }}>
              <p style={{ marginBottom: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                五次元経営は、経営のすべてを「今この瞬間の意識の質」から見直すスタイルです。数字、ロジック、行動だけでは辿り着けない、本質的な変化──そこに必要なのが、&quot;意識の設計図&quot;を読む力。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                宿曜は、あなた自身の内面の流れ、そして人との関係性、タイミングの自然なリズムを示します。
              </p>
              <p style={{ marginBottom: '2rem', color: 'var(--5d-text-secondary)' }}>
                五次元経営は、宿曜を用いて、見えない設計図を&quot;今ここ&quot;の経営に統合していきます。
              </p>

              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--5d-text)' }}>徳川家康も、月を読んでいた。</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                宿曜は、徳川家康をはじめとする武将たちが「勝機を見極める羅針盤」として活用していた知恵。戦国の世を生き抜いた彼らは、&quot;見えないもの&quot;にこそ本質があると知っていたのです。
              </p>

              <h3 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--5d-text)' }}>五次元経営 × 宿曜で、何が起こるか</h3>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--5d-text-secondary)' }}>
                <li style={{ marginBottom: '0.75rem' }}><strong>経営のブレが消える：</strong> 自分に合った選択が感覚でわかる</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>人間関係の摩擦が減る：</strong> 相手の本質を理解し、関わり方が変わる</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>チームが自然に動き出す：</strong> 各人が本来のリズムで活きる配置が見える</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>戦略の&quot;今じゃない&quot;が見える：</strong> 動くべき時と待つべき時がわかる</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 体験セッション CTA */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>あなたの宿 × 経営の&quot;今&quot;を読み解く</h2>
              <p className={styles.ctaLead}>
                「宿曜設計図」をもとにした個別セッション<br />
                《五次元経営｜イマココ意識体験セッション》をご案内しております。
              </p>
              <Link href="/taiken/imakoko" className={styles.ctaBtn}>
                イマココ意識体験セッションに申し込む
              </Link>
            </div>
          </div>
        </section>
    </>
  );
}
