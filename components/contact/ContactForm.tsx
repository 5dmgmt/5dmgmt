'use client';

/**
 * components/contact/ContactForm.tsx
 *
 * 【Phase 30】汎用お問い合わせフォーム
 * - 5dmgmt.com 用
 * - hCaptcha対応（環境変数 NEXT_PUBLIC_HCAPTCHA_SITE_KEY で設定）
 */

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  inquiryTypes?: string[];
}

// hCaptcha サイトキー（環境変数から取得）
const HCAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

declare global {
  interface Window {
    hcaptcha?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}

export default function ContactForm({ inquiryTypes = [] }: ContactFormProps) {
  const [formData, setFormData] = useState({
    inquiryType: inquiryTypes[0] || '',
    companyName: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
  });
  const [hcaptchaToken, setHcaptchaToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hcaptchaError, setHcaptchaError] = useState('');
  const hcaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // hCaptcha ウィジェット初期化
  useEffect(() => {
    if (!HCAPTCHA_SITE_KEY || !hcaptchaRef.current || widgetIdRef.current) return;

    const initHcaptcha = () => {
      if (window.hcaptcha && hcaptchaRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.hcaptcha.render(hcaptchaRef.current, {
          sitekey: HCAPTCHA_SITE_KEY,
          callback: (token: string) => {
            setHcaptchaToken(token);
            setHcaptchaError('');
          },
          'expired-callback': () => {
            setHcaptchaToken('');
          },
          'error-callback': () => {
            setHcaptchaError('認証エラーが発生しました。再度お試しください。');
          },
        });
      }
    };

    // hcaptchaがロードされるまで待機
    if (window.hcaptcha) {
      initHcaptcha();
    } else {
      window.addEventListener('hcaptchaLoaded', initHcaptcha);
      return () => window.removeEventListener('hcaptchaLoaded', initHcaptcha);
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setHcaptchaError('');

    // hCaptchaが有効な場合、トークンを検証
    if (HCAPTCHA_SITE_KEY && !hcaptchaToken) {
      setHcaptchaError('「私はロボットではありません」にチェックを入れてください');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          hcaptchaToken: HCAPTCHA_SITE_KEY ? hcaptchaToken : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      setSubmitStatus('success');
      setFormData({
        inquiryType: inquiryTypes[0] || '',
        companyName: '',
        name: '',
        email: '',
        phone: '',
        message: '',
        honeypot: '',
      });
      setHcaptchaToken('');

      // hCaptchaリセット
      if (widgetIdRef.current && window.hcaptcha) {
        window.hcaptcha.reset(widgetIdRef.current);
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className={styles.thankYou}>
        <div className={styles.thankYouIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className={styles.thankYouTitle}>お問い合わせありがとうございます</h2>
        <p className={styles.thankYouMessage}>
          お問い合わせを受け付けました。<br />
          2営業日以内にご返信いたします。
        </p>
        <button onClick={() => setSubmitStatus('idle')} className={styles.backButton}>
          フォームに戻る
        </button>
      </div>
    );
  }

  return (
    <>
      {/* hCaptcha スクリプト */}
      {HCAPTCHA_SITE_KEY && (
        <Script
          src="https://js.hcaptcha.com/1/api.js?render=explicit"
          strategy="lazyOnload"
          onLoad={() => {
            window.dispatchEvent(new Event('hcaptchaLoaded'));
          }}
        />
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        {inquiryTypes.length > 0 && (
          <div className={styles.formGroup}>
            <label htmlFor="inquiryType" className={styles.label}>
              お問い合わせ種別 <span className={styles.required}>*</span>
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleInputChange}
              required
              className={styles.select}
            >
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="companyName" className={styles.label}>
              会社名
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="株式会社〇〇"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              お名前 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="山田 太郎"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              メールアドレス <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="example@example.com"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              電話番号
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="090-1234-5678"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            お問い合わせ内容 <span className={styles.required}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            placeholder="お問い合わせ内容をご記入ください"
            rows={6}
            className={styles.textarea}
          />
        </div>

        {/* ハニーポット（ボット対策・非表示） */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleInputChange}
          style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* hCaptcha ウィジェット */}
        {HCAPTCHA_SITE_KEY && (
          <div className={styles.formGroup}>
            <div ref={hcaptchaRef} style={{ marginBottom: '0.5rem' }} />
            {hcaptchaError && (
              <p className={styles.errorMessage} style={{ marginTop: '0.5rem' }}>
                {hcaptchaError}
              </p>
            )}
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
          {isSubmitting ? '送信中...' : '送信する'}
        </button>

        {submitStatus === 'error' && (
          <p className={styles.errorMessage}>
            エラーが発生しました。時間をおいて再度お試しください。お急ぎの場合はお電話（0466-52-7722）ください。
          </p>
        )}
      </form>
    </>
  );
}
