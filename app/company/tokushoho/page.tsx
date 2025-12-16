/**
 * app/5dmgmt/company/tokushoho/page.tsx
 *
 * 【Phase 30】特定商取引法に基づく表記ページ
 */

import FiveDmgmtHeader from '@/components/landing/FiveDmgmtHeader';
import FiveDmgmtFooter from '@/components/landing/FiveDmgmtFooter';
import styles from '@/components/landing/LandingPage.module.css';

export const revalidate = 3600;

export const metadata = {
  title: '特定商取引法に基づく表記 | 五次元経営',
  description: '五次元経営株式会社の特定商取引法に基づく表示事項。',
};

const tokushohoInfo = [
  { label: '販売業者', value: '五次元経営株式会社' },
  { label: '運営統括責任者', value: '代表取締役（お問い合わせください）' },
  { label: '所在地', value: '東京都（詳細はお問い合わせください）' },
  { label: '電話番号', value: 'お問い合わせフォームよりご連絡ください' },
  { label: 'メールアドレス', value: 'お問い合わせフォームよりご連絡ください' },
  { label: '販売URL', value: 'https://www.5dmgmt.com/' },
  { label: '販売価格', value: '各サービスページに記載' },
  { label: '商品代金以外の必要料金', value: '銀行振込の場合は振込手数料' },
  { label: 'お支払方法', value: 'クレジットカード、銀行振込' },
  { label: 'お支払時期', value: 'クレジットカード：申込時 / 銀行振込：申込後7日以内' },
  { label: '商品の引渡し時期', value: 'サービスにより異なります。詳細はお問い合わせください' },
  { label: '返品・キャンセル', value: 'サービスの性質上、提供開始後の返金はお受けできません。開始前のキャンセルについてはお問い合わせください' },
];

export default function TokushohoPage() {
  return (
    <div className={`${styles.landingPage} five-d-page`}>
      <FiveDmgmtHeader />

      <main>
        {/* Hero Section */}
        <section className={styles.hero} style={{ paddingBottom: '2rem' }}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>特定商取引法に基づく表記</h1>
          </div>
        </section>

        {/* Tokushoho Info Section */}
        <section className={styles.section} style={{ paddingTop: '1rem' }}>
          <div className={styles.container}>
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid var(--lp-border)'
            }}>
              <dl style={{ margin: 0 }}>
                {tokushohoInfo.map((item, index) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      padding: '1rem 0',
                      borderBottom: index < tokushohoInfo.length - 1 ? '1px solid var(--lp-border)' : 'none',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}
                  >
                    <dt style={{
                      width: '200px',
                      fontWeight: 600,
                      color: 'var(--lp-text-primary)',
                      flexShrink: 0
                    }}>
                      {item.label}
                    </dt>
                    <dd style={{
                      margin: 0,
                      color: 'var(--lp-text-secondary)',
                      flex: 1,
                      lineHeight: 1.6
                    }}>
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <FiveDmgmtFooter />
    </div>
  );
}
