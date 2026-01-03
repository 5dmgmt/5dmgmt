/**
 * 本日の運勢API
 * 生年月日から本日の運勢スコアを計算
 */

import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// データベースパス
const MASTER_DB_PATH = path.join(process.cwd(), 'data', 'shukuyo_master.db');
const FORTUNE_DB_PATH = path.join(process.cwd(), 'data', 'shukuyo_fortune.db');
const ENERGY_DB_PATH = path.join(process.cwd(), 'data', 'shukuyo_energy.db');

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

  if (year < 1900 || year > 2100) {
    return NextResponse.json(
      { success: false, message: '年は1900〜2100の範囲で入力してください' },
      { status: 400 }
    );
  }

  try {
    const masterDb = new Database(MASTER_DB_PATH, { readonly: true });
    const fortuneDb = new Database(FORTUNE_DB_PATH, { readonly: true });

    // 今日の日付（東京時間で取得）
    const tokyoDateStr = new Date().toLocaleString('en-CA', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }); // "2024-01-15" 形式
    const [todayYear, todayMonth, todayDay] = tokyoDateStr.split('-').map(Number);

    // 生年月日の宿曜を取得
    const birthDateStr = `${year}/${month}/${day}`;
    const birthResult = masterDb.prepare(
      'SELECT * FROM shukuyo_master WHERE date = ? OR (year = ? AND month = ? AND day = ?)'
    ).get(birthDateStr, year, month, day) as {
      shukuyo: string;
      weekday: string;
    } | undefined;

    if (!birthResult) {
      masterDb.close();
      fortuneDb.close();
      return NextResponse.json(
        { success: false, message: `${year}年${month}月${day}日のデータが見つかりません` },
        { status: 404 }
      );
    }

    const birthShuku = birthResult.shukuyo;

    // 今日の運勢データを取得
    const todayDateStr = `${todayYear}-${String(todayMonth).padStart(2, '0')}-${String(todayDay).padStart(2, '0')}`;
    const todayFortune = fortuneDb.prepare(
      'SELECT * FROM daily_fortune WHERE date = ? LIMIT 1'
    ).get(todayDateStr) as {
      year_shuku: string;
      month_shuku: string;
      day_shuku: string;
      weekday: string;
      ryouhitsu_period: string;
      special_day: string | null;
      special_day_point: number;
    } | undefined;

    if (!todayFortune) {
      masterDb.close();
      fortuneDb.close();
      return NextResponse.json(
        { success: false, message: '本日の運勢データが見つかりません' },
        { status: 404 }
      );
    }

    // スコア計算
    const yearShuku = todayFortune.year_shuku.charAt(0);
    const monthShuku = todayFortune.month_shuku.charAt(0);
    const dayShuku = todayFortune.day_shuku.charAt(0);
    const isRyouhitsu = todayFortune.ryouhitsu_period?.includes('凌犯期間');

    // 年運スコア
    const yearScore = fortuneDb.prepare(
      'SELECT year_score FROM shuku_scores WHERE birth_shuku = ? AND target_shuku = ?'
    ).get(birthShuku, yearShuku) as { year_score: number } | undefined;

    // 月運スコア
    const monthScore = fortuneDb.prepare(
      'SELECT month_score FROM shuku_scores WHERE birth_shuku = ? AND target_shuku = ?'
    ).get(birthShuku, monthShuku) as { month_score: number } | undefined;

    // 日運スコア
    let dayScore: { day_normal_score?: number; day_normal_status?: string; day_ryouhitsu_score?: number; day_ryouhitsu_status?: string } | undefined;
    let dayStatus = '';
    let dayPoints = 0;

    if (isRyouhitsu) {
      dayScore = fortuneDb.prepare(
        'SELECT day_ryouhitsu_score, day_ryouhitsu_status FROM shuku_scores WHERE birth_shuku = ? AND target_shuku = ?'
      ).get(birthShuku, dayShuku) as { day_ryouhitsu_score: number; day_ryouhitsu_status: string } | undefined;
      dayPoints = dayScore?.day_ryouhitsu_score || 0;
      dayStatus = dayScore?.day_ryouhitsu_status || '';
    } else {
      dayScore = fortuneDb.prepare(
        'SELECT day_normal_score, day_normal_status FROM shuku_scores WHERE birth_shuku = ? AND target_shuku = ?'
      ).get(birthShuku, dayShuku) as { day_normal_score: number; day_normal_status: string } | undefined;
      dayPoints = dayScore?.day_normal_score || 0;
      dayStatus = dayScore?.day_normal_status || '';
    }

    // 凌犯期間を状態から削除
    dayStatus = dayStatus.replace(/凌犯期間\s*/g, '').trim();

    // 特殊日スコア
    const specialScore = todayFortune.special_day_point || 0;

    // 合計スコア
    const totalScore = (yearScore?.year_score || 0) + (monthScore?.month_score || 0) + dayPoints + specialScore;

    // エネルギーデータを取得（存在する場合）
    let energyData: Record<string, string> = {};
    try {
      const energyDb = new Database(ENERGY_DB_PATH, { readonly: true });
      const weekdayMap: Record<string, string> = {
        '日': '日曜日', '月': '月曜日', '火': '火曜日',
        '水': '水曜日', '木': '木曜日', '金': '金曜日', '土': '土曜日'
      };
      const weekdayFull = weekdayMap[todayFortune.weekday.charAt(0)] || todayFortune.weekday;

      const energy = energyDb.prepare(
        'SELECT * FROM energy_data WHERE shuku = ? AND weekday = ? LIMIT 1'
      ).get(birthShuku + '宿', weekdayFull) as Record<string, string> | undefined;

      if (energy) {
        energyData = energy;
      }
      energyDb.close();
    } catch {
      // エネルギーDBが無い場合は無視
    }

    masterDb.close();
    fortuneDb.close();

    // 宿曜詳細
    const details = SHUKUYO_DETAILS[birthShuku] || { yomi: '', element: '', characteristic: '' };

    return NextResponse.json({
      success: true,
      data: {
        birthShuku,
        birthShukuYomi: details.yomi,
        birthShukuElement: details.element,
        birthShukuCharacteristic: details.characteristic,
        todayDate: `${todayYear}年${todayMonth}月${todayDay}日`,
        todayWeekday: todayFortune.weekday,
        todayShuku: todayFortune.day_shuku,
        yearShuku: todayFortune.year_shuku,
        monthShuku: todayFortune.month_shuku,
        score: {
          total: totalScore,
          year: yearScore?.year_score || 0,
          month: monthScore?.month_score || 0,
          day: dayPoints,
          special: specialScore,
        },
        status: dayStatus,
        isRyouhitsu,
        specialDay: todayFortune.special_day,
        energy: energyData,
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
