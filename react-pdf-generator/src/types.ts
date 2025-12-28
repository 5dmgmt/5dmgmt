/**
 * 宿曜レポート生成システム - 型定義
 */

// 27宿の種類
export type ShukuyoType =
  | '角宿' | '亢宿' | '氐宿' | '房宿' | '心宿' | '尾宿' | '箕宿'
  | '斗宿' | '女宿' | '虚宿' | '危宿' | '室宿' | '壁宿'
  | '奎宿' | '婁宿' | '胃宿' | '昴宿' | '畢宿' | '觜宿' | '参宿'
  | '井宿' | '鬼宿' | '柳宿' | '星宿' | '張宿' | '翼宿' | '軫宿';

// 曜日
export type Weekday = '日曜日' | '月曜日' | '火曜日' | '水曜日' | '木曜日' | '金曜日' | '土曜日';

// 七曜陵逼
export type ShichiyoRyohi = '七曜陵逼生まれ' | '';

// 相性タイプ
export type CompatibilityType = '命' | '栄' | '親' | '友' | '衰' | '安' | '危' | '成' | '壊';

// 九星
export type Kyusei = '一白水星' | '二黒土星' | '三碧木星' | '四緑木星' | '五黄土星' | '六白金星' | '七赤金星' | '八白土星' | '九紫火星';

// ユーザーデータ
export interface UserData {
  name: string;
  birthDate: Date;
  shukuyo: ShukuyoType;
  weekday: Weekday;
  shichiyoRyohi: ShichiyoRyohi;
  structureTitle: string; // 例: "制御された夢想家"
  kyusei: Kyusei;
  yearKyusei: Kyusei;
  monthKyusei: Kyusei;
  dayKyusei: Kyusei;
}

// 年運データ
export interface YearFortune {
  year: number;
  kyusei: Kyusei;
  eto: string;
  fortuneLevel: 'high' | 'middle' | 'low';
}

// 27宿円形図のデータ
export interface ShukuyoCircleData {
  honmeiShuku: ShukuyoType;
  compatibilities: Record<ShukuyoType, CompatibilityType>;
}

// レポートタイプ
export type ReportType = 'full' | 'simple';

// レポートデータ
export interface ReportData {
  type: ReportType;
  user: UserData;
  shukuyoCircle: ShukuyoCircleData;
  yearFortunes: YearFortune[];
  generatedAt: Date;
}

// A3サイズ（pt単位）- 横向き
export const A3_LANDSCAPE = {
  width: 1190.55,  // 420mm
  height: 841.89,  // 297mm
};

// 五次元経営のカラーパレット
export const COLORS = {
  primary: '#00B8C4',      // ターコイズブルー
  secondary: '#4A90A4',    // ブルーグレー
  accent: '#FFD700',       // ゴールド
  text: '#333333',         // ダークグレー
  lightText: '#666666',    // ライトグレー
  background: '#F5F5F0',   // クリーム
  white: '#FFFFFF',
  // 相性の色
  compatibility: {
    命: '#FF6B6B',   // 赤
    栄: '#FFD93D',   // 黄
    親: '#6BCB77',   // 緑
    友: '#4D96FF',   // 青
    衰: '#9D65C9',   // 紫
    安: '#C9CCD5',   // グレー
    危: '#FF8C42',   // オレンジ
    成: '#95E1D3',   // ミント
    壊: '#F38181',   // ピンク
  },
};
