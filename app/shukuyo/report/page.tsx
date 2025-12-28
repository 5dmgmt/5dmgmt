'use client';

import { useState } from 'react';

// テスト用デフォルトデータ
const defaultUserData = {
  name: '麻生文子',
  birthDate: '1960-10-27',
  shukuyo: '虚宿',
  weekday: '木曜日',
  shichiyoRyohi: '七曜陵逼生まれ',
  structureTitle: '制御された夢想家',
  yearKyusei: '四緑木星',
  monthKyusei: '九紫火星',
  dayKyusei: '九紫火星',
};

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

// 27宿円形図コンポーネント
function ShukuyoCircle({ honmei }: { honmei: string }) {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 20;
  const innerR = outerR - 40;

  const getPosition = (index: number, radius: number) => {
    const angle = (index * (360 / 27) - 90) * (Math.PI / 180);
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {/* 外側の円 */}
      <circle cx={cx} cy={cy} r={outerR} stroke="#00B8C4" strokeWidth={2} fill="none" />
      {/* 内側の円 */}
      <circle cx={cx} cy={cy} r={innerR} stroke="#4A90A4" strokeWidth={1} fill="none" />

      {/* 27宿を配置 */}
      {SHUKUYO_ORDER.map((shuku, index) => {
        const pos = getPosition(index, innerR);
        const outerPos = getPosition(index, outerR);
        const isHonmei = shuku === honmei;
        const compatibility = calculateCompatibility(honmei, shuku);
        const color = isHonmei ? '#00B8C4' : COMPATIBILITY_COLORS[compatibility];

        return (
          <g key={shuku}>
            {/* 放射線 */}
            <line
              x1={cx}
              y1={cy}
              x2={outerPos.x}
              y2={outerPos.y}
              stroke="#666"
              strokeWidth={0.5}
              opacity={0.3}
            />
            {/* 宿の円 */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isHonmei ? 18 : 12}
              fill={color}
              stroke={isHonmei ? '#FFD700' : 'none'}
              strokeWidth={isHonmei ? 3 : 0}
            />
            {/* 宿名（本命宿のみ） */}
            {isHonmei && (
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fontSize="8"
                fill="white"
                fontWeight="bold"
              >
                {shuku.charAt(0)}
              </text>
            )}
          </g>
        );
      })}

      {/* 中央の円 */}
      <circle cx={cx} cy={cy} r={35} fill="white" stroke="#00B8C4" strokeWidth={2} />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="12" fill="#00B8C4" fontWeight="bold">
        本命
      </text>
    </svg>
  );
}

export default function ShukuyoReportPage() {
  const [user] = useState(defaultUserData);
  const [downloading, setDownloading] = useState(false);

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
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-page { page-break-after: always; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { size: A3 landscape; margin: 10mm; }
        }
      `}</style>

      {/* コントロールバー */}
      <div className="no-print fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 flex justify-between items-center">
        <h1 className="text-lg font-bold">宿曜鑑定書プレビュー</h1>
        <div className="flex gap-4">
          <button
            onClick={handlePrint}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            印刷 / PDF保存
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded disabled:opacity-50"
          >
            {downloading ? 'PDF生成中...' : 'PDFダウンロード'}
          </button>
        </div>
      </div>

      <div className="pt-16 bg-gray-100 min-h-screen">
        {/* Page 00 - 表紙 */}
        <div className="print-page bg-[#F5F5F0] p-8 max-w-[1200px] mx-auto mb-8 shadow-lg" style={{ aspectRatio: '1.414' }}>
          {/* ヘッダー */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-[#00B8C4]">【宿曜の構造】</p>
              <p className="text-lg text-[#4A90A4] mb-2">{user.structureTitle}</p>
              <p className="text-base text-gray-700 mb-2">{user.shukuyo}{user.weekday}生まれ</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">{user.name} 様</span>
                <span className="text-xl text-[#00B8C4] font-bold ml-2">の人生が思い通りになる運気爆上り宿曜鑑定書</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-[#00B8C4] rounded-full flex items-center justify-center">
              <span className="text-2xl text-yellow-400">★</span>
            </div>
          </div>

          {/* 2カラム */}
          <div className="grid grid-cols-2 gap-8">
            {/* 左カラム */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#00B8C4] mb-2">◆空海が伝え、家康が封じた叡智　宿曜27宿</h3>
                <p className="text-sm text-gray-700">「人を見抜き、時を選び、関係を操り、自らに気づく技術」</p>
                <p className="text-sm text-gray-700 ml-8">→ これは統治の側にとっては"危険な力"でもありました。</p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#00B8C4] mb-2">◆運気爆上げするにはすでにあなたの中にある<br />　最高の設定を起動するだけです</h3>
                <p className="text-sm text-gray-700">これは修正や改善ではなく、あなたの魂のOSを起動するだけで、ラクラク、カンタン、ごきげん♪に実現できます。</p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#00B8C4] mb-2">◆鑑定書の見方と役立て方</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✔ 構造の概要：意思決定や行動の土台</li>
                  <li>✔ 葛藤パターン：運気を下げる落とし穴</li>
                  <li>✔ マネジメントのヒント：運を味方にする方法</li>
                  <li>✔ 進化テーマ：運気を一段上へ引き上げる鍵</li>
                </ul>
              </div>
            </div>

            {/* 右カラム */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#00B8C4] mb-2">◆この鑑定書で受け取れるギフト</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>・あなたの波に乗るバイオリズム：2025年のエネルギーの波と最高のタイミング</li>
                  <li>・あなたの天才性の取扱説明書：宿曜が示す、あなただけの成功回路</li>
                </ul>
              </div>

              <div className="bg-[#00B8C4] p-4 rounded-lg text-white">
                <h4 className="font-bold mb-2">【無料】宿曜活用Zoomセッション（30分）</h4>
                <ul className="text-sm space-y-1">
                  <li>・あなたの宿曜の天才性とアキレス腱の詳細</li>
                  <li>・2025年の最高の波の乗り方</li>
                  <li>・重要な人との相性による相乗効果</li>
                </ul>
              </div>

              <div className="bg-yellow-400 p-3 rounded text-center">
                <p className="font-bold text-gray-800">あなたはすでに完璧。あとは、その設定を起動するだけです。</p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 mt-6">© 2025 五次元経営株式会社</div>
        </div>

        {/* Page 01 - 構造秘図 */}
        <div className="print-page bg-[#F5F5F0] p-8 max-w-[1200px] mx-auto mb-8 shadow-lg" style={{ aspectRatio: '1.414' }}>
          <div className="border-b-2 border-[#00B8C4] pb-4 mb-6 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#00B8C4]">{user.shukuyo}{user.weekday}生まれの経営者の構造秘図</h2>
              <p className="text-base text-[#4A90A4]">{user.name} 様 | {user.structureTitle}</p>
            </div>
            <div className="w-12 h-12 bg-[#00B8C4] rounded-full flex items-center justify-center">
              <span className="text-xl text-yellow-400">★</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* 左カラム */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-300">
                <div className="border-b border-[#00B8C4] pb-2 mb-3">
                  <h3 className="font-bold text-[#00B8C4]">✔ 構造の概要（意思決定のスタイル）</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  虚宿は「形のない宝を探し求める」精神性の高い宿で、夢と理想を追い求める傾向があります。
                  木曜日生まれは拡大・発展のエネルギーを持ち、大きなビジョンを描く力に優れています。
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-300">
                <div className="border-b border-[#00B8C4] pb-2 mb-3">
                  <h3 className="font-bold text-[#00B8C4]">🌀 起こりやすい葛藤・自動反応パターン</h3>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>・理想の過度な拡大により、実現可能性を見失う</li>
                  <li>・成長への焦りから、基盤を固める前に拡大</li>
                  <li>・現実的な制約を無視した計画を立てる</li>
                  <li>・周囲の忠告を「小さい考え」と退ける</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-300">
                <div className="border-b border-[#00B8C4] pb-2 mb-3">
                  <h3 className="font-bold text-[#00B8C4]">💡 ポテンシャル（構造的強み）</h3>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>・常識を超えた「ビッグビジョン創造力」</li>
                  <li>・不可能を可能にする信念と行動力</li>
                  <li>・人を巻き込むカリスマ性</li>
                  <li>・逆境をチャンスに変える楽観性</li>
                </ul>
              </div>
            </div>

            {/* 右カラム */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-300">
                <div className="border-b border-[#00B8C4] pb-2 mb-3">
                  <h3 className="font-bold text-[#00B8C4]">🔎 構造活用のマネジメントのヒント</h3>
                </div>
                <div className="text-sm text-gray-700 space-y-2">
                  <p className="font-bold">◆経営者本人がこの構造の場合：</p>
                  <ul className="ml-4 space-y-1">
                    <li>・ビッグビジョンと段階的実行計画を組み合わせる</li>
                    <li>・信頼できる実務型の右腕を置く</li>
                  </ul>
                  <p className="font-bold mt-2">◆この構造を持つ部下がいる場合：</p>
                  <ul className="ml-4 space-y-1">
                    <li>・夢を語らせ、大きなプロジェクトを任せる</li>
                    <li>・創造性を発揮できる環境を用意</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-400 p-4 rounded-lg">
                <div className="border-b border-[#00B8C4] pb-2 mb-3">
                  <h3 className="font-bold text-[#00B8C4]">✨ 五次元経営的進化テーマ</h3>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">
                  虚宿×木曜（七曜陵逼）構造の進化の鍵は、「無限の理想」に「現実的な一歩」を組み合わせること。
                  壮大なビジョンを描きながらも、今日できる小さな行動を積み重ねることで、夢は着実に形になっていきます。
                  <br /><br />
                  <strong>「大きく考え、小さく始める」</strong>これが運気を爆上げする秘訣です。
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">© 2025 五次元経営株式会社</p>
            <p className="text-[#00B8C4] font-bold">2 / 3</p>
          </div>
        </div>

        {/* Page 02 - ゆるゆるマンダラ命式 */}
        <div className="print-page bg-[#F5F5F0] p-8 max-w-[1200px] mx-auto mb-8 shadow-lg" style={{ aspectRatio: '1.414' }}>
          <div className="border-b-2 border-[#00B8C4] pb-4 mb-6 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#00B8C4]">ゆるゆるマンダラ 暦術 命式</h2>
              <p className="text-base text-[#4A90A4]">{user.name} 様 | {user.shukuyo} | {user.shichiyoRyohi}</p>
            </div>
            <div className="w-12 h-12 bg-[#00B8C4] rounded-full flex items-center justify-center">
              <span className="text-xl text-yellow-400">★</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* 左カラム */}
            <div className="space-y-4">
              {/* 27宿円形図 */}
              <div className="bg-white p-4 rounded-lg">
                <ShukuyoCircle honmei={user.shukuyo} />
                <p className="text-center text-sm text-gray-700 mt-2">あなたの宿曜27宿：{user.shukuyo}</p>
              </div>

              {/* 相性凡例 */}
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.entries(COMPATIBILITY_COLORS).map(([type, color]) => (
                  <div key={type} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: color }} />
                    <span className="text-xs text-gray-600">{type}</span>
                  </div>
                ))}
              </div>

              {/* 九星情報 */}
              <div>
                <h3 className="font-bold text-[#00B8C4] border-b border-[#00B8C4] pb-2 mb-3">九星情報</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-3 rounded border">
                    <p className="text-xs text-gray-500">年星（本命星）</p>
                    <p className="text-sm font-bold text-[#00B8C4]">{user.yearKyusei}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-xs text-gray-500">月星（月命星）</p>
                    <p className="text-sm font-bold text-[#00B8C4]">{user.monthKyusei}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-xs text-gray-500">日星（日命星）</p>
                    <p className="text-sm font-bold text-[#00B8C4]">{user.dayKyusei}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-xs text-gray-500">宿曜</p>
                    <p className="text-sm font-bold text-[#00B8C4]">{user.shukuyo}</p>
                  </div>
                </div>
              </div>

              {/* 魂のテーマ */}
              <div>
                <h3 className="font-bold text-[#00B8C4] border-b border-[#00B8C4] pb-2 mb-3">魂のテーマ</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-yellow-400 p-3 rounded text-center">
                    <p className="text-xs text-gray-600">意図のヒント</p>
                    <p className="text-2xl font-bold text-[#00B8C4]">32</p>
                  </div>
                  <div className="bg-yellow-400 p-3 rounded text-center">
                    <p className="text-xs text-gray-600">本質面</p>
                    <p className="text-2xl font-bold text-[#00B8C4]">76</p>
                  </div>
                  <div className="bg-yellow-400 p-3 rounded text-center">
                    <p className="text-xs text-gray-600">行動面</p>
                    <p className="text-2xl font-bold text-[#00B8C4]">81</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右カラム */}
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[#00B8C4] border-b border-[#00B8C4] pb-2 mb-3">年運推移（2025-2026）</h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-[#00B8C4]">
                    <p className="font-bold text-[#00B8C4]">2025年 - 兌-藍の年</p>
                    <p className="text-sm text-gray-700">交流が活発で楽しみの多い時期。後半の運気下降に合わせて、波動が合う人との繋がりを大切に。新しい出会いがビジネスチャンスに。</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-[#00B8C4]">
                    <p className="font-bold text-[#00B8C4]">2026年 - 冬1-意図を溶かす年</p>
                    <p className="text-sm text-gray-700">冬の時期到来。自分のエゴに従って行動すると全てが裏目に。この時期は内省し、次のサイクルへの準備期間として活用。</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[#00B8C4] border-b border-[#00B8C4] pb-2 mb-3">相性の見方</h3>
                <div className="bg-white p-3 rounded">
                  <div className="flex justify-between border-b py-2">
                    <span className="text-sm text-gray-500">命・栄・親・友</span>
                    <span className="text-sm font-bold">良好な相性。協力関係に適している</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-500">安・危・成・壊・衰</span>
                    <span className="text-sm font-bold">注意が必要。関係性を意識して対応</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[#00B8C4] border-b border-[#00B8C4] pb-2 mb-3">生年月日情報</h3>
                <div className="bg-white p-3 rounded">
                  <div className="flex justify-between border-b py-2">
                    <span className="text-sm text-gray-500">生年月日</span>
                    <span className="text-sm font-bold">{user.birthDate}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-sm text-gray-500">曜日</span>
                    <span className="text-sm font-bold">{user.weekday}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-500">七曜陵逼</span>
                    <span className="text-sm font-bold">{user.shichiyoRyohi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">© 2025 五次元経営株式会社</p>
            <p className="text-[#00B8C4] font-bold">3 / 3</p>
          </div>
        </div>
      </div>
    </>
  );
}
