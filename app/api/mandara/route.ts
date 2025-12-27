import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// カードデータの型定義
interface CardData {
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

interface CardAttributes {
  カード番号: number;
  形: string;
  数: string;
  色: string;
  塗り: string;
  形コード: number;
  数コード: number;
  色コード: number;
  塗りコード: number;
}

interface ThirdCardCombination {
  カード1: number;
  カード2: number;
  カード3: number;
}

// CSVデータを読み込み
function loadCardData(): CardData[] {
  const filePath = path.join(process.cwd(), 'data/mandara/ゆるゆるマンダラカード一覧_完全版.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, { columns: true, bom: true });
}

function loadCardAttributes(): CardAttributes[] {
  const filePath = path.join(process.cwd(), 'data/mandara/card_attributes.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, { columns: true, bom: true });
}

function loadThirdCardCombinations(): ThirdCardCombination[] {
  const filePath = path.join(process.cwd(), 'data/mandara/third_card_combinations.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, { columns: true, bom: true });
}

// ランダムにカードを選ぶ
function getRandomCards(cards: CardData[], count: number): CardData[] {
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// 3枚目のカードを計算 (SETルール)
function getThirdValue(a: number, b: number): number {
  if (a === b) return a;
  return 3 - a - b;
}

function findThirdCard(
  attributes: CardAttributes[],
  card1Num: number,
  card2Num: number
): number | null {
  const c1 = attributes.find(a => a.カード番号 === card1Num);
  const c2 = attributes.find(a => a.カード番号 === card2Num);

  if (!c1 || !c2) return null;

  const target = {
    形コード: getThirdValue(Number(c1.形コード), Number(c2.形コード)),
    数コード: getThirdValue(Number(c1.数コード), Number(c2.数コード)),
    色コード: getThirdValue(Number(c1.色コード), Number(c2.色コード)),
    塗りコード: getThirdValue(Number(c1.塗りコード), Number(c2.塗りコード))
  };

  const found = attributes.find(
    a =>
      Number(a.形コード) === target.形コード &&
      Number(a.数コード) === target.数コード &&
      Number(a.色コード) === target.色コード &&
      Number(a.塗りコード) === target.塗りコード
  );

  return found ? Number(found.カード番号) : null;
}

// GET: カードを引く
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || '1'; // 1, 2, 3
    const cardNum = searchParams.get('card'); // 特定カードを取得

    const cards = loadCardData();
    const attributes = loadCardAttributes();

    // 特定カードの詳細を取得
    if (cardNum) {
      const num = parseInt(cardNum);
      const card = cards.find(c => Number(c.カード番号) === num);
      const attr = attributes.find(a => Number(a.カード番号) === num);

      if (!card) {
        return NextResponse.json({ error: 'Card not found' }, { status: 404 });
      }

      return NextResponse.json({
        card,
        attributes: attr,
        success: true
      });
    }

    // カードを引く
    const count = parseInt(mode);

    if (count === 1) {
      // 1枚引き
      const selected = getRandomCards(cards, 1);
      const attr = attributes.find(a => Number(a.カード番号) === Number(selected[0].カード番号));
      return NextResponse.json({
        mode: 'single',
        cards: selected.map(c => ({
          ...c,
          attributes: attributes.find(a => Number(a.カード番号) === Number(c.カード番号))
        })),
        success: true
      });
    } else if (count === 2) {
      // 2枚引き
      const selected = getRandomCards(cards, 2);
      return NextResponse.json({
        mode: 'pair',
        cards: selected.map(c => ({
          ...c,
          attributes: attributes.find(a => Number(a.カード番号) === Number(c.カード番号))
        })),
        success: true
      });
    } else if (count === 3) {
      // 3枚引き (SETルールで3枚目を決定)
      const firstTwo = getRandomCards(cards, 2);
      const card1Num = Number(firstTwo[0].カード番号);
      const card2Num = Number(firstTwo[1].カード番号);
      const card3Num = findThirdCard(attributes, card1Num, card2Num);

      if (!card3Num) {
        return NextResponse.json({ error: 'Failed to find third card' }, { status: 500 });
      }

      const card3 = cards.find(c => Number(c.カード番号) === card3Num);

      if (!card3) {
        return NextResponse.json({ error: 'Failed to find third card data' }, { status: 500 });
      }

      const selected = [...firstTwo, card3];
      return NextResponse.json({
        mode: 'trio',
        description: '3枚目はSETゲームルールで自動選択されました',
        rule: '4属性（形・数・色・塗り）が全て「同じ」か「全て異なる」組み合わせ',
        cards: selected.map(c => ({
          ...c,
          attributes: attributes.find(a => Number(a.カード番号) === Number(c.カード番号))
        })),
        success: true
      });
    }

    return NextResponse.json({ error: 'Invalid mode. Use 1, 2, or 3' }, { status: 400 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: 特定の組み合わせで3枚目を計算
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { card1, card2 } = body;

    if (!card1 || !card2) {
      return NextResponse.json(
        { error: 'card1 and card2 are required' },
        { status: 400 }
      );
    }

    const cards = loadCardData();
    const attributes = loadCardAttributes();

    const card1Num = parseInt(card1);
    const card2Num = parseInt(card2);

    // 入力カードの検証
    const card1Data = cards.find(c => Number(c.カード番号) === card1Num);
    const card2Data = cards.find(c => Number(c.カード番号) === card2Num);

    if (!card1Data || !card2Data) {
      return NextResponse.json(
        { error: 'Invalid card number' },
        { status: 400 }
      );
    }

    // 3枚目を計算
    const card3Num = findThirdCard(attributes, card1Num, card2Num);

    if (!card3Num) {
      return NextResponse.json(
        { error: 'Failed to calculate third card' },
        { status: 500 }
      );
    }

    const card3Data = cards.find(c => Number(c.カード番号) === card3Num);

    return NextResponse.json({
      card1: {
        ...card1Data,
        attributes: attributes.find(a => Number(a.カード番号) === card1Num)
      },
      card2: {
        ...card2Data,
        attributes: attributes.find(a => Number(a.カード番号) === card2Num)
      },
      card3: {
        ...card3Data,
        attributes: attributes.find(a => Number(a.カード番号) === card3Num)
      },
      rule: 'SET game rule: 各属性が「全て同じ」か「全て異なる」',
      success: true
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
