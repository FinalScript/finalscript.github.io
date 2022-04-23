import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Nav } from '../components/Nav';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { wrapper, store } from '../redux/store';
import { useEffect, useState } from 'react';
import { checkConnection, connect } from '../redux/blockchain/blockchainActions';
import Head from 'next/head';
import { ErrorAlert } from '../components/ErrorAlert';
import { BlockchainState } from '../types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

function MyApp({ Component, pageProps }: AppProps) {
    const dispatch = useDispatch<any>();
    const blockchain = useSelector((state: BlockchainState) => state.blockchain);
    const [errorAlertHidden, setErrorAlertHidden] = useState(true);
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState<boolean>(true);

    useEffect(() => {
        dispatch(connect());
        dispatch(checkConnection());
        setTimeout(() => {
            dispatch({
                type: 'SET_LOADING',
                payload: { isLoading: false },
            });
            setPageLoading(false);
        }, 1500);
    }, []);

    useEffect(() => {
        if (blockchain.errorMsg) {
            setErrorAlertHidden(false);
        }
    }, [blockchain.errorMsg]);

    useEffect(() => {
        const handleStart = () => {
            setPageLoading(true);
        };
        const handleComplete = () => {
            setTimeout(() => {
                setPageLoading(false);
            }, 1000);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
    }, [router]);

    return (
        <Provider store={store}>
            <Head>
                <title>MinerVerse</title>
                <meta name='description' content='Your favorite game from childhood now on AVAX. Mine (💎) now! ' />
                <meta property='og:title' content='MinerVerse' />
                <meta property='og:description' content='Your favorite game from childhood now on AVAX. Mine (💎) now! ' />
                <meta property='og:url' content='https://minerverse.app/' />
                <meta property='og:type' content='website' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>

            <>
                <Nav />
                <ErrorAlert
                    hidden={errorAlertHidden}
                    setHidden={() => {
                        setErrorAlertHidden(true);
                    }}
                    errorMsg={blockchain.errorMsg}
                />

                <div className='relative select-none'>
                    <AnimatePresence>
                        {pageLoading && (
                            <>
                                <motion.div
                                    key={'diamondLoadingBackground'}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.8 }}
                                    exit={{ opacity: 0, transition: { duration: 0.7 } }}
                                    hidden={!pageLoading}
                                    className='fixed z-40 w-full h-full bg-gray-800 opacity-80'></motion.div>
                                <motion.div exit={{ opacity: 0 }} className='fixed z-50 w-screen h-screen flex justify-center items-center'>
                                    <motion.div
                                        key={'diamondLoading'}
                                        exit={{ scale: 0.0 }}
                                        initial='hidden'
                                        animate='visible'
                                        variants={{
                                            hidden: {
                                                scale: 0.8,
                                                opacity: 0,
                                            },
                                            visible: {
                                                scale: 1,
                                                opacity: 1,
                                                transition: {
                                                    delay: 0.3,
                                                },
                                            },
                                        }}
                                        className='relative h-72 w-72 mx-auto'>
                                        <Image src='/assets/images/spinning-diamond.gif' objectFit='contain' layout='fill' />
                                    </motion.div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
                <Component {...pageProps} />
            </>
        </Provider>
    );
}

export default wrapper.withRedux(MyApp);
