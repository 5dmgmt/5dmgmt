'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { encodeShukuyoCodeBrowser } from '@/lib/shukuyo-code';

export default function ShukuyoInputPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // イニシャルを生成（名前の最初の文字をローマ字で）
  const generateInitials = (name: string): string => {
    if (!name) return 'XX';
    // 簡易的なイニシャル生成（名前の最初2文字）
    const chars = name.replace(/[\s　]/g, '').slice(0, 2);
    if (chars.length < 2) return chars.padEnd(2, 'X').toUpperCase();
    return chars.toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 日付をパース
      const [year, month, day] = birthDate.split('-').map(Number);
      if (!year || !month || !day) {
        throw new Error('生年月日を正しく入力してください');
      }

      // APIで宿曜を取得して検証
      const response = await fetch(`/api/shukuyo?year=${year}&month=${month}&day=${day}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'データの取得に失敗しました');
      }

      // イニシャル生成
      const initials = generateInitials(name);

      // コードを生成（生年月日をURLに含めない）
      const code = encodeShukuyoCodeBrowser(birthDate, initials);

      // 動的ルートにリダイレクト
      const params = new URLSearchParams({
        name: name || '名前未設定',
        email: email || '',
      });

      router.push(`/shukuyo/report/${code}?${params.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  // 簡易鑑定（デモ表示）
  const handleDemo = () => {
    // サンプル: 1973-11-12, TM → エンコード
    const demoCode = encodeShukuyoCodeBrowser('1973-11-12', 'TM');
    router.push(`/shukuyo/report/${demoCode}?name=望月貴生&demo=true`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
      }}>
        {/* ロゴ/タイトル */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#00B8C4',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: '#FFD700',
            fontSize: '32px',
          }}>★</div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#00B8C4',
            marginBottom: '8px',
          }}>運気爆上り宿曜鑑定書</h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            生年月日からあなたの宿曜と運勢を鑑定します
          </p>
        </div>

        {/* 入力フォーム */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px',
            }}>
              お名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田 太郎"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px',
            }}>
              生年月日 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              min="1900-01-01"
              max="2100-12-31"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px',
            }}>
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
              ※鑑定結果をメールでお送りします（任意）
            </p>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '6px',
              padding: '12px',
              marginBottom: '16px',
              color: '#dc2626',
              fontSize: '14px',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !birthDate}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: isLoading || !birthDate ? '#9ca3af' : '#00B8C4',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isLoading || !birthDate ? 'not-allowed' : 'pointer',
              marginBottom: '12px',
            }}
          >
            {isLoading ? '鑑定中...' : '鑑定する'}
          </button>
        </form>

        {/* 簡易鑑定ボタン */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            onClick={handleDemo}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #00B8C4',
              color: '#00B8C4',
              padding: '10px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            サンプル鑑定を見る
          </button>
        </div>

        {/* フッター */}
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          fontSize: '12px',
          color: '#9ca3af',
        }}>
          © 2025 五次元経営株式会社
        </div>
      </div>
    </div>
  );
}
