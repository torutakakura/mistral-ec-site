import { NextResponse } from "next/server";
import Stripe from "stripe";
import PAYPAY from '@paypayopa/paypayopa-sdk-node';
import { v4 as uuidv4 } from 'uuid';

// Stripeの初期化
const stripe = new Stripe("sk_test_51MzBHPH7Fr80VyAFt3UVCApjrOABHWPwf1KeiG04Zgx4inB79xyr7J2QmaWvSQe2DcF0fkKN9ITOwj9pmrJNXn1J00JCd9lHdC", {
  apiVersion: "2022-11-15",
  maxNetworkRetries: 3
});

// PayPayの初期化
PAYPAY.Configure({
  clientId: process.env.PAYPAY_CLIENT_ID!,
  clientSecret: process.env.PAYPAY_CLIENT_SECRET!,
  merchantId: process.env.PAYPAY_MERCHANT_ID!,
  productionMode: false, // 本番環境の場合はtrueに変更
});

export async function POST(req: Request) {
  const body = await req.json();
  const {amount, token, orderType} = body;

  // charge on stripe
  if (orderType === 'PayPay') {
    // PayPay処理
    // QRコードを作成するためのペイロード
    let payload = {
      merchantPaymentId: uuidv4(),
      amount: {
        amount: amount,
        currency: "JPY"
      },
      codeType: "ORDER_QR",
      orderDescription: "生花購入",
      isAuthorization: false,
      redirectUrl: `${process.env.APP_HOST_NAME}/order_complete?merchant-payment-id=${uuidv4()}`,
      redirectType: "WEB_LINK",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1"
    };
    // QRコードを作成
    try {
      const response: any = await PAYPAY.QRCodeCreate(payload);
      return NextResponse.json({message: 'OK', result: response.BODY})
    } catch (error) {
      return new NextResponse('決済失敗', { status: 500 })
    }
  } else {
    try {
      const charge = await stripe.charges.create({
        amount: amount,
        currency: "jpy",
        description: `test`,
        source: token.token.id,
      });
      return NextResponse.json({message: 'OK', result: charge})
    } catch (error) {
      console.error("Stripe charge error:", error.message);
      return new NextResponse(error.message, { status: 500 });
    }
  }
}