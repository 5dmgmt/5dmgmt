/**
 * 宿曜API
 * 生年月日から宿曜を取得
 */

import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// Node.jsランタイムを明示的に指定（better-sqlite3はEdgeで動作しない）
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// データベースパス
const DB_PATH = path.join(process.cwd(), 'data', 'shukuyo_master.db');

// DB接続をキャッシュ
let dbInstance: Database.Database | null = null;

function getDB(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(DB_PATH, { readonly: true });
  }
  return dbInstance;
}

// 27宿の詳細データ
const SHUKUYO_DETAILS: Record<string, { yomi: string; element: string; characteristic: string }> = {
  '昴': { yomi: 'ぼう', element: '金', characteristic: '誠実・慎重・知的' },
  '畢': { yomi: 'ひつ', element: '金', characteristic: '忍耐・努力・安定' },
  '觜': { yomi: 'し', element: '火', characteristic: '研究心・探求・分析' },
  '参': { yomi: 'しん', element: '水', characteristic: '行動力・冒険・開拓' },
  '井': { yomi: 'せい', element: '木', characteristic: '知恵・教養・品位' },
  '鬼': { yomi: 'き', element: '金', characteristic: '独創性・直感・芸術' },
  '柳': { yomi: 'りゅう', element: '土', characteristic: '社交性・魅力・変化' },
  '星': { yomi: 'せい', element: '日', characteristic: '華やか・自信・リーダーシップ' },
  '張': { yomi: 'ちょう', element: '月', characteristic: '優雅・品格・繊細' },
  '翼': { yomi: 'よく', element: '火', characteristic: '飛躍・発展・国際' },
  '軫': { yomi: 'しん', element: '水', characteristic: '慈悲・奉仕・癒し' },
  '角': { yomi: 'かく', element: '木', characteristic: '正義・信念・統率' },
  '亢': { yomi: 'こう', element: '金', characteristic: '高潔・理想・純粋' },
  '氐': { yomi: 'てい', element: '土', characteristic: '安定・基盤・実直' },
  '房': { yomi: 'ぼう', element: '日', characteristic: '発展・繁栄・積極' },
  '心': { yomi: 'しん', element: '月', characteristic: '情熱・感性・直感' },
  '尾': { yomi: 'び', element: '火', characteristic: '忍耐・継続・成就' },
  '箕': { yomi: 'き', element: '水', characteristic: '自由・独立・革新' },
  '斗': { yomi: 'と', element: '木', characteristic: '計画性・戦略・統率' },
  '女': { yomi: 'じょ', element: '土', characteristic: '勤勉・誠実・献身' },
  '虚': { yomi: 'きょ', element: '日', characteristic: '精神性・哲学・内省' },
  '危': { yomi: 'き', element: '月', characteristic: '冒険・変革・創造' },
  '室': { yomi: 'しつ', element: '火', characteristic: '建設・基盤・安定' },
  '壁': { yomi: 'へき', element: '水', characteristic: '学問・教養・芸術' },
  '奎': { yomi: 'けい', element: '木', characteristic: '文才・創作・表現' },
  '婁': { yomi: 'ろう', element: '金', characteristic: '調和・外交・協調' },
  '胃': { yomi: 'い', element: '土', characteristic: '行動力・実行・推進' },
};

// 日付の実在チェック
function isValidDate(year: number, month: number, day: number): boolean {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const year = parseInt(searchParams.get('year') || '0');
  const month = parseInt(searchParams.get('month') || '0');
  const day = parseInt(searchParams.get('day') || '0');

  // バリデーション
  if (!year || !month || !day) {
    return NextResponse.json(
      { success: false, message: '生年月日を入力してください' },
      { status: 400 }
    );
  }

  if (year < 600 || year > 2100) {
    return NextResponse.json(
      { success: false, message: '年は600〜2100の範囲で入力してください' },
      { status: 400 }
    );
  }

  if (month < 1 || month > 12) {
    return NextResponse.json(
      { success: false, message: '月は1〜12の範囲で入力してください' },
      { status: 400 }
    );
  }

  if (day < 1 || day > 31) {
    return NextResponse.json(
      { success: false, message: '日は1〜31の範囲で入力してください' },
      { status: 400 }
    );
  }

  // 実在する日付かチェック（例: 2月30日は無効）
  if (!isValidDate(year, month, day)) {
    return NextResponse.json(
      { success: false, message: `${year}年${month}月${day}日は存在しない日付です` },
      { status: 400 }
    );
  }

  try {
    const db = getDB();

    // 日付形式を決定
    let dateStr: string;
    if (year < 1900) {
      dateStr = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    } else {
      dateStr = `${year}/${month}/${day}`;
    }

    // 宿曜を検索
    const result = db.prepare(
      'SELECT * FROM shukuyo_master WHERE date = ? OR (year = ? AND month = ? AND day = ?)'
    ).get(dateStr, year, month, day) as {
      date: string;
      year: number;
      month: number;
      day: number;
      weekday: string;
      shukuyo: string;
      special_day: string | null;
      shichiyo_ryohitsu: string | null;
      calendar_type: string;
      lunar_date: string;
      is_leap_month: number;
    } | undefined;

    if (!result) {
      return NextResponse.json(
        { success: false, message: `${year}年${month}月${day}日のデータが見つかりません` },
        { status: 404 }
      );
    }

    // 詳細情報を追加
    const details = SHUKUYO_DETAILS[result.shukuyo] || { yomi: '', element: '', characteristic: '' };

    return NextResponse.json({
      success: true,
      data: {
        date: result.date,
        year: result.year,
        month: result.month,
        day: result.day,
        weekday: result.weekday,
        shukuyo: result.shukuyo,
        shukuyo_yomi: details.yomi,
        element: details.element,
        characteristic: details.characteristic,
        special_day: result.special_day,
        ryouhitsu: result.shichiyo_ryohitsu,
        calendar_type: result.calendar_type,
        lunar_date: result.lunar_date,
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, message: 'データベースエラーが発生しました' },
      { status: 500 }
    );
  }
}
