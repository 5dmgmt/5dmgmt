/**
 * 宿曜レポート用のコード生成・デコード
 *
 * 生年月日をURLに直接表示しないため、エンコードされたコードを使用
 */

/**
 * 生年月日とイニシャルからコードを生成
 * @param birthDate YYYY-MM-DD形式
 * @param initials イニシャル（2文字）
 * @returns エンコードされたコード
 */
export function encodeShukuyoCode(birthDate: string, initials: string): string {
  // 日付を数値に変換 (1973-11-12 → 19731112)
  const dateNum = birthDate.replace(/-/g, '');

  // イニシャル + 日付数値を組み合わせ
  const combined = `${initials.toUpperCase()}${dateNum}`;

  // Base64エンコード（URL安全な形式）
  const encoded = Buffer.from(combined).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return encoded;
}

/**
 * コードをデコードして生年月日とイニシャルを取得
 * @param code エンコードされたコード
 * @returns { birthDate, initials } または null
 */
export function decodeShukuyoCode(code: string): { birthDate: string; initials: string } | null {
  try {
    // Base64デコード
    const base64 = code.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');

    // イニシャル（最初の2文字）と日付（残り8文字）を分離
    if (decoded.length < 10) return null;

    const initials = decoded.slice(0, 2);
    const dateNum = decoded.slice(2, 10);

    // 日付形式に変換 (19731112 → 1973-11-12)
    const year = dateNum.slice(0, 4);
    const month = dateNum.slice(4, 6);
    const day = dateNum.slice(6, 8);

    // バリデーション
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);

    if (yearNum < 1900 || yearNum > 2100) return null;
    if (monthNum < 1 || monthNum > 12) return null;
    if (dayNum < 1 || dayNum > 31) return null;

    return {
      birthDate: `${year}-${month}-${day}`,
      initials: initials,
    };
  } catch {
    return null;
  }
}

/**
 * ブラウザ用のエンコード関数
 */
export function encodeShukuyoCodeBrowser(birthDate: string, initials: string): string {
  const dateNum = birthDate.replace(/-/g, '');
  const combined = `${initials.toUpperCase()}${dateNum}`;

  // ブラウザのbtoa使用
  const encoded = btoa(combined)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return encoded;
}

/**
 * ブラウザ用のデコード関数
 */
export function decodeShukuyoCodeBrowser(code: string): { birthDate: string; initials: string } | null {
  try {
    const base64 = code.replace(/-/g, '+').replace(/_/g, '/');
    // パディングを追加
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
    const decoded = atob(padded);

    if (decoded.length < 10) return null;

    const initials = decoded.slice(0, 2);
    const dateNum = decoded.slice(2, 10);

    const year = dateNum.slice(0, 4);
    const month = dateNum.slice(4, 6);
    const day = dateNum.slice(6, 8);

    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);

    if (yearNum < 1900 || yearNum > 2100) return null;
    if (monthNum < 1 || monthNum > 12) return null;
    if (dayNum < 1 || dayNum > 31) return null;

    return {
      birthDate: `${year}-${month}-${day}`,
      initials: initials,
    };
  } catch {
    return null;
  }
}
