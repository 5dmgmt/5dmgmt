# 五次元経営 マーケティングサイト

五次元経営株式会社のマーケティングサイト。Next.js 16 + React 19 で構築。

## 技術スタック

- **フレームワーク**: Next.js 16.0.10 (App Router)
- **UI**: React 19.2.1
- **スタイリング**: Tailwind CSS 4 + CSS Modules
- **データベース**: better-sqlite3 (宿曜計算用)
- **メール送信**: Resend
- **エラー監視**: Sentry
- **パフォーマンス監視**: Web Vitals + Google Analytics
- **テスト**: Vitest (単体) + Playwright (E2E)
- **リンター/フォーマッター**: ESLint + Prettier

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

> **Note**: `.npmrc` で `legacy-peer-deps=true` を設定済み（Sentry が Next.js 16 を未サポートのため）。

### 2. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成:

```bash
cp .env.example .env.local
```

必要な環境変数:

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 測定ID |
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | hCaptcha サイトキー |
| `HCAPTCHA_SECRET_KEY` | hCaptcha シークレットキー |
| `RESEND_API_KEY` | Resend API キー |
| `RESEND_FROM_EMAIL` | 送信元メールアドレス |
| `CONTACT_TO_EMAIL` | 問い合わせ受信先 |
| `SENTRY_DSN` | Sentry DSN |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN (クライアント用) |

### 3. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアクセス。

## npm スクリプト

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLint 実行 |
| `npm run lint:fix` | ESLint 自動修正 |
| `npm run format` | Prettier フォーマット |
| `npm run format:check` | Prettier チェック |
| `npm run type-check` | TypeScript 型チェック |
| `npm run test` | 単体テスト実行 |
| `npm run test:ui` | テスト UI モード |
| `npm run test:coverage` | カバレッジ付きテスト |
| `npm run test:e2e` | E2E テスト実行 |
| `npm run test:e2e:ui` | E2E テスト UI モード |

## ディレクトリ構成

```
app/
├── api/              # API Routes
│   ├── contact/      # 問い合わせフォーム
│   └── shukuyo/      # 宿曜API
├── background/       # 背景・ストーリー
├── blog/             # ブログ・コラム
├── company/          # 会社情報
├── taiken/           # 体験サービス
├── tools/            # ツール
└── unki/             # 運気診断
components/
├── landing/          # LP コンポーネント
└── WebVitalsReporter.tsx  # Web Vitals 監視
lib/
└── shukuyo/          # 宿曜計算ロジック
__tests__/            # 単体テスト
e2e/                  # E2E テスト
```

## キャッシュ戦略 (ISR)

| ページ種別 | revalidate | 例 |
|------------|------------|-----|
| 静的コンテンツ | 24時間 | 会社概要、プライバシーポリシー、背景系 |
| 準静的コンテンツ | 6時間 | トップページ、体験系、ブログ |
| 動的コンテンツ | 1時間 | ツール、運気ページ |

## セキュリティ

`next.config.ts` で以下のセキュリティヘッダーを設定:

- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options` (クリックジャッキング防止)
- `X-Content-Type-Options` (MIME スニッフィング防止)
- `X-XSS-Protection` (XSS 防止)
- `Referrer-Policy` (リファラー制御)
- `Permissions-Policy` (機能制限)

## 監視

### Sentry (エラー監視)

- クライアントエラー: `sentry.client.config.ts`
- サーバーエラー: `sentry.server.config.ts`
- Edge エラー: `sentry.edge.config.ts`

### Web Vitals (パフォーマンス監視)

`WebVitalsReporter` コンポーネントが Core Web Vitals を Google Analytics に送信:

- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)
- INP (Interaction to Next Paint)

## デプロイ

Vercel でデプロイ:

```bash
vercel
```

または GitHub 連携で自動デプロイ。

## ライセンス

Private - 五次元経営株式会社
