/**
 * app/background/story/page.tsx
 *
 * 五次元経営ストーリーページ
 * コンポーネント分割版
 */

import {
  StoryHero,
  StoryIntro,
  StoryChapters1to2,
  StoryChapters3to4,
  StoryChapters5to6,
  StoryChapters7to8,
  StoryChapters9to10,
  StoryConclusion,
} from '@/components/story';

// ストーリーは24時間キャッシュ（静的コンテンツ）
export const revalidate = 86400;

export const metadata = {
  title: '五次元経営ストーリー | 五次元経営',
  description: 'なぜ、整えても崩れるのか？"構造"の再演を終わらせる鍵。これは、"あなたのせいじゃなかった"と気づく物語です。',
};

export default function StoryPage() {
  return (
    <>
      <StoryHero />
      <StoryIntro />
      <StoryChapters1to2 />
      <StoryChapters3to4 />
      <StoryChapters5to6 />
      <StoryChapters7to8 />
      <StoryChapters9to10 />
      <StoryConclusion />
    </>
  );
}
