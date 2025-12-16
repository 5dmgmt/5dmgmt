/**
 * components/diagnosis/types.ts
 * 意識診断コンポーネントの型定義
 */

export interface QuestionOption {
  value: number;
  text: string;
}

export interface Question {
  id: string;
  section: string;
  text: string;
  options: QuestionOption[];
  type: 'radio' | 'checkbox';
}

export interface DiagnosisResult {
  level: number;
  dimension: string;
  dimensionDescription: string;
  color: string;
}
