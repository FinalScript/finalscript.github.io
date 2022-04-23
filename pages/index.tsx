import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { minerConfig } from '../config';
import { checkBalance, connect, switchNetwork } from '../redux/blockchain/blockchainActions';
import { BlockchainState, ContractDataState, GeneralState } from '../types';
import Image from 'next/image';
import Link from 'next/link';
import { checkIsWhiteListed, fetchData } from '../redux/data/dataActions';
import { TransactionAlert } from '../components/TransactionAlert';

const Home: NextPage = () => {
    const dispatch = useDispatch<any>();
    const blockchain = useSelector((state: BlockchainState) => state.blockchain);
    const contractData = useSelector((state: ContractDataState) => state.contractData);
    const generalReducer = useSelector((state: GeneralState) => state.general);
    const [quantity, setQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [error, setError] = useState('');
    const [transactionAlert, setTransactionAlert] = useState({ hidden: true, link: '', hash: '' });
    const saleDetails = [
        'Fair sale (first come, first serve)',
        `Price: ${Web3.utils.fromWei(contractData.price)} AVAX 🔺`,
        `Presale Supply: ${contractData.maxPresaleSupply} Miners`,
        `Total Supply: ${contractData.maxTotalSupply} Miners`,
        `${100 - contractData.superPercentage}% chance to mint a Regular Miner`,
        `${contractData.superPercentage}% chance to mint a Super Miner`,
    ];

    const mint = () => {
        setError('');

        setTimeout(() => {
            if (quantity === '') {
                setError(`Enter a quantity (0-${contractData.maxPerMint})`);
            }

            if (blockchain.smartContract && blockchain.account && quantity !== '') {
                if (contractData.baseSalesOpen) {
                    blockchain.smartContract?.methods
                        .mintBase(parseInt(quantity))
                        .send({
                            gasLimit: String(285000),
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

                            setTransactionAlert({ hidden: false, hash: res.transactionHash, link: `https://testnet.snowtrace.io/tx/${res.transactionHash}` });
                            console.log(res);
                        })
                        .catch((err: any) => {
                            console.log(err);
                        });
                } else if (contractData.presaleOpen && contractData.isWhiteListed) {
                    blockchain.smartContract?.methods
                        .presaleMintBase(parseInt(quantity))
                        .send({
                            gasLimit: String(285000),
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

                            setTransactionAlert({ hidden: false, hash: res.transactionHash, link: `https://testnet.snowtrace.io/tx/${res.transactionHash}` });
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
        setError('');
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
        <div className='relative'>
            <div className='fixed -z-30 w-screen h-screen overflow-hidden select-none'>
                <Image src='/assets/images/mine-entrance.jpg' layout='fill' objectFit='cover' />
            </div>

            <div className='fixed -z-20 w-full h-full bg-gray-800 opacity-30'></div>

            <section className='text-gray-400 body-font h-screen flex items-center'>
                <TransactionAlert
                    hidden={transactionAlert.hidden}
                    hash={transactionAlert.hash}
                    link={transactionAlert.link}
                    setHidden={() => {
                        setTransactionAlert((prevState): any => {
                            return { ...prevState, hidden: true };
                        });
                    }}
                />

                <div className='container mx-auto flex px-5 md:flex-row justify-center items-center'>
                    <div
                        hidden={generalReducer.isLoading}
                        className='w-400px min-w-400px bg-zinc-900 text-gray-200 bg-opacity-40 rounded-xl backdrop-blur-sm shadow-center-lg shadow-zinc-800 px-6 py-5 md:mt-0'>
                        <h2 className='text-white bg-neutral-900 text-center text-lg font-medium title-font rounded-t-xl py-2 -mx-6 -my-5 mb-4'>
                            <span>Buy Miners</span>
                        </h2>
                        <div className='flex flex-col'>
                            <div className='relative mb-3 text-sm flex space-y-2 flex-col items-center'>
                                <h5>Welcome to MineVerse, gameplay starts at ___</h5>
                                <div className='w-2/5 h-28 relative'>
                                    <Image src='/assets/images/MinerTrio.png' objectFit='contain' layout='fill' />
                                </div>
                            </div>
                            <div className='relative mb-3'>
                                <div className='flex justify-end mb-1'>
                                    <span className='text-xs font-medium text-gray-400'>{getSupplyFraction()}</span>
                                </div>
                                <div className='w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700'>
                                    <div className='bg-green-500 h-1.5 rounded-full' style={{ width: getSupplyPercentage() }}></div>
                                </div>
                            </div>
                            <div className='relative mb-3'>
                                <label htmlFor='quantity' className='leading-7 mb-1 text-xs text-gray-400 flex justify-between'>
                                    <span className='font-bold'>Quantity</span>
                                    <span>MAX ({contractData.maxPerMint})</span>
                                </label>
                                <input
                                    disabled={!((contractData.presaleOpen && contractData.isWhiteListed) || contractData.baseSalesOpen)}
                                    title={contractData.isWhiteListed ? '' : "You're not whitelisted"}
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
                                    className='w-full text-center disabled:cursor-not-allowed bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                />
                            </div>
                            <div className='relative mb-2 flex justify-between text-xs'>
                                <h5>NFT Tax</h5>
                                <h5>{totalPrice === 0 ? '--' : Web3.utils.fromWei(contractData.nftTax) + ' AVAX'}</h5>
                            </div>
                            <div className='relative mb-2 flex justify-between text-sm font-bold'>
                                <h5>Total</h5>
                                <h5>{totalPrice === 0 ? '--' : Web3.utils.fromWei(totalPrice.toString()) + ' AVAX'} </h5>
                            </div>
                            <div className='relative mb-4 flex justify-between'>
                                <h5 className='text-xs text-gray-400'>
                                    Miners are utility NFTs solely intended for playing MinerVerse that carry no expectation of profit and have no guaranteed
                                    resale value. By buying you agree to the{' '}
                                    <Link href={'/tos'}>
                                        <span className='font-bold text-blue-400 cursor-pointer'>Terms of Service</span>
                                    </Link>
                                    .
                                </h5>
                            </div>

                            <div className='relative mb-4'>
                                {blockchain.account ? (
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
                                            title={contractData.isWhiteListed && !blockchain.isRightNetwork ? '' : "You're not whitelisted"}
                                            className={
                                                'w-full font-bold border-0 py-2 px-8 disabled:cursor-not-allowed focus:outline-none rounded text-lg ' +
                                                (blockchain.isRightNetwork
                                                    ? 'bg-cyan-400 hover:bg-cyan-500 text-gray-900'
                                                    : ' bg-red-600 cursor-pointer shadow-center-lg shadow-red-700 text-white')
                                            }>
                                            {blockchain.isRightNetwork ? `Mint` : 'Switch Network 🔺'}
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => {
                                            dispatch(connect());
                                        }}
                                        className='w-full bg-cyan-400 font-semibold text-gray-900 rounded-lg px-3 py-2 '>
                                        Connect Wallet
                                    </button>
                                )}
                            </div>
                            <div className='relative flex flex-col text-xs px-7'>
                                <h5 className='font-extrabold text-center mb-2'>Sale Details</h5>
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
                </div>
            </section>
        </div>
    );
};

export default Home;
