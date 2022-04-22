import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { networkConfig } from '../config';
import { shortenAddress } from '../utils/shortenAddress';
import { connect, switchNetwork } from '../redux/blockchain/blockchainActions';

export const WalletButton = () => {
    const dispatch = useDispatch<any>();
    const blockchain = useSelector((state: any) => state.blockchain);

    return (
        <div className='flex space-x-4 select-none'>
            {blockchain.account ? (
                <>
                    <div
                        onClick={() => {
                            if (!blockchain.isRightNetwork) {
                                switchNetwork();
                            }
                        }}
                        className={
                            'text-gray-900 rounded-lg px-3 py-2 shadow-center-lg shadow-red-700 ' +
                            (blockchain.isRightNetwork ? 'bg-gray-50 outline outline-1 outline-red-600' : 'bg-red-600 cursor-pointer')
                        }>
                        {blockchain.isRightNetwork ? `🔺 ${networkConfig.chainName}` : '⚠️ Wrong Network'}
                    </div>
                    <div className='rounded-lg flex text-gray-900 font-semibold bg-amber-600'>
                        {blockchain.isRightNetwork && (
                            <p className='bg-amber-600 px-3 py-2 rounded-l-lg'>
                                {parseFloat(blockchain.balance || '0').toFixed(3)} {networkConfig.nativeCurrency.symbol}
                            </p>
                        )}
                        <p className='bg-amber-400 px-3 py-2 rounded-lg'>{shortenAddress(blockchain.account)}</p>
                    </div>
                </>
            ) : (
                <button
                    onClick={() => {
                        dispatch(connect());
                    }}
                    className='bg-cyan-400 font-semibold text-gray-900 rounded-lg px-3 py-2 '>
                    Connect Wallet
                </button>
            )}
        </div>
    );
};
