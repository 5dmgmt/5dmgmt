'use client';

/**
 * 本日の運勢コンポーネント
 * 生年月日から今日の運勢を表示
 */

import { useState } from 'react';

interface FortuneResult {
  birthShuku: string;
  birthShukuYomi: string;
  birthShukuElement: string;
  birthShukuCharacteristic: string;
  todayDate: string;
  todayWeekday: string;
  todayShuku: string;
  yearShuku: string;
  monthShuku: string;
  score: {
    total: number;
    year: number;
    month: number;
    day: number;
    special: number;
  };
  status: string;
  isRyouhitsu: boolean;
  specialDay: string | null;
  energy: Record<string, string>;
}

export default function ShukuyoTodayFortune() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<FortuneResult | null>(null);

  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
  const getDaysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
  const days = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);

  const handleFortune = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/shukuyo/today?year=${year}&month=${month}&day=${day}`);
      const data = await res.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message || '運勢の取得に失敗しました');
      }
    } catch {
      setError('通信エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // スコアに応じた色を返す
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#00B8C4';
    if (score >= 60) return '#4dd0e1';
    if (score >= 40) return '#ffd54f';
    if (score >= 20) return '#ffb74d';
    return '#e57373';
  };

  // スコアに応じたメッセージ
  const getScoreMessage = (score: number) => {
    if (score >= 90) return '最高の運気です！';
    if (score >= 80) return 'とても良い運気です';
    if (score >= 70) return '良い運気です';
    if (score >= 60) return 'まずまずの運気です';
    if (score >= 50) return '平均的な運気です';
    if (score >= 40) return 'やや注意が必要です';
    if (score >= 30) return '慎重に行動しましょう';
    return '無理せず過ごしましょう';
  };

  return (
    <div className="shukuyo-fortune">
      <style>{`
        .shukuyo-fortune {
          max-width: 700px;
          margin: 0 auto;
          padding: 30px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        .shukuyo-fortune h3 {
          text-align: center;
          color: var(--5d-text);
          margin-bottom: 24px;
          font-size: 1.5rem;
        }
        .fortune-form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--5d-text);
        }
        .fortune-date-inputs {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .fortune-select {
          padding: 12px 16px;
          border: 2px solid var(--5d-border);
          border-radius: 8px;
          font-size: 1rem;
          background: #fff;
          min-width: 90px;
          transition: border-color 0.2s;
          color: var(--5d-text);
        }
        .fortune-select:focus {
          outline: none;
          border-color: var(--5d-teal);
        }
        .fortune-unit {
          font-weight: 600;
          color: var(--5d-text);
        }
        .fortune-button {
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
        .fortune-button:hover:not(:disabled) {
          background: var(--5d-teal-dark);
          transform: translateY(-2px);
        }
        .fortune-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .fortune-error {
          background: #fee;
          color: #c33;
          padding: 12px;
          border-radius: 8px;
          margin-top: 16px;
          text-align: center;
        }
        .fortune-result {
          margin-top: 30px;
          animation: fadeIn 0.5s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fortune-score-display {
          text-align: center;
          margin-bottom: 30px;
        }
        .fortune-score-circle {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          color: #fff;
          box-shadow: 0 10px 30px rgba(0, 184, 196, 0.3);
          margin-bottom: 16px;
        }
        .fortune-score-number {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1;
        }
        .fortune-score-label {
          font-size: 1rem;
          margin-top: 5px;
        }
        .fortune-score-message {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--5d-text);
          margin-bottom: 8px;
        }
        .fortune-status {
          display: inline-block;
          padding: 6px 16px;
          background: var(--5d-teal-50);
          color: var(--5d-teal-dark);
          border-radius: 9999px;
          font-weight: 600;
        }
        .fortune-ryouhitsu {
          background: #fff3cd;
          color: #856404;
        }
        .fortune-info-card {
          background: #fafafa;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .fortune-info-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--5d-teal-dark);
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--5d-teal-50);
        }
        .fortune-info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        .fortune-info-row:last-child {
          border-bottom: none;
        }
        .fortune-info-label {
          font-weight: 600;
          color: var(--5d-text-secondary);
        }
        .fortune-info-value {
          color: var(--5d-text);
        }
        .fortune-score-breakdown {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .fortune-score-item {
          background: #fff;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          border: 1px solid var(--5d-border);
        }
        .fortune-score-item-label {
          font-size: 0.85rem;
          color: var(--5d-text-secondary);
          margin-bottom: 4px;
        }
        .fortune-score-item-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--5d-teal-dark);
        }
        .fortune-special-day {
          background: #ffebee;
          color: #c62828;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          font-weight: 600;
          margin-bottom: 20px;
        }
        @media (max-width: 600px) {
          .fortune-score-breakdown {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <h3>本日の運勢</h3>
      <p style={{ textAlign: 'center', color: 'var(--5d-text-secondary)', marginBottom: '24px' }}>
        生年月日から今日の運勢を占います
      </p>

      <label className="fortune-form-label">生年月日を入力してください：</label>
      <div className="fortune-date-inputs">
        <select
          className="fortune-select"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <span className="fortune-unit">年</span>

        <select
          className="fortune-select"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <span className="fortune-unit">月</span>

        <select
          className="fortune-select"
          value={day}
          onChange={(e) => setDay(parseInt(e.target.value))}
        >
          {days.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <span className="fortune-unit">日</span>
      </div>

      <button
        className="fortune-button"
        onClick={handleFortune}
        disabled={loading}
      >
        {loading ? '占い中...' : '本日の運勢を見る'}
      </button>

      {error && <div className="fortune-error">{error}</div>}

      {result && (
        <div className="fortune-result">
          <div className="fortune-score-display">
            <div
              className="fortune-score-circle"
              style={{ background: `linear-gradient(135deg, ${getScoreColor(result.score.total)} 0%, ${getScoreColor(result.score.total)}99 100%)` }}
            >
              <div className="fortune-score-number">{result.score.total}</div>
              <div className="fortune-score-label">点</div>
            </div>
            <div className="fortune-score-message">{getScoreMessage(result.score.total)}</div>
            {result.status && (
              <span className={`fortune-status ${result.isRyouhitsu ? 'fortune-ryouhitsu' : ''}`}>
                {result.isRyouhitsu ? '凌犯期間 ' : ''}{result.status}
              </span>
            )}
          </div>

          {result.specialDay && (
            <div className="fortune-special-day">
              {result.specialDay}
            </div>
          )}

          <div className="fortune-info-card">
            <div className="fortune-info-title">あなたの宿曜</div>
            <div className="fortune-info-row">
              <span className="fortune-info-label">本命宿：</span>
              <span className="fortune-info-value">{result.birthShuku}宿（{result.birthShukuYomi}しゅく）</span>
            </div>
            <div className="fortune-info-row">
              <span className="fortune-info-label">五行：</span>
              <span className="fortune-info-value">{result.birthShukuElement}</span>
            </div>
            <div className="fortune-info-row">
              <span className="fortune-info-label">特性：</span>
              <span className="fortune-info-value">{result.birthShukuCharacteristic}</span>
            </div>
          </div>

          <div className="fortune-info-card">
            <div className="fortune-info-title">本日の宿曜</div>
            <div className="fortune-info-row">
              <span className="fortune-info-label">日付：</span>
              <span className="fortune-info-value">{result.todayDate}（{result.todayWeekday}）</span>
            </div>
            <div className="fortune-info-row">
              <span className="fortune-info-label">日の宿：</span>
              <span className="fortune-info-value">{result.todayShuku}</span>
            </div>
            <div className="fortune-info-row">
              <span className="fortune-info-label">月の宿：</span>
              <span className="fortune-info-value">{result.monthShuku}</span>
            </div>
            <div className="fortune-info-row">
              <span className="fortune-info-label">年の宿：</span>
              <span className="fortune-info-value">{result.yearShuku}</span>
            </div>
          </div>

          <div className="fortune-info-card">
            <div className="fortune-info-title">運勢の内訳</div>
            <div className="fortune-score-breakdown">
              <div className="fortune-score-item">
                <div className="fortune-score-item-label">年運</div>
                <div className="fortune-score-item-value">{result.score.year >= 0 ? '+' : ''}{result.score.year}</div>
              </div>
              <div className="fortune-score-item">
                <div className="fortune-score-item-label">月運</div>
                <div className="fortune-score-item-value">{result.score.month >= 0 ? '+' : ''}{result.score.month}</div>
              </div>
              <div className="fortune-score-item">
                <div className="fortune-score-item-label">日運</div>
                <div className="fortune-score-item-value">{result.score.day >= 0 ? '+' : ''}{result.score.day}</div>
              </div>
              {result.score.special !== 0 && (
                <div className="fortune-score-item">
                  <div className="fortune-score-item-label">特殊日</div>
                  <div className="fortune-score-item-value" style={{ color: result.score.special > 0 ? '#00B8C4' : '#e57373' }}>
                    {result.score.special >= 0 ? '+' : ''}{result.score.special}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
