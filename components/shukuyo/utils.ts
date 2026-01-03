/**
 * components/shukuyo/utils.ts
 *
 * 宿曜関係図のユーティリティ関数
 */

import type { Person, ShukuyoApiResponse } from './types';

/**
 * 特別日の短縮表示を取得
 */
export function getShortSpecialDay(person: Person): string {
  let result = '';

  if (person.specialDay) {
    if (person.specialDay.includes('甘露')) result = '甘';
    else if (person.specialDay.includes('金剛')) result = '剛';
    else if (person.specialDay.includes('羅刹')) result = '羅';
  }

  if (person.shichiyoRyohitsu) {
    result += '七';
  }

  return result;
}

/**
 * 月の日数を計算
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * 宿曜データをAPIから取得
 */
export async function getShukuyoData(
  year: number,
  month: number,
  day: number
): Promise<NonNullable<ShukuyoApiResponse['data']>> {
  const res = await fetch(`/api/shukuyo?year=${year}&month=${month}&day=${day}`);
  const data: ShukuyoApiResponse = await res.json();

  if (!data.success || !data.data) {
    throw new Error(data.message || '宿曜データの取得に失敗しました');
  }

  return data.data;
}

/**
 * 年の選択肢を生成（東京時間基準）
 */
export function generateYearOptions(): number[] {
  const currentYear = parseInt(new Date().toLocaleString('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric' }));
  return Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
}

/**
 * モバイルデバイスかどうかを判定
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
}
