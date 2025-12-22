'use client';

/**
 * 宿曜占いコンポーネント
 * 生年月日から宿曜を調べ、189パターンの構造分析を表示
 * 「気づいている」を軸とした五次元経営アプローチ
 */

import { useState } from 'react';
import shukuyoYoubiData from '@/lib/shukuyoYoubiData.json';

interface ShukuyoResult {
  date: string;
  year: number;
  month: number;
  day: number;
  weekday: string;
  shukuyo: string;
  shukuyo_yomi: string;
  element: string;
  characteristic: string;
  special_day: string | null;
  ryouhitsu: string | null;
  calendar_type: string;
  lunar_date: string;
}

interface ShukuyoYoubiInfo {
  shuku: string;
  youbi: string;
  specialDay: string;
  typeName: string;
  structure: string;
  conflict: string;
  potential: string;
  evolution: string;
  lifestyle: string;
  management: string;
}

// 曜日のマッピング（API返却値 → データキー）
const weekdayMap: Record<string, string> = {
  '日': '日',
  '月': '月',
  '火': '火',
  '水': '水',
  '木': '木',
  '金': '金',
  '土': '土',
};

export default function ShukuyoLookup() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ShukuyoResult | null>(null);
  const [youbiInfo, setYoubiInfo] = useState<ShukuyoYoubiInfo | null>(null);

  // 年の選択肢を生成
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  // 月の日数を計算
  const getDaysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
  const days = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);

  const handleLookup = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    setYoubiInfo(null);

    try {
      const res = await fetch(`/api/shukuyo?year=${year}&month=${month}&day=${day}`);
      const data = await res.json();

      if (data.success) {
        setResult(data.data);

        // 宿×曜日の組み合わせデータを取得
        const shuku = data.data.shukuyo;
        const youbi = weekdayMap[data.data.weekday] || data.data.weekday;
        const key = `${shuku}${youbi}`;

        const info = (shukuyoYoubiData as Record<string, ShukuyoYoubiInfo>)[key];
        if (info) {
          setYoubiInfo(info);
        }
      } else {
        setError(data.message || '宿曜の取得に失敗しました');
      }
    } catch {
      setError('通信エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // テキストを改行で分割して表示
  const renderMultiline = (text: string) => {
    return text.split('\n').map((line, i) => (
      <p key={i} style={{ marginBottom: '0.5rem' }}>{line}</p>
    ));
  };

  // 箇条書きを表示
  const renderBulletList = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    return (
      <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.8 }}>
        {lines.map((line, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>
            {line.replace(/^・/, '').trim()}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="shukuyo-lookup">
      <style>{`
        .shukuyo-lookup {
          max-width: 800px;
          margin: 0 auto;
        }
        .shukuyo-form-container {
          padding: 30px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        .shukuyo-lookup h3 {
          text-align: center;
          color: var(--5d-text);
          margin-bottom: 24px;
          font-size: 1.25rem;
        }
        .shukuyo-form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--5d-text);
        }
        .shukuyo-date-inputs {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .shukuyo-select {
          padding: 12px 16px;
          border: 2px solid var(--5d-border);
          border-radius: 8px;
          font-size: 1rem;
          background: #fff;
          min-width: 90px;
          transition: border-color 0.2s;
        }
        .shukuyo-select:focus {
          outline: none;
          border-color: var(--5d-teal);
        }
        .shukuyo-unit {
          font-weight: 600;
          color: var(--5d-text);
        }
        .shukuyo-button {
          display: block;
          width: 100%;
          padding: 14px 24px;
          background: var(--5d-teal);
          color: #fff;
          border: none;
          border-radius: 9999px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .shukuyo-button:hover:not(:disabled) {
          background: var(--5d-teal-dark);
          transform: translateY(-2px);
        }
        .shukuyo-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .shukuyo-error {
          background: #fee;
          color: #c33;
          padding: 12px;
          border-radius: 8px;
          margin-top: 16px;
          text-align: center;
        }
        .shukuyo-result {
          margin-top: 24px;
          padding: 24px;
          background: linear-gradient(135deg, var(--5d-teal-50) 0%, #fff 100%);
          border-radius: 12px;
          animation: fadeIn 0.5s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .shukuyo-result-main {
          text-align: center;
          margin-bottom: 20px;
        }
        .shukuyo-result-shuku {
          font-size: 3rem;
          font-weight: 700;
          color: var(--5d-teal-dark);
          margin: 0;
        }
        .shukuyo-result-yomi {
          font-size: 1.1rem;
          color: var(--5d-text-secondary);
          margin-top: 4px;
        }
        .shukuyo-result-details {
          background: #fff;
          border-radius: 8px;
          padding: 16px;
        }
        .shukuyo-result-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--5d-border);
        }
        .shukuyo-result-row:last-child {
          border-bottom: none;
        }
        .shukuyo-result-label {
          font-weight: 600;
          color: var(--5d-text-secondary);
        }
        .shukuyo-result-value {
          color: var(--5d-text);
        }
        .shukuyo-analysis {
          margin-top: 32px;
        }
        .shukuyo-analysis-card {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
          border: 1px solid var(--5d-border);
          animation: fadeIn 0.5s ease;
        }
        .shukuyo-analysis-card h4 {
          font-size: 1.1rem;
          color: var(--5d-teal-dark);
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--5d-teal-50);
        }
        .shukuyo-type-badge {
          display: inline-block;
          background: var(--5d-teal);
          color: #fff;
          padding: 12px 24px;
          border-radius: 100px;
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 16px;
          max-width: 100%;
          text-align: center;
          line-height: 1.4;
        }
        @media (max-width: 600px) {
          .shukuyo-type-badge {
            font-size: 1.2rem;
            padding: 10px 20px;
            border-radius: 20px;
            white-space: normal;
            word-break: keep-all;
            overflow-wrap: break-word;
          }
        }
        .shukuyo-awareness-intro {
          text-align: center;
          padding: 24px;
          background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
          border-radius: 12px;
          margin-bottom: 24px;
        }
        .shukuyo-awareness-intro p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--5d-text-secondary);
          margin: 0;
        }
      `}</style>

      <div className="shukuyo-form-container">
        <h3>あなたの構造を知る</h3>
        <p style={{ textAlign: 'center', color: 'var(--5d-text-secondary)', marginBottom: '20px' }}>
          生年月日から、あなたの意識の構造が分かります
        </p>

        <label className="shukuyo-form-label">生年月日を入力してください：</label>
        <div className="shukuyo-date-inputs">
          <select
            className="shukuyo-select"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <span className="shukuyo-unit">年</span>

          <select
            className="shukuyo-select"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <span className="shukuyo-unit">月</span>

          <select
            className="shukuyo-select"
            value={day}
            onChange={(e) => setDay(parseInt(e.target.value))}
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <span className="shukuyo-unit">日</span>
        </div>

        <button
          className="shukuyo-button"
          onClick={handleLookup}
          disabled={loading}
        >
          {loading ? '検索中...' : '構造を調べる'}
        </button>

        {error && <div className="shukuyo-error">{error}</div>}

        {result && (
          <div className="shukuyo-result">
            <div className="shukuyo-result-main">
              <p style={{ fontSize: '0.9rem', color: 'var(--5d-text-secondary)', marginBottom: '8px' }}>あなたの宿曜</p>
              <p className="shukuyo-result-shuku">{result.shukuyo}宿</p>
              <p className="shukuyo-result-yomi">（{result.shukuyo_yomi}しゅく）× {result.weekday}曜日</p>
            </div>
            <div className="shukuyo-result-details">
              <div className="shukuyo-result-row">
                <span className="shukuyo-result-label">七曜：</span>
                <span className="shukuyo-result-value">{result.weekday}曜</span>
              </div>
              {result.ryouhitsu && (
                <div className="shukuyo-result-row">
                  <span className="shukuyo-result-label">七曜陵逼：</span>
                  <span className="shukuyo-result-value" style={{ color: '#d32f2f', fontWeight: 600 }}>{result.ryouhitsu}</span>
                </div>
              )}
              <div className="shukuyo-result-row">
                <span className="shukuyo-result-label">調べた日付：</span>
                <span className="shukuyo-result-value">{result.year}年{result.month}月{result.day}日</span>
              </div>
              {result.special_day && (
                <div className="shukuyo-result-row">
                  <span className="shukuyo-result-label">特殊日：</span>
                  <span className="shukuyo-result-value" style={{ color: '#d32f2f' }}>{result.special_day}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 189パターン分析結果 */}
      {youbiInfo && (
        <div className="shukuyo-analysis">
          <div className="shukuyo-awareness-intro">
            <p>
              この構造は、あなたが「気づいていないとき」に<br />
              自動的に作動するパターンです。<br />
              <br />
              気づいているとき、あなたはこの構造から自由になれます。
            </p>
          </div>

          {/* タイプ名 */}
          <div className="shukuyo-analysis-card" style={{ textAlign: 'center' }}>
            <span className="shukuyo-type-badge">{youbiInfo.typeName}</span>
            {youbiInfo.specialDay && (
              <p style={{ color: '#d32f2f', fontWeight: 600, marginTop: '8px' }}>
                特殊日：{youbiInfo.specialDay}
              </p>
            )}
          </div>

          {/* 構造の概要 */}
          <div className="shukuyo-analysis-card">
            <h4>あなたの構造（意思決定のスタイル）</h4>
            <div style={{ color: 'var(--5d-text-secondary)', lineHeight: 1.9 }}>
              {renderMultiline(youbiInfo.structure)}
            </div>
          </div>

          {/* 葛藤パターン */}
          <div className="shukuyo-analysis-card">
            <h4>気づいていないときに起きること</h4>
            <p style={{ color: 'var(--5d-text-secondary)', marginBottom: '16px', fontStyle: 'italic' }}>
              これらは「あなたの問題」ではありません。構造が自動的に作動しているだけです。
            </p>
            <div style={{ color: 'var(--5d-text-secondary)' }}>
              {renderBulletList(youbiInfo.conflict)}
            </div>
          </div>

          {/* ポテンシャル */}
          <div className="shukuyo-analysis-card">
            <h4>気づいているときに発揮される力</h4>
            <p style={{ color: 'var(--5d-text-secondary)', marginBottom: '16px', fontStyle: 'italic' }}>
              同じ構造が、意識の質によって「強み」として機能します。
            </p>
            <div style={{ color: 'var(--5d-text-secondary)' }}>
              {renderBulletList(youbiInfo.potential)}
            </div>
          </div>

          {/* 進化テーマ */}
          <div className="shukuyo-analysis-card">
            <h4>統合のポイント</h4>
            <p style={{ color: 'var(--5d-text-secondary)', marginBottom: '16px', fontStyle: 'italic' }}>
              気づきを深めるための方向性です。
            </p>
            <div style={{ color: 'var(--5d-text-secondary)', lineHeight: 1.9 }}>
              {renderMultiline(youbiInfo.evolution)}
            </div>
          </div>

          {/* 活用法 */}
          <div className="shukuyo-analysis-card">
            <h4>仕事・ライフスタイルでの活かし方</h4>
            <div style={{ color: 'var(--5d-text-secondary)' }}>
              {renderBulletList(youbiInfo.lifestyle)}
            </div>
          </div>

          {/* マネジメント */}
          <div className="shukuyo-analysis-card">
            <h4>五次元経営における活用</h4>
            <div style={{ color: 'var(--5d-text-secondary)', lineHeight: 1.9 }}>
              {renderMultiline(youbiInfo.management)}
            </div>
          </div>

          {/* CTA */}
          <div className="shukuyo-analysis-card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, var(--5d-teal-50) 0%, #fff 100%)' }}>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--5d-text)', marginBottom: '12px' }}>
              構造を知ることは、入り口に過ぎません。
            </p>
            <p style={{ color: 'var(--5d-text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
              大切なのは、日常の中で「気づいている」こと。<br />
              その瞬間、あなたはこの構造から自由になります。
            </p>
            <a
              href="/unki/shindan"
              style={{
                display: 'inline-block',
                background: 'var(--5d-teal)',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: '9999px',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              今の意識状態を診断する
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
