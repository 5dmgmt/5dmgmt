'use client';

/**
 * components/diagnosis/DiagnosisResult.tsx
 * 診断結果表示コンポーネント
 */

import type { DiagnosisResult as DiagnosisResultType } from './types';
import styles from './ConsciousnessDiagnosis.module.css';

interface Props {
  result: DiagnosisResultType;
  onRetry: () => void;
}

export default function DiagnosisResult({ result, onRetry }: Props) {
  return (
    <div id="diagnosis-result" className={styles.resultContainer}>
      <div className={styles.resultCard}>
        <div className={styles.resultHeader}>
          <p className={styles.resultLabel}>あなたの意識レベル</p>
          <div className={styles.resultScore} style={{ color: result.color }}>
            {result.level}
          </div>
          <div className={styles.resultDimension} style={{ backgroundColor: result.color }}>
            {result.dimension}
          </div>
        </div>

        <div className={styles.resultDescription}>
          <p>{result.dimensionDescription}</p>
        </div>

        <div className={styles.resultScale}>
          <p className={styles.scaleTitle}>ホーキンズ・スケール</p>
          <div className={styles.scaleBar}>
            <div
              className={styles.scaleIndicator}
              style={{ left: `${Math.min(result.level / 6, 100)}%` }}
            />
            <div className={styles.scaleLabels}>
              <span>0</span>
              <span>200</span>
              <span>400</span>
              <span>600</span>
            </div>
          </div>
        </div>

        <div className={styles.resultInterpretation}>
          <ResultInterpretation level={result.level} />
        </div>

        <div className={styles.resultRecommendation}>
          <NextActionRecommendation level={result.level} />
        </div>

        <div className={styles.resultActions}>
          <button onClick={onRetry} className={styles.retryButton}>
            もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
}

function NextActionRecommendation({ level }: { level: number }) {
  if (level >= 500) {
    // 高レベル: リトリートを推奨
    return (
      <div className={styles.recommendationCard} style={{ borderColor: '#16a34a' }}>
        <div className={styles.recommendationBadge} style={{ backgroundColor: '#16a34a' }}>
          おすすめ
        </div>
        <h3 className={styles.recommendationTitle}>経営者リトリート</h3>
        <p className={styles.recommendationDesc}>
          高い意識レベルをお持ちです。同じレベルの経営者と集中的に過ごすことで、
          さらなる飛躍が期待できます。
        </p>
        <div className={styles.recommendationMeta}>
          <span>1泊2日</span>
          <span>20万円〜</span>
          <span>少人数制</span>
        </div>
        <a href="/taiken/retreat" className={styles.ctaButton}>
          リトリートを見る
        </a>
        <p className={styles.recommendationAlt}>
          または <a href="/taiken/imakoko">イマココ体験セッション（無料）</a> から始める
        </p>
      </div>
    );
  }

  if (level >= 300) {
    // 中〜高レベル: チーム診断 + イマココ
    return (
      <div className={styles.recommendationCard} style={{ borderColor: '#0891b2' }}>
        <div className={styles.recommendationBadge} style={{ backgroundColor: '#0891b2' }}>
          おすすめ
        </div>
        <h3 className={styles.recommendationTitle}>イマココ体験セッション</h3>
        <p className={styles.recommendationDesc}>
          意識を整える方法を90分で体験できます。チームメンバーと一緒に受けることで、
          組織全体の意識レベル向上にもつながります。
        </p>
        <div className={styles.recommendationMeta}>
          <span>90分</span>
          <span>初回無料</span>
          <span>オンライン可</span>
        </div>
        <a href="/taiken/imakoko" className={styles.ctaButton}>
          体験セッションを予約する
        </a>
        <p className={styles.recommendationAlt}>
          チームで受けたい場合は <a href="/company/contact">お問い合わせ</a> ください
        </p>
      </div>
    );
  }

  // 低〜中レベル: イマココ体験を強く推奨
  return (
    <div className={styles.recommendationCard} style={{ borderColor: '#0891b2' }}>
      <div className={styles.recommendationBadge} style={{ backgroundColor: '#0891b2' }}>
        まずはここから
      </div>
      <h3 className={styles.recommendationTitle}>イマココ体験セッション</h3>
      <p className={styles.recommendationDesc}>
        意識レベルを上げる第一歩として、90分の体験セッションをおすすめします。
        初回は無料で、オンラインでも受けられます。
      </p>
      <div className={styles.recommendationMeta}>
        <span>90分</span>
        <span>初回無料</span>
        <span>勧誘なし</span>
      </div>
      <a href="/taiken/imakoko" className={styles.ctaButton}>
        無料で体験する
      </a>
      <p className={styles.recommendationAlt}>
        詳しく話を聞きたい方は <a href="/company/contact">お問い合わせ</a> へ
      </p>
    </div>
  );
}

function ResultInterpretation({ level }: { level: number }) {
  if (level >= 500) {
    return (
      <>
        <h3>爆運帯の経営者として</h3>
        <p>
          あなたの意識は「愛」「喜び」「感謝」の帯域にあるようです。
          この状態では、自然と物事が動き出すことが多いと言われています。
          周囲の人々との関係も良好になりやすい傾向があります。
        </p>
      </>
    );
  }
  if (level >= 400) {
    return (
      <>
        <h3>高運気帯の経営者として</h3>
        <p>
          あなたの意識は「理性」「信頼」の帯域にあるようです。
          論理的な判断と人への信頼のバランスが取れている状態。
          さらに深めるには、「正しさ」を手放し、「愛」へシフトすることがヒントになるかもしれません。
        </p>
      </>
    );
  }
  if (level >= 200) {
    return (
      <>
        <h3>中運気帯の経営者として</h3>
        <p>
          あなたの意識は「努力」「正しさ」の帯域にあるようです。
          成果は出ていますが、どこか疲れを感じているかもしれません。
          「頑張る」から「整える」へ。環境と意識を同時に整えてみてはいかがでしょうか。
        </p>
      </>
    );
  }
  return (
    <>
      <h3>運気を上げるために</h3>
      <p>
        現在の意識は、恐れや怒りに影響されやすい状態かもしれません。
        まずは環境を整え、不要なものを手放すことから始めてみましょう。
        適切なサポートがあれば、変化が起こりやすくなります。
      </p>
    </>
  );
}
