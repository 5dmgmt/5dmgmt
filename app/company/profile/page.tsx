/**
 * app/company/profile/page.tsx
 *
 * 会社概要ページ - 五次元経営株式会社
 * AboutPage + Person JSON-LD（会社概要ページ用）
 */

import Image from 'next/image';
import Script from 'next/script';
import styles from '@/components/landing/LandingPage.module.css';
import {
  aboutPageJsonLd,
  personTakaoJsonLd,
  personMikaJsonLd,
  companyInfo,
  history,
  achievements,
  takaoCareer,
  mikaCareer,
  values,
} from './data';

// 静的コンテンツは24時間キャッシュ
export const revalidate = 86400;

export const metadata = {
  title: '会社概要 | 五次元経営',
  description: '五次元経営株式会社は、「イマココの心地よさから始める経営」を広め、みんな、ごきげんな会社をふつうにすることを使命としています。',
};

export default function ProfilePage() {
  return (
    <>
      <Script
        id="about-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <Script
        id="person-takao-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personTakaoJsonLd) }}
      />
      <Script
        id="person-mika-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personMikaJsonLd) }}
      />
      {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.heroCatch}>Company Profile</p>
            <h1 className={styles.heroTitle}>会社概要</h1>
          </div>
        </section>

        {/* 五次元経営株式会社とは */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>About Us</p>
              <h2 className={styles.sectionTitle}>五次元経営株式会社とは</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.9 }}>
              {/* 写真 */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Image
                  src="/images/mensa.png"
                  alt="JAPAN MENSA会員"
                  width={400}
                  height={300}
                  style={{ borderRadius: '12px', objectFit: 'cover', maxWidth: '100%', height: 'auto' }}
                />
                <p style={{ fontSize: '0.85rem', color: 'var(--lp-text-muted)', marginTop: '0.5rem' }}>
                  代表取締役2名はJAPAN MENSA会員
                </p>
              </div>

              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)', fontSize: '1.1rem' }}>
                五次元経営株式会社は、<br />
                「イマココの心地よさから始める経営」を広め、<br />
                みんな、ごきげんな会社をふつうにすることを使命としています。
              </p>
            </div>
          </div>
        </section>

        {/* 事業紹介 */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Services</p>
              <h2 className={styles.sectionTitle}>事業紹介</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 1.9 }}>
              <p style={{ marginBottom: '2rem', color: 'var(--lp-text-secondary)' }}>
                M&Aアドバイザリー業務、五次元経営®コンサルティング業務、企業価値向上研修業務の３本の柱が弊社の提供しているサービスです。
              </p>

              {/* M&Aアドバイザリー */}
              <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--5d-teal-dark)' }}>①M&Aアドバイザリー</h3>
                <p style={{ color: 'var(--lp-text-secondary)', marginBottom: '0.5rem' }}>
                  数字ではなく、存在から組織を見る──
                </p>
                <p style={{ color: 'var(--lp-text-secondary)' }}>
                  五次元経営の視点と、豊富な金融・投資の現場経験を統合した独自のM&A支援を提供しています。
                </p>
              </div>

              {/* 五次元経営コンサル */}
              <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--5d-teal-dark)' }}>②五次元経営®コンサル</h3>
                <p style={{ color: 'var(--lp-text-secondary)', marginBottom: '0.5rem' }}>
                  すべては、「イマココの心地よさ」から自然に整い始める。
                </p>
                <p style={{ color: 'var(--lp-text-secondary)' }}>
                  経営者の&quot;存在の質&quot;を起点に、企業の持続可能な進化をサポートします。
                </p>
              </div>

              {/* 企業価値向上研修 */}
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--5d-teal-dark)' }}>③企業価値向上研修</h3>
                <p style={{ color: 'var(--lp-text-secondary)', marginBottom: '0.5rem' }}>
                  言葉ではなく、場で理念が伝わる組織へ──
                </p>
                <p style={{ color: 'var(--lp-text-secondary)' }}>
                  内面の整えから企業の力を底上げする、実践型の学びの場を提供します。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 実績 */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Results</p>
              <h2 className={styles.sectionTitle}>実績</h2>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.9 }}>
              {/* M&A実績 */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--5d-teal-dark)', borderBottom: '2px solid var(--5d-teal)', paddingBottom: '0.5rem' }}>
                  ①M&Aアドバイザリー業務、企業価値向上ハンズオン業務
                </h3>
                <p style={{ color: 'var(--lp-text-secondary)', fontSize: '0.95rem' }}>
                  みずほ銀行でのM&Aアドバイザリー業務、上場企業でのM&A買収担当部長、ジャフコのPEファンド部門の企業買収・価値向上・売却の経験を背景に、多数の案件をクローズ。みずほ銀行時代は、質屋の大黒屋の160億円のM&Aクローズ実績。ジャフコでは、現在プライム上場企業のイーレックスの社外役員としての企業価値向上及び創業家への株の売り戻し、現在プライム上場企業子会社のフォーナインズの社外役員として、オーナー社長からの株式譲受とその後の体制構築、企業価値向上の実績。
                </p>
              </div>

              {/* 五次元経営コンサル実績 */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--5d-teal-dark)', borderBottom: '2px solid var(--5d-teal)', paddingBottom: '0.5rem' }}>
                  ②五次元経営®コンサルティング業務
                </h3>
                <p style={{ color: 'var(--lp-text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  風水と宿曜を活用したサービスにより、自宅を整え、人間関係を整え、自由な時間が増えて、売上が向上したクライアントなど多数。
                </p>

                {/* 実績カード */}
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {achievements.map((item, index) => (
                    <div key={index} style={{ padding: '1.25rem', background: 'white', borderRadius: '10px', border: '1px solid var(--lp-border)' }}>
                      <p style={{ fontWeight: 700, color: 'var(--5d-teal-dark)', marginBottom: '0.25rem' }}>{item.title}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--lp-text-muted)', marginBottom: '0.75rem' }}>【{item.subtitle}】</p>
                      <p style={{ color: 'var(--lp-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 経営理念 */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Philosophy</p>
              <h2 className={styles.sectionTitle}>経営理念　～ミッション・ヴィジョン・バリュー～</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              {/* ミッション */}
              <div style={{ marginBottom: '2.5rem', padding: '2rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)', textAlign: 'center' }}>
                <p style={{ color: 'var(--5d-teal)', fontWeight: 600, marginBottom: '0.5rem' }}>Mission</p>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--lp-text-primary)' }}>ミッション</h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--5d-teal-dark)', marginBottom: '1rem', lineHeight: 1.6 }}>
                  みんな、ごきげん そんな会社をあたりまえに
                </p>
                <p style={{ color: 'var(--lp-text-secondary)', lineHeight: 1.8 }}>
                  私たちは、経営者のイマココの心地よさを起点に、<br />
                  企業と社会をやさしく変革していきます。<br />
                  ひとりの在り方から、やさしさと豊かさが自然に広がっていく世界をめざして。
                </p>
              </div>

              {/* ヴィジョン */}
              <div style={{ marginBottom: '2.5rem', padding: '2rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)', textAlign: 'center' }}>
                <p style={{ color: 'var(--5d-teal)', fontWeight: 600, marginBottom: '0.5rem' }}>Vision</p>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--lp-text-primary)' }}>ヴィジョン</h3>
                <p style={{ color: 'var(--lp-text-secondary)', lineHeight: 1.8 }}>
                  2030年までに、300社の企業が「共鳴する経営」を実践し、<br />
                  10万人が本当の自分として、心地よく働ける世界をともに創る。
                </p>
              </div>

              {/* バリュー */}
              <div style={{ padding: '2rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <p style={{ color: 'var(--5d-teal)', fontWeight: 600, marginBottom: '0.5rem' }}>Value</p>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--lp-text-primary)' }}>バリュー</h3>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--5d-teal-dark)', marginBottom: '0.5rem' }}>
                    愛と感謝を根に持ち、イマココを心地よく生きる
                  </p>
                  <p style={{ color: 'var(--lp-text-secondary)' }}>
                    そして、そこから自然に立ち上がるものを大切にします。
                  </p>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {values.map((item, index) => (
                    <li key={index} style={{ padding: '0.75rem 0', borderTop: index > 0 ? '1px solid var(--lp-border)' : 'none', color: 'var(--lp-text-secondary)', paddingLeft: '1.5rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--5d-teal)' }}>・</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 代表メッセージ 望月貴生 */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>CEO Message</p>
              <h2 className={styles.sectionTitle}>代表メッセージ　望月 貴生</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 2 }}>
              {/* 写真 */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Image
                  src="/images/takao.png"
                  alt="望月 貴生"
                  width={280}
                  height={280}
                  style={{ borderRadius: '12px', objectFit: 'cover' }}
                />
              </div>

              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                はじめまして。五次元経営株式会社 代表取締役の望月貴生です。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                私はこれまで、みずほ銀行・上場企業・PEファンド・自分の立ち上げたアンプラグド株式会社で、100件を超えるM&A案件に携わってきました。160億円規模の案件をクロージングし、数字と戦略の世界で成果を重ねてきた経験があります。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                でも、ある時気づいたのです。<br />
                企業が成長しても、経営者の表情が曇っていく。<br />
                組織が拡大しても、そこで働く人たちの「ごきげん」が失われていく。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)', fontWeight: 600 }}>
                「なぜ、成功しているはずなのに、みんな心地よくないのか？」
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                その問いが、私を五次元経営®へと導きました。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)', fontWeight: 600, fontSize: '1.05rem' }}>
                経営者のイマココの心地よさ──それこそが、すべての始まりです。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                経営者が本当に心地よい状態でいるとき、その波紋は自然に組織全体に広がります。戦略を押し付けるのではなく、愛と感謝を根に持ち、今この瞬間を大切に生きる。すると不思議なことに、組織にやさしさが生まれ、成果も自然についてくるのです。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--5d-teal-dark)', fontWeight: 700, fontSize: '1.1rem' }}>
                私たちがめざすのは、「みんな、ごきげん。そんな会社をあたりまえに」する世界。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                2030年までに300社が「共鳴する経営」を実践し、10万人が本当の自分として心地よく働ける──そんな未来を、あなたと一緒に創っていきたいのです。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                五次元経営®は、あなたの「イマココ」に静かに寄り添い、そこから自然に立ち上がるものを大切にしていく伴走者です。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                結果を握らず、流れとともにあること。<br />
                自分と世界を、やさしいまなざしで見ること。
              </p>
              <p style={{ color: 'var(--lp-text-secondary)' }}>
                そんな経営の在り方を、ご一緒に探求できたら幸いです。
              </p>

              {/* 略歴 */}
              <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--lp-text-primary)' }}>【略歴】</h4>
                <dl style={{ margin: 0 }}>
                  {takaoCareer.map((item, index) => (
                    <div key={index} style={{ display: 'flex', padding: '0.5rem 0', borderBottom: index < takaoCareer.length - 1 ? '1px solid var(--lp-border)' : 'none', gap: '1rem', alignItems: 'flex-start' }}>
                      <dt style={{ width: '80px', fontWeight: 600, color: 'var(--lp-text-primary)', flexShrink: 0, fontSize: '0.9rem' }}>{item.year}</dt>
                      <dd style={{ margin: 0, color: 'var(--lp-text-secondary)', flex: 1, fontSize: '0.9rem', whiteSpace: 'pre-line' }}>{item.content}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* 代表メッセージ 望月美香 */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>CEO Message</p>
              <h2 className={styles.sectionTitle}>代表メッセージ　望月 美香</h2>
            </div>

            <div style={{ maxWidth: '720px', margin: '0 auto', lineHeight: 2 }}>
              {/* 写真 */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Image
                  src="/images/mika.png"
                  alt="望月 美香"
                  width={280}
                  height={280}
                  style={{ borderRadius: '12px', objectFit: 'cover' }}
                />
              </div>

              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                こんにちは。五次元経営株式会社 代表取締役の望月美香です。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                資生堂での11年間、そして30年以上の美容家としての経験。ヒーリングサロン『Airis.M』での数多くの女性たちとの出会い。そのすべてが、私に教えてくれたことがあります。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)', fontWeight: 600 }}>
                それは、どんなに外側が整っていても、「イマココ」が心地よくなければ、本当の豊かさは生まれないということ。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                売上が上がっても、評価されても、「なぜか満たされない」──そんな想いを抱える経営者や働く人たちに、私は何度も出会ってきました。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                でも、五次元経営という生き方に出会って、すべてが変わりました。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--5d-teal-dark)', fontWeight: 700, fontSize: '1.1rem' }}>
                愛と感謝を根に持ち、イマココを心地よく生きる。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                この経営理念は、単なる言葉ではありません。それは、私たち自身が日々実践し、体現している生き方そのものです。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                宿曜鑑定で本心に響くタイミングを見つけ、<br />
                風水で心と場を自然に整え、<br />
                1on1セッションで、ひらめいたことを軽やかに形にしていく。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                私たちがお届けするすべては、あなたの「イマココの心地よさ」から始まり、そこから自然に広がっていくやさしさと豊かさを大切にするためのものです。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                数字と論理の世界を歩んできた夫と、美と感性の世界を生きてきた私。<br />
                まったく違う道から、同じ答えにたどり着きました。
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--5d-teal-dark)', fontWeight: 700, fontSize: '1.05rem' }}>
                「みんな、ごきげん。そんな会社をあたりまえに。」
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                この世界を、あなたと一緒に創っていけることを、心から楽しみにしています。
              </p>
              <p style={{ color: 'var(--lp-text-secondary)' }}>
                ひとりの在り方から、やさしさと豊かさが自然に広がっていく──<br />
                その美しい循環の中で、お会いできることを願っています。
              </p>

              {/* 略歴 */}
              <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--lp-text-primary)' }}>【略歴】</h4>
                <dl style={{ margin: 0 }}>
                  {mikaCareer.map((item, index) => (
                    <div key={index} style={{ display: 'flex', padding: '0.5rem 0', borderBottom: index < mikaCareer.length - 1 ? '1px solid var(--lp-border)' : 'none', gap: '1rem', alignItems: 'flex-start' }}>
                      <dt style={{ width: '80px', fontWeight: 600, color: 'var(--lp-text-primary)', flexShrink: 0, fontSize: '0.9rem' }}>{item.year}</dt>
                      <dd style={{ margin: 0, color: 'var(--lp-text-secondary)', flex: 1, fontSize: '0.9rem' }}>{item.content}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* 会社概要 */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>Company Info</p>
              <h2 className={styles.sectionTitle}>会社概要</h2>
            </div>

            <div style={{ maxWidth: '700px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
              <dl style={{ margin: 0 }}>
                {companyInfo.map((item, index) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      padding: '1rem 0',
                      borderBottom: index < companyInfo.length - 1 ? '1px solid var(--lp-border)' : 'none',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}
                  >
                    <dt style={{ width: '120px', fontWeight: 600, color: 'var(--lp-text-primary)', flexShrink: 0 }}>{item.label}</dt>
                    <dd style={{ margin: 0, color: 'var(--lp-text-secondary)', flex: 1 }}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 沿革 */}
        <section className={`${styles.section} ${styles.testimonialsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTag}>History</p>
              <h2 className={styles.sectionTitle}>沿革</h2>
            </div>

            <div style={{ maxWidth: '700px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--lp-border)' }}>
              <dl style={{ margin: 0 }}>
                {history.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      padding: '1rem 0',
                      borderBottom: index < history.length - 1 ? '1px solid var(--lp-border)' : 'none',
                      gap: '1rem',
                      alignItems: 'flex-start'
                    }}
                  >
                    <dt style={{ width: '100px', fontWeight: 600, color: 'var(--lp-text-primary)', flexShrink: 0 }}>{item.year}</dt>
                    <dd style={{ margin: 0, color: 'var(--lp-text-secondary)', flex: 1 }}>{item.content}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
    </>
  );
}
