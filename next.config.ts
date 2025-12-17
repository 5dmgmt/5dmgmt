import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-sqlite3のDBファイルをビルドに含める
  outputFileTracingIncludes: {
    '/api/shukuyo': ['./data/**/*'],
  },
  // サーバーサイドでのみ使用するパッケージを外部化
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
