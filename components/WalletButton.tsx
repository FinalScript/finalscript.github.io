import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { networkConfig } from '../config';
import { shortenAddress } from '../utils/shortenAddress';
import { connect, switchNetwork } from '../redux/blockchain/blockchainActions';
import { motion } from 'framer-motion';
import { BlockchainState } from '../types';
import Image from 'next/image';
import { InstallMetaMask } from './InstallMetaMask';

export const WalletButton = () => {
    const dispatch = useDispatch<any>();
    const blockchain = useSelector((state: BlockchainState) => state.blockchain);

    return (
        <motion.div
            initial={{ opacity: 0, translateX: 200 }}
            animate={{ opacity: 1, translateX: 0, transition: { duration: 0.6 } }}
            className='flex space-x-4 select-none'>
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
                                ' rounded-lg px-3 py-2 shadow-center-lg shadow-red-700 whitespace-nowrap ' +
                                (blockchain.isRightNetwork ? 'bg-gray-50 text-gray-900' : 'bg-red-600 text-white cursor-pointer text-shadow-white')
                            }>
                            {blockchain.isRightNetwork ? `🔺 ${networkConfig.chainName}` : '⚠️ Wrong Network'}
                        </div>
                        {blockchain.isRightNetwork && (
                            <div className='rounded-lg flex text-white text-shadow-white font-semibold bg-rose-600 shadow-center-lg shadow-rose-600  whitespace-nowrap'>
                                <p className='bg-rose-600 px-4 py-2 rounded-lg'>
                                    {parseFloat(blockchain.balance || '0').toFixed(3)} {networkConfig.nativeCurrency.symbol}
                                </p>
                            </div>
                        )}
                        <div className='bg-cyan-400 text-white shadow-center-lg shadow-cyan-500 px-3 py-2 rounded-lg'>{shortenAddress(blockchain.account)}</div>
                    </>
                ) : (
                    <button
                        onClick={() => {
                            dispatch(connect());
                        }}
                        className='bg-cyan-400 hover:bg-cyan-500 shadow-center-lg shadow-cyan-500 font-semibold text-gray-900 rounded-lg px-3 py-2 '>
                        Connect Wallet
                    </button>
                )
            ) : (
                <InstallMetaMask />
            )}
        </motion.div>
    );
};
