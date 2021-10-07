import type { AppProps } from "next/app";
import Head from "next/head";
import "destyle.css";

const App: React.VFC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <meta property="og:site_name" content="" />
        <meta property="og:title" content="" />
        <meta property="og:url" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:creator" content="" />
        <meta property="fb:app_id" content="" />
        <link rel="shortcut icon" href="favicon.ico" type="/image/vnd.microsoft.icon" />
        <link rel="icon" href="favicon.ico" type="/image/vnd.microsoft.icon" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
