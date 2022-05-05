import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { BlockchainState, GeneralState } from '../types';
import { useEffect, useState } from 'react';
import { connect, switchNetwork } from '../redux/blockchain/blockchainActions';
import { shortenAddress } from '../utils/shortenAddress';
import { InstallMetaMask } from './InstallMetaMask';
import { networkConfig } from '../config';

export const Nav = () => {
    const dispatch = useDispatch<any>();
    const generalReducer = useSelector((state: GeneralState) => state.general);
    const blockchain = useSelector((state: BlockchainState) => state.blockchain);
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);

    return (
        <>
            {!generalReducer.isLoading && (
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 1 } }}
                    className={
                        'flex flex-col lg:px-10 xl:px-20 lg:flex-row items-center justify-center text-gray-400 pb-4 bg-opacity-90 bg-transparent body-font z-30 fixed w-full'
                    }>
                    <div className='container flex lg:justify-between flex-row items-center justify-center relative'>
                        <Link href={'/'}>
                            <div className='flex cursor-pointer title-font font-medium items-center text-white p-2'>
                                <div className='w-60 h-20 xl:w-72 xl:h-24 relative drop-shadow-blue'>
                                    <Image src='/images/minerverse-logo.png' layout='fill' objectFit='contain' alt='nav-logo' />
                                </div>
                            </div>
                        </Link>

                        <button
                            data-collapse-toggle='mobile-menu'
                            type='button'
                            className='inline-flex items-center p-2 ml-3 text-sm text-black bg-cyan-300 rounded-lg md:hidden active:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-shadow-title'
                            aria-controls='mobile-menu'
                            aria-expanded='false'
                            onClick={() => {
                                setIsNavCollapsed((prevState) => !prevState);
                            }}>
                            <span className='sr-only'>Open main menu</span>
                            <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    fill-rule='evenodd'
                                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                                    clip-rule='evenodd'></path>
                            </svg>
                            <svg className='hidden w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    fill-rule='evenodd'
                                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                    clip-rule='evenodd'></path>
                            </svg>
                        </button>
                    </div>
                    <motion.div
                        className={'w-screen max-w-[100vw] transition-all duration-300 md:opacity-100 md:w-auto ' + (isNavCollapsed ? 'opacity-100 z-20' : 'opacity-0 -z-30')}
                        id='mobile-menu'>
                        <div className='flex flex-col mt-4 space-y-3 px-5 md:px-0 md:space-y-0 md:flex-row md:space-x-5 md:mt-0 md:text-sm md:font-medium'>
                            {blockchain.hasMetaMask ? (
                                blockchain.account ? (
                                    <>
                                        <div
                                            onClick={() => {
                                                if (!blockchain.isRightNetwork) {
                                                    switchNetwork();
                                                }
                                            }}
                                            className={
                                                'rounded-lg px-3 py-2 shadow-center-lg shadow-red-700 whitespace-nowrap ' +
                                                (blockchain.isRightNetwork
                                                    ? 'bg-gray-50 text-gray-900'
                                                    : 'bg-red-600 text-white cursor-pointer text-shadow-white')
                                            }>
                                            {blockchain.isRightNetwork ? `🔺 ${networkConfig.chainName}` : '⚠️ Wrong Network'}
                                        </div>
                                        {blockchain.isRightNetwork && (
                                            <div className='flex text-white text-shadow-white font-semibold bg-fuchsia-600 px-4 py-2 rounded-lg shadow-center-lg shadow-fuchsia-700  whitespace-nowrap'>
                                                {parseFloat(blockchain.balance || '0').toFixed(3)} {networkConfig.nativeCurrency.symbol}
                                            </div>
                                        )}
                                        <div className='bg-cyan-400 text-white text-shadow-white shadow-center-lg font-semibold shadow-cyan-500 px-3 py-2 rounded-lg whitespace-nowrap'>
                                            {shortenAddress(blockchain.account)}
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => {
                                            dispatch(connect());
                                        }}
                                        className='bg-cyan-400 hover:bg-cyan-500 shadow-center-lg shadow-cyan-500 font-semibold text-gray-900 rounded-lg px-3 py-2 whitespace-nowrap '>
                                        Connect Wallet
                                    </button>
                                )
                            ) : (
                                <InstallMetaMask />
                            )}
                        </div>
                    </motion.div>
                </motion.nav>
            )}
        </>
    );
};
