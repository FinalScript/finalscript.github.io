import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html lang='en'>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={'true'} />
                <link href='https://fonts.googleapis.com/css2?family=Rye&display=swap' rel='stylesheet' />
                <link href='https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap' rel='stylesheet' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
