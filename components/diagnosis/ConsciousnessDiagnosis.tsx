'use client';

/**
 * components/diagnosis/ConsciousnessDiagnosis.tsx
 *
 * 【Phase 30】経営者運気診断コンポーネント
 * - WordPress consciousness-level-diagnosis プラグインからの移植
 * - ホーキンズ博士の意識レベル理論に基づく10問診断
 */

import { useState, useEffect, useCallback } from 'react';
import styles from './ConsciousnessDiagnosis.module.css';

// 質問データ型
interface QuestionOption {
  value: number;
  text: string;
}

interface Question {
  id: string;
  section: string;
  text: string;
  options: QuestionOption[];
  type: 'radio' | 'checkbox';
}

// 結果型
interface DiagnosisResult {
  level: number;
  dimension: string;
  dimensionDescription: string;
  color: string;
}

// 質問データ
const questions: Question[] = [
  {
    id: 'q1',
    section: 'エネルギーの向き',
    text: '月曜日の朝、どんな気持ちですか？',
    type: 'radio',
    options: [
      { value: 20, text: '憂鬱、できれば避けたい' },
      { value: 175, text: 'やらなければという義務感' },
      { value: 250, text: '淡々と、特に感情なし' },
      { value: 350, text: '今週も頑張ろうという意欲' },
      { value: 500, text: '何ができるか楽しみ' },
      { value: 600, text: '特に月曜を意識しない、いつも充実' },
    ],
  },
  {
    id: 'q2',
    section: 'エネルギーの向き',
    text: '問題が起きた時、最初に考えることは？',
    type: 'radio',
    options: [
      { value: 100, text: '誰のせいだ？なぜ私が？' },
      { value: 200, text: 'どう対処すれば損害を最小化できるか' },
      { value: 250, text: 'これも経験、どちらでもいい' },
      { value: 400, text: '何が学べるか、どう改善できるか' },
      { value: 500, text: 'みんなが成長する機会だ' },
      { value: 600, text: '起きることはすべて完璧' },
    ],
  },
  {
    id: 'q3',
    section: '他者との関係',
    text: '部下がミスをした時の反応は？',
    type: 'radio',
    options: [
      { value: 150, text: '怒り、罰を与える' },
      { value: 200, text: '指導するが、内心イライラ' },
      { value: 250, text: '淡々と事実を伝える' },
      { value: 400, text: '原因を一緒に分析する' },
      { value: 500, text: '成長の機会として支援する' },
      { value: 600, text: 'すでに完璧だと知っている' },
    ],
  },
  {
    id: 'q4',
    section: '他者との関係',
    text: '競合他社の成功を聞いてどう感じる？',
    type: 'radio',
    options: [
      { value: 125, text: '悔しい、脅威を感じる' },
      { value: 200, text: '対抗策を考える' },
      { value: 350, text: '市場にとって良いこと' },
      { value: 400, text: '学べることを探す' },
      { value: 500, text: '素直に祝福できる' },
      { value: 600, text: 'すべてはつながっている' },
    ],
  },
  {
    id: 'q5',
    section: '動機の源泉',
    text: 'なぜ売上を上げたいのですか？',
    type: 'radio',
    options: [
      { value: 100, text: '生き残るため、負けたくない' },
      { value: 175, text: '目標達成、評価のため' },
      { value: 250, text: '会社を維持するため' },
      { value: 400, text: '成長と進化のため' },
      { value: 500, text: 'より多くの人に価値を届けるため' },
      { value: 540, text: '売上は結果、プロセスを楽しんでいる' },
    ],
  },
  {
    id: 'q6',
    section: '動機の源泉',
    text: '仕事のエネルギー源は？',
    type: 'radio',
    options: [
      { value: 100, text: '恐怖（失敗、貧困、批判への恐れ）' },
      { value: 125, text: '欲望（金、地位、承認）' },
      { value: 310, text: '意志（目標、計画、規律）' },
      { value: 400, text: '好奇心（学習、発見、創造）' },
      { value: 500, text: '愛（貢献、奉仕、つながり）' },
      { value: 540, text: '喜び（存在自体、今この瞬間）' },
    ],
  },
  {
    id: 'q7',
    section: '第二領域の実践',
    text: '「重要だが緊急でない」仕事（第二領域）の割合は？',
    type: 'radio',
    options: [
      { value: 100, text: 'ほぼ0%（そんな余裕はない）' },
      { value: 175, text: '5%未満（たまに時間が取れる程度）' },
      { value: 250, text: '10-20%（意識的に時間を作っている）' },
      { value: 350, text: '30-40%（優先的に確保している）' },
      { value: 500, text: '50%以上（ここが仕事の中心）' },
      { value: 600, text: 'すべてが重要かつ緊急でない' },
    ],
  },
  {
    id: 'q8',
    section: '第二領域の実践',
    text: '先週、「重要だが緊急でない」活動（第二領域）で具体的に何をしましたか？',
    type: 'checkbox',
    options: [
      { value: 0, text: '「重要だが緊急でない」時間が取れなかった' },
      { value: 1, text: '中長期ビジョン・戦略を考えた' },
      { value: 2, text: '部下の育成・コーチングをした' },
      { value: 3, text: '重要な関係性を深めた' },
      { value: 4, text: '新しい知識・スキルを学んだ' },
      { value: 5, text: '仕組み・システムを改善した' },
      { value: 6, text: '自分自身と向き合う時間を持った' },
      { value: 7, text: 'すべての仕事が「重要だが緊急でない」領域だった' },
    ],
  },
  {
    id: 'q9',
    section: '意思決定とAI活用',
    text: '重要な決断をする時の基準は？',
    type: 'radio',
    options: [
      { value: 100, text: 'リスク回避、損失を防ぐ' },
      { value: 175, text: '利益最大化、ROI' },
      { value: 400, text: 'データと論理的分析' },
      { value: 450, text: '長期的成長と学習' },
      { value: 500, text: '全員が幸せになる方法' },
      { value: 600, text: '直感的な正しさ、自然な流れ' },
    ],
  },
  {
    id: 'q10',
    section: '意思決定とAI活用',
    text: 'AIを導入する主な理由は？',
    type: 'radio',
    options: [
      { value: 100, text: '競合に遅れないため' },
      { value: 200, text: 'コスト削減、効率化のため' },
      { value: 350, text: '時間を作るため' },
      { value: 400, text: '人間の能力を拡張するため' },
      { value: 500, text: 'より大きな価値を生み出すため' },
      { value: 540, text: 'それが自然な流れだから' },
    ],
  },
];

// 次元判定
function getDimension(level: number): DiagnosisResult {
  if (level >= 600) {
    return {
      level,
      dimension: '統合帯',
      dimensionDescription: '存在が場を変える',
      color: '#9C27B0',
    };
  } else if (level >= 500) {
    return {
      level,
      dimension: '爆運帯',
      dimensionDescription: '愛・感謝・喜び - 成果が自然に集まる',
      color: '#4CAF50',
    };
  } else if (level >= 400) {
    return {
      level,
      dimension: '高運気帯',
      dimensionDescription: '理性・信頼 - 組織文化が安定',
      color: '#2196F3',
    };
  } else if (level >= 200) {
    return {
      level,
      dimension: '中運気帯',
      dimensionDescription: '努力・正しさ - 成果は出るが疲労',
      color: '#FF9800',
    };
  } else {
    return {
      level,
      dimension: '低運気帯',
      dimensionDescription: '恐れ・怒り - トラブル多発、不信',
      color: '#f44336',
    };
  }
}

// Fisher-Yates シャッフル
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ConsciousnessDiagnosis() {
  const [answers, setAnswers] = useState<Record<string, number | number[]>>({});
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  // 初期化時に選択肢をシャッフル
  useEffect(() => {
    const shuffled = questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(shuffled);
  }, []);

  // ラジオボタン選択
  const handleRadioChange = useCallback((questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setErrors((prev) => prev.filter((e) => e !== questionId));
  }, []);

  // チェックボックス選択
  const handleCheckboxChange = useCallback((questionId: string, value: number, checked: boolean) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as number[]) || [];
      if (checked) {
        return { ...prev, [questionId]: [...current, value] };
      } else {
        return { ...prev, [questionId]: current.filter((v) => v !== value) };
      }
    });
    setErrors((prev) => prev.filter((e) => e !== questionId));
  }, []);

  // Q8のスコア計算
  const calculateQ8Score = (values: number[]): number => {
    if (values.includes(0)) {
      return 100; // 第二領域が取れなかった
    }
    if (values.includes(7)) {
      return 600; // すべてが第二領域
    }
    let score = 0;
    values.forEach((v) => {
      if (v >= 1 && v <= 5) {
        score += 80;
      } else if (v === 6) {
        score += 100;
      }
    });
    return score;
  };

  // 診断実行
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // バリデーション
    const missingQuestions: string[] = [];
    questions.forEach((q) => {
      if (q.type === 'checkbox') {
        const val = answers[q.id] as number[] | undefined;
        if (!val || val.length === 0) {
          missingQuestions.push(q.id);
        }
      } else {
        if (answers[q.id] === undefined) {
          missingQuestions.push(q.id);
        }
      }
    });

    if (missingQuestions.length > 0) {
      setErrors(missingQuestions);
      // 最初の未回答質問にスクロール
      const firstErrorEl = document.getElementById(`question-${missingQuestions[0]}`);
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // スコア計算
    let totalScore = 0;
    let count = 0;

    questions.forEach((q) => {
      if (q.type === 'checkbox') {
        const vals = answers[q.id] as number[];
        totalScore += calculateQ8Score(vals);
      } else {
        totalScore += answers[q.id] as number;
      }
      count++;
    });

    const consciousnessLevel = Math.round(totalScore / count);
    const diagnosis = getDimension(consciousnessLevel);

    // 結果を表示
    setTimeout(() => {
      setResult(diagnosis);
      setIsSubmitting(false);
      // 結果にスクロール
      setTimeout(() => {
        const resultEl = document.getElementById('diagnosis-result');
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 500);
  };

  // 再診断
  const handleRetry = () => {
    setResult(null);
    setAnswers({});
    // 選択肢を再シャッフル
    const shuffled = questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(shuffled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 結果表示
  if (result) {
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
            {result.level >= 500 && (
              <>
                <h3>爆運帯の経営者として</h3>
                <p>
                  あなたの意識は「愛」「喜び」「感謝」の帯域にあります。
                  この状態では、努力せずとも成果が自然に集まってきます。
                  周囲の人々もあなたのエネルギーに引き寄せられ、組織全体が活性化します。
                </p>
              </>
            )}
            {result.level >= 400 && result.level < 500 && (
              <>
                <h3>高運気帯の経営者として</h3>
                <p>
                  あなたの意識は「理性」「信頼」の帯域にあります。
                  論理的な判断と人への信頼のバランスが取れており、組織文化は安定しています。
                  さらに意識レベルを上げるには、「正しさ」を手放し、「愛」へシフトすることがカギです。
                </p>
              </>
            )}
            {result.level >= 200 && result.level < 400 && (
              <>
                <h3>中運気帯の経営者として</h3>
                <p>
                  あなたの意識は「努力」「正しさ」の帯域にあります。
                  成果は出ていますが、どこか疲れを感じているかもしれません。
                  「頑張る」から「整える」へ。環境と意識を同時に整えることで、次の帯域へ移行できます。
                </p>
              </>
            )}
            {result.level < 200 && (
              <>
                <h3>運気を上げるために</h3>
                <p>
                  現在の意識レベルは、恐れや怒りに影響されやすい状態です。
                  まずは環境を整え、不要なものを手放すことから始めましょう。
                  適切なサポートがあれば、3ヶ月で50-100ポイント上げることも可能です。
                </p>
              </>
            )}
          </div>

          <div className={styles.resultActions}>
            <button onClick={handleRetry} className={styles.retryButton}>
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

  // セクションでグループ化
  const sections: { name: string; questions: Question[] }[] = [];
  let currentSection = '';

  shuffledQuestions.forEach((q) => {
    if (q.section !== currentSection) {
      sections.push({ name: q.section, questions: [] });
      currentSection = q.section;
    }
    sections[sections.length - 1].questions.push(q);
  });

  return (
    <div className={styles.container}>
      {errors.length > 0 && (
        <div className={styles.errorMessage}>
          以下の質問にお答えください：Q
          {errors.map((e) => e.replace('q', '')).join(', Q')}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {sections.map((section, sectionIndex) => (
          <div key={section.name} className={styles.section}>
            <h3 className={styles.sectionTitle}>
              セクション{sectionIndex + 1}：{section.name}
            </h3>

            {section.questions.map((q, qIndex) => {
              const questionNumber =
                sections.slice(0, sectionIndex).reduce((acc, s) => acc + s.questions.length, 0) +
                qIndex +
                1;

              return (
                <div
                  key={q.id}
                  id={`question-${q.id}`}
                  className={`${styles.question} ${errors.includes(q.id) ? styles.questionError : ''}`}
                >
                  <p className={styles.questionText}>
                    Q{questionNumber}. {q.text}
                  </p>
                  <div className={q.type === 'checkbox' ? styles.checkboxOptions : styles.radioOptions}>
                    {q.options.map((option) => (
                      <label key={option.value} className={styles.optionLabel}>
                        {q.type === 'checkbox' ? (
                          <input
                            type="checkbox"
                            checked={((answers[q.id] as number[]) || []).includes(option.value)}
                            onChange={(e) =>
                              handleCheckboxChange(q.id, option.value, e.target.checked)
                            }
                          />
                        ) : (
                          <input
                            type="radio"
                            name={q.id}
                            checked={answers[q.id] === option.value}
                            onChange={() => handleRadioChange(q.id, option.value)}
                          />
                        )}
                        <span>{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? '診断中...' : '診断結果を見る'}
        </button>
      </form>
    </div>
  );
}
