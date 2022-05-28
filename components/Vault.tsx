import { Contract } from 'web3-eth-contract';
import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { contractAddresses } from '../config';

interface Props {
    vaultContract?: Contract | undefined;
    account?: string;
}

const Vault = ({ vaultContract, account }: Props) => {
    const [totalBalance, setTotalBalance] = useState<BigNumber>();
    const [stakedBalance, setStakedBalance] = useState<BigNumber>();
    const [input, setInput] = useState('0');

    useEffect(() => {
        getStakedBalance();
        getTotalBalance();
    }, [vaultContract, account]);

    const getTotalBalance = async () => {
        let diamonds = 0;

        if (vaultContract?.methods && account) {
            diamonds = await vaultContract?.methods.diamondBalance().call();
        }

        setTotalBalance(new BigNumber(Web3.utils.fromWei(new BigNumber(diamonds).toFixed(0))));
    };

    const getStakedBalance = async () => {
        let diamonds = 0,
            diamondBalance = 0,
            totalSupply = 0;

        if (vaultContract?.methods && account) {
            diamonds = await vaultContract?.methods.balanceOf(account).call();
            diamondBalance = await vaultContract?.methods.diamondBalance().call();
            totalSupply = await vaultContract?.methods.totalSupply().call();
        }

        setStakedBalance(new BigNumber(Web3.utils.fromWei(new BigNumber(diamonds).times(diamondBalance).div(totalSupply).toFixed(0))));
    };

    const stake = async () => {
        if (vaultContract?.methods && account) {
            vaultContract?.methods.stake(Web3.utils.toWei(input)).send({
                to: contractAddresses.vault,
                from: account,
                value: 0,
            });
        }
    };

    const quickUnstake = async () => {
        if (vaultContract?.methods && account) {
            vaultContract?.methods.quickUnstake(Web3.utils.toWei(input)).send({
                to: contractAddresses.vault,
                from: account,
                value: 0,
            });
        }
    };

    const delayedUnstake = async () => {
        if (vaultContract?.methods && account) {
            vaultContract?.methods.claimDelayedUnstake(Web3.utils.toWei(input)).send({
                to: contractAddresses.vault,
                from: account,
                value: 0,
            });
        }
    };

    return (
        <div className='text-center flex flex-col space-y-2 items-center justify-between bg-gray-700 text-white shadow-lg p-2 px-6 rounded-lg w-[500px]'>
            <h3 className='text-2xl font-bold'>Vault</h3>
            <div className='w-full flex flex-col space-y-1 text-sm text-gray-200'>
                <div className='flex justify-between w-full'>
                    <p>Total Vault Balance</p>
                    <p>{totalBalance?.toFormat(2)}</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>Staked Balance</p>
                    <p>{stakedBalance?.toFormat(2)}</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>% of Vault</p>
                    <p>{totalBalance && stakedBalance && `${stakedBalance?.dividedBy(totalBalance).times(100).toFormat(3)}%`}</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>Pending Balance</p>
                    <p>0</p>
                </div>
            </div>
            <div className='w-full flex flex-col space-y-3'>
                <input
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    type='number'
                    max={20000}
                    placeholder='0'
                    className='text-center border-none outline-none bg-gray-600 text-white rounded w-full'
                />
                <div className='flex space-x-2 w-full'>
                    <button onClick={stake} className='py-1 px-3 bg-rose-500 disabled:hover:bg-rose-500 hover:bg-rose-600 rounded-md flex-grow'>
                        Stake
                    </button>
                    <div className='flex space-x-1 flex-grow'>
                        <button onClick={quickUnstake} className='py-1 px-3 bg-rose-500 disabled:hover:bg-rose-500 hover:bg-rose-600 rounded-md w-1/2'>
                            Fast Unstake
                        </button>
                        <button onClick={delayedUnstake} className='py-1 px-3 bg-rose-500 disabled:hover:bg-rose-500 hover:bg-rose-600 rounded-md w-1/2'>
                            Slow Unstake
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Vault);
