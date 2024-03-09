import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json()
  const { 
    name, 
    nameKana, 
    email, 
    address, 
    companyDepartment, 
    phoneNumber, 
    toName, 
    toNameKana,
    toAddress,
    toCompanyDepartment,
    toPhoneNumber,
    usePostbox,
    whatUsing,
    orderRequest,
    deliveryDate,
    deliveryTime,
    details } = body;


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
    from: 'omote-sando@flowershop-mistral.com',
    to: 'mail@flower-mistral.com',
    subject: '注文がありました',
    text: `
【ご注文詳細】
${details}

【ご注文者様情報】
お名前: ${name}
フリガナ: ${nameKana}
住所: ${address} ${companyDepartment}
電話番号: ${phoneNumber}

【お届け先情報】
お名前: ${toName}
フリガナ: ${toNameKana}
住所: ${toAddress} ${toCompanyDepartment}
電話番号: ${toPhoneNumber}
宅配Box: ${usePostbox}
お届け希望日時: ${deliveryDate} ${deliveryTime}
ご利用用途: ${whatUsing}
ご要望: 
${orderRequest}
    `,
  };

  // ユーザーへの自動返信メール内容
  const userMail = {
    from: 'omote-sando@flowershop-mistral.com',
    to: `${email}`,
    subject: 'ご注文ありがとうございます',
    text: `
${name}様

以下の内容でご注文を受け付けました。

【ご注文詳細】
${details}

【ご注文者様情報】
お名前: ${name}
フリガナ: ${nameKana}
電話番号: ${phoneNumber}
住所: ${address}

【お届け先情報】
お名前: ${toName}
フリガナ: ${toNameKana}
電話番号: ${toAddress}
宅配Box: ${usePostbox}
ご利用用途: ${whatUsing}
お届け希望日時: ${deliveryDate} ${deliveryTime}
ご要望: 
${orderRequest}

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
    // // ユーザーへの自動返信メール送信
    await transporter.sendMail(userMail);

    return NextResponse.json({message: 'メール送信成功'})
  } catch (error) {
    console.error(error);
    return new NextResponse('メール送信失敗', { status: 500 })
  }
}