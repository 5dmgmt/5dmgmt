/**
 * 宿曜レポート生成システム - メインエントリーポイント
 */
import React from 'react';
import ReactPDF, { Document } from '@react-pdf/renderer';
import { Page00 } from './templates/Page00';
import { Page01 } from './templates/Page01';
import { Page02 } from './templates/Page02';
import { UserData, ShukuyoType, Weekday, Kyusei } from './types';
import { registerFonts } from './fonts';
import * as fs from 'fs';
import * as path from 'path';

// フォント登録
registerFonts();

// サンプルユーザーデータ
const sampleUser: UserData = {
  name: '麻生文子',
  birthDate: new Date(1960, 9, 27), // 1960年10月27日
  shukuyo: '虚宿' as ShukuyoType,
  weekday: '木曜日' as Weekday,
  shichiyoRyohi: '七曜陵逼生まれ',
  structureTitle: '制御された夢想家',
  kyusei: '四緑木星' as Kyusei,
  yearKyusei: '四緑木星' as Kyusei,
  monthKyusei: '九紫火星' as Kyusei,
  dayKyusei: '九紫火星' as Kyusei,
};

// 簡易鑑定書ドキュメント（全3ページ）
const SimpleReportDocument: React.FC<{ user: UserData }> = ({ user }) => {
  return (
    <Document>
      <Page00 user={user} />
      <Page01 user={user} />
      <Page02 user={user} />
    </Document>
  );
};

// PDF生成関数
async function generatePDF(user: UserData, outputPath: string): Promise<void> {
  console.log(`Generating PDF for ${user.name}...`);

  const doc = <SimpleReportDocument user={user} />;

  await ReactPDF.render(doc, outputPath);

  console.log(`PDF generated: ${outputPath}`);
}

// メイン実行
async function main() {
  const outputDir = path.join(__dirname, '..', 'output');

  // 出力ディレクトリ作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${sampleUser.name}_test.pdf`);

  await generatePDF(sampleUser, outputPath);
}

main().catch(console.error);
