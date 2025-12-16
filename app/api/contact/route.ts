/**
 * app/api/5dmgmt/contact/route.ts
 *
 * 【Phase 30】5dmgmt お問い合わせ API
 */

import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  inquiryType: string;
  companyName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // バリデーション
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メール送信ロジック（将来実装）
    // 現在は受け取ったデータをログに出力
    console.log('[5dmgmt Contact Form]', {
      inquiryType: data.inquiryType,
      companyName: data.companyName,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    // TODO: メール送信（SendGrid、Resendなど）
    // TODO: データベース保存

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[5dmgmt Contact Form Error]', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
