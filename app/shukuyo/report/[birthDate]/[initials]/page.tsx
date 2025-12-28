'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import ShukuyoSenseiban from '@/components/shukuyo/ShukuyoSenseiban';
import { getFulfillment, getPainBody } from '@/lib/shukuyo-data';

// 九星名と番号のマッピング
const KYUSEI_MAP: Record<string, number> = {
  '一白水星': 1, '二黒土星': 2, '三碧木星': 3, '四緑木星': 4,
  '五黄土星': 5, '六白金星': 6, '七赤金星': 7, '八白土星': 8, '九紫火星': 9,
};

const KYUSEI_NAMES = ['一白水星', '二黒土星', '三碧木星', '四緑木星', '五黄土星', '六白金星', '七赤金星', '八白土星', '九紫火星'];

/**
 * 年から九星を計算（本命星）
 * 1864年を基準に計算
 */
function calculateYearKyusei(year: number): string {
  // 九星は9年周期で逆順に回る
  // 1864年が一白水星
  const base = 1864;
  const diff = year - base;
  // 11 - (diff % 9) で逆順計算
  let index = (11 - (diff % 9)) % 9;
  if (index === 0) index = 9;
  return KYUSEI_NAMES[index - 1];
}

/**
 * 年と月から月命星を計算
 */
function calculateMonthKyusei(year: number, month: number): string {
  const yearStar = KYUSEI_MAP[calculateYearKyusei(year)];
  // 月命星の計算（簡易版）
  // 年命星のグループに基づいて月命星を決定
  const group = (yearStar - 1) % 3;
  const baseMonth = [9, 6, 3][group];
  let monthStar = (baseMonth - month + 12) % 9;
  if (monthStar === 0) monthStar = 9;
  return KYUSEI_NAMES[monthStar - 1];
}

/**
 * 三元九運を計算
 * 60年を9つの運に分ける
 */
function calculateSangenKyuun(year: number): { number: number; name: string } {
  // 1864年（甲子年）を起点
  const base = 1864;
  const diff = year - base;
  // 180年周期（60年 × 3元）
  const cyclePos = ((diff % 180) + 180) % 180;
  // 20年ごとに1運（180年 ÷ 9運 = 20年）
  const kyuun = Math.floor(cyclePos / 20) + 1;
  return {
    number: kyuun,
    name: `第${kyuun}運`,
  };
}

/**
 * 干支を計算
 */
function calculateKanshi(year: number, month: number, day: number): {
  yearKanshi: string;
  monthKanshi: string;
  dayKanshi: string;
} {
  const TEN_KAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const TWELVE_SHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  // 年干支（1984年が甲子年）
  const yearDiff = year - 1984;
  const yearKanIndex = ((yearDiff % 10) + 10) % 10;
  const yearShiIndex = ((yearDiff % 12) + 12) % 12;
  const yearKanshi = TEN_KAN[yearKanIndex] + TWELVE_SHI[yearShiIndex];

  // 月干支（簡易計算）
  const monthBase = (year - 1900) * 12 + month - 1;
  const monthKanIndex = ((monthBase % 10) + 10) % 10;
  const monthShiIndex = ((monthBase % 12) + 12) % 12;
  const monthKanshi = TEN_KAN[monthKanIndex] + TWELVE_SHI[monthShiIndex];

  // 日干支（1900年1月1日を甲戌として計算）
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const daysDiff = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  const dayKanIndex = ((daysDiff % 10) + 10 + 1) % 10; // 甲戌なので+1調整
  const dayShiIndex = ((daysDiff % 12) + 12 + 11) % 12; // 戌は11番目
  const dayKanshi = TEN_KAN[dayKanIndex] + TWELVE_SHI[dayShiIndex];

  return { yearKanshi, monthKanshi, dayKanshi };
}

/**
 * 曼荼羅カード番号を計算
 */
function calculateMandalaCards(
  sangenKyuun: number,
  yearStar: number,
  monthStar: number,
  dayStar: number
): { intention: number; essence: number; action: number } {
  return {
    intention: sangenKyuun - 9 + yearStar * 9,
    essence: yearStar - 9 + monthStar * 9,
    action: monthStar - 9 + dayStar * 9,
  };
}

// スタイル定義
const styles = {
  container: {
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
    padding: '20px',
  },
  page: {
    backgroundColor: '#F5F5F0',
    padding: '32px',
    maxWidth: '1000px',
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    borderBottom: '2px solid #00B8C4',
    paddingBottom: '16px',
  },
  logo: {
    width: '48px',
    height: '48px',
    backgroundColor: '#00B8C4',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFD700',
    fontSize: '24px',
  },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  card: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  cardHeader: {
    borderBottom: '1px solid #00B8C4',
    paddingBottom: '8px',
    marginBottom: '12px',
    fontWeight: 'bold' as const,
    color: '#00B8C4',
  },
  infoBox: {
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
  },
  infoLabel: { fontSize: '12px', color: '#6b7280' },
  infoValue: { fontSize: '14px', fontWeight: 'bold' as const, color: '#00B8C4' },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '24px',
    fontSize: '14px',
    color: '#6b7280',
  },
};

interface ShukuyoData {
  shukuyo: string;
  weekday: string;
  ryouhitsu: string | null;
  element: string;
  characteristic: string;
}

interface UserData {
  name: string;
  birthDate: string;
  shukuyo: string;
  weekday: string;
  shichiyoRyohi: string;
  sangenKyuun: number;
  sangenKyuunName: string;
  yearKanshi: string;
  monthKanshi: string;
  dayKanshi: string;
  yearKyusei: string;
  monthKyusei: string;
  dayKyusei: string;
}

export default function DynamicReportPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const birthDate = params.birthDate as string;
  const initials = params.initials as string;
  const name = searchParams.get('name') || '名前未設定';

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // 日付をパース
        const [year, month, day] = birthDate.split('-').map(Number);
        if (!year || !month || !day) {
          throw new Error('不正な日付形式です');
        }

        // APIから宿曜データを取得
        const response = await fetch(`/api/shukuyo?year=${year}&month=${month}&day=${day}`);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'データの取得に失敗しました');
        }

        const shukuyoData: ShukuyoData = result.data;

        // 九星・干支・三元九運を計算
        const yearKyusei = calculateYearKyusei(year);
        const monthKyusei = calculateMonthKyusei(year, month);
        const dayKyusei = calculateYearKyusei(year); // 日星は簡易的に年星と同じ（TODO: 正確な計算）
        const sangenKyuun = calculateSangenKyuun(year);
        const kanshi = calculateKanshi(year, month, day);

        setUserData({
          name,
          birthDate,
          shukuyo: shukuyoData.shukuyo + '宿',
          weekday: shukuyoData.weekday,
          shichiyoRyohi: shukuyoData.ryouhitsu || '通常',
          sangenKyuun: sangenKyuun.number,
          sangenKyuunName: sangenKyuun.name,
          yearKanshi: kanshi.yearKanshi,
          monthKanshi: kanshi.monthKanshi,
          dayKanshi: kanshi.dayKanshi,
          yearKyusei,
          monthKyusei,
          dayKyusei,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [birthDate, name]);

  if (loading) {
    return (
      <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...styles.logo, margin: '0 auto 16px', animation: 'spin 1s linear infinite' }}>★</div>
          <p style={{ color: '#00B8C4', fontWeight: 'bold' }}>鑑定書を生成中...</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '40px', borderRadius: '12px' }}>
          <p style={{ color: '#dc2626', marginBottom: '16px' }}>{error || 'データの読み込みに失敗しました'}</p>
          <a href="/shukuyo" style={{ color: '#00B8C4', textDecoration: 'underline' }}>入力画面に戻る</a>
        </div>
      </div>
    );
  }

  // 曼荼羅カード計算
  const mandalaCards = calculateMandalaCards(
    userData.sangenKyuun,
    KYUSEI_MAP[userData.yearKyusei] || 1,
    KYUSEI_MAP[userData.monthKyusei] || 1,
    KYUSEI_MAP[userData.dayKyusei] || 1
  );

  // 宿名から「宿」を除去して充足データを取得
  const shukuyoName = userData.shukuyo.replace('宿', '') as import('@/lib/shukuyo-data').ShukuyoName;
  const fulfillment = getFulfillment(shukuyoName);
  const painBody = getPainBody(shukuyoName);

  return (
    <div style={styles.container}>
      {/* 印刷/共有ボタン */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <a href="/shukuyo" style={{ color: '#00B8C4', textDecoration: 'none' }}>
          ← 新しい鑑定をする
        </a>
        <button
          onClick={() => window.print()}
          style={{
            backgroundColor: '#00B8C4',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          印刷 / PDF保存
        </button>
      </div>

      {/* メインレポート（1ページ） */}
      <div style={styles.page}>
        {/* ヘッダー */}
        <div style={styles.header}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#00B8C4', marginBottom: '8px' }}>
              運気爆上り宿曜鑑定書
            </h1>
            <p style={{ fontSize: '18px', color: '#4A90A4' }}>
              {userData.name} 様 | {userData.shukuyo} | {userData.weekday}生まれ
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>生年月日: {userData.birthDate}</p>
          </div>
          <div style={styles.logo}>★</div>
        </div>

        <div style={styles.grid2}>
          {/* 左カラム */}
          <div>
            {/* 宿曜盤 */}
            <div style={{ ...styles.card, textAlign: 'center', marginBottom: '16px' }}>
              <ShukuyoSenseiban width={280} height={280} userShukuyo={userData.shukuyo} />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                あなたの宿曜: {userData.shukuyo}（回転して確認できます）
              </p>
            </div>

            {/* 命式情報 */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontWeight: 'bold', color: '#00B8C4', borderBottom: '1px solid #00B8C4', paddingBottom: '8px', marginBottom: '12px' }}>
                命式情報
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <div style={{ ...styles.infoBox, backgroundColor: '#f0f9ff' }}>
                  <p style={styles.infoLabel}>年干支</p>
                  <p style={styles.infoValue}>{userData.yearKanshi}</p>
                </div>
                <div style={{ ...styles.infoBox, backgroundColor: '#f0f9ff' }}>
                  <p style={styles.infoLabel}>月干支</p>
                  <p style={styles.infoValue}>{userData.monthKanshi}</p>
                </div>
                <div style={{ ...styles.infoBox, backgroundColor: '#f0f9ff' }}>
                  <p style={styles.infoLabel}>日干支</p>
                  <p style={styles.infoValue}>{userData.dayKanshi}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginTop: '8px' }}>
                <div style={{ ...styles.infoBox, backgroundColor: '#fef3c7', textAlign: 'center' }}>
                  <p style={styles.infoLabel}>三元九運</p>
                  <p style={{ ...styles.infoValue, fontSize: '18px' }}>{userData.sangenKyuunName}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '8px' }}>
                <div style={styles.infoBox}>
                  <p style={styles.infoLabel}>年星（本命星）</p>
                  <p style={styles.infoValue}>{userData.yearKyusei}</p>
                </div>
                <div style={styles.infoBox}>
                  <p style={styles.infoLabel}>月星</p>
                  <p style={styles.infoValue}>{userData.monthKyusei}</p>
                </div>
                <div style={styles.infoBox}>
                  <p style={styles.infoLabel}>日星</p>
                  <p style={styles.infoValue}>{userData.dayKyusei}</p>
                </div>
              </div>
            </div>

            {/* 曼荼羅カード */}
            <div>
              <h3 style={{ fontWeight: 'bold', color: '#00B8C4', borderBottom: '1px solid #00B8C4', paddingBottom: '8px', marginBottom: '12px' }}>
                魂のテーマ（曼荼羅カード）
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <div style={{ backgroundColor: '#FCD34D', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                  <p style={{ fontSize: '11px', color: '#4b5563', marginBottom: '4px' }}>意図のヒント</p>
                  <img
                    src={`/mandara-cards/card-${String(mandalaCards.intention).padStart(2, '0')}.jpg`}
                    alt={`カード${mandalaCards.intention}`}
                    style={{ width: '100%', maxWidth: '100px', borderRadius: '4px', marginBottom: '4px' }}
                  />
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#00B8C4' }}>No.{mandalaCards.intention}</p>
                </div>
                <div style={{ backgroundColor: '#FCD34D', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                  <p style={{ fontSize: '11px', color: '#4b5563', marginBottom: '4px' }}>本質面</p>
                  <img
                    src={`/mandara-cards/card-${String(mandalaCards.essence).padStart(2, '0')}.jpg`}
                    alt={`カード${mandalaCards.essence}`}
                    style={{ width: '100%', maxWidth: '100px', borderRadius: '4px', marginBottom: '4px' }}
                  />
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#00B8C4' }}>No.{mandalaCards.essence}</p>
                </div>
                <div style={{ backgroundColor: '#FCD34D', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                  <p style={{ fontSize: '11px', color: '#4b5563', marginBottom: '4px' }}>行動面</p>
                  <img
                    src={`/mandara-cards/card-${String(mandalaCards.action).padStart(2, '0')}.jpg`}
                    alt={`カード${mandalaCards.action}`}
                    style={{ width: '100%', maxWidth: '100px', borderRadius: '4px', marginBottom: '4px' }}
                  />
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#00B8C4' }}>No.{mandalaCards.action}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右カラム */}
          <div>
            {/* 充足の3法則 */}
            {fulfillment && (
              <div style={{ ...styles.card, marginBottom: '16px' }}>
                <div style={styles.cardHeader}>✨ 充足の3法則（{userData.shukuyo}）</div>
                <div style={{ fontSize: '13px', color: '#374151' }}>
                  {fulfillment.laws.map((law, i) => (
                    <div key={i} style={{ marginBottom: '12px' }}>
                      <p style={{ fontWeight: 'bold', color: '#00B8C4', marginBottom: '4px' }}>
                        法則{law.number}：{law.title}
                      </p>
                      <p style={{ lineHeight: 1.5 }}>{law.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ペインボディ */}
            {painBody && (
              <div style={{ ...styles.card, marginBottom: '16px' }}>
                <div style={styles.cardHeader}>🔍 葛藤パターン（ペインボディ）</div>
                <div style={{ fontSize: '13px', color: '#374151' }}>
                  <p style={{ marginBottom: '8px' }}>
                    <strong>なぜ同じパターンを繰り返すのか：</strong>
                    <br />{painBody.whyPattern}
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    <strong>イマココアドバイス：</strong>
                    <br />{painBody.imakokoAdvice}
                  </p>
                </div>
              </div>
            )}

            {/* 無料Zoomセッション案内 */}
            <div style={{ ...styles.card, backgroundColor: '#00B8C4', color: 'white' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>【無料】宿曜活用Zoomセッション（30分）</h4>
              <ul style={{ fontSize: '13px', listStyle: 'none', padding: 0 }}>
                <li>・あなたの宿曜の天才性とアキレス腱の詳細</li>
                <li>・2025年の最高の波の乗り方</li>
                <li>・重要な人との相性による相乗効果</li>
              </ul>
              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <a
                  href="https://5dmgmt.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#FFD700',
                    color: '#1f2937',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  無料セッションに申し込む
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div style={styles.footer}>
          <p>© 2025 五次元経営株式会社</p>
          <p style={{ color: '#00B8C4', fontWeight: 'bold' }}>
            URL: /shukuyo/report/{birthDate}/{initials}
          </p>
        </div>
      </div>

      {/* 印刷用スタイル */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { size: A4; margin: 10mm; }
        }
      `}</style>
    </div>
  );
}
