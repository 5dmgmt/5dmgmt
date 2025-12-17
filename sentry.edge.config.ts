/**
 * Sentry Edge Runtime 設定
 * Edge Functions のエラー監視
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // パフォーマンス監視のサンプルレート
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // デバッグモード
  debug: process.env.NODE_ENV === 'development',

  // 環境名
  environment: process.env.NODE_ENV,
});
