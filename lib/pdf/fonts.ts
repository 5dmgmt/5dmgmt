/**
 * フォント設定
 * Vercel環境では public フォルダのパスを使用
 */
import { Font } from '@react-pdf/renderer';

export function registerFonts(baseUrl: string = '') {
  const fontsPath = baseUrl ? `${baseUrl}/fonts` : '/fonts';

  Font.register({
    family: 'NotoSansJP',
    fonts: [
      { src: `${fontsPath}/NotoSansJP-Regular.ttf`, fontWeight: 400 },
      { src: `${fontsPath}/NotoSansJP-Medium.ttf`, fontWeight: 500 },
      { src: `${fontsPath}/NotoSansJP-Bold.ttf`, fontWeight: 700 },
    ],
  });

  // ハイフネーションを無効化（日本語対応）
  Font.registerHyphenationCallback((word) => [word]);
}

export const defaultFontFamily = 'NotoSansJP';
