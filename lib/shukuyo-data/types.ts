/**
 * 宿曜データ TypeScript型定義
 *
 * Excel解析データの型定義
 * 生成日: 2025-12-28
 */

// ============================================
// ユーザー入力データ
// ============================================

export interface UserInput {
  name: string;           // 名前
  birthDate: string;      // 生年月日 (YYYY-MM-DD)
  birthTime: string;      // 出生時刻
  birthPlace: string;     // 出生地
  shukuyo: string;        // 宿曜
  weekday: string;        // 曜日
}

// ============================================
// 充足の3法則
// ============================================

export interface FulfillmentLaw {
  number: number;         // 法則番号 (1-3)
  title: string;          // 法則タイトル
  content: string;        // 法則内容
}

export interface ShukuyoFulfillment {
  name: string;           // 宿名
  laws: FulfillmentLaw[]; // 3つの法則
  rawContent: string;     // 生データ
}

// 27宿すべての充足の法則
export type ShukuyoFulfillmentMap = Record<string, ShukuyoFulfillment>;

// ============================================
// 相性マトリクス
// ============================================

// 7パターンの相性アドバイス
export interface CompatibilityAdvice {
  '1': string;  // パターン1
  '2': string;  // パターン2
  '3': string;  // パターン3
  '4': string;  // パターン4
  '5': string;  // パターン5
  '6': string;  // パターン6
  '7': string;  // パターン7
}

export type CompatibilityMatrix = Record<string, CompatibilityAdvice>;

// ============================================
// 相性関係定義
// ============================================

export interface CompatibilityRelation {
  shukuyo: string;        // 本命宿
  relation: string;       // 関係（命・栄・親・友・衰・安・危・成・壊）
  relationName: string;   // 関係の読み方
  targetShukuyo: string;  // 対象宿
  targetName: string;     // 対象宿の読み方
}

// ============================================
// ペインボディ
// ============================================

export interface PainBody {
  name: string;              // 宿名
  whyPattern: string;        // なぜ同じパターンを繰り返すのか
  steps: string;             // 5ステップ
  characteristics: string;   // 特性
  deepStructure: string;     // 深層構造
  imakokoAdvice: string;     // イマココアドバイス
  communicationTip: string;  // コミュニケーションアドバイス
}

export type PainBodyMap = Record<string, PainBody>;

// ============================================
// 宿分類
// ============================================

export interface ShukuyoCategory {
  name: string;           // 分類名（安住宿、和善宿など）
  reading: string;        // 読み方
  description: string;    // 説明
  shukuyoList: string[];  // 属する宿のリスト
}

// ============================================
// 七曜特性
// ============================================

export interface ShichiyoTrait {
  day: string;            // 曜日（日・月・火・水・木・金・土）
  meaning: string;        // 意味（太陽・陽火など）
  personality: string;    // 性格
  strength: string;       // 強み
  weakness: string;       // 弱み
  suitableJob: string;    // 適職
}

// ============================================
// 命式
// ============================================

export interface CardNumbers {
  intention: number;      // 意図のヒント（1-81）
  essence: number;        // 本質面（1-81）
  action: number;         // 行動面（1-81）
}

export interface Meishiki {
  sangenkyuun: string;    // 三元九運
  yearStar: string;       // 年星（本命星）
  monthStar: string;      // 月星（月命星）
  dayStar: string;        // 日星（日命星）
  timeStar: string;       // 時星（時命星）
  kuubou: string;         // 空亡
  shukuyo: string;        // 宿曜
  cardNumbers: CardNumbers;
}

// ============================================
// 年運データ
// ============================================

export interface YearFortune {
  year: number;           // 年
  monthlyFortune: Record<string, string>;  // 月別運勢
}

// ============================================
// レポートページ
// ============================================

export interface ReportPage {
  sheetName: string;      // シート名
  content: string[];      // コンテンツ行
}

// ============================================
// マスターデータ全体
// ============================================

export interface ShukuyoMasterData {
  userInput: UserInput;
  shukuyoFulfillment: ShukuyoFulfillmentMap;
  compatibilityMatrix: CompatibilityMatrix;
  compatibilityRelations: CompatibilityRelation[];
  painBody: PainBodyMap;
  shukuyoCategories: ShukuyoCategory[];
  shichiyoTraits: ShichiyoTrait[];
  meishiki: Meishiki;
  yearFortune2025: YearFortune;
  page00: ReportPage;
  page01: ReportPage;
}

// ============================================
// 27宿の名前リスト（参照用）
// ============================================

export const SHUKUYO_NAMES = [
  '昴', '畢', '觜', '参', '井', '鬼', '柳', '星', '張',
  '翼', '軫', '角', '亢', '氐', '房', '心', '尾', '箕',
  '斗', '女', '虚', '危', '室', '壁', '奎', '婁', '胃'
] as const;

export type ShukuyoName = typeof SHUKUYO_NAMES[number];

// ============================================
// 七曜リスト（参照用）
// ============================================

export const SHICHIYO_NAMES = ['日', '月', '火', '水', '木', '金', '土'] as const;

export type ShichiyoName = typeof SHICHIYO_NAMES[number];

// ============================================
// 相性関係の種類
// ============================================

export const COMPATIBILITY_TYPES = [
  '命', '栄', '親', '友', '衰', '安', '危', '成', '壊'
] as const;

export type CompatibilityType = typeof COMPATIBILITY_TYPES[number];

// ============================================
// 宿×曜日 189通りデータ（s9シートから）
// ============================================

export interface ShukuyoYoubiData {
  specialDay: string;      // 特殊日（金剛峯日、七曜陵逼など）
  overview: string;        // 概要
  conflict: string;        // 葛藤パターン
  potential: string;       // ポテンシャル
  evolutionTheme: string;  // 進化テーマ
  lifeUsage: string;       // 人生での活用
  businessUsage: string;   // ビジネスでの活用
  oneLiner: string;        // 一行メッセージ
}

// キー形式: "昴日", "昴月", "昴火", ... (27宿 × 7曜日 = 189通り)
export type ShukuyoYoubiMap = Record<string, ShukuyoYoubiData>;
