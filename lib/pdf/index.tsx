/**
 * 宿曜レポート PDF生成 - メインエクスポート
 */
import React from 'react';
import { Document, renderToBuffer } from '@react-pdf/renderer';
import { registerFonts } from './fonts';
import { Page00 } from './templates/Page00';
import { Page01 } from './templates/Page01';
import { Page02 } from './templates/Page02';
import { UserData } from './types';

// 型をエクスポート
export * from './types';
export { registerFonts } from './fonts';

// 簡易鑑定書ドキュメント（3ページ）
export const SimpleReportDocument: React.FC<{ user: UserData }> = ({ user }) => {
  return (
    <Document>
      <Page00 user={user} />
      <Page01 user={user} />
      <Page02 user={user} />
    </Document>
  );
};

// PDFをバッファとして生成
export async function generateSimpleReportPDF(user: UserData, baseUrl: string): Promise<Buffer> {
  // フォントを登録（baseUrlを使用）
  registerFonts(baseUrl);

  // PDFをバッファとして生成
  const buffer = await renderToBuffer(<SimpleReportDocument user={user} />);
  return Buffer.from(buffer);
}
