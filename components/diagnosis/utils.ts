/**
 * components/diagnosis/utils.ts
 * 意識診断のユーティリティ関数
 */

import type { DiagnosisResult } from './types';

/** 意識レベルから次元を判定 */
export function getDimension(level: number): DiagnosisResult {
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

/** Fisher-Yates シャッフル */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Q8のスコア計算 */
export function calculateQ8Score(values: number[]): number {
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
}
