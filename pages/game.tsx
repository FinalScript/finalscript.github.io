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

    const [staked, setStaked] = useState<number[]>([]);
    const [selectedStaked, setSelectedStaked] = useState<number[]>([]);
    const [stakedData, setStakedData] = useState<any>({});

    const [cooldowns, setCooldowns] = useState<number[]>([]);
    const [selectedCooldowns, setSelectedCooldowns] = useState<number[]>([]);
    const [cooldownsData, setCooldownsData] = useState<any>({});
    const [cooldownRemainingInterval, setCooldownRemainingInterval] = useState<any>();

    const [myDiamonds, setMyDiamonds] = useState<any>(0);
    const [earnedDiamonds, setEarnedDiamonds] = useState<any>(0);
    const [earnedDiamondsInterval, setEarnedDiamondsInterval] = useState<any>();

    useEffect(() => {
        setMiners([]);

        if (blockchain.minerContract && blockchain.account) {
            getMyMiners();
        }
    }, [blockchain.minerContract, blockchain.account]);

    useEffect(() => {
        setStaked([]);

        if (blockchain.mineContract && blockchain.account) {
            getStakedMiners();
        }

        setCooldowns([]);

        if (blockchain.mineContract && blockchain.account) {
            getCooldowns();
        }
    }, [blockchain.mineContract, blockchain.account]);

    useEffect(() => {
        getMyDiamonds();
    }, [blockchain.diamondContract, blockchain.account]);

    const getMyDiamonds = async () => {
        let diamonds = 0;

        if (blockchain.diamondContract?.methods && blockchain.account) {
            diamonds = await blockchain.diamondContract?.methods.balanceOf(blockchain.account).call();
        }

        setMyDiamonds(parseFloat(Web3.utils.fromWei(Web3.utils.toBN(diamonds))));
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

        setMiners(minersState);
    };

    const getStakedMiners = async () => {
        const minersState = [];
        clearTimeout(earnedDiamondsInterval);

        if (blockchain.mineContract?.methods && blockchain.account) {
            const numMiners = await blockchain.mineContract?.methods.ownedStakesBalance(blockchain.account).call();

            if (numMiners !== 0) {
                const miners = await blockchain.mineContract.methods.batchedStakesOfOwner(blockchain.account, 0, numMiners).call();

                if (miners) {
                    for (const miner of miners) {
                        minersState.push(parseInt(miner['tokenId']));
                    }
                    const yieldDps = await blockchain.mineContract?.methods.YIELD_CPS().call();

                    setEarnedDiamondsInterval(
                        setInterval(() => {
                            let totalAcccrued = parseFloat(Web3.utils.fromWei('0', 'ether'));

                            for (const miner of miners) {
                                const accrued = parseFloat(
                                    Web3.utils.fromWei(
                                        Web3.utils.toBN(
                                            parseInt(
                                                ((Math.round(Date.now() - Math.round(miner.startTimestamp * 1000)) *
                                                    (miner.level === '0' ? 1 : 5) *
                                                    parseFloat(yieldDps)) /
                                                    1000).toString(),
                                                10
                                            ).toString()
                                        ),
                                        'ether'
                                    )
                                );

                                setStakedData((prevState: any) => {
                                    return { ...prevState, [miner.tokenId]: { ...prevState[miner.tokenId], earned: accrued } };
                                });

                                totalAcccrued += accrued;
                            }

                            setEarnedDiamonds(totalAcccrued);
                        }, 100)
                    );

                    // getEarnedDiamonds(stakedIds);

                    minersState.sort((a, b) => a - b);
                }
            }
        }

        setStaked(minersState);
    };

    const getCooldowns = async () => {
        const cooldownsState: any = [];
        clearTimeout(cooldownRemainingInterval);

        if (blockchain.mineContract?.methods && blockchain.account) {
            const numMiners = await blockchain.mineContract?.methods.ownedCooldownsBalance(blockchain.account).call();

            if (numMiners !== 0) {
                const cooldowns = await blockchain.mineContract.methods.batchedCooldownsOfOwner(blockchain.account, 0, numMiners).call();
                const unstakeCooldownDuration = await blockchain.mineContract?.methods.UNSTAKE_COOLDOWN_DURATION().call();

                if (cooldowns) {
                    for (const cooldown of cooldowns) {
                        cooldownsState.push(parseInt(cooldown['tokenId']));
                    }

                    setCooldownRemainingInterval(
                        setInterval(() => {
                            for (const cooldown of cooldowns) {
                                const futureTime = new Date((parseInt(cooldown.startTimestamp) + parseInt(unstakeCooldownDuration)) * 1000);

                                const timeLeft = futureTime.getTime() - new Date().getTime();

                                const timeRemaining = {
                                    h: Math.floor(timeLeft / 1000 / 60 / 60),
                                    m: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
                                    s: Math.floor((timeLeft % (1000 * 60)) / 1000),
                                };

                                setCooldownsData((prevState: any) => {
                                    return {
                                        ...prevState,
                                        [cooldown.tokenId]: {
                                            ...prevState[cooldown.tokenId],
                                            timeDiff: timeLeft,
                                            timeRemaining,
                                            withdraw: timeLeft > 0 ? false : true,
                                        },
                                    };
                                });
                            }
                        }, 1000)
                    );
                }
            }
        }

        setCooldowns(cooldownsState);
    };

    const claimDiamonds = async () => {
        if (blockchain.diamondContract?.methods && blockchain.mineContract?.methods && blockchain.account) {
            blockchain.mineContract?.methods
                .claimDiamondsAndMaybeUnstake(staked, false)
                .send({
                    to: contractAddresses.mine,
                    from: blockchain.account,
                    value: 0,
                })
                .once('sending', function (payload: any) {
                    console.log(payload);
                })
                .once('sent', function (payload: any) {
                    console.log(payload);
                })
                .once('transactionHash', function (hash: any) {
                    console.log(hash);
                })
                .once('receipt', function (hash: any) {
                    getStakedMiners();

                    getMyDiamonds();
                })
                .on('error', function (error: any) {
                    console.log(error);
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
                    .once('receipt', function (hash: any) {
                        getStakedMiners();

                        getMyMiners();
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
                            .once('receipt', function (hash: any) {
                                getStakedMiners();

                                getMyMiners();
                            })
                            .catch((err: any) => {
                                console.log(err);
                            });
                    });
            }
        }
    };

    const unstake = async () => {
        if (blockchain.diamondContract?.methods && blockchain.mineContract?.methods && blockchain.account) {
            blockchain.mineContract?.methods
                .claimDiamondsAndMaybeUnstake(selectedStaked, true)
                .send({
                    to: contractAddresses.mine,
                    from: blockchain.account,
                    value: 0,
                })
                .once('receipt', function (hash: any) {
                    getStakedMiners();

                    getCooldowns();
                })
                .catch((err: any) => {
                    console.log(err);
                });
        }
    };

    const withdraw = async () => {
        if (blockchain.mineContract?.methods && blockchain.account) {
            blockchain.mineContract?.methods
                .withdrawMiner(selectedCooldowns)
                .send({
                    to: contractAddresses.mine,
                    from: blockchain.account,
                    value: 0,
                })
                .once('receipt', function (hash: any) {
                    getMyMiners();

                    getCooldowns();
                })
                .catch((err: any) => {
                    console.log(err);
                });
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
                        <div className='flex flex-col justify-center items-center space-y-5 overflow-auto pt-44 pb-11'>
                            <div className='px-11 text-center w-full'>
                                <div className='text-xl text-center flex flex-col items-center bg-gray-700 text-white shadow-lg p-6 rounded-lg'>
                                    <div className='flex items-center space-x-5'>
                                        <h5 className='flex flex-col items-start'>
                                            <span>Total Diamonds: </span>
                                            <span>Earned Diamonds: </span>
                                        </h5>
                                        <h5 className='flex flex-col items-start'>
                                            <span>{myDiamonds.toFixed(5)}</span>
                                            <span>{earnedDiamonds.toFixed(5)}</span>
                                        </h5>
                                    </div>
                                    <button
                                        disabled={earnedDiamonds === 0}
                                        onClick={claimDiamonds}
                                        className='mt-4 py-1 px-3 bg-rose-500 disabled:hover:bg-rose-500 hover:bg-rose-600 rounded-md'>
                                        Claim
                                    </button>
                                </div>
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
                                                setSelectedStaked([]);
                                            }}
                                            className='py-1 px-3 bg-gray-400 hover:bg-gray-500 rounded-md'>
                                            Unselect
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedStaked([...staked]);
                                            }}
                                            className='py-1 px-3 bg-gray-400 hover:bg-gray-500 rounded-md'>
                                            Select All
                                        </button>
                                        <button
                                            disabled={selectedStaked.length === 0}
                                            onClick={unstake}
                                            className='py-1 px-3 bg-rose-500 disabled:hover:bg-rose-500 hover:bg-rose-600 rounded-md'>
                                            Unstake
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-wrap justify-center'>
                                    {staked.map((miner: any) => {
                                        return (
                                            <div
                                                key={miner}
                                                onClick={() => {
                                                    const index = selectedStaked.indexOf(miner);

                                                    if (index > -1) {
                                                        setSelectedStaked(selectedStaked.filter((item) => item !== miner));
                                                    } else {
                                                        setSelectedStaked([...selectedStaked, miner]);
                                                    }
                                                }}
                                                className={
                                                    'relative text-white shadow-lg p-4 mr-1 mb-1 w-[100px] cursor-pointer ' +
                                                    (selectedStaked.indexOf(miner) !== -1 ? ' bg-gray-500' : 'bg-gray-700')
                                                }>
                                                <div className='flex flex-col items-center'>
                                                    <p className='text-lg'>{miner}</p>
                                                    {stakedData[miner]?.earned && (
                                                        <p className='text-sm text-gray-300'>{stakedData[miner].earned.toFixed(3)}</p>
                                                    )}
                                                </div>
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
                                            disabled={selectedCooldowns.length === 0}
                                            onClick={withdraw}
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
                                                    if (cooldownsData[cooldown]?.withdraw) {
                                                        const index = selectedCooldowns.indexOf(cooldown);

                                                        if (index > -1) {
                                                            setSelectedCooldowns(selectedCooldowns.filter((item) => item !== cooldown));
                                                        } else {
                                                            setSelectedCooldowns([...selectedCooldowns, cooldown]);
                                                        }
                                                    }
                                                }}
                                                className={
                                                    'relative text-white shadow-lg p-4 mr-1 mb-1 w-[120px] cursor-pointer ' +
                                                    (selectedCooldowns.indexOf(cooldown) !== -1 ? ' bg-gray-500' : 'bg-gray-700')
                                                }>
                                                <p className='text-lg'>{cooldown}</p>
                                                {cooldownsData[cooldown]?.timeRemaining && !cooldownsData[cooldown]?.withdraw ? (
                                                    <p className='text-sm text-gray-300 flex space-x-1 justify-center'>
                                                        {cooldownsData[cooldown].timeRemaining.h !== 0 && (
                                                            <span>{cooldownsData[cooldown].timeRemaining.h}h</span>
                                                        )}
                                                        {cooldownsData[cooldown].timeRemaining.m !== 0 && (
                                                            <span>{cooldownsData[cooldown].timeRemaining.m}m</span>
                                                        )}
                                                        {cooldownsData[cooldown].timeRemaining.s !== 0 && (
                                                            <span>{cooldownsData[cooldown].timeRemaining.s}s</span>
                                                        )}
                                                    </p>
                                                ) : (
                                                    <p className='text-sm text-green-500 flex space-x-1 justify-center'>Ready!</p>
                                                )}
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
