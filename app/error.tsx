"use client";

const Error = () => {
  const onClickRedirectHome = () => {
    window.location.href = "/";
  };

  const onClickRedirectContact = () => {
    window.location.href = "/contact";
  };
  return (
    <div className="grid min-h-screen place-items-center bg-white px-6 py-24 376px:py-32 960px:px-8">
      <div className="text-center">
        <p className="font-semibold text-green-600">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 376px:text-5xl">
          Internal Server Error
        </h1>
        <p className="mt-6 leading-7 text-gray-600">
          アクセスしようとしたページは表示できませんでした。
          <br />
          しばらく経ってから、再度お試しください。
          <br />
          問題が解決しない場合は、お気軽にお問い合わせください。
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            type="button"
            onClick={() => onClickRedirectHome()}
            className="rounded-md bg-green-600 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            ホームへ戻る
          </button>
          <button
            type="button"
            onClick={() => onClickRedirectContact()}
            className="rounded-md bg-green-600 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            お問い合わせ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
