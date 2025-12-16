/**
 * app/5dmgmt/page.tsx
 *
 * 【Phase 30】五次元経営マーケティングサイト トップページ
 * - ISR: 1時間ごとに再生成
 */

import FiveDmgmtLandingPage from '@/components/landing/FiveDmgmtLandingPage';

// ISR: 1時間ごとに再生成（キャッシュ有効化）
export const revalidate = 3600;

export default function FiveDmgmtTopPage() {
  return <FiveDmgmtLandingPage />;
}
