'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/components/landing/LandingPage.module.css';

interface CardAttributes {
  形: string;
  数: string;
  色: string;
  塗り: string;
}

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
  attributes?: CardAttributes;
}

interface DrawResult {
  mode: string;
  cards: Card[];
  description?: string;
  rule?: string;
  success: boolean;
}

export default function MandaraOraclePage() {
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [result, setResult] = useState<DrawResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const drawCards = async (mode: number) => {
    setLoading(true);
    setSelectedMode(mode);
    setExpandedCard(null);

    try {
      const res = await fetch(`/api/mandara?mode=${mode}`);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Error drawing cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetDraw = () => {
    setSelectedMode(null);
    setResult(null);
    setExpandedCard(null);
  };

  // カード画像パスを取得
  const getCardImagePath = (cardNum: number) => {
    const num = String(cardNum).padStart(2, '0');
    return `/mandara-cards/card-${num}.jpg`;
  };

  // テキストを行ごとに分割して表示（|で区切られたテキストを改行表示）
  const formatMessage = (text: string) => {
    const lines = text.split(/\s*\|\s*/);
    return lines.map((line, i) => (
      <span key={i} style={{ display: 'block', marginBottom: i < lines.length - 1 ? '0.75rem' : 0 }}>
        {line.trim()}
      </span>
    ));
  };

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>
            ゆるゆるマンダラ®<br />
            オラクルカード
          </h1>
          <p className={styles.heroLead}>
            思考で答えを出そうとすると、堂々巡りになります。<br />
            カードをガイドにして、ハートに意識を向ける。<br />
            81枚のカードが、思考から離れハートで選択するサポートをします。
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            {/* モード選択 */}
            {!selectedMode && (
              <>
                <div className={styles.sectionHeader}>
                  <p className={styles.sectionTag}>SELECT</p>
                  <h2 className={styles.sectionTitle}>カードを引く枚数を選んでください</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                  <button
                    onClick={() => drawCards(1)}
                    className={styles.serviceCard}
                    style={{ cursor: 'pointer', border: 'none', textAlign: 'left' }}
                  >
                    <div className={styles.serviceCardTagGroup}>
                      <span className={styles.serviceCardTag}>1枚引き</span>
                    </div>
                    <p className={styles.serviceCardQuestion}>今のあなたへ</p>
                    <p className={styles.serviceCardDescription}>
                      今この瞬間に必要なメッセージを1枚のカードから受け取ります。
                    </p>
                  </button>

                  <button
                    onClick={() => drawCards(2)}
                    className={styles.serviceCard}
                    style={{ cursor: 'pointer', border: 'none', textAlign: 'left' }}
                  >
                    <div className={styles.serviceCardTagGroup}>
                      <span className={styles.serviceCardTag}>2枚引き</span>
                    </div>
                    <p className={styles.serviceCardQuestion}>二つの選択肢</p>
                    <p className={styles.serviceCardDescription}>
                      二つの選択肢に迷ったとき、それぞれのカードがヒントを与えます。
                    </p>
                  </button>

                  <button
                    onClick={() => drawCards(3)}
                    className={styles.serviceCard}
                    style={{ cursor: 'pointer', border: 'none', textAlign: 'left' }}
                  >
                    <div className={styles.serviceCardTagGroup}>
                      <span className={styles.serviceCardTag}>3枚引き</span>
                    </div>
                    <p className={styles.serviceCardQuestion}>過去・現在・未来</p>
                    <p className={styles.serviceCardDescription}>
                      3つの因果を知りたいとき。過去・現在・未来の流れを読み解きます。
                    </p>
                  </button>
                </div>
              </>
            )}

            {/* ローディング */}
            {loading && (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <div className="loading-spinner" />
                <p style={{ color: 'var(--lp-text-muted)' }}>カードを引いています...</p>
              </div>
            )}

            {/* 結果表示 */}
            {result && !loading && (
              <div>
                {/* 3枚引きの説明 */}
                {result.mode === 'trio' && (
                  <div className={styles.infoBox} style={{ marginBottom: '2rem', marginTop: 0 }}>
                    <p className={styles.infoBoxText} style={{ margin: 0 }}>
                      <strong style={{ color: 'var(--lp-primary)' }}>{result.description}</strong><br />
                      <span style={{ fontSize: '0.875rem' }}>{result.rule}</span>
                    </p>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.8125rem', color: 'var(--lp-text-muted)' }}>
                      ← 横にスワイプして全てのカードを見る →
                    </p>
                  </div>
                )}

                {/* カード表示 */}
                <div
                  className="horizontal-scroll"
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    justifyContent: result.cards.length === 1 ? 'center' : 'flex-start',
                    paddingBottom: '1rem',
                    margin: '0 -1rem',
                    padding: '0 1rem 1rem'
                  }}
                >
                  {result.cards.map((card, index) => (
                    <div
                      key={card.カード番号}
                      style={{
                        flex: result.cards.length === 1 ? '0 0 100%' : result.cards.length === 2 ? '0 0 calc(50% - 0.75rem)' : '0 0 280px',
                        maxWidth: result.cards.length === 1 ? '400px' : result.cards.length === 2 ? 'calc(50% - 0.75rem)' : '280px',
                        scrollSnapAlign: 'start'
                      }}
                    >
                      {/* カード画像 */}
                      <div
                        onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                        style={{
                          cursor: 'pointer',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          border: '1px solid var(--lp-border)',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,184,196,0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                        }}
                      >
                        <Image
                          src={getCardImagePath(card.カード番号)}
                          alt={`カード${card.カード番号}: ${card.日本語キーワード}`}
                          width={400}
                          height={400}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                          priority
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                          padding: '2rem 1rem 1rem',
                          color: 'white',
                          textAlign: 'center'
                        }}>
                          <p style={{ margin: 0, fontSize: '0.875rem' }}>
                            タップして詳細を表示
                          </p>
                        </div>
                      </div>

                      {/* カード詳細（展開時） */}
                      {expandedCard === index && (
                        <div className={`${styles.serviceCard} card-fade-in`} style={{ marginTop: '1rem' }}>
                          {/* キーワード */}
                          <div style={{ textAlign: 'center', borderBottom: '1px solid var(--lp-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--lp-primary)', margin: '0 0 0.25rem' }}>
                              {card.日本語キーワード}
                            </p>
                            <p style={{ color: 'var(--lp-text-muted)', margin: 0, fontSize: '0.875rem' }}>
                              {card.読み} / {card.英語キーワード}
                            </p>
                          </div>

                          {/* カードからのメッセージ */}
                          {card.カードからのメッセージ && (
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
                                {formatMessage(card.カードからのメッセージ)}
                              </div>
                            </div>
                          )}

                          {/* キセキのレシピ */}
                          {card.キセキのレシピ && (
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
                                {formatMessage(card.キセキのレシピ)}
                              </div>
                            </div>
                          )}

                          {/* アファメーション */}
                          {card.アファメーション && (
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
                                {formatMessage(card.アファメーション)}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* ボタン群 */}
                <div style={{ textAlign: 'center', marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={resetDraw}
                    className={`${styles.btn} ${styles.btnSecondary}`}
                  >
                    もう一度引く
                  </button>
                  <a
                    href="/mandara/guidebook"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    style={{ textDecoration: 'none' }}
                  >
                    ガイドブックを読む
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer Message */}
      <section className={`${styles.section} ${styles.testimonialsSection}`}>
        <div className={styles.container}>
          <div className={styles.questionSection}>
            <p className={styles.questionText}>
              思考を止めて、ハートで感じる。<br />
              81枚のカードは、あなたの内なる声を引き出すガイドです。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
