/**
 * components/shukuyo/types.ts
 *
 * 宿曜関係図の型定義
 */

export interface Person {
  id: number;
  name: string;
  year: number;
  month: number;
  day: number;
  shuku: string;
  youbi: string;
  specialDay: string | null;
  shichiyoRyohitsu: string | null;
}

export interface ShukuyoApiResponse {
  success: boolean;
  data?: {
    shukuyo: string;
    weekday: string;
    special_day: string | null;
    ryouhitsu: string | null;
  };
  message?: string;
}

export interface ShukuyoKankeiState {
  peopleData: Person[];
  basePerson: Person | null;
  svgContent: string;
  loading: boolean;
  error: string;
  success: string;
}
