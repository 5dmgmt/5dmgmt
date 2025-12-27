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

// 曼荼羅の配置順序（9×9）
const MANDALA_ORDER = [
  [51, 6, 69, 46, 1, 64, 53, 8, 71],
  [60, 42, 24, 55, 37, 19, 44, 26, 62],
  [15, 78, 33, 10, 73, 28, 17, 80, 35],
  [52, 7, 70, 50, 5, 68, 48, 3, 66],
  [61, 43, 25, 59, 41, 23, 57, 39, 21],
  [16, 79, 34, 14, 77, 32, 12, 75, 30],
  [47, 2, 65, 54, 9, 72, 49, 4, 67],
  [56, 38, 20, 63, 45, 27, 58, 40, 22],
  [11, 74, 29, 18, 81, 36, 13, 76, 31]
];

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

  // カード番号からカードを取得
  const getCardByNumber = (num: number) => {
    return cards.find(c => Number(c.カード番号) === num);
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

      {/* Mandala Grid Section */}
      <section style={{ background: '#1a1a4e', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            color: 'white',
            textAlign: 'center',
            fontSize: '1.25rem',
            marginBottom: '1.5rem',
            fontWeight: '600'
          }}>
            ゆるゆるマンダラ® 81枚の配置
          </h2>
          {!loading && cards.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(9, 1fr)',
              gap: '2px',
              aspectRatio: '1 / 1'
            }}>
              {MANDALA_ORDER.flat().map((cardNum) => {
                const card = getCardByNumber(cardNum);
                return (
                  <div
                    key={cardNum}
                    onClick={() => card && setSelectedCard(card)}
                    style={{
                      cursor: 'pointer',
                      position: 'relative',
                      aspectRatio: '1 / 1',
                      overflow: 'hidden',
                      borderRadius: '4px'
                    }}
                  >
                    <Image
                      src={getCardImagePath(cardNum)}
                      alt={card ? `${cardNum}: ${card.日本語キーワード}` : `カード${cardNum}`}
                      fill
                      sizes="(max-width: 600px) 11vw, 66px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {loading && (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div className="loading-spinner" />
              <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', fontSize: '0.875rem' }}>
                読み込み中...
              </p>
            </div>
          )}
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
            fontSize: '0.75rem',
            marginTop: '1rem'
          }}>
            カードをタップして詳細を表示
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
                    borderRadius: '16px',
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
                  <div style={{ borderRadius: '16px 16px 0 0', overflow: 'hidden' }}>
                    <Image
                      src={getCardImagePath(card.カード番号)}
                      alt={`カード${card.カード番号}: ${card.日本語キーワード}`}
                      width={200}
                      height={200}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '0.75rem', textAlign: 'center', borderRadius: '0 0 16px 16px' }}>
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
