/**
 * components/story/StoryConclusion.tsx
 *
 * ストーリーページ - 終わりに + CTA セクション
 */

import Link from 'next/link';
import styles from '@/components/landing/LandingPage.module.css';

export default function StoryConclusion() {
  return (
    <>
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
              五次元経営は、<br />
              こうした<strong>&quot;反応の連鎖&quot;を引き起こす内的構造＝ペインボディ</strong>を、<br />
              思考ではなく、&quot;体感&quot;を通して統合していくプロセスです。
            </p>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--lp-text-primary)' }}>
              統合のための3つのアプローチ
            </h3>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                <h4 style={{ color: 'var(--5d-teal-dark)', marginBottom: '0.5rem' }}>1. 宿曜 - 魂の設計図を読み解く</h4>
                <p style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>（エゴと時間の構造をほどく）</p>
                <p style={{ margin: 0 }}>
                  宿曜は、あなたが生まれた瞬間の「月の位置」に基づき、人生のリズム・人間関係の傾向・才能の所在を明らかにする叡智。<br />
                  「本来の自分」への理解が深まると、比較・自己否定が減り、ペインボディの反応も穏やかになります。
                </p>
              </div>
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                <h4 style={{ color: 'var(--5d-teal-dark)', marginBottom: '0.5rem' }}>2. 風水 - 空間とモノの流れを整える</h4>
                <p style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>（感情と空間の構造をほどく）</p>
                <p style={{ margin: 0 }}>
                  感情の乱れは、しばしば&quot;場の構造&quot;と連動しています。<br />
                  五次元経営では、「ゆるゆるマンダラ風水」を採用。気の流れやモノの配置を整えることで、ペインボディが暴れにくい空間構造を創出します。
                </p>
              </div>
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                <h4 style={{ color: 'var(--5d-teal-dark)', marginBottom: '0.5rem' }}>3. イマココの意識 - 思考の自動反応を手放す</h4>
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
              五次元経営の本質を体感できるセッションをご用意しています。
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
