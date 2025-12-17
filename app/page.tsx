/**
 * app/page.tsx
 *
 * 【Phase 30】五次元経営マーケティングサイト トップページ
 * - ISR: 1時間ごとに再生成
 * - FAQ JSON-LD（トップページのみ）
 */

import FiveDmgmtLandingPage from '@/components/landing/FiveDmgmtLandingPage';
import Script from 'next/script';

// トップページは6時間キャッシュ
export const revalidate = 21600;

// FAQ JSON-LD（トップページのFAQセクション用）
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '「気づいている」とは、具体的にどういう状態ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '今、この文章を読んでいるあなた。その「読んでいる自分」に気づいていますか？思考ではなく、思考を見ている意識——それが「気づき」です。呼吸している自分、座っている自分、画面を見ている自分。それに気づいている「何か」が、あなたの本質です。',
      },
    },
    {
      '@type': 'Question',
      name: '気づきを深めると、本当に運気が上がりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ホーキンズ博士の研究では、意識レベル200を超えると、人生の様々な面で変化が起こりやすくなると言われています。「気づき」は、その意識レベルに影響を与えます。気づきが深まると、判断が冴え、人が集まり、機会が増える——そう感じる人が多いようです。',
      },
    },
    {
      '@type': 'Question',
      name: 'どのくらいで変化が現れますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '変化の現れ方は人それぞれです。本人は「何も変わっていない」と感じることが多いですが、周囲の人が先に気づくことも。気づいている人は、変化を追いかけません。',
      },
    },
    {
      '@type': 'Question',
      name: 'スピリチュアルですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'デビッド・ホーキンズ博士の意識研究をベースにしています。「気づき」は、瞑想や禅の世界で何千年も探求されてきたテーマ。五次元経営では、それを経営に応用しています。まずは体験してみて、ご自身で感じてください。',
      },
    },
  ],
};

export default function FiveDmgmtTopPage() {
  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FiveDmgmtLandingPage />
    </>
  );
}
