'use client';

import { useState } from 'react';
import Image from 'next/image';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
            ゆるゆるマンダラ®
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-300">オラクルカード</h2>
        </div>

        {/* モード選択 */}
        {!selectedMode && (
          <div className="space-y-6">
            <p className="text-center text-slate-400 mb-8">
              カードを引く枚数を選んでください
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => drawCards(1)}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-6xl mb-4">🃏</div>
                <div className="text-xl font-bold mb-2">1枚引き</div>
                <div className="text-sm text-slate-400">今のあなたへのメッセージ</div>
              </button>

              <button
                onClick={() => drawCards(2)}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-6xl mb-4">🃏🃏</div>
                <div className="text-xl font-bold mb-2">2枚引き</div>
                <div className="text-sm text-slate-400">過去と未来のメッセージ</div>
              </button>

              <button
                onClick={() => drawCards(3)}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-6xl mb-4">🃏🃏🃏</div>
                <div className="text-xl font-bold mb-2">3枚引き</div>
                <div className="text-sm text-slate-400">SETの法則で導かれる運命</div>
              </button>
            </div>
          </div>
        )}

        {/* ローディング */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent"></div>
            <p className="mt-4 text-slate-400">カードを引いています...</p>
          </div>
        )}

        {/* 結果表示 */}
        {result && !loading && (
          <div className="space-y-8">
            {/* 3枚引きの説明 */}
            {result.mode === 'trio' && (
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <p className="text-amber-300 text-sm">{result.description}</p>
                <p className="text-slate-400 text-xs mt-1">{result.rule}</p>
              </div>
            )}

            {/* カード表示 */}
            <div className={`grid gap-6 ${
              result.cards.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              result.cards.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' :
              'grid-cols-1 md:grid-cols-3'
            }`}>
              {result.cards.map((card, index) => (
                <div key={card.カード番号} className="space-y-4">
                  {/* カード画像 */}
                  <div
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    className="relative cursor-pointer rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-amber-500/20"
                  >
                    <Image
                      src={getCardImagePath(card.カード番号)}
                      alt={`カード${card.カード番号}: ${card.日本語キーワード}`}
                      width={400}
                      height={400}
                      className="w-full h-auto"
                      priority
                    />
                    {/* タップヒント */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-center text-white/80 text-sm">
                        タップして詳細を表示
                      </p>
                    </div>
                  </div>

                  {/* カード詳細（展開時） */}
                  {expandedCard === index && (
                    <div className="bg-slate-800/90 rounded-xl p-5 space-y-4 animate-fadeIn">
                      {/* キーワード */}
                      <div className="text-center border-b border-slate-700 pb-4">
                        <div className="text-2xl font-bold text-amber-300">
                          {card.日本語キーワード}
                        </div>
                        <div className="text-slate-400">
                          {card.読み} / {card.英語キーワード}
                        </div>
                      </div>

                      {/* 象意 */}
                      {card.象意 && (
                        <div>
                          <h4 className="text-amber-400 text-sm font-bold mb-1">象意</h4>
                          <p className="text-slate-300 text-sm">{card.象意}</p>
                        </div>
                      )}

                      {/* グループ・方位・時 */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        {card.グループ && (
                          <div className="bg-slate-700/50 rounded p-2">
                            <div className="text-slate-400">グループ</div>
                            <div className="text-white">{card.グループ}</div>
                          </div>
                        )}
                        {card.方位 && (
                          <div className="bg-slate-700/50 rounded p-2">
                            <div className="text-slate-400">方位</div>
                            <div className="text-white">{card.方位}</div>
                          </div>
                        )}
                        {card.時 && (
                          <div className="bg-slate-700/50 rounded p-2">
                            <div className="text-slate-400">時</div>
                            <div className="text-white">{card.時}</div>
                          </div>
                        )}
                      </div>

                      {/* カードからのメッセージ */}
                      {card.カードからのメッセージ && (
                        <div>
                          <h4 className="text-amber-400 text-sm font-bold mb-2">カードからのメッセージ</h4>
                          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                            {card.カードからのメッセージ}
                          </p>
                        </div>
                      )}

                      {/* キセキのレシピ */}
                      {card.キセキのレシピ && (
                        <div>
                          <h4 className="text-emerald-400 text-sm font-bold mb-2">キセキのレシピ</h4>
                          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                            {card.キセキのレシピ}
                          </p>
                        </div>
                      )}

                      {/* アファメーション */}
                      {card.アファメーション && (
                        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-lg p-4">
                          <h4 className="text-purple-300 text-sm font-bold mb-2">アファメーション</h4>
                          <p className="text-white text-sm leading-relaxed italic whitespace-pre-wrap">
                            {card.アファメーション}
                          </p>
                        </div>
                      )}

                      {/* 属性情報 */}
                      {card.attributes && (
                        <div className="flex justify-center gap-2 text-xs pt-2 border-t border-slate-700">
                          <span className="bg-slate-600 px-2 py-1 rounded">{card.attributes.形}</span>
                          <span className="bg-slate-600 px-2 py-1 rounded">{card.attributes.数}</span>
                          <span className="bg-slate-600 px-2 py-1 rounded">{card.attributes.色}</span>
                          <span className="bg-slate-600 px-2 py-1 rounded">{card.attributes.塗り}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* リセットボタン */}
            <div className="text-center pt-8">
              <button
                onClick={resetDraw}
                className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
              >
                もう一度引く
              </button>
            </div>
          </div>
        )}

        {/* フッター */}
        <div className="text-center mt-16 pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm">ゆるゆるマンダラ® オラクルカード</p>
          <p className="text-slate-600 text-xs mt-1">81枚のカードがあなたにメッセージを届けます</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
