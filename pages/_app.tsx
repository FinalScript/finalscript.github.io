import '../styles/styles.css';
import type { AppContext, AppProps } from 'next/app';
import { Nav } from '../components/Nav';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { wrapper, store } from '../redux/store';
import { useEffect, useState } from 'react';
import { checkConnection, connect } from '../redux/blockchain/blockchainActions';
import Head from 'next/head';
import { ErrorAlert } from '../components/ErrorAlert';
import { BlockchainState, CustomAlert, GeneralState } from '../types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { removeAlert } from '../redux/general/generalActions';
import { TransactionAlert } from '../components/TransactionAlert';

import Login from '../components/Login';
import Cookies from 'universal-cookie';
import consts from '../constants';
import App from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    const dispatch = useDispatch<any>();
    const blockchain = useSelector((state: BlockchainState) => state.blockchain);
    const generalReducer = useSelector((state: GeneralState) => state.general);
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
        }, 1600);

        setTimeout(() => {
            setPageLoading(false);
        }, 1500);
    }, []);

    useEffect(() => {
        console.log(generalReducer.alerts);
    }, [generalReducer.alerts]);

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

    if (!pageProps.hasReadPermission) {
        return <Login redirectPath={router.asPath} />;
    }

    return (
        <Provider store={store}>
            <Head>
                <title>Home | MinerVerse</title>
            </Head>

            <>
                <Nav />
                <div className='absolute z-40 bottom-5 left-5'>
                    <AnimatePresence>
                        {generalReducer.alerts.map((alert: CustomAlert) => {
                            return (
                                <motion.div
                                    exit={{ x: '100%', opacity: 0, transition: { ease: 'easeInOut' } }}
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '0%', transition: { ease: 'easeInOut' } }}
                                    key={alert.key}>
                                    {alert.isError ? (
                                        <ErrorAlert deleteBy={alert.key} errorMsg={alert.errorMsg} />
                                    ) : (
                                        <TransactionAlert hash={alert.hash} link={alert.link} deleteBy={alert.key} />
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <div className='relative select-none'>
                    <AnimatePresence exitBeforeEnter>
                        {pageLoading && (
                            <>
                                <motion.div
                                    key={'diamondLoadingBackground'}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.85 }}
                                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                                    hidden={!pageLoading}
                                    className='fixed z-40 w-full h-full bg-zinc-900 opacity-80'></motion.div>
                                <motion.div exit={{ opacity: 0 }} className='fixed z-50 w-screen h-screen flex justify-center items-center'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <motion.div
                                            key={'diamondLoading'}
                                            exit={
                                                generalReducer.isLoading
                                                    ? {
                                                          opacity: 0,
                                                          scale: 0.0,
                                                      }
                                                    : {
                                                          opacity: 0,
                                                      }
                                            }
                                            initial={
                                                generalReducer.isLoading
                                                    ? {
                                                          opacity: 0,
                                                          scale: 0.0,
                                                      }
                                                    : {
                                                          opacity: 0,
                                                      }
                                            }
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
                                    </div>
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

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);

    const cookies = new Cookies(appContext?.ctx?.req?.headers.cookie);
    const password = cookies.get(consts.SiteReadCookie) ?? '';

    if (password == 'unFinalScript123') {
        appProps.pageProps.hasReadPermission = true;
    }

    return { ...appProps };
};

export default wrapper.withRedux(MyApp);
