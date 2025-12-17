/**
 * Sentry サーバー設定
 * サーバーサイドのエラー監視
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // パフォーマンス監視のサンプルレート
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // デバッグモード（開発環境のみ）
  debug: process.env.NODE_ENV === 'development',

  // 環境名
  environment: process.env.NODE_ENV,

  // リリースバージョン
  release: process.env.SENTRY_RELEASE,
});
