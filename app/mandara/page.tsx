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
                  </div>
                )}

                {/* カード表示 */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: result.cards.length === 1 ? '1fr' : result.cards.length === 2 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2rem',
                  maxWidth: result.cards.length === 1 ? '400px' : '100%',
                  margin: '0 auto'
                }}>
                  {result.cards.map((card, index) => (
                    <div key={card.カード番号}>
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

                          {/* 象意 */}
                          {card.象意 && (
                            <div style={{ marginBottom: '1rem' }}>
                              <p style={{ color: 'var(--lp-primary)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>象意</p>
                              <p style={{ color: 'var(--lp-text-secondary)', margin: 0, fontSize: '0.875rem' }}>{card.象意}</p>
                            </div>
                          )}

                          {/* グループ・方位・時 */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                            {card.グループ && (
                              <div style={{ background: 'var(--lp-bg-secondary)', borderRadius: '8px', padding: '0.5rem', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--lp-text-muted)', margin: '0 0 0.25rem' }}>グループ</p>
                                <p style={{ margin: 0, fontWeight: '500' }}>{card.グループ}</p>
                              </div>
                            )}
                            {card.方位 && (
                              <div style={{ background: 'var(--lp-bg-secondary)', borderRadius: '8px', padding: '0.5rem', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--lp-text-muted)', margin: '0 0 0.25rem' }}>方位</p>
                                <p style={{ margin: 0, fontWeight: '500' }}>{card.方位}</p>
                              </div>
                            )}
                            {card.時 && (
                              <div style={{ background: 'var(--lp-bg-secondary)', borderRadius: '8px', padding: '0.5rem', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--lp-text-muted)', margin: '0 0 0.25rem' }}>時</p>
                                <p style={{ margin: 0, fontWeight: '500' }}>{card.時}</p>
                              </div>
                            )}
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
                              background: 'rgba(5, 150, 105, 0.05)',
                              borderRadius: '12px',
                              borderLeft: '4px solid #059669'
                            }}>
                              <p style={{ color: '#059669', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem' }}>
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
                              background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(79,70,229,0.08) 100%)',
                              borderRadius: '12px',
                              padding: '1rem',
                              borderLeft: '4px solid #7c3aed'
                            }}>
                              <p style={{ color: '#7c3aed', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                                ☆ アファメーション ☆
                              </p>
                              <div style={{ color: 'var(--lp-text-primary)', fontStyle: 'italic', lineHeight: '1.9', fontSize: '0.9375rem' }}>
                                {formatMessage(card.アファメーション)}
                              </div>
                            </div>
                          )}

                          {/* 属性情報 */}
                          {card.attributes && (
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--lp-border)' }}>
                              <span className={styles.serviceCardTagMuted}>{card.attributes.形}</span>
                              <span className={styles.serviceCardTagMuted}>{card.attributes.数}</span>
                              <span className={styles.serviceCardTagMuted}>{card.attributes.色}</span>
                              <span className={styles.serviceCardTagMuted}>{card.attributes.塗り}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* リセットボタン */}
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                  <button
                    onClick={resetDraw}
                    className={`${styles.btn} ${styles.btnSecondary}`}
                  >
                    もう一度引く
                  </button>
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
