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
import Head from 'next/head';
import { Mark } from '../components/Mark';

const dimensionsCss = {
    mintingStand:
        'w-[650px] min-w-[650px] max-w-[650px] ' +
        '2xl:w-[35vw] 2xl:min-w-[35vw] 2xl:max-w-[35vw] ' +
        'xl:w-[40vw] xl:min-w-[40vw] xl:max-w-[40vw] ' +
        'lg:w-[50vw] lg:min-w-[50vw] lg:max-w-[50vw] ' +
        'sm:w-[720px] sm:min-w-[720px] sm:max-w-[720px] ' +
        'left-[-80px] sm:left-[-20px] md:left-[3vw] ' +
        'h-[85vh] min-h-[85vh] max-h-[85vh]',
    mintingContainer:
        'w-[380] min-w-[380px] max-w-[380px] ' +
        '2xl:w-[21vw] 2xl:min-w-[21vw] 2xl:max-w-[21vw] ' +
        'xl:w-[25vw] xl:min-w-[25vw] xl:max-w-[25vw] ' +
        'lg:w-[33vw] lg:min-w-[33vw] lg:max-w-[33vw] ' +
        'sm:w-[420px] sm:min-w-[420px] sm:max-w-[420px] ' +
        'left-[110px] sm:left-[-20px] 2xl:left-[12.5vw] xl:left-[13.5vw] lg:left-[15.5vw] md:left-[3vw] ' +
        'mb-[8vh] px-[vw] 2xl:px-[2.5vw] xl:px-[2vw] lg:px-[1.5vw] py-[3vh] ' +
        'h-[65vh] min-h-[65vh] max-h-[65vh]',
    mintingBackground: '-mx-[2vw] 2xl:-mx-[3vw] xl:-mx-[3.5vw] lg:-mx-[4vw] -my-[3.5vh]',
};

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

                if (contractData.totalSupply >= contractData.maxTotalSupply) {
                    fraction = 'Sold Out';
                }
            } else {
                fraction = contractData.totalSupply + ' / ' + contractData.maxPresaleSupply;
            }
        }

        return fraction;
    };

    const getAbleToMint = () => {
        if (contractData.gameStarted) {
            return false;
        } else if (contractData.baseSalesOpen) {
            return true;
        } else if (contractData.presaleOpen && contractData.isWhiteListed) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className='relative overflow-auto h-screen w-screen'>
            <Head>
                <title>Home | MinerVerse</title>
            </Head>

            {!generalReducer.isLoading && (
                <>
                    <Mark />

                    <motion.section
                        key={'minting-container'}
                        exit={{
                            translateX: -700,
                        }}
                        initial={{ translateX: -700 }}
                        animate={{ translateX: 0, transition: { duration: 0.5 } }}
                        className='text-gray-400 body-font h-full flex items-center relative'>
                        <div className='fixed flex items-end justify-start sm:justify-center lg:justify-start sm:pr-36 lg:pr-0 h-full min-h-full bottom-0 z-10'>
                            <div className={'relative overflow-hidden select-none drop-shadow-dark-brown ' + dimensionsCss.mintingStand}>
                                <Image src='/images/parchment-frame.png' layout='fill' objectFit='fill' />
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.6 } }}
                                className={
                                    'flex justify-center items-center relative overflow-hidden select-none transition-all hover:scale-105 h-[16vh] w-[40vh] self-center ml-24 mt-10 z-50 drop-shadow-arrow cursor-pointer  '
                                }>
                                <Image src='/images/arrow-sign.png' layout='fill' objectFit='contain' />
                                <h2 className='z-20 text-[8vh] mr-6 mb-3 text-white font-bold  play-button'>PLAY</h2>
                            </motion.div>
                        </div>

                        <div className='relative flex justify-start sm:justify-center lg:justify-start h-full min-h-full w-screen min-w-screen items-end px-[1vw]'>
                            {!generalReducer.isLoading && (
                                <>
                                    <div className={'relative text-gray-900 rounded-xl flex justify-center z-10 ' + dimensionsCss.mintingContainer}>
                                        <div
                                            className={
                                                'absolute -z-10 w-full h-full overflow-hidden select-none drop-shadow-brown  ' + dimensionsCss.mintingBackground
                                            }>
                                            <Image src='/images/parchment.png' layout='fill' objectFit='fill' />
                                        </div>
                                        <div className='flex flex-col h-full mint-container'>
                                            <h2 className='text-center font-bold rounded-t-xl'>
                                                <span>Mint Miners</span>
                                            </h2>
                                            <div className='relative text-md flex items-center justify-center section'>
                                                <div className='relative image'>
                                                    <Image src='/images/MinerTrio.png' objectFit='contain' layout='fill' />
                                                </div>
                                            </div>
                                            <div className='relative section'>
                                                <div className='flex justify-end'>
                                                    <p className='font-medium text-gray-900'>{getSupplyFraction()}</p>
                                                </div>
                                                <div className='w-full bg-yellow-900 rounded-full progress'>
                                                    <div className='bg-green-500 h-full rounded-full' style={{ width: getSupplyPercentage() }}></div>
                                                </div>
                                            </div>
                                            <div className='relative flex flex-col section'>
                                                <label htmlFor='quantity' className='text-gray-900 flex justify-between'>
                                                    <span className='font-bold'>Quantity</span>
                                                    <span className='tracking-widest'>MAX ( {contractData.maxPerMint} )</span>
                                                </label>
                                                <input
                                                    disabled={!getAbleToMint()}
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
                                                    className='w-full text-center disabled:cursor-not-allowed placeholder:text-gray-700 bg-zinc-400 bg-opacity-20 focus:bg-transparent focus:ring-2 rounded border-gray-600 outline-none transition-colors duration-200 ease-in-out'
                                                />
                                            </div>
                                            <div className='section font-bold'>
                                                <div className='relative tracking-widest flex justify-between'>
                                                    <h5>NFT Tax</h5>
                                                    <h5>{totalPrice === 0 ? '--' : Web3.utils.fromWei(contractData.nftTax) + ' AVAX'}</h5>
                                                </div>
                                                <div className='relative tracking-widest flex justify-between'>
                                                    <h4>Total</h4>
                                                    <h4>{totalPrice === 0 ? '--' : Web3.utils.fromWei(totalPrice.toString()) + ' AVAX'} </h4>
                                                </div>
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

                                            <div className='relative flex flex-col section'>
                                                {blockchain.hasMetaMask ? (
                                                    blockchain.account ? (
                                                        <>
                                                            <button
                                                                disabled={blockchain.isRightNetwork ? !getAbleToMint() : false}
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
                        </div>
                    </motion.section>
                </>
            )}
        </div>
    );
};

export default Home;
