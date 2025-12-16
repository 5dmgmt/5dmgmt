'use client';

/**
 * components/diagnosis/DiagnosisQuestion.tsx
 * 診断質問コンポーネント
 */

import type { Question } from './types';
import styles from './ConsciousnessDiagnosis.module.css';

interface Props {
  question: Question;
  questionNumber: number;
  answers: Record<string, number | number[]>;
  hasError: boolean;
  onRadioChange: (questionId: string, value: number) => void;
  onCheckboxChange: (questionId: string, value: number, checked: boolean) => void;
}

export default function DiagnosisQuestion({
  question,
  questionNumber,
  answers,
  hasError,
  onRadioChange,
  onCheckboxChange,
}: Props) {
  const q = question;

  return (
    <div
      id={`question-${q.id}`}
      className={`${styles.question} ${hasError ? styles.questionError : ''}`}
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
                onChange={(e) => onCheckboxChange(q.id, option.value, e.target.checked)}
              />
            ) : (
              <input
                type="radio"
                name={q.id}
                checked={answers[q.id] === option.value}
                onChange={() => onRadioChange(q.id, option.value)}
              />
            )}
            <span>{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
