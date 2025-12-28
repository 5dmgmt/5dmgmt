/**
 * 宿曜レポート専用レイアウト
 * ヘッダー・フッターなしのシンプルレイアウト
 */
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '宿曜鑑定書プレビュー',
  description: '宿曜鑑定書のプレビューと印刷・PDF出力',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* サイトのヘッダー・フッターを非表示にするスタイル */}
      <style>{`
        .five-d-header, .five-d-footer,
        header, footer,
        [class*="Header"], [class*="Footer"] {
          display: none !important;
        }
        .five-d-page {
          background: #f3f4f6 !important;
        }
        .five-d-page > main {
          padding: 0 !important;
          margin: 0 !important;
        }
      `}</style>
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        {children}
      </div>
    </>
  );
}
