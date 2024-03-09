import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json()
  const { name, nameKana, email, phoneNumber, contactWay, contents } = body;


  // メール送信設定
  // メール送信設定
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // SMTPサーバーのホスト名
    port: 587, // ポート番号
    secure: false,
    auth: {
      user: 'omote-sando@flowershop-mistral.com', // メールアドレス
      pass: 'H2tt_2816', // パスワード
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });

  // 管理者へのメール内容
  const adminMail = {
    from: 'no-reply@example.com',
    to: 'admin@example.com',
    subject: 'お問い合わせがありました',
    text: `
お名前: ${name}
フリガナ: ${nameKana}
メールアドレス: ${email}
電話番号: ${phoneNumber}
ご希望の連絡方法: ${contactWay}
お問い合わせ内容:
${contents}
    `,
  };

  // ユーザーへの自動返信メール内容
  const userMail = {
    from: 'no-reply@example.com',
    to: email,
    subject: 'お問い合わせありがとうございます',
    text: `
${name}様

以下の内容でお問い合わせを受け付けました。

お問い合わせ内容:
${contents}

何かご不明点があればお気軽にお問い合わせください。

◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
有限会社ミストラル 表参道店
高倉 誠

〒150-0001
東京都渋谷区神宮前3-42-3 1F

TEL: 03-3423-4187
FAX: 03-3423-4186
Mobile: 090-3915-5860

mail: omotesanndo@flowershop-mistral.com
URL: flowershop-mistral.com
    `,
  };

  try {
    // 管理者へのメール送信
    await transporter.sendMail(adminMail);
    // ユーザーへの自動返信メール送信
    await transporter.sendMail(userMail);

    return NextResponse.json({message: 'メール送信成功'})
  } catch (error) {
    console.error(error);
    return new NextResponse('メール送信失敗', { status: 500 })
  }
}