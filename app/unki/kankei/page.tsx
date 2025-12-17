/**
 * 宿曜関係図ページ
 * /unki/kankei
 */

import { Metadata } from 'next';
import ShukuyoKankei from '@/components/shukuyo/ShukuyoKankei';

export const metadata: Metadata = {
  title: '宿曜関係図 | 五次元経営株式会社',
  description: '生年月日から宿曜を調べ、複数人の関係を図で表示します。チームや家族の相性を視覚的に確認できます。',
};

export default function ShukuyoKankeiPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--5d-bg, #f8f9fa)' }}>
      <ShukuyoKankei />
    </div>
  );
}
