/**
 * 宿曜レポートPDF生成 API
 *
 * POST /api/shukuyo/pdf
 */
import { NextRequest, NextResponse } from 'next/server';
import { generateSimpleReportPDF, UserData } from '@/lib/pdf';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // リクエストバリデーション
    if (!body.name || !body.birthDate || !body.shukuyo) {
      return NextResponse.json(
        { error: 'name, birthDate, shukuyo は必須です' },
        { status: 400 }
      );
    }

    // UserData構築
    const user: UserData = {
      name: body.name,
      birthDate: new Date(body.birthDate),
      shukuyo: body.shukuyo,
      weekday: body.weekday || '木曜日',
      shichiyoRyohi: body.shichiyoRyohi || '七曜陵逼生まれ',
      structureTitle: body.structureTitle || '制御された夢想家',
      kyusei: body.kyusei || '四緑木星',
      yearKyusei: body.yearKyusei || '四緑木星',
      monthKyusei: body.monthKyusei || '九紫火星',
      dayKyusei: body.dayKyusei || '九紫火星',
    };

    // ベースURLを取得（フォント読み込み用）
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    // PDF生成
    const pdfBuffer = await generateSimpleReportPDF(user, baseUrl);

    // PDFレスポンス（BufferをUint8Arrayに変換）
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(user.name)}_鑑定書.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'PDF生成に失敗しました', details: String(error) },
      { status: 500 }
    );
  }
}

// GETリクエストでテスト用PDFを生成
export async function GET(request: NextRequest) {
  try {
    // テスト用データ
    const testUser: UserData = {
      name: '麻生文子',
      birthDate: new Date('1960-10-27'),
      shukuyo: '虚宿',
      weekday: '木曜日',
      shichiyoRyohi: '七曜陵逼生まれ',
      structureTitle: '制御された夢想家',
      kyusei: '四緑木星',
      yearKyusei: '四緑木星',
      monthKyusei: '九紫火星',
      dayKyusei: '九紫火星',
    };

    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    const pdfBuffer = await generateSimpleReportPDF(testUser, baseUrl);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${encodeURIComponent(testUser.name)}_鑑定書.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'PDF生成に失敗しました', details: String(error) },
      { status: 500 }
    );
  }
}
