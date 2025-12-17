/**
 * app/company/privacy/page.tsx
 *
 * プライバシーポリシーページ
 */

import Link from 'next/link';
import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: 'プライバシーポリシー | 五次元経営',
  description: '五次元経営株式会社のプライバシーポリシー。個人情報の取り扱いについて。',
};

export default function PrivacyPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero} style={{ paddingBottom: '2rem' }}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>プライバシーポリシー</h1>
          </div>
        </section>

        {/* Content Section */}
        <section className={styles.section} style={{ paddingTop: '1rem' }}>
          <div className={styles.container}>
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid var(--lp-border)',
              lineHeight: 1.8,
            }}>
              <p style={{ marginBottom: '2rem', color: 'var(--lp-text-secondary)' }}>
                五次元経営株式会社（以下「当社」といいます）は、お客様の個人情報の保護を重要な責務と認識し、以下のプライバシーポリシーに基づき、適切な取り扱いと保護に努めます。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--lp-primary)' }}>
                第1条（個人情報の定義）
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                本ポリシーにおいて「個人情報」とは、個人情報保護法に定める個人情報を指し、生存する個人に関する情報であって、氏名、生年月日、住所、電話番号、メールアドレス等により特定の個人を識別できる情報をいいます。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--lp-primary)' }}>
                第2条（個人情報の収集方法）
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                当社は、お客様がサービスをご利用になる際、お問い合わせをされる際、その他業務上必要な範囲において、適法かつ公正な手段により個人情報を収集します。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--lp-primary)' }}>
                第3条（個人情報の利用目的）
              </h2>
              <p style={{ marginBottom: '0.5rem', color: 'var(--lp-text-secondary)' }}>
                当社は、収集した個人情報を以下の目的で利用します。
              </p>
              <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                <li>当社サービスの提供・運営のため</li>
                <li>お問い合わせに対する回答のため</li>
                <li>セミナー・イベント等のご案内のため</li>
                <li>サービス改善のための調査・分析のため</li>
                <li>新サービスの開発・提案のため</li>
                <li>利用規約に違反した利用者への対応のため</li>
                <li>法令に基づく対応のため</li>
                <li>その他、上記利用目的に付随する目的のため</li>
              </ul>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--lp-primary)' }}>
                第4条（利用目的の変更）
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                当社は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。利用目的の変更を行った場合には、変更後の目的について、当社所定の方法により、お客様に通知し、または本ウェブサイト上に公表するものとします。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--lp-primary)' }}>
                第5条（個人情報の第三者提供）
              </h2>
              <p style={{ marginBottom: '0.5rem', color: 'var(--lp-text-secondary)' }}>
                当社は、以下の場合を除き、あらかじめお客様の同意を得ることなく、第三者に個人情報を提供することはありません。
              </p>
              <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
              </ul>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--lp-primary)' }}>
                第6条（個人情報の安全管理）
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                当社は、個人情報への不正アクセス、紛失、破壊、改ざん、漏洩等を防止するため、必要かつ適切なセキュリティ対策を講じます。また、個人情報を取り扱う従業員に対し、必要かつ適切な監督を行います。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--lp-primary)' }}>
                第7条（個人情報の開示・訂正・削除）
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                お客様ご本人から個人情報の開示、訂正、追加、削除、利用停止等のご請求があった場合、ご本人であることを確認の上、法令に従い適切に対応いたします。ご請求の際は、下記お問い合わせ窓口までご連絡ください。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--lp-primary)' }}>
                第8条（Cookieの使用について）
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                当社のウェブサイトでは、サービス向上およびお客様の利便性向上のためCookieを使用することがあります。Cookieはブラウザの設定により無効にすることができますが、一部のサービスがご利用いただけなくなる場合があります。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--lp-primary)' }}>
                第9条（アクセス解析ツールについて）
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                当社のウェブサイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。Googleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--lp-primary)' }}>
                第10条（プライバシーポリシーの変更）
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                当社は、法令の改正、サービスの変更等に応じて、本ポリシーを変更することがあります。変更後のポリシーは、当社ウェブサイトに掲載した時点から効力を生じるものとします。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--lp-primary)' }}>
                第11条（お問い合わせ窓口）
              </h2>
              <p style={{ marginBottom: '0.5rem', color: 'var(--lp-text-secondary)' }}>
                本ポリシーに関するお問い合わせ、個人情報の開示等のご請求は、下記までご連絡ください。
              </p>
              <div style={{ padding: '1rem', background: 'var(--lp-bg)', borderRadius: '8px', marginTop: '1rem' }}>
                <p style={{ margin: 0, color: 'var(--lp-text-secondary)' }}>
                  五次元経営株式会社<br />
                  〒251-0035 神奈川県藤沢市片瀬海岸1-12-16-1003<br />
                  電話番号: 0466-52-7722<br />
                  お問い合わせフォーム: <Link href="/company/contact" style={{ color: 'var(--lp-primary)' }}>/company/contact</Link>
                </p>
              </div>

              <p style={{ marginTop: '2rem', textAlign: 'right', color: 'var(--lp-text-muted)', fontSize: '0.875rem' }}>
                制定日: 2024年1月1日<br />
                最終改定日: 2025年1月1日
              </p>
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />
    </div>
  );
}
