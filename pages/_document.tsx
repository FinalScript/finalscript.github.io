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
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <link rel='icon' href='/favicon.ico' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={'true'} />
                <link href='/assets/fonts/VPPixel-Simplified.otf' rel='stylesheet' />
                <link href='//db.onlinewebfonts.com/c/98e6dd769068c2091e7413443f0b0c5e?family=VPPixel-Simplified' rel='stylesheet' type='text/css' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
