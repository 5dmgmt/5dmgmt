'use client';

/**
 * components/contact/ContactForm.tsx
 *
 * 【Phase 30】汎用お問い合わせフォーム
 * - 5dmgmt.com 用
 */

import { useState } from 'react';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  inquiryTypes?: string[];
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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

      <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
        {isSubmitting ? '送信中...' : '送信する'}
      </button>

      {submitStatus === 'error' && (
        <p className={styles.errorMessage}>
          エラーが発生しました。お手数ですが、直接メールでお問い合わせください。
        </p>
      )}
    </form>
  );
}
