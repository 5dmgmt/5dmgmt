/**
 * app/sitemap.ts
 *
 * 動的サイトマップ生成
 */

import { MetadataRoute } from 'next';

// 基本更新日（静的コンテンツ用）
const STATIC_LAST_MODIFIED = new Date('2025-01-01');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.5dmgmt.com';
  const now = new Date();

  // 全ページのリスト
  const pages = [
    // トップ（定期更新）
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const, lastModified: now },

    // 運気・宿曜
    { url: '/unki', priority: 0.9, changeFrequency: 'weekly' as const, lastModified: now },
    { url: '/unki/shindan', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: STATIC_LAST_MODIFIED },
    { url: '/unki/shukuyo', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: STATIC_LAST_MODIFIED },
    { url: '/unki/kankei', priority: 0.7, changeFrequency: 'monthly' as const, lastModified: STATIC_LAST_MODIFIED },

    // 体験
    { url: '/taiken', priority: 0.9, changeFrequency: 'weekly' as const, lastModified: now },
    { url: '/taiken/imakoko', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: STATIC_LAST_MODIFIED },
    { url: '/taiken/retreat', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: STATIC_LAST_MODIFIED },

    // 背景・理論（静的）
    { url: '/background', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: STATIC_LAST_MODIFIED },
    { url: '/background/overview', priority: 0.7, changeFrequency: 'monthly' as const, lastModified: STATIC_LAST_MODIFIED },
    { url: '/background/hawkins', priority: 0.7, changeFrequency: 'monthly' as const, lastModified: STATIC_LAST_MODIFIED },
    { url: '/background/story', priority: 0.7, changeFrequency: 'monthly' as const, lastModified: STATIC_LAST_MODIFIED },

    // ツール
    { url: '/tools', priority: 0.7, changeFrequency: 'monthly' as const, lastModified: STATIC_LAST_MODIFIED },

    // ブログ（定期更新）
    { url: '/blog', priority: 0.8, changeFrequency: 'weekly' as const, lastModified: now },

    // 会社情報（静的）
    { url: '/company', priority: 0.6, changeFrequency: 'yearly' as const, lastModified: STATIC_LAST_MODIFIED },
    { url: '/company/profile', priority: 0.6, changeFrequency: 'yearly' as const, lastModified: STATIC_LAST_MODIFIED },
    { url: '/company/tokushoho', priority: 0.5, changeFrequency: 'yearly' as const, lastModified: STATIC_LAST_MODIFIED },
    { url: '/company/contact', priority: 0.6, changeFrequency: 'yearly' as const, lastModified: STATIC_LAST_MODIFIED },
    { url: '/company/privacy', priority: 0.4, changeFrequency: 'yearly' as const, lastModified: STATIC_LAST_MODIFIED },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
