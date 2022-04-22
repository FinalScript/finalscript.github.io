import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Nav } from '../components/Nav';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { wrapper, store } from '../redux/store';
import { fetchData } from '../redux/data/dataActions';
import { useEffect, useState } from 'react';
import { checkConnection, connect } from '../redux/blockchain/blockchainActions';
import Head from 'next/head';
import { ErrorAlert } from '../components/ErrorAlert';
import { BlockchainState } from '../types';

function MyApp({ Component, pageProps }: AppProps) {
    const dispatch = useDispatch<any>();
    const blockchain = useSelector((state: BlockchainState) => state.blockchain);
    const [errorAlertHidden, setErrorAlertHidden] = useState(true);

    useEffect(() => {
        dispatch(connect());
        dispatch(checkConnection());
    }, []);

    useEffect(() => {
        if (blockchain.errorMsg) {
            setErrorAlertHidden(false);
        }
    }, [blockchain.errorMsg]);

    return (
        <Provider store={store}>
            <Head>
                <title>MinerVerse</title>
                <meta name='description' content='Your favorite game from childhood now on AVAX. Mine (💎) now! ' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>
            <Nav />
            <ErrorAlert
                hidden={errorAlertHidden}
                setHidden={() => {
                    setErrorAlertHidden(true);
                }}
                errorMsg={blockchain.errorMsg}
            />
            <Component {...pageProps} />
        </Provider>
    );
}

export default wrapper.withRedux(MyApp);
