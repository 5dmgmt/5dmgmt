/**
 * app/unki/page.tsx
 *
 * 運気を知る インデックスページ
 * 問いかけ型：「あなたは今、どこにいますか？」
 */

import Link from 'next/link';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '運気を知る | 五次元経営',
  description: '今の気づきの深さを測る。ホーキンズ博士の意識レベル理論に基づく経営者運気診断と宿曜鑑定。',
};

const services = [
  {
    title: '経営者運気診断',
    question: '今、何に囚われていますか？',
    description: '10の問いに、直感で答えてください。考えなくていい。感じるだけでいい。3分後、あなたの現在地が見えてきます。',
    href: '/unki/shindan',
    cta: '診断を受ける',
    tag: '3分・無料',
  },
  {
    title: '宿曜鑑定',
    question: 'なぜ、同じところで引っかかるのですか？',
    description: '生まれた日の月の位置が、あなたの無意識のパターンを決めています。それを知ることが、パターンから自由になる第一歩です。',
    href: '/unki/shukuyo',
    cta: '宿曜を調べる',
    tag: '生年月日から',
  },
  {
    title: '宿曜関係図',
    question: 'あの人との関係は、なぜうまくいかないのですか？',
    description: '人間関係のパターンも、宿曜に刻まれています。相性ではなく、関係性の構造を可視化します。',
    href: '/unki/kankei',
    cta: '関係図を見る',
    tag: '複数人対応',
  },
];

export default function UnkiIndexPage() {
  return (
    <>
      {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>
              あなたは今、<br />
              どこにいますか？
            </h1>
            <p className={styles.heroLead}>
              忙しさの中にいますか。<br />
              焦りの中にいますか。<br />
              それとも、静けさの中にいますか。<br />
              <br />
              答えを知っているのは、あなただけです。<br />
              ここでは、その「気づき」を数値で確認できます。
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.cardContainer}>
              {services.map((service) => (
                <div key={service.title} className={styles.serviceCard}>
                  <span className={styles.serviceCardTag}>{service.tag}</span>
                  <h2 className={styles.serviceCardQuestion}>{service.question}</h2>
                  <p className={styles.serviceCardTitle}>{service.title}</p>
                  <p className={styles.serviceCardDescription}>{service.description}</p>
                  <Link
                    href={service.href}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                  >
                    {service.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Question Section */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.questionSection}>
              <p className={styles.questionTitle}>
                測ることに、意味はあるのか？
              </p>
              <p className={styles.questionText}>
                測定は、気づきの入り口に過ぎません。<br />
                大切なのは、数値ではなく、<br />
                「今の自分」に気づくこと。<br />
                <br />
                診断結果を見たとき、<br />
                あなたの中に何が起きるか。<br />
                それが、すでに変化の始まりです。
              </p>
            </div>
          </div>
        </section>
    </>
  );
}
