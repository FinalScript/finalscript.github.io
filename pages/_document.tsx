import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html lang='en'>
            <Head>
                <meta name='description' content='Your favorite game from childhood now on AVAX. Mine (💎) now! ' />
                <meta property='og:title' content='MinerVerse' />
                <meta property='og:description' content='Your favorite game from childhood now on AVAX. Mine (💎) now! ' />
                <meta property='og:url' content='https://minerverse.app/' />
                <meta property='og:type' content='website' />
                <link rel='icon' href='/favicon.ico' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
