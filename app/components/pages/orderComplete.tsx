"use client";

const OrderComplete = () => {
  const onClickRedirectHome = () => {
    window.location.href = "/";
  };
  return (
    <>
      <div className="grid min-h-screen place-items-center bg-white px-6 py-24 376px:py-32 960px:px-8">
        <div className="text-center">
          <p className="font-semibold text-green-600">Order Complete</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 376px:text-5xl">
            ご注文完了
          </h1>
          <div className="flex flex-col items-center">
            <p className="mt-6 leading-relaxed text-gray-600 w-3/4">
              注文確認メールをお送りしましたので、メールをご確認ください。
              <br />
              もしメールが届かない場合は、迷惑メールフォルダを確認していただくか、
              お手数ですが弊社までお問い合わせください。
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              type="button"
              onClick={() => onClickRedirectHome()}
              className="rounded-md bg-green-600 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              ホームへ戻る
            </button>
          </div>
        </div>
      </div>
    </>    
  );
};

export default OrderComplete;
