/**
 * フォント設定
 *
 * @react-pdf/rendererで日本語フォントを使用するための設定
 */
import { Font } from '@react-pdf/renderer';
import * as path from 'path';

// Noto Sans JP フォントを登録
export function registerFonts() {
  // ローカルフォントファイルを使用
  const fontsDir = path.join(__dirname, '..', 'fonts');

  Font.register({
    family: 'NotoSansJP',
    fonts: [
      {
        src: path.join(fontsDir, 'NotoSansJP-Regular.ttf'),
        fontWeight: 400,
      },
      {
        src: path.join(fontsDir, 'NotoSansJP-Medium.ttf'),
        fontWeight: 500,
      },
      {
        src: path.join(fontsDir, 'NotoSansJP-Bold.ttf'),
        fontWeight: 700,
      },
    ],
  });

  // ハイフネーション無効化（日本語では不要）
  Font.registerHyphenationCallback((word) => [word]);
}

// デフォルトスタイル
export const defaultFontFamily = 'NotoSansJP';
