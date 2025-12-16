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
        height: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fafafa',
        borderRadius: '8px',
        color: 'var(--5d-text-secondary)'
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

export function ShukuyoSenseibanWrapper({ width = 500, height = 500 }: { width?: number; height?: number }) {
  return <ShukuyoSenseiban width={width} height={height} />;
}

export function ShukuyoLookupWrapper() {
  return <ShukuyoLookup />;
}

export function ShukuyoTodayFortuneWrapper() {
  return <ShukuyoTodayFortune />;
}
