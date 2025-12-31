import { NextRequest, NextResponse } from 'next/server';
import kyuseiDatabase from '@/lib/shukuyo-data/kyusei-database.json';

// 型定義
interface KyuseiData {
  sangen: string;
  yearStar: string;
  monthStar: string;
  dayStar: string;
  yearKanshi: string;
  monthKanshi: string;
  dayKanshi: string;
}

const kyuseiData = kyuseiDatabase as Record<string, KyuseiData>;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  if (!year || !month || !day) {
    return NextResponse.json(
      { success: false, message: 'year, month, day パラメータが必要です' },
      { status: 400 }
    );
  }

  // 日付文字列を作成 (YYYY-MM-DD形式)
  const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

  const data = kyuseiData[dateStr];

  if (!data) {
    return NextResponse.json(
      { success: false, message: `${dateStr} のデータが見つかりません（対応範囲: 1904-2045年）` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      date: dateStr,
      sangenKyuun: data.sangen,
      yearStar: data.yearStar,
      monthStar: data.monthStar,
      dayStar: data.dayStar,
      yearKanshi: data.yearKanshi,
      monthKanshi: data.monthKanshi,
      dayKanshi: data.dayKanshi,
    },
  });
}
