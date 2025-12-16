/**
 * app/5dmgmt/taiken/page.tsx
 *
 * 【Phase 30】体験する インデックスページ
 */

import Link from 'next/link';
import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '体験する | 五次元経営',
  description: '五次元経営の体験プログラム。イマココ体験セッションとリトリートで、意識レベルの変化を体感してください。',
};

const programs = [
  {
    title: 'イマココ体験セッション',
    duration: '90分',
    format: 'オンライン / 対面',
    description: '「思考の外にある静けさ」を体験する90分。イマココ意識とは何か、なぜ経営に効くのかを、体感を通じて理解します。',
    includes: [
      '意識レベルの現状確認',
      'イマココ意識の誘導体験',
      '日常で実践するためのワーク',
      '質疑応答',
    ],
    price: '無料（初回限定）',
    href: '/taiken/imakoko',
    cta: '詳細を見る',
  },
  {
    title: '経営者リトリート',
    duration: '2泊3日',
    format: '合宿形式',
    description: '日常を離れ、意識レベルを集中的に上げるリトリート。環境を変え、仲間と共に、深い変容を体験します。',
    includes: [
      '意識レベル測定（Before/After）',
      'イマココ意識の集中トレーニング',
      '環境整備ワークショップ',
      '経営者同士の対話セッション',
    ],
    price: '詳細はお問い合わせください',
    href: '/taiken/retreat',
    cta: '詳細を見る',
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
            <p className={styles.heroCatch}>知識ではなく、体感から</p>
            <h1 className={styles.heroTitle}>体験する</h1>
            <p className={styles.heroLead}>
              意識レベルは、本を読んでも上がりません。<br />
              頭で理解しても、変わりません。<br />
              <br />
              体験を通じて、初めて「分かる」のです。
            </p>
          </div>
        </section>

        {/* Programs Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Programs</p>
              <h2 className={styles.sectionTitle}>体験プログラム</h2>
            </div>

            <div className={styles.featuresGrid} style={{ maxWidth: '900px', margin: '0 auto' }}>
              {programs.map((program) => (
                <div key={program.title} className={styles.featureCard} style={{ padding: '2rem' }}>
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

                  <h3 style={{ marginBottom: '1rem' }}>{program.title}</h3>
                  <p style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>{program.description}</p>

                  <div style={{
                    backgroundColor: '#fafafa',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem'
                  }}>
                    <p style={{
                      fontSize: '0.75rem',
                      color: 'var(--lp-text-muted)',
                      marginBottom: '0.5rem'
                    }}>
                      含まれるもの
                    </p>
                    <ul style={{
                      margin: 0,
                      paddingLeft: '1.25rem',
                      fontSize: '0.875rem',
                      lineHeight: 1.8
                    }}>
                      {program.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

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
                      {program.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Experience Section */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Why Experience?</p>
              <h2 className={styles.sectionTitle}>なぜ体験が必要なのか</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                意識レベル200以下の状態では、「200以上の世界」を想像することすらできません。
                恐れや怒りに支配されていると、「愛」や「喜び」の帯域があること自体が信じられないのです。
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                だからこそ、体験が必要です。
                一度でも「イマココ」の状態を味わうと、そこに戻る道が見えるようになります。
                地図を見るだけでなく、実際にその土地を歩くことで、初めて道が分かるのです。
              </p>
              <p>
                体験セッションでは、安全な環境で「思考の外にある静けさ」を体験していただきます。
                無理な勧誘はありません。合う・合わないは、体験してから判断してください。
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>まずは90分の体験から</h2>
              <p className={styles.ctaLead}>
                初回限定で、イマココ体験セッションを無料で提供しています。<br />
                オンラインでも対面でも、お好きな形式でご参加いただけます。
              </p>
              <Link href="/taiken/imakoko" className={styles.ctaBtn}>
                体験セッションの詳細を見る
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />
    </div>
  );
}
