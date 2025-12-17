/**
 * app/api/contact/route.ts
 *
 * お問い合わせ API（Resend送信 + レート制限 + hCaptcha検証）
 *
 * 環境変数:
 * - RESEND_API_KEY: Resend APIキー
 * - RESEND_FROM_EMAIL: 送信元メールアドレス
 * - CONTACT_TO_EMAIL: 送信先メールアドレス
 * - HCAPTCHA_SECRET_KEY: hCaptcha シークレットキー（任意）
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
  hcaptchaToken?: string;
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

// hCaptcha検証
async function verifyHcaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.HCAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn('[Contact] HCAPTCHA_SECRET_KEY is not set, skipping verification');
    return true; // シークレットキーが設定されていない場合はスキップ
  }

  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('[Contact] hCaptcha verification error:', error);
    return false;
  }
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

    // hCaptcha検証（トークンがある場合）
    if (data.hcaptchaToken) {
      const isValidCaptcha = await verifyHcaptcha(data.hcaptchaToken);
      if (!isValidCaptcha) {
        return NextResponse.json(
          { error: '認証に失敗しました。再度お試しください。' },
          { status: 400 }
        );
      }
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

    // 管理者向けメール送信
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

    // 自動返信メール（オプション）
    if (process.env.RESEND_FROM_EMAIL && process.env.RESEND_FROM_EMAIL !== 'onboarding@resend.dev') {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: data.email,
          subject: '【五次元経営】お問い合わせを受け付けました',
          text: `
${data.name} 様

この度は五次元経営株式会社にお問い合わせいただき、
誠にありがとうございます。

以下の内容でお問い合わせを受け付けました。
2営業日以内に担当者よりご連絡いたします。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お問い合わせ種別
${data.inquiryType || '未選択'}

■ お問い合わせ内容
${data.message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

※ このメールは自動送信されています。
　ご返信いただいてもお答えできない場合がございます。

─────────────────────────────
五次元経営株式会社
〒251-0035 神奈川県藤沢市片瀬海岸1-12-16-1003
TEL: 0466-52-7722
https://www.5dmgmt.com
─────────────────────────────
          `.trim(),
        });
      } catch (autoReplyError) {
        // 自動返信エラーはログのみ（メイン処理は成功扱い）
        console.error('[Contact] Auto-reply error:', autoReplyError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact] Unexpected error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
