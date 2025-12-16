/**
 * app/company/privacy/page.tsx
 *
 * プライバシーポリシーページ
 */

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
                五次元経営株式会社（以下「当社」）は、お客様の個人情報の保護を重要な責務と認識し、以下のプライバシーポリシーに基づき、適切な取り扱いと保護に努めます。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--5d-primary)' }}>
                1. 個人情報の定義
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                本ポリシーにおいて「個人情報」とは、氏名、住所、電話番号、メールアドレス等、特定の個人を識別できる情報をいいます。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--5d-primary)' }}>
                2. 個人情報の収集
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                当社は、サービスの提供、お問い合わせへの対応、その他業務上必要な範囲において、適法かつ公正な手段により個人情報を収集します。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--5d-primary)' }}>
                3. 個人情報の利用目的
              </h2>
              <p style={{ marginBottom: '0.5rem', color: 'var(--lp-text-secondary)' }}>
                当社は、収集した個人情報を以下の目的で利用します：
              </p>
              <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                <li>サービスの提供・運営</li>
                <li>お問い合わせへの対応</li>
                <li>セミナー・イベント等のご案内</li>
                <li>サービス改善のための分析</li>
                <li>法令に基づく対応</li>
              </ul>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--5d-primary)' }}>
                4. 個人情報の第三者提供
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                当社は、法令に定める場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--5d-primary)' }}>
                5. 個人情報の管理
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                当社は、個人情報への不正アクセス、紛失、破壊、改ざん、漏洩等を防止するため、適切なセキュリティ対策を講じます。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--5d-primary)' }}>
                6. 個人情報の開示・訂正・削除
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                お客様ご本人から個人情報の開示、訂正、削除等のご請求があった場合、本人確認の上、適切に対応いたします。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--5d-primary)' }}>
                7. Cookieの使用
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                当社のウェブサイトでは、サービス向上のためCookieを使用することがあります。Cookieはブラウザの設定により無効にすることができます。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--5d-primary)' }}>
                8. プライバシーポリシーの変更
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--lp-text-secondary)' }}>
                当社は、法令の改正やサービスの変更等に応じて、本ポリシーを変更することがあります。変更後のポリシーは、当社ウェブサイトに掲載した時点から効力を生じます。
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--5d-primary)' }}>
                9. お問い合わせ
              </h2>
              <p style={{ marginBottom: '0.5rem', color: 'var(--lp-text-secondary)' }}>
                個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。
              </p>
              <p style={{ color: 'var(--lp-text-secondary)' }}>
                五次元経営株式会社<br />
                お問い合わせフォーム: <a href="/company/contact" style={{ color: 'var(--5d-accent)' }}>/company/contact</a>
              </p>

              <p style={{ marginTop: '2rem', textAlign: 'right', color: 'var(--lp-text-muted)', fontSize: '0.875rem' }}>
                制定日: 2024年1月1日<br />
                最終改定日: 2024年12月1日
              </p>
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />
    </div>
  );
}
