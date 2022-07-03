import type { NextPage } from 'next';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { contractAddresses, networkConfig, siteProtection } from '../config';
import { checkBalance, connect, switchNetwork } from '../redux/blockchain/blockchainActions';
import { BlockchainState, MintDataState, GeneralState } from '../types';
import Image from 'next/image';
import { checkIsWhiteListed, fetchData } from '../redux/mint/mintActions';
import { motion } from 'framer-motion';
import { addAlert, setBotError, setBotSpeech } from '../redux/general/generalActions';
import { InstallMetaMask } from '../components/InstallMetaMask';
import Head from 'next/head';
import { Mark } from '../components/Mark';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const blockchain = useSelector((state: BlockchainState) => state.blockchain);
    const mintData = useSelector((state: MintDataState) => state.mintData);
    const generalReducer = useSelector((state: GeneralState) => state.general);
    const [quantity, setQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState(0.0);
    const saleDetails = [
        // 'Fair sale (first come, first serve)',
        `Price: ${Web3.utils.fromWei(mintData.price)} ${networkConfig.nativeCurrency.symbol}`,
        `Total Supply: ${mintData.maxTotalSupply} Miners`,
        `Presale Supply: ${mintData.maxPresaleSupply} Miners`,
        // `Price: - ${networkConfig.nativeCurrency.symbol}`,
        // `Total Supply: - Miners`,
        // `Presale Supply: - Miners`,
        // `${blockchain.hasMetaMask ? 100 - mintData.superPercentage : 0}% chance to mint a Regular Miner`,
        `${mintData.superPercentage}% chance to mint a Super Miner`,
    ];
    const [countdownTimer, setCountdownTimer] = useState<any>();
    const countdownTimerInterval = useRef<any>();

    useEffect(() => {
        //dispatch(connect());
    }, []);

    useEffect(() => {
        dispatch(fetchData());
    }, [blockchain.minerContract]);

    useEffect(() => {
        setQuantity('');

        if (blockchain.account) {
            dispatch(checkIsWhiteListed(blockchain.account));
        }
    }, [blockchain.account, blockchain.network]);

    useEffect(() => {
        clearInterval(countdownTimerInterval.current);

        const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        if (!mintData.presaleOpen && !mintData.baseSalesOpen) {
            if (mintData.presaleStartTime) {
                countdownTimerInterval.current = setInterval(() => {
                    const futureTime = new Date(parseInt(mintData.presaleStartTime) * 1000);

                    const timeLeft = futureTime.getTime() - new Date().getTime();

                    const timeRemaining =
                        timeLeft > 0
                            ? {
                                  d: Math.floor(timeLeft / day),
                                  h: Math.floor((timeLeft % day) / hour),
                                  m: Math.floor((timeLeft % hour) / minute),
                                  s: Math.floor((timeLeft % minute) / second),
                                  until: 'PRESALE',
                              }
                            : null;

                    setCountdownTimer(timeRemaining);
                }, 1000);
            }
        } else if (mintData.presaleOpen && !mintData.baseSalesOpen) {
            if (mintData.baseSaleStartTime) {
                countdownTimerInterval.current = setInterval(() => {
                    const futureTime = new Date(parseInt(mintData.baseSaleStartTime) * 1000);

                    const timeLeft = futureTime.getTime() - new Date().getTime();

                    const timeRemaining =
                        timeLeft > 0
                            ? {
                                  d: Math.floor(timeLeft / day),
                                  h: Math.floor((timeLeft % day) / hour),
                                  m: Math.floor((timeLeft % hour) / minute),
                                  s: Math.floor((timeLeft % minute) / second),
                                  until: 'Public Sale',
                              }
                            : null;

                    setCountdownTimer(timeRemaining);
                }, 1000);
            }
        }
    }, [mintData.baseSaleStartTime, mintData.presaleStartTime, mintData.baseSalesOpen, mintData.presaleOpen]);

    useEffect(() => {
        if (quantity !== '') {
            setTotalPrice(parseFloat(mintData.price) * parseFloat(quantity) + parseFloat(mintData.nftTax));
        } else {
            setTotalPrice(0.0);
        }
    }, [quantity]);

    const handlePlay = useCallback(() => {
        if (
            siteProtection.whitelistOnly &&
            !siteProtection.whitelistedWallets.find((address) => address.toLowerCase() === blockchain.account?.toLowerCase() || '')
        ) {
            dispatch(setBotError(`Woah there, game is still in development, you're not allowed to enter yet!`));
        } else {
            router.push('/game');
        }
    }, [blockchain.account]);

    const mint = useCallback(() => {
        setTimeout(() => {
            if (quantity === '') {
                dispatch(setBotError(`Please enter a quantity (0-${mintData.maxPerMint})`));
            }

            if (blockchain.minerContract && blockchain.account && quantity !== '') {
                if (mintData.baseSalesOpen) {
                    blockchain.minerContract?.methods
                        .mintBase(parseInt(quantity))
                        .send({
                            gasLimit: String(7000000),
                            to: contractAddresses.miner,
                            from: blockchain.account,
                            value: totalPrice,
                        })
                        .once('sending', function (payload: any) {
                            console.log(payload);
                        })
                        .once('sent', function (payload: any) {
                            console.log(payload);
                        })
                        .once('transactionHash', function (hash: any) {
                            dispatch(setBotSpeech(`Requesting ${quantity} ${quantity === '1' ? 'miner' : 'miners'}... Please wait`));
                            console.log(hash);
                        })
                        .once('receipt', function (hash: any) {
                            dispatch(setBotSpeech(`Your ${quantity === '1' ? 'miner has' : 'miners have'} arrived!`));
                            console.log(hash);
                        })
                        .on('error', function (error: any) {
                            dispatch(setBotError(`Oh no! Your ${quantity === '1' ? 'miner' : 'miners'} couldn't make it!`));
                            console.log(error);
                        })
                        .then((res: any) => {
                            if (blockchain.account) {
                                dispatch(checkBalance(blockchain.account));
                            }
                            dispatch(
                                addAlert({
                                    isError: false,
                                    key: 'Transaction-' + res.transactionHash,
                                    hash: res.transactionHash,
                                    link: `${networkConfig.snowtrace}${res.transactionHash}`,
                                })
                            );
                            console.log(res);
                        });
                } else if (mintData.presaleOpen) {
                    blockchain.minerContract?.methods
                        .presaleMintBase(parseInt(quantity))
                        .send({
                            gasLimit: String(7000000),
                            to: contractAddresses.miner,
                            from: blockchain.account,
                            value: totalPrice,
                        })
                        .once('sending', function (payload: any) {
                            console.log(payload);
                        })
                        .once('sent', function (payload: any) {
                            console.log(payload);
                        })
                        .once('transactionHash', function (hash: any) {
                            dispatch(setBotSpeech(`Requesting ${quantity} ${quantity === '1' ? 'miner' : 'miners'}... Please wait`));
                            console.log(hash);
                        })
                        .once('receipt', function (hash: any) {
                            dispatch(setBotSpeech(`Your ${quantity === '1' ? 'miner has' : 'miners have'} arrived!`));
                            console.log(hash);
                        })
                        .on('error', function (error: any) {
                            dispatch(setBotError(`Oh no! Your ${quantity === '1' ? 'miner' : 'miners'} couldn't make it!`));
                            console.log(error);
                        })
                        .then((res: any) => {
                            if (blockchain.account) {
                                dispatch(checkBalance(blockchain.account));
                            }

                            dispatch(
                                addAlert({
                                    isError: false,
                                    key: 'Transaction-' + res.transactionHash,
                                    hash: res.transactionHash,
                                    link: `${networkConfig.snowtrace}${res.transactionHash}`,
                                })
                            );
                            console.log(res.transactionHash);
                        })
                        .catch((err: any) => {
                            console.log(err);
                        });
                }
            }
        }, 100);
    }, [blockchain.minerContract, blockchain.account, mintData, quantity, totalPrice]);

    const supplyPercentage = useMemo(() => {
        let percentage = '0%';

        if (mintData.totalSupply) {
            if (mintData.baseSalesOpen || mintData.gameStarted) {
                const num = ((mintData.totalSupply / mintData.maxBaseSupply) * 100).toFixed(0);

                percentage = num + '%';
            } else {
                const num = ((mintData.totalSupply / mintData.maxPresaleSupply) * 100).toFixed(0);

                percentage = num + '%';
            }
        }

        return percentage;
    }, [mintData]);

    const supplyFraction = useMemo(() => {
        let fraction = '- / -';

        if (mintData.totalSupply) {
            if (mintData.baseSalesOpen || mintData.gameStarted) {
                fraction = mintData.totalSupply + ' / ' + mintData.maxBaseSupply;

                if (mintData.totalSupply >= mintData.maxBaseSupply) {
                    fraction = 'Sold Out';
                }
            } else {
                fraction = mintData.totalSupply + ' / ' + mintData.maxPresaleSupply;
            }
        }

        return fraction;
    }, [mintData]);

    const ableToMint = useMemo(() => {
        if (mintData.gameStarted) {
            return false;
        } else {
            return true;
        }
    }, [mintData]);

    const ableToMintMessage = useMemo(() => {
        if (mintData.gameStarted) {
            return 'Game has already started';
        } else if (!mintData.presaleOpen) {
            return "Presale hasn't started";
        } else {
            return 'Mint';
        }
    }, [mintData]);

    return (
        <div className='relative overflow-hidden h-screen w-screen max-w-[100vw] px-0 md:px-10 lg:px-16 xl:px-24'>
            <Head>
                <title>Home | MinerVerse</title>
            </Head>

            {!generalReducer.isLoading && (
                <>
                    <motion.section
                        key={'minting-container'}
                        exit={{
                            opacity: 0,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.1 } }}
                        className='mint-section text-gray-400 body-font relative bottom-0'>
                        {!generalReducer.isLoading && (
                            <>
                                <div className={'parchment-frame absolute z-10 overflow-hidden select-none drop-shadow-parchment-stand'}>
                                    <Image src='/images/parchment-frame.png' layout='fill' objectFit='fill' />
                                </div>
                                <div className={'parchment-content relative text-gray-900 rounded-xl flex justify-center z-10'}>
                                    <div className={'parchment-image-container absolute -z-10 w-full h-full overflow-hidden select-none drop-shadow-parchment'}>
                                        <Image src='/images/parchment.png' layout='fill' objectFit='fill' />
                                    </div>
                                    <div className='flex flex-col h-full mint-container'>
                                        <h2 className='text-center font-bold text-black'>
                                            <span>Mint Miners</span>
                                        </h2>
                                        <div className='relative text-md flex items-center justify-center section'>
                                            <div className='relative image'>
                                                <Image src='/images/MinerTrio.png' objectFit='contain' layout='fill' />
                                            </div>
                                        </div>
                                        {countdownTimer && (
                                            <div className='text-center text-white font-bold countdown'>
                                                {countdownTimer.until && <p className=' '>{countdownTimer.until}</p>}
                                                {countdownTimer.d != 0 && <span>{countdownTimer.d}d </span>}
                                                {countdownTimer.h != 0 && <span>{countdownTimer.h}h </span>}
                                                {countdownTimer.m != 0 && <span>{countdownTimer.m}m </span>}
                                                {countdownTimer.s && <span className='text-red-500'>{countdownTimer.s}s </span>}
                                            </div>
                                        )}
                                        <div className='relative section'>
                                            <div className='flex justify-end'>
                                                <p className='font-medium text-gray-900'>{supplyFraction}</p>
                                            </div>
                                            <div className='w-full bg-yellow-900 rounded-full progress'>
                                                <div className='bg-green-500 h-full rounded-full max-w-full' style={{ width: supplyPercentage }}></div>
                                            </div>
                                        </div>
                                        <div className='relative flex flex-col section'>
                                            <label htmlFor='quantity' className='text-gray-900 flex justify-between'>
                                                <span className='font-bold'>Quantity</span>
                                                <span className='tracking-widest'>MAX ( {mintData.maxPerMint} )</span>
                                            </label>
                                            <input
                                                disabled={!ableToMint}
                                                title={ableToMintMessage}
                                                type='text'
                                                id='quantity'
                                                name='quantity'
                                                min={0}
                                                max={mintData.maxPerMint}
                                                onSelect={(e) => {
                                                    if (quantity === '0') {
                                                        setQuantity('');
                                                    }
                                                }}
                                                value={quantity}
                                                onChange={(e) => {
                                                    let { value, min, max }: any = e.target;

                                                    if (!isNaN(value)) {
                                                        value = Math.max(Number(min), Math.min(Number(max), Number(value))).toString();
                                                        setQuantity(value === '0' ? '' : value);
                                                    } else {
                                                        setQuantity('');
                                                    }
                                                }}
                                                placeholder={`Max ${mintData.maxPerMint} at a time`}
                                                className='w-full text-center disabled:cursor-not-allowed placeholder:text-gray-700 bg-zinc-400 bg-opacity-20 focus:bg-transparent focus:ring-2 rounded border-gray-600 outline-none transition-colors duration-200 ease-in-out'
                                            />
                                        </div>
                                        <div className='section font-bold'>
                                            <div className='relative tracking-widest flex justify-between'>
                                                <h5>NFT Tax</h5>
                                                <h5>{totalPrice === 0 ? '--' : Web3.utils.fromWei(mintData.nftTax) + ' AVAX'}</h5>
                                            </div>
                                            <div className='relative tracking-widest flex justify-between'>
                                                <h4>Total</h4>
                                                <h4>{totalPrice === 0 ? '--' : Web3.utils.fromWei(totalPrice.toString()) + ' AVAX'} </h4>
                                            </div>
                                        </div>
                                        <div className='relative flex flex-col section'>
                                            {blockchain.hasMetaMask ? (
                                                blockchain.account ? (
                                                    <>
                                                        <button
                                                            disabled={blockchain.isRightNetwork ? !ableToMint : false}
                                                            onClick={() => {
                                                                if (!blockchain.isRightNetwork) {
                                                                    switchNetwork();
                                                                } else {
                                                                    mint();
                                                                }
                                                            }}
                                                            title={blockchain.isRightNetwork ? ableToMintMessage : ''}
                                                            className={
                                                                'w-full text-white text-shadow-white font-bold border-0 disabled:cursor-not-allowed focus:outline-none rounded shadow-center-lg ' +
                                                                (blockchain.isRightNetwork
                                                                    ? 'bg-cyan-400  hover:bg-cyan-500 disabled:hover:bg-cyan-400 shadow-cyan-400'
                                                                    : ' bg-red-600 cursor-pointer shadow-red-700')
                                                            }>
                                                            {blockchain.isRightNetwork ? `Mint` : 'Switch Network 🔺'}
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            dispatch(connect());
                                                        }}
                                                        className='w-full bg-cyan-400 hover:bg-cyan-500 shadow-center-lg shadow-cyan-500 font-semibold text-gray-900 rounded-lg'>
                                                        Connect Wallet
                                                    </button>
                                                )
                                            ) : (
                                                <InstallMetaMask />
                                            )}
                                        </div>
                                        <div className='relative flex flex-col section'>
                                            <h3 className='font-bold text-center'>Sale Details</h3>
                                            {saleDetails.map((detail, index) => {
                                                return (
                                                    <p key={index} className='flex justify-between text-center'>
                                                        <span>💎</span>
                                                        <span>{detail}</span>
                                                        <span>💎</span>
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <motion.div
                            initial={{ opacity: 0, translateY: 400 }}
                            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.5, delay: 0.5 } }}
                            className='flex justify-between w-full absolute bottom-10 z-20'>
                            <div className='relative'>
                                <Mark />
                            </div>

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ scale: 1.1 }}
                                className={'play-button z-30 transition-all drop-shadow-arrow'}
                                onClick={handlePlay}>
                                <Image src='/images/arrow-sign.png' layout='fill' objectFit='fill' />
                                <h2 className='text-white font-bold play-button'>PLAY</h2>
                            </motion.button>
                        </motion.div>
                    </motion.section>
                </>
            )}
        </div>
    );
};

export default Home;
