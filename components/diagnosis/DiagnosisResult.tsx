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

        <div className={styles.resultActions}>
          <button onClick={onRetry} className={styles.retryButton}>
            もう一度診断する
          </button>
          <a href="/taiken" className={styles.ctaButton}>
            体験セッションを受ける
          </a>
        </div>
      </div>
    </div>
  );
}

function ResultInterpretation({ level }: { level: number }) {
  if (level >= 500) {
    return (
      <>
        <h3>爆運帯の経営者として</h3>
        <p>
          あなたの意識は「愛」「喜び」「感謝」の帯域にあります。
          この状態では、努力せずとも成果が自然に集まってきます。
          周囲の人々もあなたのエネルギーに引き寄せられ、組織全体が活性化します。
        </p>
      </>
    );
  }
  if (level >= 400) {
    return (
      <>
        <h3>高運気帯の経営者として</h3>
        <p>
          あなたの意識は「理性」「信頼」の帯域にあります。
          論理的な判断と人への信頼のバランスが取れており、組織文化は安定しています。
          さらに意識レベルを上げるには、「正しさ」を手放し、「愛」へシフトすることがカギです。
        </p>
      </>
    );
  }
  if (level >= 200) {
    return (
      <>
        <h3>中運気帯の経営者として</h3>
        <p>
          あなたの意識は「努力」「正しさ」の帯域にあります。
          成果は出ていますが、どこか疲れを感じているかもしれません。
          「頑張る」から「整える」へ。環境と意識を同時に整えることで、次の帯域へ移行できます。
        </p>
      </>
    );
  }
  return (
    <>
      <h3>運気を上げるために</h3>
      <p>
        現在の意識レベルは、恐れや怒りに影響されやすい状態です。
        まずは環境を整え、不要なものを手放すことから始めましょう。
        適切なサポートがあれば、3ヶ月で50-100ポイント上げることも可能です。
      </p>
    </>
  );
}
