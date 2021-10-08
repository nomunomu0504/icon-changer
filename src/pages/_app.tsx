import type { AppProps } from "next/app";
import Head from "next/head";
import "destyle.css";

const App: React.VFC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <meta property="og:site_name" content="IconChanger | プロフ画像一括変換サービス" />
        <meta property="og:title" content="IconChanger | プロフ画像一括変換サービス" />
        <meta property="og:url" content="https://icon-changer.dev/" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="https://icon-changer.dev/img/logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="IconChanger | プロフ画像一括変換サービス" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:site" content="https://icon-changer.dev" />
        <meta name="twitter:image" content="https://icon-changer.dev/img/logo_circle.png" />
        <meta name="twitter:creator" content="@Icon__Changer" />
        <meta property="fb:app_id" content="" />
        <link rel="shortcut icon" href="favicon.png" type="/image/vnd.microsoft.icon" />
        <link rel="icon" href="favicon.png" type="/image/vnd.microsoft.icon" />
        <title>IconChanger | プロフ画像一括変換サービス</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
