import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BlockchainState } from '../types';
import { contractAddresses, siteProtection } from '../config';
import Web3 from 'web3';
import { BigNumber } from 'ethers';

const game: NextPage = () => {
    const blockchain = useSelector((state: BlockchainState) => state.blockchain);
    const [myMiners, setMyMiners] = useState<any>([]);
    const [stakedMiners, setStakedMiners] = useState<any>([]);
    const [myDiamonds, setMyDiamonds] = useState<any>(0);
    const [earnedDiamonds, setEarnedDiamonds] = useState<any>(0);
    const [toStake, setToStake] = useState(0);

    useEffect(() => {
        setMyMiners([]);

        if (blockchain.minerContract && blockchain.account) {
            getMyMiners().then((res) => {
                if (res) {
                    setMyMiners(res);
                }
            });
        }
    }, [blockchain.minerContract, blockchain.account]);

    useEffect(() => {
        setMyMiners([]);

        if (blockchain.mineContract && blockchain.account) {
            getStakedMiners().then((res) => {
                if (res) {
                    setStakedMiners(res);
                }
            });
        }
    }, [blockchain.mineContract, blockchain.account]);

    useEffect(() => {
        getMyDiamonds().then((res) => {
            if (res) {
                setMyDiamonds(parseFloat(Web3.utils.fromWei(res.toString())).toFixed(5));
            }
        });
    }, [blockchain.diamondContract, blockchain.account]);

    const getMyDiamonds = async () => {
        if (blockchain.diamondContract?.methods && blockchain.account) {
            const diamonds = await blockchain.diamondContract?.methods.balanceOf(blockchain.account).call();

            return diamonds || 0;
        }
    };

    const getMyMiners = async () => {
        if (blockchain.minerContract?.methods && blockchain.account) {
            const numMiners = await blockchain.minerContract?.methods.balanceOf(blockchain.account).call();

            if (numMiners !== 0) {
                const miners = await blockchain.minerContract.methods.batchedMinerOfOwner(blockchain.account, 0, 25).call();

                if (miners) {
                    const minersState = [];

                    for (const miner of miners) {
                        const uri: string = await blockchain.minerContract.methods.tokenURI(miner['tokenId']).call();

                        // const data = await fetch(`https://gateway.pinata.cloud/ipfs/${uri.replace('ipfs://', '')}`, { mode: 'cors' });

                        // const json = await data.json();

                        // const image = `https://gateway.pinata.cloud/ipfs/${json.image.replace('ipfs://', '')}`;

                        minersState.push({
                            tokenId: miner['tokenId'],
                        });
                    }

                    return minersState;
                }
            }
        }
    };

    const getEarnedDiamonds = async (tokenIds: []) => {
        if (blockchain.mineContract?.methods && blockchain.account) {
            const earnedDiamonds = await blockchain.mineContract?.methods.getDiamondsAccruedForMany(tokenIds).call();

            let sum = parseFloat(Web3.utils.fromWei('0', 'ether'));

            console.log(earnedDiamonds);

            earnedDiamonds.forEach((element: any) => {
                sum += parseFloat(Web3.utils.fromWei(element, 'ether'));
            });

            setEarnedDiamonds(sum.toFixed(5));
        }
    };

    const getStakedMiners = async () => {
        if (blockchain.mineContract?.methods && blockchain.account) {
            const numMiners = await blockchain.mineContract?.methods.ownedStakesBalance(blockchain.account).call();

            if (numMiners !== 0) {
                const miners = await blockchain.mineContract.methods.batchedStakesOfOwner(blockchain.account, 0, 25).call();

                let stakedIds: any = [];

                miners.forEach((miner: any) => {
                    stakedIds.push(parseInt(miner.tokenId));
                });

                getEarnedDiamonds(stakedIds);

                // earned = miners.map((miner: any) => miner.accrual).reduce((prev: any, next: any) => Web3.utils.toBN(prev).add(Web3.utils.toBN(next)));

                // let converted: any = Web3.utils.fromWei(earned.toString());

                // converted = parseFloat(converted);

                // setEarnedDiamonds(converted.toFixed(5));

                if (miners) {
                    const minersState = [];

                    for (const miner of miners) {
                        minersState.push({
                            tokenId: miner['tokenId'],
                        });
                    }

                    return minersState;
                }
            }
        }
    };

    const claimDiamonds = async () => {
        if (blockchain.diamondContract?.methods && blockchain.mineContract?.methods && blockchain.account) {
            blockchain.mineContract?.methods
                .claimDiamondsAndMaybeUnstake([6], true)
                .send({
                    gasLimit: String(300000),
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
                    .stakeMany([toStake])
                    .send({
                        gasLimit: String(700000),
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
                        gasLimit: String(70000),
                        to: contractAddresses.mine,
                        from: blockchain.account,
                        value: 0,
                    })
                    .then(() => {
                        blockchain.mineContract?.methods
                            .stakeMany([toStake])
                            .send({
                                gasLimit: String(700000),
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
                    <section className='text-gray-900 bg-transparent body-font h-screen flex flex-col justify-center items-center space-y-5 overflow-auto'>
                        <div className='text-xl text-center bg-gray-700 text-white shadow-lg p-2 px-12 rounded-lg'>
                            <h5>Total Diamonds: {myDiamonds} 💎</h5>
                            <h5>Earned Diamonds: {earnedDiamonds} 💎</h5>
                            <button onClick={claimDiamonds} className='mt-4 bg-rose-500 rounded-lg p-2 px-4'>
                                Claim
                            </button>
                        </div>
                        <div className='text-xl text-center bg-gray-700 text-white shadow-lg p-2 px-12 rounded-lg'>
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
                        </div>
                        <div className='px-11 text-center'>
                            <h3 className='mb-2 p-1 px-3 bg-gray-700 text-white rounded-lg shadow-lg'>Staked</h3>
                            <div className='flex flex-wrap'>
                                {stakedMiners.map((miner: any) => {
                                    return (
                                        <div key={miner.tokenId} className='relative bg-gray-700 text-white rounded-lg shadow-lg p-4 mr-4 mb-4'>
                                            <p className=''>{miner.tokenId}</p>
                                            {/* <div className='w-[100px] h-[200px]'>
                                <img src={miner.image} className='object-cover w-full h-full' />
                            </div> */}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='px-11 text-center'>
                            <h3 className='mb-2 p-1 px-3 bg-gray-700 text-white rounded-lg shadow-lg'>Not Staked</h3>
                            <div className='flex flex-wrap'>
                                {myMiners.map((miner: any) => {
                                    return (
                                        <div key={miner.tokenId} className='relative bg-gray-700 text-white rounded-lg shadow-lg p-4 mr-4 mb-4'>
                                            <p className=''>{miner.tokenId}</p>
                                            {/* <div className='w-[100px] h-[200px]'>
                                <img src={miner.image} className='object-cover w-full h-full' />
                            </div> */}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                ))}
        </>
    );
};

export default game;
