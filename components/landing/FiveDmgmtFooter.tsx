'use client';

/**
 * components/landing/5dmgmt/FiveDmgmtFooter.tsx
 *
 * 【Phase 30】五次元経営マーケティングサイト フッター
 */

import Link from 'next/link';
import styles from './LandingPage.module.css';

export default function FiveDmgmtFooter() {
  return (
    <footer className={`${styles.mainFooter} five-d-footer`}>
      <nav className={styles.footerNav}>
        <Link href="/company/profile">会社情報</Link>
        <Link href="/company/tokushoho">特定商取引法</Link>
        <Link href="/company/privacy">プライバシーポリシー</Link>
        <Link href="/company/contact">お問い合わせ</Link>
      </nav>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} 五次元経営株式会社
      </p>
    </footer>
  );
}
