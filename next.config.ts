import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-sqlite3のDBファイルをビルドに含める
  outputFileTracingIncludes: {
    '/api/shukuyo': ['./data/**/*'],
  },
  // サーバーサイドでのみ使用するパッケージを外部化
  serverExternalPackages: ['better-sqlite3'],

  // 画像最適化の品質設定
  images: {
    quality: 90,
    formats: ['image/webp', 'image/avif'],
  },

  // セキュリティヘッダー
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
