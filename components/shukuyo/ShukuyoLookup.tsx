'use client';

/**
 * 宿曜占いコンポーネント
 * 生年月日から宿曜を調べる
 */

import { useState } from 'react';

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

export default function ShukuyoLookup() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ShukuyoResult | null>(null);

  // 年の選択肢を生成
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  // 月の日数を計算
  const getDaysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
  const days = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);

  const handleLookup = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/shukuyo?year=${year}&month=${month}&day=${day}`);
      const data = await res.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message || '宿曜の取得に失敗しました');
      }
    } catch {
      setError('通信エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shukuyo-lookup">
      <style>{`
        .shukuyo-lookup {
          max-width: 600px;
          margin: 0 auto;
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
      `}</style>

      <h3>宿曜占い</h3>
      <p style={{ textAlign: 'center', color: 'var(--5d-text-secondary)', marginBottom: '20px' }}>
        生年月日から宿曜を調べます
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
        {loading ? '検索中...' : '宿曜を調べる'}
      </button>

      {error && <div className="shukuyo-error">{error}</div>}

      {result && (
        <div className="shukuyo-result">
          <div className="shukuyo-result-main">
            <p className="shukuyo-result-shuku">{result.shukuyo}宿</p>
            <p className="shukuyo-result-yomi">（{result.shukuyo_yomi}しゅく）</p>
          </div>
          <div className="shukuyo-result-details">
            <div className="shukuyo-result-row">
              <span className="shukuyo-result-label">曜日：</span>
              <span className="shukuyo-result-value">{result.weekday}曜日</span>
            </div>
            <div className="shukuyo-result-row">
              <span className="shukuyo-result-label">五行：</span>
              <span className="shukuyo-result-value">{result.element}</span>
            </div>
            <div className="shukuyo-result-row">
              <span className="shukuyo-result-label">特性：</span>
              <span className="shukuyo-result-value">{result.characteristic}</span>
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
  );
}
