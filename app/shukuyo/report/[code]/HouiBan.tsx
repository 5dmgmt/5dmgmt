'use client';

import React from 'react';

// 九星の情報
const KYUSEI_INFO = {
  1: { name: '一白水星', short: '一白', element: '水', color: '#1e3a5f' },
  2: { name: '二黒土星', short: '二黒', element: '土', color: '#5c4033' },
  3: { name: '三碧木星', short: '三碧', element: '木', color: '#228b22' },
  4: { name: '四緑木星', short: '四緑', element: '木', color: '#32cd32' },
  5: { name: '五黄土星', short: '五黄', element: '土', color: '#daa520' },
  6: { name: '六白金星', short: '六白', element: '金', color: '#c0c0c0' },
  7: { name: '七赤金星', short: '七赤', element: '金', color: '#cd853f' },
  8: { name: '八白土星', short: '八白', element: '土', color: '#f5f5dc' },
  9: { name: '九紫火星', short: '九紫', element: '火', color: '#8b008b' },
} as const;

// 方位の情報（後天定位）
const DIRECTION_INFO = {
  1: { name: '北', position: 'N', kanji: '坎' },
  2: { name: '南西', position: 'SW', kanji: '坤' },
  3: { name: '東', position: 'E', kanji: '震' },
  4: { name: '東南', position: 'SE', kanji: '巽' },
  5: { name: '中央', position: 'C', kanji: '中' },
  6: { name: '北西', position: 'NW', kanji: '乾' },
  7: { name: '西', position: 'W', kanji: '兌' },
  8: { name: '東北', position: 'NE', kanji: '艮' },
  9: { name: '南', position: 'S', kanji: '離' },
} as const;

// 後天定位の配置（3x3グリッド）
// 上から下、左から右の順序
const GRID_POSITIONS = [
  [4, 9, 2],  // 巽(SE), 離(S), 坤(SW)
  [3, 5, 7],  // 震(E), 中央, 兌(W)
  [8, 1, 6],  // 艮(NE), 坎(N), 乾(NW)
];

// 本命星から方位盤の配置を計算
function calculateDirectionChart(honmeisei: number): number[][] {
  // 五黄が中央の後天定位を基準に、本命星との差分で回転
  const offset = 5 - honmeisei;

  return GRID_POSITIONS.map(row =>
    row.map(pos => {
      let newPos = pos + offset;
      if (newPos > 9) newPos -= 9;
      if (newPos < 1) newPos += 9;
      return newPos;
    })
  );
}

// 吉方位の判定
function getDirectionType(
  honmeisei: number,
  directionStar: number,
  position: string
): 'best' | 'good' | 'neutral' | 'bad' | 'worst' {
  // 五黄殺（五黄土星がある方位）
  if (directionStar === 5 && position !== 'C') return 'worst';

  // 暗剣殺（五黄の反対側）
  const opposites: Record<string, string> = {
    'N': 'S', 'S': 'N', 'E': 'W', 'W': 'E',
    'NE': 'SW', 'SW': 'NE', 'NW': 'SE', 'SE': 'NW'
  };

  // 本命殺（自分の本命星がある方位）
  if (directionStar === honmeisei && position !== 'C') return 'bad';

  // 本命的殺（本命星の反対側 = 本命星 + 4 または - 5）
  const tekisatsu = honmeisei <= 5 ? honmeisei + 4 : honmeisei - 5;
  if (directionStar === tekisatsu && position !== 'C') return 'bad';

  // 相生の関係（吉方位）
  const element = KYUSEI_INFO[directionStar as keyof typeof KYUSEI_INFO].element;
  const honmeiElement = KYUSEI_INFO[honmeisei as keyof typeof KYUSEI_INFO].element;

  // 相生パターン
  const sojo: Record<string, string[]> = {
    '木': ['水', '火'],  // 水生木、木生火
    '火': ['木', '土'],  // 木生火、火生土
    '土': ['火', '金'],  // 火生土、土生金
    '金': ['土', '水'],  // 土生金、金生水
    '水': ['金', '木'],  // 金生水、水生木
  };

  if (sojo[honmeiElement]?.includes(element) || sojo[element]?.includes(honmeiElement)) {
    // 相生関係 + 生気・退気で吉凶判断
    if (sojo[element]?.includes(honmeiElement)) return 'best';  // 自分を生じる
    if (sojo[honmeiElement]?.includes(element)) return 'good';  // 自分が生じる
  }

  // 相剋パターン
  const sokoku: Record<string, string[]> = {
    '木': ['土', '金'],  // 木剋土、金剋木
    '火': ['金', '水'],  // 火剋金、水剋火
    '土': ['水', '木'],  // 土剋水、木剋土
    '金': ['木', '火'],  // 金剋木、火剋金
    '水': ['火', '土'],  // 水剋火、土剋水
  };

  if (sokoku[honmeiElement]?.includes(element)) return 'bad';   // 自分が剋される
  if (sokoku[element]?.includes(honmeiElement)) return 'neutral'; // 自分が剋す

  return 'neutral';
}

interface HouiBanProps {
  honmeisei: number;  // 本命星 (1-9)
  getsumeisei: number;  // 月命星 (1-9)
  width?: number;
  height?: number;
}

export default function HouiBan({ honmeisei, getsumeisei, width = 400, height = 400 }: HouiBanProps) {
  const chart = calculateDirectionChart(honmeisei);
  const cellSize = width / 3;
  const padding = 10;

  // 方位のラベル位置
  const directionLabels = [
    { text: '南', x: width / 2, y: padding },
    { text: '北', x: width / 2, y: height - padding },
    { text: '東', x: padding, y: height / 2 },
    { text: '西', x: width - padding, y: height / 2 },
  ];

  // セルの位置と方位のマッピング
  const cellPositions = [
    ['SE', 'S', 'SW'],
    ['E', 'C', 'W'],
    ['NE', 'N', 'NW'],
  ];

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-md"
        style={{ aspectRatio: '1/1' }}
      >
        {/* 背景 */}
        <rect x="0" y="0" width={width} height={height} fill="#f8f9fa" rx="8" />

        {/* グリッド線 */}
        <line x1={cellSize} y1="0" x2={cellSize} y2={height} stroke="#dee2e6" strokeWidth="2" />
        <line x1={cellSize * 2} y1="0" x2={cellSize * 2} y2={height} stroke="#dee2e6" strokeWidth="2" />
        <line x1="0" y1={cellSize} x2={width} y2={cellSize} stroke="#dee2e6" strokeWidth="2" />
        <line x1="0" y1={cellSize * 2} x2={width} y2={cellSize * 2} stroke="#dee2e6" strokeWidth="2" />

        {/* 各セル */}
        {chart.map((row, rowIndex) =>
          row.map((star, colIndex) => {
            const x = colIndex * cellSize;
            const y = rowIndex * cellSize;
            const position = cellPositions[rowIndex][colIndex];
            const dirInfo = DIRECTION_INFO[star as keyof typeof DIRECTION_INFO];
            const kyuseiInfo = KYUSEI_INFO[star as keyof typeof KYUSEI_INFO];
            const dirType = getDirectionType(honmeisei, star, position);

            // 背景色
            let bgColor = '#ffffff';
            let textColor = '#333333';
            if (dirType === 'best') {
              bgColor = '#d4edda';
              textColor = '#155724';
            } else if (dirType === 'good') {
              bgColor = '#e8f5e9';
              textColor = '#2e7d32';
            } else if (dirType === 'bad') {
              bgColor = '#f8d7da';
              textColor = '#721c24';
            } else if (dirType === 'worst') {
              bgColor = '#dc3545';
              textColor = '#ffffff';
            }

            // 中央セルは特別
            if (position === 'C') {
              bgColor = '#fff3cd';
              textColor = '#856404';
            }

            return (
              <g key={`${rowIndex}-${colIndex}`}>
                {/* セル背景 */}
                <rect
                  x={x + 2}
                  y={y + 2}
                  width={cellSize - 4}
                  height={cellSize - 4}
                  fill={bgColor}
                  rx="4"
                />

                {/* 方位名 */}
                <text
                  x={x + cellSize / 2}
                  y={y + 25}
                  textAnchor="middle"
                  fontSize="14"
                  fill="#6c757d"
                >
                  {dirInfo.name}
                </text>

                {/* 九星名 */}
                <text
                  x={x + cellSize / 2}
                  y={y + cellSize / 2 + 5}
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="bold"
                  fill={textColor}
                >
                  {kyuseiInfo.short}
                </text>

                {/* 五行 */}
                <text
                  x={x + cellSize / 2}
                  y={y + cellSize - 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#868e96"
                >
                  {kyuseiInfo.element}
                </text>

                {/* 吉凶マーク */}
                {dirType === 'best' && position !== 'C' && (
                  <text
                    x={x + cellSize - 20}
                    y={y + 25}
                    textAnchor="middle"
                    fontSize="16"
                  >
                    ◎
                  </text>
                )}
                {dirType === 'good' && position !== 'C' && (
                  <text
                    x={x + cellSize - 20}
                    y={y + 25}
                    textAnchor="middle"
                    fontSize="16"
                  >
                    ○
                  </text>
                )}
                {dirType === 'bad' && position !== 'C' && (
                  <text
                    x={x + cellSize - 20}
                    y={y + 25}
                    textAnchor="middle"
                    fontSize="16"
                  >
                    △
                  </text>
                )}
                {dirType === 'worst' && position !== 'C' && (
                  <text
                    x={x + cellSize - 20}
                    y={y + 25}
                    textAnchor="middle"
                    fontSize="16"
                    fill="#ffffff"
                  >
                    ✕
                  </text>
                )}
              </g>
            );
          })
        )}

        {/* 外枠 */}
        <rect
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          fill="none"
          stroke="#343a40"
          strokeWidth="2"
          rx="8"
        />
      </svg>

      {/* 凡例 */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-[#d4edda] border rounded"></span>
          <span>◎ 大吉方位</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-[#e8f5e9] border rounded"></span>
          <span>○ 吉方位</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-white border rounded"></span>
          <span>普通</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-[#f8d7da] border rounded"></span>
          <span>△ 凶方位</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-[#dc3545] border rounded"></span>
          <span>✕ 大凶方位</span>
        </div>
      </div>

      {/* 本命星情報 */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>本命星: {KYUSEI_INFO[honmeisei as keyof typeof KYUSEI_INFO].name}</p>
        <p className="text-xs mt-1 text-gray-500">
          ※方位の吉凶は本命星との相性で判定しています
        </p>
      </div>
    </div>
  );
}
