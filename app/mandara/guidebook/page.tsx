'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/components/landing/LandingPage.module.css';

interface Card {
  カード番号: number;
  位置: string;
  日本語キーワード: string;
  読み: string;
  英語キーワード: string;
  グループ: string;
  象意: string;
  色: string;
  方位: string;
  時: string;
  カードからのメッセージ: string;
  キセキのレシピ: string;
  アファメーション: string;
}

export default function GuidebookPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [filterGroup, setFilterGroup] = useState<string>('all');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch('/api/mandara?all=true');
        const data = await res.json();
        if (data.cards) {
          setCards(data.cards);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  // カード画像パスを取得
  const getCardImagePath = (cardNum: number) => {
    const num = String(cardNum).padStart(2, '0');
    return `/mandara-cards/card-${num}.jpg`;
  };

  // テキストを行ごとに分割して表示
  const formatMessage = (text: string) => {
    if (!text) return null;
    const lines = text.split(/\s*\|\s*/);
    return lines.map((line, i) => (
      <span key={i} style={{ display: 'block', marginBottom: i < lines.length - 1 ? '0.75rem' : 0 }}>
        {line.trim()}
      </span>
    ));
  };

  // グループでフィルタリング
  const filteredCards = filterGroup === 'all'
    ? cards
    : cards.filter(c => c.位置.startsWith(filterGroup));

  // 位置からグループを抽出（①、②など）
  const groups = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'];

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} style={{ minHeight: 'auto', padding: '4rem 0 3rem' }}>
        <div className={styles.container}>
          <Link
            href="/mandara"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--lp-primary)',
              marginBottom: '1.5rem',
              fontSize: '0.9375rem'
            }}
          >
            ← オラクルカードに戻る
          </Link>
          <h1 className={styles.heroTitle} style={{ fontSize: '2rem' }}>
            ゆるゆるマンダラ®<br />
            カードガイドブック
          </h1>
          <p className={styles.heroLead} style={{ fontSize: '1rem' }}>
            81枚のカードの意味と使い方を解説します。<br />
            カードをタップして詳細を表示できます。
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section style={{ background: 'var(--lp-bg-section)', padding: '1.5rem 0' }}>
        <div className={styles.container}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              onClick={() => setFilterGroup('all')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                background: filterGroup === 'all' ? 'var(--lp-primary)' : 'white',
                color: filterGroup === 'all' ? 'white' : 'var(--lp-text-secondary)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              全て (81)
            </button>
            {groups.map((group, idx) => (
              <button
                key={group}
                onClick={() => setFilterGroup(group)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: filterGroup === group ? 'var(--lp-primary)' : 'white',
                  color: filterGroup === group ? 'white' : 'var(--lp-text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                {group}の部屋 ({idx + 1}〜{(idx + 1) * 9})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div className="loading-spinner" />
              <p style={{ color: 'var(--lp-text-muted)', marginTop: '1rem' }}>
                81枚のカードを読み込んでいます...
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '1rem'
            }}>
              {filteredCards.map((card) => (
                <div
                  key={card.カード番号}
                  onClick={() => setSelectedCard(card)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    background: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,184,196,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                  }}
                >
                  <Image
                    src={getCardImagePath(card.カード番号)}
                    alt={`カード${card.カード番号}: ${card.日本語キーワード}`}
                    width={200}
                    height={200}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                    <p style={{
                      fontSize: '0.8125rem',
                      fontWeight: '700',
                      color: 'var(--lp-primary)',
                      margin: 0
                    }}>
                      {card.日本語キーワード}
                    </p>
                    <p style={{
                      fontSize: '0.6875rem',
                      color: 'var(--lp-text-muted)',
                      margin: '0.25rem 0 0'
                    }}>
                      {card.位置}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Card Detail Modal */}
      {selectedCard && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setSelectedCard(null)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              position: 'sticky',
              top: 0,
              background: 'white',
              padding: '1rem',
              borderBottom: '1px solid var(--lp-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 10
            }}>
              <div>
                <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--lp-primary)', margin: 0 }}>
                  {selectedCard.日本語キーワード}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--lp-text-muted)', margin: '0.25rem 0 0' }}>
                  {selectedCard.読み} / {selectedCard.英語キーワード}
                </p>
              </div>
              <button
                onClick={() => setSelectedCard(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--lp-text-muted)',
                  padding: '0.5rem'
                }}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem' }}>
              {/* Card Image */}
              <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                maxWidth: '300px',
                margin: '0 auto 1.5rem'
              }}>
                <Image
                  src={getCardImagePath(selectedCard.カード番号)}
                  alt={`カード${selectedCard.カード番号}`}
                  width={300}
                  height={300}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              {/* Position Info */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  background: 'rgba(0,184,196,0.1)',
                  color: 'var(--lp-primary)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.8125rem',
                  fontWeight: '600'
                }}>
                  {selectedCard.位置}
                </span>
              </div>

              {/* カードからのメッセージ */}
              {selectedCard.カードからのメッセージ && (
                <div style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(0, 184, 196, 0.05)',
                  borderRadius: '12px',
                  borderLeft: '4px solid var(--lp-primary)'
                }}>
                  <p style={{ color: 'var(--lp-primary)', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                    ☆ カードからのメッセージ ☆
                  </p>
                  <div style={{ color: 'var(--lp-text-secondary)', lineHeight: '1.9', fontSize: '0.9375rem' }}>
                    {formatMessage(selectedCard.カードからのメッセージ)}
                  </div>
                </div>
              )}

              {/* キセキのレシピ */}
              {selectedCard.キセキのレシピ && (
                <div style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(0, 184, 196, 0.08)',
                  borderRadius: '12px',
                  borderLeft: '4px solid #00a0aa'
                }}>
                  <p style={{ color: '#00a0aa', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                    ☆ キセキのレシピ ☆
                  </p>
                  <div style={{ color: 'var(--lp-text-secondary)', lineHeight: '1.9', fontSize: '0.9375rem' }}>
                    {formatMessage(selectedCard.キセキのレシピ)}
                  </div>
                </div>
              )}

              {/* アファメーション */}
              {selectedCard.アファメーション && (
                <div style={{
                  background: 'rgba(0, 184, 196, 0.12)',
                  borderRadius: '12px',
                  padding: '1rem',
                  borderLeft: '4px solid #008891'
                }}>
                  <p style={{ color: '#008891', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                    ☆ アファメーション ☆
                  </p>
                  <div style={{ color: 'var(--lp-text-primary)', fontStyle: 'italic', lineHeight: '1.9', fontSize: '0.9375rem' }}>
                    {formatMessage(selectedCard.アファメーション)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
