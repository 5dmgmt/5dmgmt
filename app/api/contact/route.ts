/**
 * app/api/contact/route.ts
 *
 * お問い合わせ API（Resend送信 + レート制限）
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactFormData {
  inquiryType: string;
  companyName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot?: string;
}

// シンプルなインメモリレート制限（IP単位、1分5回まで）
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1分
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// メールアドレス簡易バリデーション
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // IP取得（Vercel環境）
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';

    // レート制限チェック
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: '送信回数が上限に達しました。しばらく経ってからお試しください。' },
        { status: 429 }
      );
    }

    const data: ContactFormData = await request.json();

    // ハニーポットチェック（ボット対策）
    if (data.honeypot) {
      // ボットの場合は成功を返して静かに無視
      return NextResponse.json({ success: true });
    }

    // バリデーション
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { error: 'メールアドレスの形式が正しくありません' },
        { status: 400 }
      );
    }

    // 文字数制限
    if (data.name.length > 100 || data.email.length > 254 || data.message.length > 5000) {
      return NextResponse.json(
        { error: '入力内容が長すぎます' },
        { status: 400 }
      );
    }

    // Resend APIキーチェック
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('[Contact] RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'メール送信の設定が完了していません' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // メール送信
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_TO_EMAIL || 'info@5dmgmt.com',
      subject: `[5dmgmt] お問い合わせ: ${data.inquiryType || '一般'}`,
      text: `
お問い合わせを受信しました

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お問い合わせ種別
${data.inquiryType || '未選択'}

■ 会社名
${data.companyName || '未入力'}

■ お名前
${data.name}

■ メールアドレス
${data.email}

■ 電話番号
${data.phone || '未入力'}

■ お問い合わせ内容
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
      `.trim(),
    });

    if (error) {
      console.error('[Contact] Resend error:', error.message);
      return NextResponse.json(
        { error: 'メール送信に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact] Unexpected error');
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
