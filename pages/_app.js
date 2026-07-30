import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import '../styles/engineer.css';

const siteUrl = 'https://japanhempfarm.jp';
const siteTitle = 'JapanHempFarm｜共存共栄';
const siteDescription = 'JapanHempFarmの公式サイトです。';
const ogImage = `${siteUrl}/ogp.png`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} key="description" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:url" content={siteUrl} key="og:url" />
        <meta property="og:site_name" content={siteTitle} key="og:site_name" />
        <meta property="og:title" content={siteTitle} key="og:title" />
        <meta property="og:description" content={siteDescription} key="og:description" />
        <meta property="og:image" content={ogImage} key="og:image" />
        <meta property="og:locale" content="ja_JP" key="og:locale" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={siteTitle} key="twitter:title" />
        <meta name="twitter:description" content={siteDescription} key="twitter:description" />
        <meta name="twitter:image" content={ogImage} key="twitter:image" />
        <link rel="canonical" href={siteUrl} key="canonical" />
        <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700&family=Yuji+Boku&family=Yuji+Syuku&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);