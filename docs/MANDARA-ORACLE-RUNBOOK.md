# ゆるゆるマンダラ オラクルカード API ランブック

## 概要

81枚のマンダラカードを使用したオラクルカードAPIです。
1枚引き、2枚引き、3枚引き（SETゲームルール）に対応しています。

## API エンドポイント

### ベースURL
```
/api/mandara
```

---

## 1. カードを引く (GET)

### 1枚引き
```bash
GET /api/mandara?mode=1
```

**レスポンス例:**
```json
{
  "mode": "single",
  "cards": [
    {
      "カード番号": 42,
      "日本語キーワード": "蝋燭の炎",
      "読み": "ろうそくのほのお",
      "英語キーワード": "Candle Flame",
      "カードからのメッセージ": "...",
      "キセキのレシピ": "...",
      "アファメーション": "...",
      "attributes": {
        "形": "ハート",
        "数": "1",
        "色": "緑",
        "塗り": "中同色"
      }
    }
  ],
  "success": true
}
```

### 2枚引き
```bash
GET /api/mandara?mode=2
```

### 3枚引き（SETルール）
```bash
GET /api/mandara?mode=3
```

**3枚引きの特徴:**
- 最初の2枚はランダムに選択
- 3枚目はSETゲームのルールに基づいて自動選択
- 4属性（形・数・色・塗り）が全て「同じ」か「全て異なる」組み合わせ

**レスポンス例:**
```json
{
  "mode": "trio",
  "description": "3枚目はSETゲームルールで自動選択されました",
  "rule": "4属性（形・数・色・塗り）が全て「同じ」か「全て異なる」組み合わせ",
  "cards": [
    { "カード番号": 1, "日本語キーワード": "私", ... },
    { "カード番号": 81, "日本語キーワード": "意図", ... },
    { "カード番号": 14, "日本語キーワード": "湧出", ... }
  ],
  "success": true
}
```

### 特定カードの詳細取得
```bash
GET /api/mandara?card=42
```

---

## 2. 3枚目を計算 (POST)

2枚のカード番号を指定して、SETルールに基づく3枚目を計算します。

```bash
POST /api/mandara
Content-Type: application/json

{
  "card1": 1,
  "card2": 81
}
```

**レスポンス:**
```json
{
  "card1": { "カード番号": 1, "日本語キーワード": "私", ... },
  "card2": { "カード番号": 81, "日本語キーワード": "意図", ... },
  "card3": { "カード番号": 14, "日本語キーワード": "湧出", ... },
  "rule": "SET game rule: 各属性が「全て同じ」か「全て異なる」",
  "success": true
}
```

---

## SETゲームルール

### カード属性（4属性 × 3種類 = 81枚）

| 属性 | 種類1 | 種類2 | 種類3 |
|------|-------|-------|-------|
| 形   | 丸    | 三角  | ハート |
| 数   | 1     | 2     | 3     |
| 色   | 赤    | 緑    | 紫    |
| 塗り | 中無  | 中白  | 中同色 |

### ルール
3枚のカードが有効なSETになるには、各属性について：
- **全て同じ** または **全て異なる** 必要がある

### 例
- カード1: 三角, 1, 赤, 中白
- カード81: 三角, 3, 赤, 中無
- → 3枚目: 三角(同), 2(異), 赤(同), 中同色(異) = **カード14**

---

## データファイル

```
data/mandara/
├── ゆるゆるマンダラカード一覧_完全版.csv  # カード情報（メッセージ等）
├── card_attributes.csv                    # カード属性（形・数・色・塗り）
└── third_card_combinations.csv           # 全3240組み合わせの3枚目一覧
```

---

## フロントエンド実装例

### React/Next.js
```tsx
// 1枚引き
const drawSingleCard = async () => {
  const res = await fetch('/api/mandara?mode=1');
  const data = await res.json();
  return data.cards[0];
};

// 3枚引き
const drawTrioCards = async () => {
  const res = await fetch('/api/mandara?mode=3');
  const data = await res.json();
  return data.cards;
};

// 特定2枚から3枚目を計算
const calculateThirdCard = async (card1: number, card2: number) => {
  const res = await fetch('/api/mandara', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ card1, card2 })
  });
  const data = await res.json();
  return data.card3;
};
```

---

## エラーハンドリング

| HTTPステータス | 説明 |
|---------------|------|
| 200 | 成功 |
| 400 | パラメータ不正 |
| 404 | カードが見つからない |
| 500 | サーバーエラー |

---

## 運用コマンド

### 開発サーバー起動
```bash
cd /Users/5dmgmt/プラグイン/5dmgmt
npm run dev
```

### ビルド
```bash
npm run build
```

### 本番デプロイ
```bash
vercel --prod
```

---

## 更新履歴

| 日付 | バージョン | 内容 |
|------|-----------|------|
| 2024-12-27 | 1.0.0 | 初版作成 |
