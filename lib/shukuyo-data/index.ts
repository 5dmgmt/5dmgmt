/**
 * 宿曜データローダー
 *
 * 解析済みExcelデータをTypeScriptで読み込むためのユーティリティ
 */

import type {
  ShukuyoMasterData,
  ShukuyoFulfillment,
  PainBody,
  CompatibilityAdvice,
  CompatibilityRelation,
  ShukuyoCategory,
  ShichiyoTrait,
  Meishiki,
  ShukuyoName,
  ShukuyoYoubiData,
  ShukuyoYoubiMap,
} from './types';

// JSON データをインポート
import masterData from './shukuyo-master-data.json';
import shukuyoYoubiRawData from './shukuyo-youbi-data.json';

// 宿×曜日データに型を適用
const shukuyoYoubiData = shukuyoYoubiRawData as unknown as ShukuyoYoubiMap;

// 型アサーション（JSONデータに型を適用）
export const shukuyoData = masterData as unknown as ShukuyoMasterData;

/**
 * 宿名から充足の3法則を取得
 */
export function getFulfillment(shukuyo: ShukuyoName): ShukuyoFulfillment | undefined {
  return shukuyoData.shukuyoFulfillment[shukuyo];
}

/**
 * 宿名からペインボディ情報を取得
 */
export function getPainBody(shukuyo: ShukuyoName): PainBody | undefined {
  return shukuyoData.painBody[shukuyo];
}

/**
 * 宿名から相性アドバイスを取得
 */
export function getCompatibilityAdvice(shukuyo: ShukuyoName): CompatibilityAdvice | undefined {
  return shukuyoData.compatibilityMatrix[shukuyo];
}

/**
 * 宿名から相性関係を取得
 */
export function getCompatibilityRelations(shukuyo: ShukuyoName): CompatibilityRelation[] {
  return shukuyoData.compatibilityRelations.filter((r) => r.shukuyo === shukuyo);
}

/**
 * 宿分類を取得
 */
export function getShukuyoCategories(): ShukuyoCategory[] {
  return shukuyoData.shukuyoCategories;
}

/**
 * 宿名から所属分類を取得
 */
export function getCategoryByShukuyo(shukuyo: ShukuyoName): ShukuyoCategory | undefined {
  return shukuyoData.shukuyoCategories.find((cat) =>
    cat.shukuyoList?.includes(shukuyo)
  );
}

/**
 * 七曜特性を取得
 */
export function getShichiyoTraits(): ShichiyoTrait[] {
  return shukuyoData.shichiyoTraits;
}

/**
 * 曜日から七曜特性を取得
 */
export function getTraitByDay(day: string): ShichiyoTrait | undefined {
  return shukuyoData.shichiyoTraits.find((t) => t.day === day);
}

/**
 * 命式データを取得
 */
export function getMeishiki(): Meishiki {
  return shukuyoData.meishiki;
}

/**
 * 全データをエクスポート
 */
export function getAllData(): ShukuyoMasterData {
  return shukuyoData;
}

/**
 * 宿名と曜日から189通りの詳細データを取得
 * @param shukuyo 宿名（例: "鬼"）
 * @param youbi 曜日（例: "月"）
 * @returns 宿×曜日の詳細データ
 */
export function getShukuyoYoubiData(shukuyo: string, youbi: string): ShukuyoYoubiData | undefined {
  // キーを生成（例: "鬼月"）
  const key = `${shukuyo}${youbi}`;
  return shukuyoYoubiData[key];
}

/**
 * 全ての宿×曜日データを取得
 */
export function getAllShukuyoYoubiData(): ShukuyoYoubiMap {
  return shukuyoYoubiData;
}

// 型定義もエクスポート
export * from './types';
