'use client';

/**
 * components/landing/5dmgmt/FiveDmgmtHeader.tsx
 *
 * 【Phase 30】五次元経営マーケティングサイト ヘッダー
 * - 元サイトの色調（藍色ヘッダー）
 * - モバイル用ハンバーガーメニュー対応
 */

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './LandingPage.module.css';

const navItems = [
  { href: '/unki', label: '運気を知る' },
  { href: '/taiken', label: '体験する' },
  { href: '/background', label: '背景を読む' },
  { href: '/tools', label: '整った後の道具' },
  { href: '/company', label: '会社について' },
];

export default function FiveDmgmtHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector(`.${styles.mainHeader}`);
    const handleScroll = () => {
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add(styles.isScrolled);
        } else {
          header.classList.remove(styles.isScrolled);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // メニューが開いているときはスクロールを無効化
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.mainHeader} five-d-header`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="五次元経営"
            width={180}
            height={40}
            className="five-d-logo-img"
            priority
          />
        </Link>
        <nav className={styles.mainNav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/unki/shindan" className="five-d-nav-btn">
            運気診断
          </Link>
        </nav>

        {/* モバイル用ハンバーガーボタン */}
        <button
          className={`${styles.menuBtn} ${isMenuOpen ? styles.isOpen : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* モバイルナビゲーション */}
        <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.isOpen : ''}`}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={handleNavClick}>
              {item.label}
            </Link>
          ))}
          <Link
            href="/unki/shindan"
            className={`${styles.btn} ${styles.btnPrimary} five-d-nav-btn`}
            onClick={handleNavClick}
          >
            運気診断
          </Link>
        </nav>
      </div>
    </header>
  );
}
