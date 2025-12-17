/**
 * Sentry クライアント設定
 * クライアントサイドのエラー監視
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // パフォーマンス監視のサンプルレート（本番では10%）
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // セッションリプレイのサンプルレート
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // デバッグモード（開発環境のみ）
  debug: process.env.NODE_ENV === 'development',

  // 環境名
  environment: process.env.NODE_ENV,

  // 無視するエラー
  ignoreErrors: [
    // ブラウザの拡張機能からのエラー
    /^chrome-extension:\/\//,
    /^moz-extension:\/\//,
    // ネットワークエラー
    'Network Error',
    'Failed to fetch',
    // ResizeObserverのエラー（無害）
    'ResizeObserver loop limit exceeded',
  ],

  // リリースバージョン（CI/CDで設定）
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
});
