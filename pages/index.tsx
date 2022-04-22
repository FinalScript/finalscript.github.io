import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { minerConfig, networkConfig } from '../config';
import { connect, switchNetwork } from '../redux/blockchain/blockchainActions';
import { BlockchainState, ContractDataState } from '../types';
import Image from 'next/image';
import MinerTrioImg from '../assets/images/MinerTrio.png';
import { checkIsWhiteListed, fetchData } from '../redux/data/dataActions';

const Home: NextPage = () => {
    const dispatch = useDispatch<any>();
    const blockchain = useSelector((state: BlockchainState) => state.blockchain);
    const contractData = useSelector((state: ContractDataState) => state.contractData);
    const [quantity, setQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const saleDetails = [
        'Fair sale (first come, first serve)',
        `Presale Supply: ${contractData.maxPresaleSupply} Miners`,
        `Total Supply: ${contractData.totalSupply} Miners`,
        `Price: ${Web3.utils.fromWei(contractData.price)} AVAX 🔺`,
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
                if (contractData.presaleOpen && contractData.isWhiteListed) {
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
                            console.log(res);
                        })
                        .catch((err: any) => {
                            console.log(err);
                        });
                }

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
                            console.log(res);
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
        if (quantity != '') {
            setTotalPrice(parseFloat(contractData.price) * parseFloat(quantity) + parseFloat(contractData.nftTax));
        } else {
            setTotalPrice(0.0);
        }
    }, [quantity]);

    const getSupplyPercentage = () => {
        let percentage = '0%';

        if (contractData.baseSupply && contractData.presaleSupply) {
            if (contractData.baseSalesOpen || contractData.gameStarted) {
                const num = ((contractData.baseSupply / contractData.maxBaseSupply) * 100).toFixed(2);

                percentage = num + '%';
            } else {
                const num = ((contractData.presaleSupply / contractData.maxPresaleSupply) * 100).toFixed(2);

                percentage = num + '%';
            }
        }

        return percentage;
    };

    return (
        <section className='text-gray-400 bg-gray-900 body-font h-screen flex items-center'>
            <div className='container mx-auto flex px-5 py-24 md:flex-row justify-center items-center'>
                <div className='w-400px bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col mt-10 md:mt-0'>
                    <h2 className='text-white text-center text-lg font-medium title-font mb-5'>Buy Miners</h2>
                    <div className='relative mb-4 flex flex-col items-center'>
                        <h5>Welcome to MineVerse, gameplay starts at blah blah blah</h5>
                        <div className='w-1/2'>
                            <Image src={MinerTrioImg} />
                        </div>
                    </div>
                    <div className='relative mb-4'>
                        <div className='flex justify-end mb-1'>
                            <span className='text-sm font-medium text-white'>{getSupplyPercentage()}</span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full  h-1.5 dark:bg-gray-700'>
                            <div className='bg-green-500  h-1.5 rounded-full' style={{ width: getSupplyPercentage() }}></div>
                        </div>
                    </div>
                    <div className='relative mb-4'>
                        <label htmlFor='quantity' className='leading-7 mb-1 text-sm text-gray-400 flex justify-between'>
                            <span className='font-bold'>Quantity</span>
                            <span>Max ({contractData.maxPerMint})</span>
                        </label>
                        <input
                            disabled={!((contractData.presaleOpen && contractData.isWhiteListed) || contractData.baseSalesOpen)}
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
                                let { value, min, max } = e.target;
                                value = Math.max(Number(min), Math.min(Number(max), Number(value))).toString();
                                setQuantity(value === '0' ? '' : value);
                            }}
                            placeholder={`Max ${contractData.maxPerMint} at a time`}
                            className='w-full text-center disabled:cursor-not-allowed bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                        />
                    </div>
                    <div className='relative mb-3 flex justify-between text-sm'>
                        <h5>NFT Tax</h5>
                        <h5>{totalPrice === 0 ? '--' : Web3.utils.fromWei(contractData.nftTax) + ' AVAX'}</h5>
                    </div>
                    <div className='relative mb-4 flex justify-between font-bold'>
                        <h5>Total</h5>
                        <h5>{totalPrice === 0 ? '--' : Web3.utils.fromWei(totalPrice.toString()) + ' AVAX'} </h5>
                    </div>
                    <div className='relative mb-4 flex justify-between'>
                        <h5 className='text-xs'>
                            Miners are utility NFTs solely intended for playing MinerVerse that carry no expectation of profit and have no guaranteed resale
                            value. By buying you agree to the <span className='font-bold'>Terms of Service</span>.
                        </h5>
                    </div>

                    <div className={'relative mb-5 transition-all ' + (error ? 'h-auto opacity-100' : 'h-0 opacity-50')}>
                        <p className='text-center text-xs text-red-500'>{error}</p>
                    </div>

                    <div className='relative mb-5'>
                        {blockchain.account ? (
                            <>
                                <button
                                    disabled={!((contractData.presaleOpen && contractData.isWhiteListed) || contractData.baseSalesOpen)}
                                    onClick={() => {
                                        if (!blockchain.isRightNetwork) {
                                            switchNetwork();
                                        } else {
                                            mint();
                                        }
                                    }}
                                    className={
                                        'w-full  border-0 py-2 px-8 disabled:cursor-not-allowed focus:outline-none rounded text-lg ' +
                                        (blockchain.isRightNetwork
                                            ? 'bg-cyan-400 hover:bg-cyan-500 text-gray-900'
                                            : ' bg-red-600 cursor-pointer shadow-center-lg shadow-red-700 text-white')
                                    }>
                                    {blockchain.isRightNetwork ? `Mint` : '⚠️ Switch Network'}
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
                    <div className='relative flex flex-col text-sm px-5'>
                        <h5 className='font-bold text-center mb-2'>Sale Details</h5>
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
        </section>
    );
};

export default Home;
