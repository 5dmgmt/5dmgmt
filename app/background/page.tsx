/**
 * app/background/page.tsx
 *
 * 背景を読む インデックスページ
 * 問いかけ型：「なぜ「気づき」が運気を変えるのか？」
 */

import Link from 'next/link';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '背景を読む | 五次元経営',
  description: 'なぜ気づきが運気を変えるのか。ホーキンズ博士の研究から五次元経営のストーリーまで。',
};

const articles = [
  {
    title: '五次元経営ストーリー',
    question: 'なぜ、数字の世界から意識の世界へ移ったのか？',
    description: '160億円のM&Aをクローズした経営者が、なぜ「意識レベル」を語り始めたのか。個人的な体験から生まれた物語。',
    href: '/background/story',
    tag: 'Origin',
  },
  {
    title: 'ホーキンズ博士の研究',
    question: '意識に「レベル」があるとは、どういうことか？',
    description: 'デビッド・R・ホーキンズ博士が20年の臨床経験を経て発見した意識の階層構造。科学と経営の接点。',
    href: '/background/hawkins',
    tag: 'Theory',
  },
  {
    title: '五次元経営の全体像',
    question: 'イマココ、宿曜、風水。なぜこの3つなのか？',
    description: '意識・時間・空間。この3つの軸から、気づきを深めるアプローチの全体像を解説します。',
    href: '/background/overview',
    tag: 'Framework',
  },
];

export default function BackgroundIndexPage() {
  return (
    <>
      {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>
              なぜ「気づき」が<br />
              運気を変えるのか？
            </h1>
            <p className={styles.heroLead}>
              努力しても変わらない。<br />
              戦略を立てても、うまくいかない。<br />
              <br />
              それは「やり方」の問題ではなく、<br />
              「在り方」の問題かもしれません。<br />
              <br />
              ここでは、その理由を探ります。
            </p>
          </div>
        </section>

        {/* Articles Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.cardContainerMedium}>
              {articles.map((article) => (
                <Link
                  key={article.title}
                  href={article.href}
                  className={styles.serviceCard}
                >
                  <span className={styles.serviceCardTag}>{article.tag}</span>
                  <h2 className={styles.serviceCardQuestion}>{article.question}</h2>
                  <p className={styles.serviceCardTitle}>{article.title}</p>
                  <p className={styles.serviceCardDescription} style={{ marginBottom: 0 }}>
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Question Section */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.questionSection}>
              <p className={styles.questionTitle}>
                理解すれば、変われるのか？
              </p>
              <p className={styles.questionText}>
                理解は、入り口に過ぎません。<br />
                <br />
                ここで読んだことが「腑に落ちる」とき、<br />
                それは理解ではなく、気づきです。<br />
                <br />
                頭ではなく、体で分かる瞬間。<br />
                その瞬間から、変化が始まります。
              </p>

              <div style={{ marginTop: '2.5rem' }}>
                <Link href="/unki/shindan" className={`${styles.btn} ${styles.btnPrimary}`}>
                  まずは今の状態を知る
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
