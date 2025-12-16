'use client';

/**
 * components/diagnosis/ConsciousnessDiagnosis.tsx
 * 【Phase 30】経営者運気診断コンポーネント
 * - WordPress consciousness-level-diagnosis プラグインからの移植
 * - ホーキンズ博士の意識レベル理論に基づく10問診断
 */

import { useState, useEffect, useCallback } from 'react';
import styles from './ConsciousnessDiagnosis.module.css';
import type { Question, DiagnosisResult as DiagnosisResultType } from './types';
import { questions } from './data';
import { getDimension, shuffleArray, calculateQ8Score } from './utils';
import DiagnosisResult from './DiagnosisResult';
import DiagnosisQuestion from './DiagnosisQuestion';

export default function ConsciousnessDiagnosis() {
  const [answers, setAnswers] = useState<Record<string, number | number[]>>({});
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<DiagnosisResultType | null>(null);

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
        totalScore += calculateQ8Score(answers[q.id] as number[]);
      } else {
        totalScore += answers[q.id] as number;
      }
      count++;
    });

    const consciousnessLevel = Math.round(totalScore / count);
    const diagnosis = getDimension(consciousnessLevel);

    setTimeout(() => {
      setResult(diagnosis);
      setIsSubmitting(false);
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
    const shuffled = questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(shuffled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 結果表示
  if (result) {
    return <DiagnosisResult result={result} onRetry={handleRetry} />;
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
                <DiagnosisQuestion
                  key={q.id}
                  question={q}
                  questionNumber={questionNumber}
                  answers={answers}
                  hasError={errors.includes(q.id)}
                  onRadioChange={handleRadioChange}
                  onCheckboxChange={handleCheckboxChange}
                />
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
