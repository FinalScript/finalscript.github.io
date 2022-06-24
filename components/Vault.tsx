import { Contract } from 'web3-eth-contract';
import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { contractAddresses } from '../config';
import { abbreviateNumber } from '../utils';

interface Props {
    vaultContract?: Contract | undefined;
    account?: string;
}

const Vault = ({ vaultContract, account }: Props) => {
    const [totalBalance, setTotalBalance] = useState<BigNumber>();
    const [stakedBalance, setStakedBalance] = useState<BigNumber>();
    const [unlockAmounts, setUnlockAmounts] = useState<BigNumber>();
    const [unlockTimestamp, setUnlockTimestamp] = useState<any>();
    const [input, setInput] = useState('0');

    useEffect(() => {
        getStakedBalance();
        getTotalBalance();
        getUnlockAmounts();
        getUnlockTimestamp();
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
            shares = 0;

        if (vaultContract?.methods && account) {
            diamonds = await vaultContract?.methods.balanceOf(account).call();
            shares = await vaultContract?.methods.sharesToDiamonds(diamonds).call();
        }

        const stakedBalance = new BigNumber(shares);
        setStakedBalance(new BigNumber(Web3.utils.fromWei(stakedBalance.isNaN() ? '0' : stakedBalance.toFixed(0))));
    };

    const getUnlockAmounts = async () => {
        let diamonds = 0;

        if (vaultContract?.methods && account) {
            diamonds = await vaultContract?.methods.unlockAmounts(account).call();
        }

        setUnlockAmounts(new BigNumber(Web3.utils.fromWei(new BigNumber(diamonds).toFixed(0))));
    };

    const getUnlockTimestamp = async () => {
        if (vaultContract?.methods && account) {
            let startTimestamp = await vaultContract?.methods.unlockTimestamps(account).call();

            const futureTime = new Date(parseInt(startTimestamp) * 1000);
            setInterval(() => {
                const timeLeft = futureTime.getTime() - new Date().getTime();

                const timeRemaining = {
                    h: Math.floor(timeLeft / 1000 / 60 / 60),
                    m: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
                    s: Math.floor((timeLeft % (1000 * 60)) / 1000),
                };

                setUnlockTimestamp({
                    timeDiff: timeLeft,
                    timeRemaining,
                    withdraw: timeLeft < 0 ? false : true,
                });
            }, 1000);
        }
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
            // new BigNumber(input).times(totalSupply).div(diamondBalance).toFormat()
            const shares = await vaultContract?.methods.diamondsToShares(input).call();

            vaultContract?.methods.quickUnstake(Web3.utils.toWei(shares)).send({
                to: contractAddresses.vault,
                from: account,
                value: 0,
            });
        }
    };

    const delayedUnstake = async () => {
        if (vaultContract?.methods && account) {
            const diamondBalance = await vaultContract?.methods.diamondBalance().call();
            const totalSupply = await vaultContract?.methods.totalSupply().call();

            // new BigNumber(input).times(totalSupply).div(diamondBalance).toFormat()

            vaultContract?.methods.prepareDelayedUnstake(Web3.utils.toWei(new BigNumber(input).times(totalSupply).div(diamondBalance).toFixed(10))).send({
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
                    <p>{totalBalance && abbreviateNumber(totalBalance)}</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>Staked Balance</p>
                    <p>{stakedBalance && abbreviateNumber(stakedBalance)}</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>% of Vault</p>
                    <p>
                        {totalBalance &&
                            stakedBalance &&
                            `${stakedBalance
                                ?.dividedBy(totalBalance.eq(0) ? 1 : totalBalance)
                                .times(100)
                                .toFormat(5)}%`}
                    </p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>Pending Balance</p>
                    <p>{unlockAmounts && abbreviateNumber(unlockAmounts)}</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>Withdrawable In</p>
                    <div>
                        {unlockTimestamp?.timeRemaining && unlockTimestamp?.withdraw ? (
                            <span className='text-sm text-gray-300 flex space-x-1 justify-center'>
                                {unlockTimestamp.timeRemaining.h && <span>{unlockTimestamp.timeRemaining.h}h</span>}
                                {unlockTimestamp.timeRemaining.m && <span>{unlockTimestamp.timeRemaining.m}m</span>}
                                {unlockTimestamp.timeRemaining.s && <span>{unlockTimestamp.timeRemaining.s}s</span>}
                            </span>
                        ) : (
                            <span className='text-sm text-green-500 flex space-x-1 justify-center'>Ready!</span>
                        )}
                    </div>
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
