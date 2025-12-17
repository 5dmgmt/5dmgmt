/**
 * app/taiken/page.tsx
 *
 * 体験する インデックスページ
 * 問いかけ型：「思考の外に出たことはありますか？」
 */

import Link from 'next/link';
import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '体験する | 五次元経営',
  description: '思考の外にある静けさを体験する。イマココ体験セッションと経営者リトリート。',
};

const programs = [
  {
    title: 'イマココ体験セッション',
    question: '90分、思考を止められますか？',
    description: '考えることをやめる。それだけのことが、なぜこれほど難しいのか。このセッションでは、安全な環境で「思考の外」を体験します。',
    duration: '90分',
    format: 'オンライン / 対面',
    price: '無料（初回限定）',
    href: '/taiken/imakoko',
  },
  {
    title: '経営者リトリート',
    question: '日常を離れたとき、何が見えますか？',
    description: '慣れた環境が、あなたを「いつも通り」に引き戻します。1泊2日、物理的に離れることで、意識の変容が加速します。',
    duration: '1泊2日',
    format: '合宿形式',
    price: 'お問い合わせください',
    href: '/taiken/retreat',
  },
];

export default function TaikenIndexPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>
              思考の外に<br />
              出たことはありますか？
            </h1>
            <p className={styles.heroLead}>
              私たちは、ほとんどの時間を「考えること」に費やしています。<br />
              過去を分析し、未来を計画し、問題を解決しようとする。<br />
              <br />
              でも、考えていないとき、<br />
              あなたは何を感じていますか？
            </p>
          </div>
        </section>

        {/* Programs Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {programs.map((program, index) => (
                <div
                  key={program.title}
                  style={{
                    padding: '2.5rem',
                    background: 'white',
                    borderRadius: '16px',
                    marginBottom: index < programs.length - 1 ? '2rem' : 0,
                    border: '1px solid var(--lp-border)',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'var(--lp-primary)',
                      backgroundColor: 'var(--lp-primary-light)',
                      padding: '4px 12px',
                      borderRadius: '100px',
                    }}>
                      {program.duration}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'var(--lp-text-muted)',
                      backgroundColor: '#f5f5f5',
                      padding: '4px 12px',
                      borderRadius: '100px',
                    }}>
                      {program.format}
                    </span>
                  </div>

                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--lp-text-primary)',
                    marginBottom: '0.5rem',
                  }}>
                    {program.question}
                  </h2>

                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--lp-text-muted)',
                    marginBottom: '1rem',
                  }}>
                    {program.title}
                  </p>

                  <p style={{
                    lineHeight: 1.8,
                    color: 'var(--lp-text-secondary)',
                    marginBottom: '1.5rem',
                  }}>
                    {program.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <span style={{
                      fontWeight: 600,
                      color: 'var(--lp-primary)'
                    }}>
                      {program.price}
                    </span>
                    <Link
                      href={program.href}
                      className={`${styles.btn} ${styles.btnPrimary}`}
                    >
                      詳細を見る
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Question Section */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: 500,
                color: 'var(--lp-text-primary)',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}>
                体験しないと、分からないのか？
              </p>
              <p style={{
                lineHeight: 2,
                color: 'var(--lp-text-secondary)',
              }}>
                はい。<br />
                <br />
                本を読んでも、「水の味」は分かりません。<br />
                説明を聞いても、「静けさ」は体験できません。<br />
                <br />
                一度でも「思考の外」を知ると、<br />
                そこに戻る道が見えるようになります。<br />
                <br />
                それが、体験する意味です。
              </p>
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />
    </div>
  );
}
