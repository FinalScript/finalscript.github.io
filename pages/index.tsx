import type { NextPage } from 'next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { minerConfig, networkConfig } from '../config';
import { checkBalance, connect, switchNetwork } from '../redux/blockchain/blockchainActions';
import { BlockchainState, ContractDataState, GeneralState } from '../types';
import Image from 'next/image';
import { checkIsWhiteListed, fetchData } from '../redux/data/dataActions';
import { AnimatePresence, motion } from 'framer-motion';
import { addAlert, clearBotSpeech, setBotError, setBotSpeech } from '../redux/general/generalActions';
import { InstallMetaMask } from '../components/InstallMetaMask';
import Particles from 'react-tsparticles';
// @ts-ignore
import { loadFull } from 'tsparticles';

const Home: NextPage = () => {
    const dispatch = useDispatch<any>();
    const blockchain = useSelector((state: BlockchainState) => state.blockchain);
    const contractData = useSelector((state: ContractDataState) => state.contractData);
    const generalReducer = useSelector((state: GeneralState) => state.general);
    const [quantity, setQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState(0.0);
    const saleDetails = [
        // 'Fair sale (first come, first serve)',
        `Price: ${Web3.utils.fromWei(contractData.price)} ${networkConfig.nativeCurrency.symbol}`,
        `Total Supply: ${contractData.maxTotalSupply} Miners`,
        `Presale Supply: ${contractData.maxPresaleSupply} Miners`,
        // `${blockchain.hasMetaMask ? 100 - contractData.superPercentage : 0}% chance to mint a Regular Miner`,
        `${contractData.superPercentage}% chance to mint a Super Miner`,
    ];

    const particlesInit = async (main: any) => {
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
    };

    const memoizedParticlesInit = useCallback(particlesInit, []);

    const mint = () => {
        setTimeout(() => {
            if (quantity === '') {
                dispatch(setBotError(`Please enter a quantity (0-${contractData.maxPerMint})`));
            }

            if (blockchain.smartContract && blockchain.account && quantity !== '') {
                if (contractData.baseSalesOpen) {
                    blockchain.smartContract?.methods
                        .mintBase(parseInt(quantity))
                        .send({
                            gasLimit: String(855000),
                            to: minerConfig.contractAddress,
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
                                    link: `https://testnet.snowtrace.io/tx/${res.transactionHash}`,
                                })
                            );
                            console.log(res);
                        });
                } else if (contractData.presaleOpen && contractData.isWhiteListed) {
                    blockchain.smartContract?.methods
                        .presaleMintBase(parseInt(quantity))
                        .send({
                            gasLimit: String(855000),
                            to: minerConfig.contractAddress,
                            from: blockchain.account,
                            value: totalPrice,
                        })
                        .once('error', (err: any) => {
                            console.log(err);
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
                                    link: `https://testnet.snowtrace.io/tx/${res.transactionHash}`,
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
    };

    useEffect(() => {
        dispatch(fetchData());
    }, [blockchain.smartContract]);

    useEffect(() => {
        setQuantity('');

        if (blockchain.account) {
            dispatch(checkIsWhiteListed(blockchain.account));
        }
    }, [blockchain.account, blockchain.network]);

    useEffect(() => {
        if (quantity !== '') {
            setTotalPrice(parseFloat(contractData.price) * parseFloat(quantity) + parseFloat(contractData.nftTax));
        } else {
            setTotalPrice(0.0);
        }
    }, [quantity]);

    const getSupplyPercentage = () => {
        let percentage = '0%';

        if (contractData.totalSupply) {
            if (contractData.baseSalesOpen || (contractData.gameStarted && !contractData.presaleOpen)) {
                const num = ((contractData.totalSupply / contractData.maxTotalSupply) * 100).toFixed(2);

                percentage = num + '%';
            } else {
                const num = ((contractData.totalSupply / contractData.maxPresaleSupply) * 100).toFixed(2);

                percentage = num + '%';
            }
        }

        return percentage;
    };

    const getSupplyFraction = () => {
        let fraction = '- / -';

        if (contractData.totalSupply) {
            if (contractData.baseSalesOpen || (contractData.gameStarted && !contractData.presaleOpen)) {
                fraction = contractData.totalSupply + ' / ' + contractData.maxTotalSupply;

                if (contractData.totalSupply === contractData.maxTotalSupply) {
                    fraction = 'Sold Out';
                }
            } else {
                fraction = contractData.totalSupply + ' / ' + contractData.maxPresaleSupply;
            }
        }

        return fraction;
    };

    return (
        <div className='relative overflow-auto'>
            <div className='fixed -z-30 w-screen h-screen overflow-hidden select-none'>
                <Image src='/images/mine-entrance.png' layout='fill' objectFit='cover' objectPosition={'70%'} />
            </div>

            {!generalReducer.isLoading && (
                <>
                    <AnimatePresence>
                        {generalReducer.botCurrentSpeech && (
                            <div className='relative'>
                                <div className='fixed flex justify-center items-center bottom-[70px] right-[245px] px-10 py-5 text-gray-900 rounded-xl md:mt-0'>
                                    <motion.div
                                        key={'text-bubble'}
                                        exit={{
                                            opacity: 0,
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.6 } }}
                                        className='absolute z-20 w-full h-full overflow-hidden select-none'>
                                        <Image src='/images/text-bubble.png' layout='fill' objectFit='fill' />
                                    </motion.div>
                                    <p
                                        className={
                                            'z-30 w-full h-full max-w-sm mb-10 text-center' + (generalReducer.botCurrentSpeech.isError ? ' text-red-500' : ' text-black')
                                        }>
                                        {generalReducer.botCurrentSpeech.message}
                                    </p>
                                </div>
                            </div>
                        )}
                        <motion.div
                            key={'text-bot-mark'}
                            exit={{
                                opacity: 0,
                                translateY: 400,
                            }}
                            initial={{ opacity: 0, translateY: 400 }}
                            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.4 } }}
                            className={
                                'fixed drop-shadow-red right-0 z-20 w-[350px] min-w-[350px] h-[300px] min-h-[300px] overflow-hidden transition-all duration-500 select-none ' +
                                (generalReducer.botCurrentSpeech ? '-bottom-16' : '-bottom-24')
                            }>
                            <Image
                                src='/images/mark.png'
                                layout='fill'
                                objectFit='cover'
                                objectPosition={'top'}
                                className='cursor-pointer'
                                onClick={() => {
                                    dispatch(clearBotSpeech());
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>

                    <motion.div
                        key={'snow-background'}
                        exit={{
                            opacity: 0,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.5 } }}
                        className='fixed'>
                        <Particles id='tsparticles' url='particle-config.json' init={memoizedParticlesInit} />
                    </motion.div>

                    <motion.section
                        key={'minting-container'}
                        exit={{
                            translateX: -700,
                        }}
                        initial={{ translateX: -700 }}
                        animate={{ translateX: 0, transition: { duration: 0.5 } }}
                        className='text-gray-400 body-font h-screen w-screen flex items-center fixed'>
                        <div className='fixed flex items-end h-full min-h-full bottom-0 -z-20 left-28'>
                            <div className='relative w-[650px] min-w-[650px] h-[820px] min-h-[820px] overflow-hidden select-none drop-shadow-dark-brown'>
                                <Image src='/images/parchment-frame.png' layout='fill' objectFit='fill' />
                            </div>
                        </div>

                        <div className='left-[280px] pb-[80px] relative flex h-full min-h-full px-5 md:flex-row justify-center items-end'>
                            {!generalReducer.isLoading && (
                                <>
                                    <div className='p-10 w-[400px] relative min-w-[400px] h-[620px] min-h-[620px] text-gray-900 rounded-xl md:mt-0'>
                                        <div className='absolute -m-10 -z-10 w-full h-full overflow-hidden select-none drop-shadow-brown'>
                                            <Image src='/images/parchment.png' layout='fill' objectFit='fill' />
                                        </div>
                                        <div className='flex flex-col justify-center pl-2 pb-2'>
                                            <h2 className='text-center text-2xl font-bold title-font rounded-t-xl mb-1'>
                                                <span>Mint Miners</span>
                                            </h2>
                                            <div className='relative text-md flex items-center justify-center'>
                                                <div className='w-3/5 h-24 relative'>
                                                    <Image src='/images/MinerTrio.png' objectFit='contain' layout='fill' />
                                                </div>
                                            </div>
                                            <div className='relative mb-3'>
                                                <div className='flex justify-end mb-1'>
                                                    <span className='text-sm font-medium text-gray-900'>{getSupplyFraction()}</span>
                                                </div>
                                                <div className='w-full bg-yellow-900 rounded-full h-1.5'>
                                                    <div className='bg-green-500 h-1.5 rounded-full' style={{ width: getSupplyPercentage() }}></div>
                                                </div>
                                            </div>
                                            <div className='relative mb-3'>
                                                <label htmlFor='quantity' className='leading-7 mb-1 text-sm text-gray-900 flex justify-between'>
                                                    <span className='font-bold'>Quantity</span>
                                                    <span className='tracking-widest'>MAX ({contractData.maxPerMint})</span>
                                                </label>
                                                <input
                                                    disabled={!((contractData.presaleOpen && contractData.isWhiteListed) || contractData.baseSalesOpen)}
                                                    title={contractData.isWhiteListed || !contractData.baseSalesOpen ? '' : "You're not whitelisted"}
                                                    type='text'
                                                    id='quantity'
                                                    name='quantity'
                                                    min={0}
                                                    max={contractData.maxPerMint}
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
                                                    placeholder={`Max ${contractData.maxPerMint} at a time`}
                                                    className='w-full text-center disabled:cursor-not-allowed placeholder:text-gray-700 bg-zinc-400 bg-opacity-20 focus:bg-transparent focus:ring-2 rounded border border-gray-600  text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                                />
                                            </div>
                                            <div className='relative tracking-widest mb-2 flex justify-between text-sm font-bold'>
                                                <h5>NFT Tax</h5>
                                                <h5>{totalPrice === 0 ? '--' : Web3.utils.fromWei(contractData.nftTax) + ' AVAX'}</h5>
                                            </div>
                                            <div className='relative tracking-widest mb-6 flex justify-between text-md font-bold'>
                                                <h5>Total</h5>
                                                <h5>{totalPrice === 0 ? '--' : Web3.utils.fromWei(totalPrice.toString()) + ' AVAX'} </h5>
                                            </div>
                                            {/* <div className='relative mb-4 flex justify-between'>
                                        <h5 className='text-xs text-gray-800'>
                                            Miners are utility NFTs solely intended for playing MinerVerse that carry no expectation of profit and have no
                                            guaranteed resale value. By buying you agree to the{' '}
                                            <Link href={'/tos'}>
                                                <span className='font-bold text-blue-600 cursor-pointer'>Terms of Service</span>
                                            </Link>
                                            .
                                        </h5>
                                    </div> */}

                                            <div className='relative mb-5'>
                                                {blockchain.hasMetaMask ? (
                                                    blockchain.account ? (
                                                        <>
                                                            <button
                                                                disabled={
                                                                    !(
                                                                        (contractData.presaleOpen && contractData.isWhiteListed) ||
                                                                        contractData.baseSalesOpen ||
                                                                        !blockchain.isRightNetwork
                                                                    )
                                                                }
                                                                onClick={() => {
                                                                    if (!blockchain.isRightNetwork) {
                                                                        switchNetwork();
                                                                    } else {
                                                                        mint();
                                                                    }
                                                                }}
                                                                title={
                                                                    contractData.isWhiteListed || !contractData.baseSalesOpen || !blockchain.isRightNetwork
                                                                        ? ''
                                                                        : "You're not whitelisted"
                                                                }
                                                                className={
                                                                    'w-full text-white text-shadow-white font-bold border-0 py-2 px-8 disabled:cursor-not-allowed focus:outline-none rounded text-lg shadow-center-lg ' +
                                                                    (blockchain.isRightNetwork
                                                                        ? 'bg-cyan-400  hover:bg-cyan-500 shadow-cyan-400'
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
                                                            className='w-full bg-cyan-400 hover:bg-cyan-500 shadow-center-lg shadow-cyan-500 font-semibold text-gray-900 rounded-lg px-3 py-2 '>
                                                            Connect Wallet
                                                        </button>
                                                    )
                                                ) : (
                                                    <InstallMetaMask />
                                                )}
                                            </div>
                                            <div className='relative flex flex-col text-sm '>
                                                <h5 className='font-bold text-lg text-center mb-2'>Sale Details</h5>
                                                {saleDetails.map((detail, index) => {
                                                    return (
                                                        <h5 key={index} className='flex justify-between'>
                                                            <span>💎</span> <span>{detail}</span> <span>💎</span>
                                                        </h5>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.section>
                </>
            )}
        </div>
    );
};

export default Home;
