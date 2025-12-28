'use client';

import { useState } from 'react';
import ShukuyoSenseiban from '@/components/shukuyo/ShukuyoSenseiban';

// 年運データ型定義
interface YearFortune {
  year: number;
  level: number; // 1-9 (1=冬、9=絶頂期)
  season: string; // 春・夏・秋・冬
  theme: string;
  description: string;
}

// 九星名と番号のマッピング
const KYUSEI_MAP: Record<string, number> = {
  '一白水星': 1,
  '二黒土星': 2,
  '三碧木星': 3,
  '四緑木星': 4,
  '五黄土星': 5,
  '六白金星': 6,
  '七赤金星': 7,
  '八白土星': 8,
  '九紫火星': 9,
};

/**
 * 曼荼羅カード番号を計算
 * @param sangenKyuun 三元九運（1-9）
 * @param yearStar 年星番号（1-9）
 * @param monthStar 月星番号（1-9）
 * @param dayStar 日星番号（1-9）
 * @returns { intention: number, essence: number, action: number }
 */
function calculateMandalaCards(
  sangenKyuun: number,
  yearStar: number,
  monthStar: number,
  dayStar: number
): { intention: number; essence: number; action: number } {
  // 計算式:
  // 意図のヒント = 三元九運 - 9 + 年星 × 9
  // 本質面 = 年星 - 9 + 月星 × 9
  // 行動面 = 月星 - 9 + 日星 × 9
  return {
    intention: sangenKyuun - 9 + yearStar * 9,
    essence: yearStar - 9 + monthStar * 9,
    action: monthStar - 9 + dayStar * 9,
  };
}

// テスト用デフォルトデータ（仮名）
const defaultUserData = {
  name: '山田花子',
  birthDate: '1960-10-27',
  shukuyo: '虚宿',
  weekday: '木曜日',
  shichiyoRyohi: '七曜陵逼生まれ',
  structureTitle: '制御された夢想家',
  // 三元九運
  sangenKyuun: 5,          // 第五運
  sangenKyuunName: '第五運',
  // 干支
  yearKanshi: '庚子',      // 年干支
  monthKanshi: '丙戌',     // 月干支
  dayKanshi: '戊子',       // 日干支
  // 九星
  yearKyusei: '四緑木星',
  monthKyusei: '九紫火星',
  dayKyusei: '九紫火星',
  // 空亡
  kuubou: '寅卯－',
};

// テスト用年運データ（9年サイクル - 九星気学）
const nineYearCycle: YearFortune[] = [
  { year: 2022, level: 6, season: '夏', theme: '六白金星', description: '天の気を受ける年。リーダーシップと決断力が高まる。' },
  { year: 2023, level: 5, season: '秋', theme: '五黄土星', description: '中心の年。周囲への影響力が最大化する時期。' },
  { year: 2024, level: 4, season: '秋', theme: '四緑木星', description: '信用と人脈の年。協調性が運を開く。' },
  { year: 2025, level: 3, season: '秋', theme: '三碧木星', description: '発展と躍進の年。新しい挑戦に適した時期。' },
  { year: 2026, level: 2, season: '冬', theme: '二黒土星', description: '忍耐と基盤の年。地道な努力が実を結ぶ。' },
  { year: 2027, level: 1, season: '冬', theme: '一白水星', description: '潜伏の年。内面を磨き次の飛躍に備える。' },
  { year: 2028, level: 9, season: '春', theme: '九紫火星', description: '頂点の年。注目と成功のピーク。' },
  { year: 2029, level: 8, season: '春', theme: '八白土星', description: '変革の年。大きな転換点となる時期。' },
  { year: 2030, level: 7, season: '夏', theme: '七赤金星', description: '収穫と喜びの年。人間関係が豊かになる。' },
];

// テスト用年運データ（12年サイクル - 十二支）
const twelveYearCycle: YearFortune[] = [
  { year: 2020, level: 1, season: '冬', theme: '子（ね）', description: '始まりの年。新しい12年サイクルのスタート。' },
  { year: 2021, level: 3, season: '冬', theme: '丑（うし）', description: '耐える年。じっくりと力を蓄える時期。' },
  { year: 2022, level: 5, season: '春', theme: '寅（とら）', description: '動き出す年。行動を起こすタイミング。' },
  { year: 2023, level: 7, season: '春', theme: '卯（う）', description: '発展の年。成長と拡大の時期。' },
  { year: 2024, level: 9, season: '春', theme: '辰（たつ）', description: '飛躍の年。大きなチャンスが訪れる。' },
  { year: 2025, level: 11, season: '夏', theme: '巳（み）', description: '実りの年。努力が形になる時期。' },
  { year: 2026, level: 12, season: '夏', theme: '午（うま）', description: '頂点の年。最も勢いのある時期。' },
  { year: 2027, level: 10, season: '夏', theme: '未（ひつじ）', description: '安定の年。成果を味わう時期。' },
  { year: 2028, level: 8, season: '秋', theme: '申（さる）', description: '知恵の年。経験を活かす時期。' },
  { year: 2029, level: 6, season: '秋', theme: '酉（とり）', description: '収穫の年。成果をまとめる時期。' },
  { year: 2030, level: 4, season: '秋', theme: '戌（いぬ）', description: '準備の年。次のサイクルに備える。' },
  { year: 2031, level: 2, season: '冬', theme: '亥（い）', description: '終息の年。サイクルの締めくくり。' },
];

// 年運グラフコンポーネント
function YearFortuneGraph({
  fortunes,
  currentYear = 2025,
  title = '',
  maxLevel = 9,
  accentColor = '#00B8C4'
}: {
  fortunes: YearFortune[];
  currentYear?: number;
  title?: string;
  maxLevel?: number;
  accentColor?: string;
}) {
  const width = 400;
  const height = 180;
  const padding = { top: title ? 35 : 25, right: 25, bottom: 35, left: 35 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const minYear = Math.min(...fortunes.map(f => f.year));
  const maxYear = Math.max(...fortunes.map(f => f.year));
  const yearRange = maxYear - minYear;

  const getX = (year: number) => padding.left + ((year - minYear) / yearRange) * graphWidth;
  const getY = (level: number) => padding.top + graphHeight - ((level - 1) / (maxLevel - 1)) * graphHeight;

  // 季節による色
  const getSeasonColor = (season: string) => {
    switch (season) {
      case '春': return '#4CAF50';
      case '夏': return '#FF5722';
      case '秋': return '#FFC107';
      case '冬': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  // 折れ線のパス
  const linePath = fortunes
    .map((f, i) => `${i === 0 ? 'M' : 'L'} ${getX(f.year)} ${getY(f.level)}`)
    .join(' ');

  // グラデーションエリアのパス
  const areaPath = `${linePath} L ${getX(fortunes[fortunes.length - 1].year)} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

  // グリッドレベル（maxLevelに応じて調整）
  const gridLevels = maxLevel === 12
    ? [1, 4, 7, 10, 12]
    : [1, 3, 5, 7, 9];

  // ユニークなグラデーションID
  const gradientId = `fortuneGradient-${maxLevel}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', margin: '0 auto' }}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* タイトル */}
      {title && (
        <text x={width / 2} y={18} textAnchor="middle" fontSize="12" fill={accentColor} fontWeight="bold">
          {title}
        </text>
      )}

      {/* 背景グリッド */}
      {gridLevels.map(level => (
        <g key={level}>
          <line
            x1={padding.left}
            y1={getY(level)}
            x2={width - padding.right}
            y2={getY(level)}
            stroke="#e5e7eb"
            strokeWidth={1}
            strokeDasharray={level === 5 ? '0' : '4,4'}
          />
          <text
            x={padding.left - 8}
            y={getY(level) + 4}
            textAnchor="end"
            fontSize="10"
            fill="#9ca3af"
          >
            {level}
          </text>
        </g>
      ))}

      {/* グラデーションエリア */}
      <path d={areaPath} fill={`url(#${gradientId})`} />

      {/* 折れ線 */}
      <path d={linePath} stroke={accentColor} strokeWidth={2} fill="none" />

      {/* データポイント */}
      {fortunes.map((f, i) => (
        <g key={f.year}>
          {/* 年ラベル */}
          <text
            x={getX(f.year)}
            y={height - padding.bottom + 12}
            textAnchor="middle"
            fontSize="9"
            fill={f.year === currentYear ? accentColor : '#6b7280'}
            fontWeight={f.year === currentYear ? 'bold' : 'normal'}
          >
            {f.year}
          </text>

          {/* データポイント円 */}
          <circle
            cx={getX(f.year)}
            cy={getY(f.level)}
            r={f.year === currentYear ? 6 : 4}
            fill={f.year === currentYear ? accentColor : getSeasonColor(f.season)}
            stroke="white"
            strokeWidth={1.5}
          />

          {/* 現在年マーカー */}
          {f.year === currentYear && (
            <>
              <line
                x1={getX(f.year)}
                y1={getY(f.level) + 8}
                x2={getX(f.year)}
                y2={height - padding.bottom - 2}
                stroke={accentColor}
                strokeWidth={1}
                strokeDasharray="3,3"
              />
            </>
          )}
        </g>
      ))}

      {/* 季節レジェンド */}
      <g transform={`translate(${width - 90}, ${title ? 28 : 8})`}>
        {['春', '夏', '秋', '冬'].map((season, i) => (
          <g key={season} transform={`translate(${i * 20}, 0)`}>
            <circle cx={4} cy={4} r={3} fill={getSeasonColor(season)} />
            <text x={9} y={7} fontSize="7" fill="#6b7280">{season}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

// 27宿の順序
const SHUKUYO_ORDER = [
  '虚宿', '女宿', '斗宿', '箕宿', '尾宿', '心宿', '房宿', '氐宿', '亢宿',
  '角宿', '軫宿', '翼宿', '張宿', '星宿', '柳宿', '鬼宿', '井宿', '参宿',
  '觜宿', '畢宿', '昴宿', '胃宿', '婁宿', '奎宿', '壁宿', '室宿', '危宿'
];

// 相性の色
const COMPATIBILITY_COLORS: Record<string, string> = {
  '命': '#FF6B6B',
  '栄': '#4ECDC4',
  '親': '#45B7D1',
  '友': '#96CEB4',
  '衰': '#C9C9C9',
  '安': '#FFEAA7',
  '危': '#DDA0DD',
  '成': '#98D8C8',
  '壊': '#F5A623',
};

function calculateCompatibility(honmei: string, target: string): string {
  const honmeiIndex = SHUKUYO_ORDER.indexOf(honmei);
  const targetIndex = SHUKUYO_ORDER.indexOf(target);
  const distance = (targetIndex - honmeiIndex + 27) % 27;

  if (distance === 0) return '命';
  if (distance === 1 || distance === 26) return '栄';
  if (distance === 2 || distance === 25) return '親';
  if (distance === 3 || distance === 24) return '友';
  if (distance === 4 || distance === 23) return '衰';
  if (distance === 5 || distance === 22) return '安';
  if (distance === 6 || distance === 21) return '危';
  if (distance === 7 || distance === 20) return '成';
  if (distance === 8 || distance === 19) return '壊';
  return '安';
}

// スタイル定義
const styles = {
  controlBar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '16px 24px',
    zIndex: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
  },
  buttonGroup: {
    display: 'flex',
    gap: '16px',
  },
  btnPrint: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
  },
  btnDownload: {
    backgroundColor: '#22c55e',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
  },
  container: {
    paddingTop: '80px',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
    padding: '80px 20px 40px',
  },
  page: {
    backgroundColor: '#F5F5F0',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto 32px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    aspectRatio: '1.414',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
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
  teal: { color: '#00B8C4' },
  tealBg: { backgroundColor: '#00B8C4', color: 'white' },
  yellowBg: { backgroundColor: '#FCD34D' },
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
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '24px',
    fontSize: '14px',
    color: '#6b7280',
  },
  pageNum: {
    color: '#00B8C4',
    fontWeight: 'bold' as const,
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold' as const,
    color: '#00B8C4',
    borderBottom: '2px solid #00B8C4',
    paddingBottom: '16px',
    marginBottom: '24px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '12px',
  },
  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '4px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  infoBox: {
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
  },
  infoLabel: {
    fontSize: '12px',
    color: '#6b7280',
  },
  infoValue: {
    fontSize: '14px',
    fontWeight: 'bold' as const,
    color: '#00B8C4',
  },
  yearCard: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    borderLeft: '4px solid #00B8C4',
    marginBottom: '12px',
  },
};

export default function ShukuyoReportPage() {
  const [user] = useState(defaultUserData);
  const [downloading, setDownloading] = useState(false);

  // 曼荼羅カード番号を計算
  const mandalaCards = calculateMandalaCards(
    user.sangenKyuun,
    KYUSEI_MAP[user.yearKyusei] || 1,
    KYUSEI_MAP[user.monthKyusei] || 1,
    KYUSEI_MAP[user.dayKyusei] || 1
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const response = await fetch('/api/shukuyo/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${user.name}_鑑定書.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('PDF download error:', error);
      alert('PDFのダウンロードに失敗しました。ブラウザの印刷機能をお使いください。');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      {/* 印刷用スタイル */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-page { page-break-after: always; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { size: A3 landscape; margin: 10mm; }
        }
      `}</style>

      {/* コントロールバー */}
      <div className="no-print" style={styles.controlBar}>
        <h1 style={styles.title}>宿曜鑑定書プレビュー</h1>
        <div style={styles.buttonGroup}>
          <button onClick={handlePrint} style={styles.btnPrint}>
            印刷 / PDF保存
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            style={{
              ...styles.btnDownload,
              opacity: downloading ? 0.5 : 1,
              cursor: downloading ? 'not-allowed' : 'pointer',
            }}
          >
            {downloading ? 'PDF生成中...' : 'PDFダウンロード'}
          </button>
        </div>
      </div>

      <div style={styles.container}>
        {/* Page 00 - 表紙 */}
        <div className="print-page" style={styles.page}>
          <div style={styles.header}>
            <div>
              <p style={{ fontSize: '14px', color: '#00B8C4' }}>【宿曜の構造】</p>
              <p style={{ fontSize: '18px', color: '#4A90A4', marginBottom: '8px' }}>{user.structureTitle}</p>
              <p style={{ fontSize: '16px', color: '#374151', marginBottom: '8px' }}>{user.shukuyo}{user.weekday}生まれ</p>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{user.name} 様</span>
                <span style={{ fontSize: '20px', color: '#00B8C4', fontWeight: 'bold', marginLeft: '8px' }}>の人生が思い通りになる運気爆上り宿曜鑑定書</span>
              </div>
            </div>
            <div style={styles.logo}>★</div>
          </div>

          <div style={styles.grid2}>
            {/* 左カラム */}
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#00B8C4', marginBottom: '8px' }}>◆空海が伝え、家康が封じた叡智　宿曜27宿</h3>
                <p style={{ fontSize: '14px', color: '#374151' }}>「人を見抜き、時を選び、関係を操り、自らに気づく技術」</p>
                <p style={{ fontSize: '14px', color: '#374151', marginLeft: '32px' }}>→ これは統治の側にとっては&quot;危険な力&quot;でもありました。</p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#00B8C4', marginBottom: '8px' }}>◆運気爆上げするにはすでにあなたの中にある<br />　最高の設定を起動するだけです</h3>
                <p style={{ fontSize: '14px', color: '#374151' }}>これは修正や改善ではなく、あなたの魂のOSを起動するだけで、ラクラク、カンタン、ごきげん♪に実現できます。</p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#00B8C4', marginBottom: '8px' }}>◆鑑定書の見方と役立て方</h3>
                <ul style={{ fontSize: '14px', color: '#374151', listStyle: 'none', padding: 0 }}>
                  <li>✔ 構造の概要：意思決定や行動の土台</li>
                  <li>✔ 葛藤パターン：運気を下げる落とし穴</li>
                  <li>✔ マネジメントのヒント：運を味方にする方法</li>
                  <li>✔ 進化テーマ：運気を一段上へ引き上げる鍵</li>
                </ul>
              </div>
            </div>

            {/* 右カラム */}
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#00B8C4', marginBottom: '8px' }}>◆この鑑定書で受け取れるギフト</h3>
                <ul style={{ fontSize: '14px', color: '#374151', listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '4px' }}>・あなたの波に乗るバイオリズム：2025年のエネルギーの波と最高のタイミング</li>
                  <li>・あなたの天才性の取扱説明書：宿曜が示す、あなただけの成功回路</li>
                </ul>
              </div>

              <div style={{ backgroundColor: '#00B8C4', padding: '16px', borderRadius: '8px', color: 'white', marginBottom: '16px' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>【無料】宿曜活用Zoomセッション（30分）</h4>
                <ul style={{ fontSize: '14px', listStyle: 'none', padding: 0 }}>
                  <li>・あなたの宿曜の天才性とアキレス腱の詳細</li>
                  <li>・2025年の最高の波の乗り方</li>
                  <li>・重要な人との相性による相乗効果</li>
                </ul>
              </div>

              <div style={{ backgroundColor: '#FCD34D', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ fontWeight: 'bold', color: '#1f2937' }}>あなたはすでに完璧。あとは、その設定を起動するだけです。</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280', marginTop: '24px' }}>© 2025 五次元経営株式会社</div>
        </div>

        {/* Page 01 - 構造秘図 */}
        <div className="print-page" style={styles.page}>
          <div style={{ ...styles.header, borderBottom: '2px solid #00B8C4', paddingBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#00B8C4' }}>{user.shukuyo}{user.weekday}生まれの経営者の構造秘図</h2>
              <p style={{ fontSize: '16px', color: '#4A90A4' }}>{user.name} 様 | {user.structureTitle}</p>
            </div>
            <div style={{ ...styles.logo, width: '48px', height: '48px' }}>★</div>
          </div>

          <div style={styles.grid2}>
            {/* 左カラム */}
            <div>
              <div style={styles.card}>
                <div style={styles.cardHeader}>✔ 構造の概要（意思決定のスタイル）</div>
                <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>
                  虚宿は「形のない宝を探し求める」精神性の高い宿で、夢と理想を追い求める傾向があります。
                  木曜日生まれは拡大・発展のエネルギーを持ち、大きなビジョンを描く力に優れています。
                </p>
              </div>

              <div style={{ ...styles.card, marginTop: '16px' }}>
                <div style={styles.cardHeader}>🌀 起こりやすい葛藤・自動反応パターン</div>
                <ul style={{ fontSize: '14px', color: '#374151', listStyle: 'none', padding: 0 }}>
                  <li>・理想の過度な拡大により、実現可能性を見失う</li>
                  <li>・成長への焦りから、基盤を固める前に拡大</li>
                  <li>・現実的な制約を無視した計画を立てる</li>
                  <li>・周囲の忠告を「小さい考え」と退ける</li>
                </ul>
              </div>

              <div style={{ ...styles.card, marginTop: '16px' }}>
                <div style={styles.cardHeader}>💡 ポテンシャル（構造的強み）</div>
                <ul style={{ fontSize: '14px', color: '#374151', listStyle: 'none', padding: 0 }}>
                  <li>・常識を超えた「ビッグビジョン創造力」</li>
                  <li>・不可能を可能にする信念と行動力</li>
                  <li>・人を巻き込むカリスマ性</li>
                  <li>・逆境をチャンスに変える楽観性</li>
                </ul>
              </div>
            </div>

            {/* 右カラム */}
            <div>
              <div style={styles.card}>
                <div style={styles.cardHeader}>🔎 構造活用のマネジメントのヒント</div>
                <div style={{ fontSize: '14px', color: '#374151' }}>
                  <p style={{ fontWeight: 'bold' }}>◆経営者本人がこの構造の場合：</p>
                  <ul style={{ marginLeft: '16px', listStyle: 'none', padding: 0 }}>
                    <li>・ビッグビジョンと段階的実行計画を組み合わせる</li>
                    <li>・信頼できる実務型の右腕を置く</li>
                  </ul>
                  <p style={{ fontWeight: 'bold', marginTop: '8px' }}>◆この構造を持つ部下がいる場合：</p>
                  <ul style={{ marginLeft: '16px', listStyle: 'none', padding: 0 }}>
                    <li>・夢を語らせ、大きなプロジェクトを任せる</li>
                    <li>・創造性を発揮できる環境を用意</li>
                  </ul>
                </div>
              </div>

              <div style={{ ...styles.card, marginTop: '16px', backgroundColor: '#FCD34D' }}>
                <div style={styles.cardHeader}>✨ 五次元経営的進化テーマ</div>
                <p style={{ fontSize: '14px', color: '#1f2937', lineHeight: 1.6 }}>
                  虚宿×木曜（七曜陵逼）構造の進化の鍵は、「無限の理想」に「現実的な一歩」を組み合わせること。
                  壮大なビジョンを描きながらも、今日できる小さな行動を積み重ねることで、夢は着実に形になっていきます。
                  <br /><br />
                  <strong>「大きく考え、小さく始める」</strong>これが運気を爆上げする秘訣です。
                </p>
              </div>
            </div>
          </div>

          <div style={styles.footer}>
            <p>© 2025 五次元経営株式会社</p>
            <p style={styles.pageNum}>2 / 3</p>
          </div>
        </div>

        {/* Page 02 - ゆるゆるマンダラ命式 */}
        <div className="print-page" style={styles.page}>
          <div style={{ ...styles.header, borderBottom: '2px solid #00B8C4', paddingBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#00B8C4' }}>ゆるゆるマンダラ 暦術 命式</h2>
              <p style={{ fontSize: '16px', color: '#4A90A4' }}>{user.name} 様 | {user.shukuyo} | {user.shichiyoRyohi}</p>
            </div>
            <div style={{ ...styles.logo, width: '48px', height: '48px' }}>★</div>
          </div>

          <div style={styles.grid2}>
            {/* 左カラム */}
            <div>
              {/* 27宿円形図（既存の宿曜盤コンポーネント） */}
              <div style={{ ...styles.card, textAlign: 'center' }}>
                <ShukuyoSenseiban width={300} height={300} userShukuyo={user.shukuyo} />
                <p style={{ fontSize: '14px', color: '#374151', marginTop: '8px' }}>あなたの宿曜27宿：{user.shukuyo}（回転して確認できます）</p>
              </div>

              {/* 相性凡例 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
                {Object.entries(COMPATIBILITY_COLORS).map(([type, color]) => (
                  <div key={type} style={styles.legendItem}>
                    <div style={{ ...styles.legendDot, backgroundColor: color }} />
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>{type}</span>
                  </div>
                ))}
              </div>

              {/* 命式情報 */}
              <div style={{ marginTop: '16px' }}>
                <h3 style={{ fontWeight: 'bold', color: '#00B8C4', borderBottom: '1px solid #00B8C4', paddingBottom: '8px', marginBottom: '12px' }}>命式情報</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {/* 干支 */}
                  <div style={{ ...styles.infoBox, backgroundColor: '#f0f9ff' }}>
                    <p style={styles.infoLabel}>年干支</p>
                    <p style={styles.infoValue}>{user.yearKanshi}</p>
                  </div>
                  <div style={{ ...styles.infoBox, backgroundColor: '#f0f9ff' }}>
                    <p style={styles.infoLabel}>月干支</p>
                    <p style={styles.infoValue}>{user.monthKanshi}</p>
                  </div>
                  <div style={{ ...styles.infoBox, backgroundColor: '#f0f9ff' }}>
                    <p style={styles.infoLabel}>日干支</p>
                    <p style={styles.infoValue}>{user.dayKanshi}</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                  {/* 三元九運 */}
                  <div style={{ ...styles.infoBox, gridColumn: 'span 2', backgroundColor: '#fef3c7', textAlign: 'center' }}>
                    <p style={styles.infoLabel}>三元九運</p>
                    <p style={{ ...styles.infoValue, fontSize: '18px' }}>{user.sangenKyuunName}</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '8px' }}>
                  {/* 九星 */}
                  <div style={styles.infoBox}>
                    <p style={styles.infoLabel}>年星（本命星）</p>
                    <p style={styles.infoValue}>{user.yearKyusei}</p>
                  </div>
                  <div style={styles.infoBox}>
                    <p style={styles.infoLabel}>月星（月命星）</p>
                    <p style={styles.infoValue}>{user.monthKyusei}</p>
                  </div>
                  <div style={styles.infoBox}>
                    <p style={styles.infoLabel}>日星（日命星）</p>
                    <p style={styles.infoValue}>{user.dayKyusei}</p>
                  </div>
                </div>
              </div>

              {/* 魂のテーマ */}
              <div style={{ marginTop: '16px' }}>
                <h3 style={{ fontWeight: 'bold', color: '#00B8C4', borderBottom: '1px solid #00B8C4', paddingBottom: '8px', marginBottom: '12px' }}>魂のテーマ（ゆるゆる曼荼羅カード）</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  <div style={{ backgroundColor: '#FCD34D', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', color: '#4b5563', marginBottom: '4px' }}>意図のヒント</p>
                    <img
                      src={`/mandara-cards/card-${String(mandalaCards.intention).padStart(2, '0')}.jpg`}
                      alt={`カード${mandalaCards.intention}`}
                      style={{ width: '100%', maxWidth: '120px', borderRadius: '4px', marginBottom: '4px' }}
                    />
                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#00B8C4' }}>No.{mandalaCards.intention}</p>
                  </div>
                  <div style={{ backgroundColor: '#FCD34D', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', color: '#4b5563', marginBottom: '4px' }}>本質面</p>
                    <img
                      src={`/mandara-cards/card-${String(mandalaCards.essence).padStart(2, '0')}.jpg`}
                      alt={`カード${mandalaCards.essence}`}
                      style={{ width: '100%', maxWidth: '120px', borderRadius: '4px', marginBottom: '4px' }}
                    />
                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#00B8C4' }}>No.{mandalaCards.essence}</p>
                  </div>
                  <div style={{ backgroundColor: '#FCD34D', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', color: '#4b5563', marginBottom: '4px' }}>行動面</p>
                    <img
                      src={`/mandara-cards/card-${String(mandalaCards.action).padStart(2, '0')}.jpg`}
                      alt={`カード${mandalaCards.action}`}
                      style={{ width: '100%', maxWidth: '120px', borderRadius: '4px', marginBottom: '4px' }}
                    />
                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#00B8C4' }}>No.{mandalaCards.action}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右カラム */}
            <div>
              <div>
                <h3 style={{ fontWeight: 'bold', color: '#00B8C4', borderBottom: '1px solid #00B8C4', paddingBottom: '8px', marginBottom: '12px' }}>年運推移</h3>

                {/* 9年サイクル（九星気学） */}
                <div style={{ ...styles.card, marginBottom: '8px', padding: '12px' }}>
                  <YearFortuneGraph
                    fortunes={nineYearCycle}
                    currentYear={2025}
                    title="九星気学（9年周期）"
                    maxLevel={9}
                    accentColor="#00B8C4"
                  />
                </div>

                {/* 12年サイクル（十二支） */}
                <div style={{ ...styles.card, marginBottom: '8px', padding: '12px' }}>
                  <YearFortuneGraph
                    fortunes={twelveYearCycle}
                    currentYear={2025}
                    title="十二支（12年周期）"
                    maxLevel={12}
                    accentColor="#9C27B0"
                  />
                </div>

                {/* 現在年の詳細（両サイクル） */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {/* 9年サイクル 2025年 */}
                  {nineYearCycle.filter(f => f.year === 2025).map(fortune => (
                    <div key={`9y-${fortune.year}`} style={{ ...styles.yearCard, marginBottom: 0 }}>
                      <p style={{ fontWeight: 'bold', color: '#00B8C4', fontSize: '12px' }}>
                        九星: {fortune.theme}
                      </p>
                      <p style={{ fontSize: '11px', color: '#374151' }}>{fortune.description}</p>
                    </div>
                  ))}
                  {/* 12年サイクル 2025年 */}
                  {twelveYearCycle.filter(f => f.year === 2025).map(fortune => (
                    <div key={`12y-${fortune.year}`} style={{ ...styles.yearCard, marginBottom: 0, borderLeftColor: '#9C27B0' }}>
                      <p style={{ fontWeight: 'bold', color: '#9C27B0', fontSize: '12px' }}>
                        十二支: {fortune.theme}
                      </p>
                      <p style={{ fontSize: '11px', color: '#374151' }}>{fortune.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <h3 style={{ fontWeight: 'bold', color: '#00B8C4', borderBottom: '1px solid #00B8C4', paddingBottom: '8px', marginBottom: '12px' }}>相性の見方</h3>
                <div style={styles.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', padding: '8px 0' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>命・栄・親・友</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>良好な相性。協力関係に適している</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>安・危・成・壊・衰</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>注意が必要。関係性を意識して対応</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <h3 style={{ fontWeight: 'bold', color: '#00B8C4', borderBottom: '1px solid #00B8C4', paddingBottom: '8px', marginBottom: '12px' }}>生年月日情報</h3>
                <div style={styles.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', padding: '8px 0' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>生年月日</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{user.birthDate}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', padding: '8px 0' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>曜日</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{user.weekday}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>七曜陵逼</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{user.shichiyoRyohi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.footer}>
            <p>© 2025 五次元経営株式会社</p>
            <p style={styles.pageNum}>3 / 3</p>
          </div>
        </div>
      </div>
    </>
  );
}
