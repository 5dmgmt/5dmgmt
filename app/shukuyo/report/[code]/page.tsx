'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import ShukuyoSenseiban from '@/components/shukuyo/ShukuyoSenseiban';
import { getFulfillment, getPainBody, getShukuyoYoubiData } from '@/lib/shukuyo-data';
import { decodeShukuyoCodeBrowser } from '@/lib/shukuyo-code';
import type { ShukuyoYoubiData } from '@/lib/shukuyo-data/types';
import HouiBan from './HouiBan';

// 九星名と番号のマッピング
const KYUSEI_MAP: Record<string, number> = {
  '一白水星': 1, '二黒土星': 2, '三碧木星': 3, '四緑木星': 4,
  '五黄土星': 5, '六白金星': 6, '七赤金星': 7, '八白土星': 8, '九紫火星': 9,
};

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
    padding: '12px',
  },
  page: {
    backgroundColor: '#F5F5F0',
    padding: '16px',
    maxWidth: '1000px',
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    borderBottom: '2px solid #00B8C4',
    paddingBottom: '16px',
    gap: '12px',
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
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
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

  const code = params.code as string;
  const name = searchParams.get('name') || '名前未設定';

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // コードをデコード
        const decoded = decodeShukuyoCodeBrowser(code);
        if (!decoded) {
          throw new Error('無効なコードです');
        }

        const { birthDate } = decoded;

        // 日付をパース
        const [year, month, day] = birthDate.split('-').map(Number);
        if (!year || !month || !day) {
          throw new Error('不正な日付形式です');
        }

        // APIから宿曜データを取得
        const [shukuyoResponse, kyuseiResponse] = await Promise.all([
          fetch(`/api/shukuyo?year=${year}&month=${month}&day=${day}`),
          fetch(`/api/kyusei?year=${year}&month=${month}&day=${day}`),
        ]);

        const shukuyoResult = await shukuyoResponse.json();
        const kyuseiResult = await kyuseiResponse.json();

        if (!shukuyoResult.success) {
          throw new Error(shukuyoResult.message || '宿曜データの取得に失敗しました');
        }

        if (!kyuseiResult.success) {
          throw new Error(kyuseiResult.message || '九星データの取得に失敗しました');
        }

        const shukuyoData = shukuyoResult.data;
        const kyuseiData = kyuseiResult.data;

        // 三元九運から運の番号を抽出（例: "第六運" → 6）
        const sangenMatch = kyuseiData.sangenKyuun.match(/第(\d+)運/);
        const sangenNumber = sangenMatch ? parseInt(sangenMatch[1]) : 1;

        setUserData({
          name,
          birthDate,
          shukuyo: shukuyoData.shukuyo + '宿',
          weekday: shukuyoData.weekday,
          shichiyoRyohi: shukuyoData.ryouhitsu || '通常',
          sangenKyuun: sangenNumber,
          sangenKyuunName: kyuseiData.sangenKyuun,
          yearKanshi: kyuseiData.yearKanshi,
          monthKanshi: kyuseiData.monthKanshi,
          dayKanshi: kyuseiData.dayKanshi,
          yearKyusei: kyuseiData.yearStar,
          monthKyusei: kyuseiData.monthStar,
          dayKyusei: kyuseiData.dayStar,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [code, name]);

  if (loading) {
    return (
      <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...styles.logo, margin: '0 auto 16px' }}>★</div>
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

  // 曜日から「曜日」を除去して189通りデータを取得（例: "月曜日" → "月"）
  const youbiChar = userData.weekday.replace('曜日', '');
  const shukuyoYoubiDetail = getShukuyoYoubiData(shukuyoName, youbiChar);

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
            {shukuyoYoubiDetail && (
              <p style={{ fontSize: '14px', color: '#FFD700', fontWeight: 'bold', marginTop: '8px', backgroundColor: '#00B8C4', padding: '4px 12px', borderRadius: '4px', display: 'inline-block' }}>
                〜 {shukuyoYoubiDetail.oneLiner} 〜
                {shukuyoYoubiDetail.specialDay && (
                  <span style={{ marginLeft: '8px', backgroundColor: '#FFD700', color: '#1f2937', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                    {shukuyoYoubiDetail.specialDay}
                  </span>
                )}
              </p>
            )}
          </div>
          <div style={styles.logo}>★</div>
        </div>

        <div style={styles.grid2}>
          {/* 左カラム */}
          <div>
            {/* 宿曜盤 */}
            <div style={{ ...styles.card, textAlign: 'center', marginBottom: '16px' }}>
              <ShukuyoSenseiban maxSize={320} userShukuyo={userData.shukuyo} />
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
            {/* 宿×曜日の本質 */}
            {shukuyoYoubiDetail && (
              <div style={{ ...styles.card, marginBottom: '16px' }}>
                <div style={styles.cardHeader}>🌟 {userData.shukuyo}×{userData.weekday}の本質</div>
                <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>
                  <p style={{ marginBottom: '12px', whiteSpace: 'pre-wrap' }}>{shukuyoYoubiDetail.overview}</p>
                  <div style={{ backgroundColor: '#f0fdf4', padding: '12px', borderRadius: '6px', marginTop: '8px' }}>
                    <p style={{ fontWeight: 'bold', color: '#15803d', marginBottom: '6px' }}>✨ ポテンシャル</p>
                    <p style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>{shukuyoYoubiDetail.potential}</p>
                  </div>
                </div>
              </div>
            )}

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

            {/* ペインボディ / 葛藤パターン */}
            {(painBody || shukuyoYoubiDetail) && (
              <div style={{ ...styles.card, marginBottom: '16px' }}>
                <div style={styles.cardHeader}>🔍 葛藤パターン</div>
                <div style={{ fontSize: '13px', color: '#374151' }}>
                  {shukuyoYoubiDetail && (
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ whiteSpace: 'pre-wrap' }}>{shukuyoYoubiDetail.conflict}</p>
                    </div>
                  )}
                  {painBody && (
                    <>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>なぜ同じパターンを繰り返すのか：</strong>
                        <br />{painBody.whyPattern}
                      </p>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>イマココアドバイス：</strong>
                        <br />{painBody.imakokoAdvice}
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* 進化テーマ */}
            {shukuyoYoubiDetail && (
              <div style={{ ...styles.card, marginBottom: '16px', backgroundColor: '#fefce8' }}>
                <div style={styles.cardHeader}>🚀 進化テーマ</div>
                <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{shukuyoYoubiDetail.evolutionTheme}</p>
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
            {userData.shukuyo} | {userData.weekday}生まれ
          </p>
        </div>
      </div>

      {/* 印刷用・レスポンシブスタイル */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { size: A4; margin: 10mm; }
        }
        @media (max-width: 768px) {
          .shukuyo-report-page {
            padding: 16px !important;
          }
          .shukuyo-report-header {
            flex-direction: column !important;
            text-align: center !important;
          }
          .shukuyo-report-header > div:last-child {
            margin-top: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
