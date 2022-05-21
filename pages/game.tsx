import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BlockchainState } from '../types';
import { contractAddresses, siteProtection } from '../config';
import Web3 from 'web3';

const game: NextPage = () => {
    const blockchain = useSelector((state: BlockchainState) => state.blockchain);
    const [miners, setMiners] = useState<number[]>([]);
    const [selectedMiners, setSelectedMiners] = useState<number[]>([]);
    const [stakedMiners, setStakedMiners] = useState<number[]>([]);
    const [selectedStakedMiners, setSelectedStakedMiners] = useState<number[]>([]);
    const [cooldowns, setCooldowns] = useState<number[]>([]);
    const [selectedCooldowns, setSelectedCooldowns] = useState<number[]>([]);
    const [myDiamonds, setMyDiamonds] = useState<any>(0);
    const [earnedDiamonds, setEarnedDiamonds] = useState<any>(0);

    useEffect(() => {
        setMiners([]);

        if (blockchain.minerContract && blockchain.account) {
            getMyMiners().then((res: any) => {
                setMiners(res);
            });
        }
    }, [blockchain.minerContract, blockchain.account]);

    useEffect(() => {
        setStakedMiners([]);

        if (blockchain.mineContract && blockchain.account) {
            getStakedMiners().then((res: any) => {
                setStakedMiners(res);
            });
        }

        setCooldowns([]);

        if (blockchain.mineContract && blockchain.account) {
            getCooldowns().then((res: any) => {
                setCooldowns(res);
            });
        }
    }, [blockchain.mineContract, blockchain.account]);

    useEffect(() => {
        getMyDiamonds().then((res) => {
            setMyDiamonds(parseFloat(Web3.utils.fromWei(res.toString())));
        });
    }, [blockchain.diamondContract, blockchain.account]);

    const getMyDiamonds = async () => {
        let diamonds = 0;

        if (blockchain.diamondContract?.methods && blockchain.account) {
            diamonds = await blockchain.diamondContract?.methods.balanceOf(blockchain.account).call();
        }

        return diamonds;
    };

    const getMyMiners = async () => {
        const minersState = [];

        if (blockchain.minerContract?.methods && blockchain.account) {
            const numMiners = await blockchain.minerContract?.methods.balanceOf(blockchain.account).call();

            if (numMiners !== 0) {
                const miners = await blockchain.minerContract.methods.batchedMinerOfOwner(blockchain.account, 0, numMiners).call();

                if (miners) {
                    for (const miner of miners) {
                        minersState.push(parseInt(miner['tokenId']));
                    }

                    minersState.sort((a, b) => a - b);
                }
            }
        }

        return minersState;
    };

    const getStakedMiners = async () => {
        const minersState = [];

        if (blockchain.mineContract?.methods && blockchain.account) {
            const numMiners = await blockchain.mineContract?.methods.ownedStakesBalance(blockchain.account).call();

            if (numMiners !== 0) {
                const miners = await blockchain.mineContract.methods.batchedStakesOfOwner(blockchain.account, 0, numMiners).call();

                if (miners) {
                    let stakedIds: any = [];

                    for (const miner of miners) {
                        stakedIds.push(parseInt(miner['tokenId']));
                        minersState.push(parseInt(miner['tokenId']));
                    }
                    const yieldDps = await blockchain.mineContract?.methods.YIELD_CPS().call();

                    setInterval(() => {
                        let accrued = parseFloat(Web3.utils.fromWei('0', 'ether'));

                        for (const miner of miners) {
                            accrued += parseFloat(
                                Web3.utils.fromWei(
                                    (
                                        (Math.round(Date.now() - Math.round(miner.startTimestamp * 1000)) *
                                            (miner.level === '0' ? 1 : 5) *
                                            parseFloat(yieldDps)) /
                                        1000
                                    ).toString(),
                                    'ether'
                                )
                            );
                        }

                        setEarnedDiamonds(accrued);
                    }, 100);

                    // getEarnedDiamonds(stakedIds);

                    minersState.sort((a, b) => a - b);
                }
            }
        }

        return minersState;
    };

    const getCooldowns = async () => {
        const cooldownsState = [];

        if (blockchain.mineContract?.methods && blockchain.account) {
            const numMiners = await blockchain.mineContract?.methods.ownedCooldownsBalance(blockchain.account).call();

            if (numMiners !== 0) {
                const cooldowns = await blockchain.mineContract.methods.batchedCooldownsOfOwner(blockchain.account, 0, numMiners).call();

                if (cooldowns) {
                    for (const cooldown of cooldowns) {
                        cooldownsState.push(parseInt(cooldown['tokenId']));
                    }

                    cooldownsState.sort((a, b) => a - b);
                }
            }
        }

        return cooldownsState;
    };

    const getEarnedDiamonds = async (tokenIds: []) => {
        if (blockchain.mineContract?.methods && blockchain.account) {
            const earnedDiamonds = await blockchain.mineContract?.methods.getDiamondsAccruedForMany(tokenIds).call();

            let sum = parseFloat(Web3.utils.fromWei('0', 'ether'));

            earnedDiamonds.forEach((element: any) => {
                sum += parseFloat(Web3.utils.fromWei(element, 'ether'));
            });

            setEarnedDiamonds(sum);
        }
    };

    const claimDiamonds = async () => {
        if (blockchain.diamondContract?.methods && blockchain.mineContract?.methods && blockchain.account) {
            blockchain.mineContract?.methods
                .claimDiamondsAndMaybeUnstake(stakedMiners, false)
                .send({
                    to: contractAddresses.mine,
                    from: blockchain.account,
                    value: 0,
                })
                .then((res: any) => {
                    console.log(res);
                })
                .catch((err: any) => {
                    console.log(err);
                });
        }
    };

    const unstake = async () => {
        if (blockchain.diamondContract?.methods && blockchain.mineContract?.methods && blockchain.account) {
            blockchain.mineContract?.methods
                .claimDiamondsAndMaybeUnstake(selectedStakedMiners, true)
                .send({
                    to: contractAddresses.mine,
                    from: blockchain.account,
                    value: 0,
                })
                .then((res: any) => {
                    console.log(res);
                })
                .catch((err: any) => {
                    console.log(err);
                });
        }
    };

    const stake = async () => {
        if (blockchain.mineContract?.methods && blockchain.account) {
            const isApproved = await blockchain.minerContract?.methods.isApprovedForAll(blockchain.account, contractAddresses.mine).call();

            if (isApproved) {
                blockchain.mineContract?.methods
                    .stakeMany(selectedMiners)
                    .send({
                        to: contractAddresses.mine,
                        from: blockchain.account,
                        value: 0,
                    })
                    .then((res: any) => {
                        console.log(res);
                    })
                    .catch((err: any) => {
                        console.log(err);
                    });
            } else {
                blockchain.minerContract?.methods
                    .setApprovalForAll(contractAddresses.mine, true)
                    .send({
                        to: contractAddresses.mine,
                        from: blockchain.account,
                        value: 0,
                    })
                    .then(() => {
                        blockchain.mineContract?.methods
                            .stakeMany(selectedMiners)
                            .send({
                                to: contractAddresses.mine,
                                from: blockchain.account,
                                value: 0,
                            })
                            .then((res: any) => {
                                console.log(res);
                            })
                            .catch((err: any) => {
                                console.log(err);
                            });
                    });
            }
        }
    };

    return (
        <>
            <Head>
                <title>Game | MinerVerse</title>
            </Head>

            {siteProtection.whitelistOnly &&
                (!siteProtection.whitelistedWallets.find((address) => address.toLowerCase() === blockchain.account?.toLowerCase() || '') ? (
                    <></>
                ) : (
                    <section className='text-gray-900 bg-gray-900 body-font h-full'>
                        <div className='flex flex-col justify-center items-center space-y-5 overflow-auto pt-44'>
                            <div className='text-xl text-center bg-gray-700 text-white shadow-lg p-6 px-12 rounded-lg'>
                                <h5>Total Diamonds: {myDiamonds.toFixed(5)} 💎</h5>
                                <h5>Earned Diamonds: {earnedDiamonds.toFixed(5)} 💎</h5>
                                <button onClick={claimDiamonds} className='mt-4 bg-rose-500 rounded-lg p-2 px-4'>
                                    Claim
                                </button>
                            </div>
                            {/* <div className='text-xl text-center bg-gray-700 text-white shadow-lg p-2 px-12 rounded-lg'>
                            <label>Token ID</label>
                            <input
                                value={toStake}
                                onChange={(e) => {
                                    setToStake(parseInt(e.target.value));
                                }}
                                type='number'
                                max={20000}
                                placeholder='0'
                                className='text-center border-none outline-none ml-3 w-[200px] bg-gray-700 text-white'
                            />
                            <button onClick={stake} className='ml-4 bg-rose-500 rounded-lg p-2 px-4'>
                                Stake
                            </button>
                        </div> */}
                            <div className='px-11 text-center w-full'>
                                <div className='flex items-center justify-between w-full mb-4 p-2 px-3 bg-gray-700 text-white rounded-lg shadow-lg'>
                                    <h3 className='font-bold text-xl'>Staked</h3>
                                    <div className='flex space-x-3'>
                                        <button
                                            onClick={() => {
                                                setSelectedStakedMiners([]);
                                            }}
                                            className='py-1 px-3 bg-gray-400 hover:bg-gray-500 rounded-md'>
                                            Unselect
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedStakedMiners([...stakedMiners]);
                                            }}
                                            className='py-1 px-3 bg-gray-400 hover:bg-gray-500 rounded-md'>
                                            Select All
                                        </button>
                                        <button
                                            disabled={selectedStakedMiners.length === 0}
                                            onClick={unstake}
                                            className='py-1 px-3 bg-rose-500 disabled:hover:bg-rose-500 hover:bg-rose-600 rounded-md'>
                                            Unstake
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-wrap justify-center'>
                                    {stakedMiners.map((miner: any) => {
                                        return (
                                            <div
                                                key={miner}
                                                onClick={() => {
                                                    const index = selectedStakedMiners.indexOf(miner);

                                                    if (index > -1) {
                                                        setSelectedStakedMiners(selectedStakedMiners.filter((item) => item !== miner));
                                                    } else {
                                                        setSelectedStakedMiners([...selectedStakedMiners, miner]);
                                                    }
                                                }}
                                                className={
                                                    'relative text-white shadow-lg p-4 mr-1 mb-1 w-[100px] cursor-pointer ' +
                                                    (selectedStakedMiners.indexOf(miner) !== -1 ? ' bg-gray-500' : 'bg-gray-700')
                                                }>
                                                <p className=''>{miner}</p>
                                                {/* <div className='w-[100px] h-[200px]'>
                                <img src={miner.image} className='object-cover w-full h-full' />
                            </div> */}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className='px-11 text-center w-full'>
                                <div className='flex items-center justify-between w-full mb-4 p-2 px-3 bg-gray-700 text-white rounded-lg shadow-lg'>
                                    <h3 className='font-bold text-xl'>Not Staked</h3>
                                    <div className='flex space-x-3'>
                                        <button
                                            onClick={() => {
                                                setSelectedMiners([]);
                                            }}
                                            className='py-1 px-3 bg-gray-400 hover:bg-gray-500 rounded-md'>
                                            Unselect
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedMiners([...miners]);
                                            }}
                                            className='py-1 px-3 bg-gray-400 hover:bg-gray-500 rounded-md'>
                                            Select All
                                        </button>
                                        <button
                                            disabled={selectedMiners.length === 0}
                                            onClick={stake}
                                            className='py-1 px-3 bg-rose-500 disabled:hover:bg-rose-500 hover:bg-rose-600 rounded-md'>
                                            Stake
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-wrap justify-center'>
                                    {miners.map((miner: any) => {
                                        return (
                                            <div
                                                key={miner}
                                                onClick={() => {
                                                    const index = selectedMiners.indexOf(miner);

                                                    if (index > -1) {
                                                        setSelectedMiners(selectedMiners.filter((item) => item !== miner));
                                                    } else {
                                                        setSelectedMiners([...selectedMiners, miner]);
                                                    }
                                                }}
                                                className={
                                                    'relative text-white shadow-lg p-4 mr-1 mb-1 w-[100px] cursor-pointer ' +
                                                    (selectedMiners.indexOf(miner) !== -1 ? ' bg-gray-500' : 'bg-gray-700')
                                                }>
                                                <p className=''>{miner}</p>
                                                {/* <div className='w-[100px] h-[200px]'>
                                <img src={miner.image} className='object-cover w-full h-full' />
                            </div> */}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>{' '}
                            <div className='px-11 text-center w-full'>
                                <div className='flex items-center justify-between w-full mb-4 p-2 px-3 bg-gray-700 text-white rounded-lg shadow-lg'>
                                    <h3 className='font-bold text-xl'>Cooldown</h3>
                                    <div className='flex space-x-3'>
                                        <button
                                            onClick={() => {
                                                setSelectedCooldowns([]);
                                            }}
                                            className='py-1 px-3 bg-gray-400 hover:bg-gray-500 rounded-md'>
                                            Unselect
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedCooldowns([...cooldowns]);
                                            }}
                                            className='py-1 px-3 bg-gray-400 hover:bg-gray-500 rounded-md'>
                                            Select All
                                        </button>
                                        <button
                                            disabled={selectedMiners.length === 0}
                                            onClick={stake}
                                            className='py-1 px-3 bg-rose-500 disabled:hover:bg-rose-500 hover:bg-rose-600 rounded-md'>
                                            Withdraw
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-wrap justify-center'>
                                    {cooldowns.map((cooldown: any) => {
                                        return (
                                            <div
                                                key={cooldown}
                                                onClick={() => {
                                                    const index = selectedCooldowns.indexOf(cooldown);

                                                    if (index > -1) {
                                                        setSelectedCooldowns(selectedCooldowns.filter((item) => item !== cooldown));
                                                    } else {
                                                        setSelectedCooldowns([...selectedCooldowns, cooldown]);
                                                    }
                                                }}
                                                className={
                                                    'relative text-white shadow-lg p-4 mr-1 mb-1 w-[100px] cursor-pointer ' +
                                                    (selectedCooldowns.indexOf(cooldown) !== -1 ? ' bg-gray-500' : 'bg-gray-700')
                                                }>
                                                <p className=''>{cooldown}</p>
                                                {/* <div className='w-[100px] h-[200px]'>
                                <img src={miner.image} className='object-cover w-full h-full' />
                            </div> */}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
        </>
    );
};

export default game;
