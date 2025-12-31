'use client';

/**
 * 宿曜クライアントコンポーネントラッパー
 * Server Componentから呼び出すためのラッパー
 */

import dynamic from 'next/dynamic';

const ShukuyoSenseiban = dynamic(
  () => import('@/components/shukuyo/ShukuyoSenseiban'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        width: '100%',
        maxWidth: 500,
        aspectRatio: '1 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fafafa',
        borderRadius: '8px',
        color: 'var(--5d-text-secondary)',
        margin: '0 auto'
      }}>
        読み込み中...
      </div>
    )
  }
);

const ShukuyoLookup = dynamic(
  () => import('@/components/shukuyo/ShukuyoLookup'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        height: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--5d-text-secondary)'
      }}>
        読み込み中...
      </div>
    )
  }
);

const ShukuyoTodayFortune = dynamic(
  () => import('@/components/shukuyo/ShukuyoTodayFortune'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--5d-text-secondary)'
      }}>
        読み込み中...
      </div>
    )
  }
);

export function ShukuyoSenseibanWrapper({
  maxSize = 500,
  userShukuyo
}: {
  maxSize?: number;
  userShukuyo?: string;
  /** @deprecated width は maxSize に置き換えられました */
  width?: number;
  /** @deprecated height は maxSize に置き換えられました */
  height?: number;
}) {
  return <ShukuyoSenseiban maxSize={maxSize} userShukuyo={userShukuyo} />;
}

export function ShukuyoLookupWrapper() {
  return <ShukuyoLookup />;
}

export function ShukuyoTodayFortuneWrapper() {
  return <ShukuyoTodayFortune />;
}
