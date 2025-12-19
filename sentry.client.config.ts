/**
 * Sentry クライアント設定
 * クライアントサイドのエラー監視（本番環境のみ）
 */

import * as Sentry from '@sentry/nextjs';

// 本番環境のみSentryを有効化
if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // パフォーマンス監視のサンプルレート
    tracesSampleRate: 0.1,

    // 環境名
    environment: 'production',

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
}
