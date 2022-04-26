import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { minerConfig } from '../config';
import { checkBalance, connect, switchNetwork } from '../redux/blockchain/blockchainActions';
import { BlockchainState, ContractDataState, GeneralState } from '../types';
import Image from 'next/image';
import { checkIsWhiteListed, fetchData } from '../redux/data/dataActions';
import { motion } from 'framer-motion';
import { addAlert } from '../redux/general/generalActions';
import { InstallMetaMask } from '../components/InstallMetaMask';

const Home: NextPage = () => {
    const dispatch = useDispatch<any>();
    const blockchain = useSelector((state: BlockchainState) => state.blockchain);
    const contractData = useSelector((state: ContractDataState) => state.contractData);
    const generalReducer = useSelector((state: GeneralState) => state.general);
    const [quantity, setQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState(0.0);
    const saleDetails = [
        // 'Fair sale (first come, first serve)',
        `Price: ${Web3.utils.fromWei(contractData.price)} AVAX 🔺`,
        `Presale Supply: ${contractData.maxPresaleSupply} Miners`,
        `Total Supply: ${contractData.maxTotalSupply} Miners`,
        // `${blockchain.hasMetaMask ? 100 - contractData.superPercentage : 0}% chance to mint a Regular Miner`,
        `${contractData.superPercentage}% chance to mint a Super Miner`,
    ];

    const mint = () => {
        setTimeout(() => {
            if (quantity === '') {
                dispatch(addAlert({ key: 'QuantityInputError', isError: true, errorMsg: `Enter a quantity (0-${contractData.maxPerMint})` }));
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
                            console.log(res);
                        })
                        .catch((err: any) => {
                            console.log(err);
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

            <div className='fixed -z-20 w-full h-full bg-gray-800 opacity-30'></div>

            <section className='text-gray-400 body-font h-screen flex items-center'>
                <div className='container relative mx-auto mt-56 sm:mt-44 md:mt-0 flex px-5 md:flex-row justify-center items-center'>
                    {!generalReducer.isLoading && (
                        <>
                            <motion.div
                                key={'minting-container-background'}
                                exit={{
                                    opacity: 0,
                                    scale: 0.0,
                                }}
                                initial='hidden'
                                animate='visible'
                                variants={{
                                    hidden: {
                                        scale: 0.8,
                                        opacity: 0,
                                    },
                                    visible: {
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            duration: 0.3,
                                            delay: 0.3,
                                        },
                                    },
                                }}
                                className='absolute -z-20 w-[420px] min-w-[420px] h-[600px] min-h-[600px] overflow-hidden select-none'>
                                <Image src='/images/parchment.png' layout='fill' objectFit='fill' />
                            </motion.div>
                            <motion.div
                                key={'minting-container'}
                                exit={{
                                    opacity: 0,
                                    scale: 0.0,
                                }}
                                initial='hidden'
                                animate='visible'
                                variants={{
                                    hidden: {
                                        scale: 0.8,
                                        opacity: 0,
                                    },
                                    visible: {
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            duration: 0.3,
                                            delay: 0.3,
                                        },
                                    },
                                }}
                                className='w-[320px] relative min-w-[320px]  text-gray-900 rounded-xl pb-4 md:mt-0'>
                                <div className='flex flex-col'>
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
                            </motion.div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
