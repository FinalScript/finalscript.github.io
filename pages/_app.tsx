import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Nav } from '../components/Nav';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { wrapper, store } from '../redux/store';
import { fetchData } from '../redux/data/dataActions';
import { useEffect } from 'react';
import { checkConnection, connect } from '../redux/blockchain/blockchainActions';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(connect());
        dispatch(checkConnection());
    }, []);

    return (
        <Provider store={store}>
            <Head>
                <title>MinerVerse</title>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>
            <Nav />
            <Component {...pageProps} />
        </Provider>
    );
}

export default wrapper.withRedux(MyApp);
