import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GeneralState } from '../types';

const whitepaper: NextPage = () => {
    const generalReducer = useSelector((state: GeneralState) => state.general);

    return (
        <>
            <div className='relative overflow-auto h-screen w-screen flex justify-center'>
                <Head>
                    <title>Whitepaper | MinerVerse</title>
                </Head>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className='fixed -z-20 w-full h-full bg-zinc-900'></motion.div>

                <div className='paper-container'>
                    <motion.div
                        initial={{ opacity: 0, translateY: 500 }}
                        animate={{ opacity: 1, translateY: 0, transition: { duration: 0.4, delay: generalReducer.isLoading ? 1.6 : 0 } }}
                        className={'paper h-min mt-36  '}>
                        <div className='w-[300px] h-[150px] absolute z-30 ml-10 mt-8'>
                            <Image src='/images/confidental.png' layout='fill' objectFit='contain' />
                        </div>
                        <div className='whitepaper relative'>
                            <header className='flex flex-col justify-center items-center space-y-10 mb-12'>
                                <div className='w-[40vh] h-[20vh] relative'>
                                    <Image src='/images/minerverse-logo.png' layout='fill' objectFit='contain' />
                                </div>
                                <h1 className='lg:text-8xl md:text-7xl sm:text-6xl text-4xl font-bold'>WHITEPAPER</h1>
                            </header>
                            <div className='relative pb-10'>
                                <p className='text-2xl font-bold text-center'>
                                    The mud on your boots, the dirt on your face, the diamonds in your eyes, and the smell of freedom…or maybe that’s just
                                    Larry… <br />
                                    <br />
                                    <br />
                                    Welcome to MinerVerse!
                                </p>
                            </div>
                            <div className='relative'>
                                <h2 className='text-3xl font-bold mb-8'>What is MinerVerse?</h2>
                                <div className='text-xl'>
                                    <p>
                                        MinerVerse is an Avalanche on-chain game inspired by a mix of our favorite childhood games, Cookie Clicker and
                                        Minecraft. To play MinerVerse, you must purchase a Miner and stake them in the Mine. Miners are ERC721 NFTs that produce
                                        an ERC20 token $DIAMOND every minute when staked.
                                    </p>
                                    <br />
                                    <p>
                                        We chose the Avalanche chain because of the fantastic community and the low gas fees, democratizing P2E, minting and
                                        trading NFTs regardless of wallet size.
                                    </p>
                                    <br />
                                    <p>
                                        Over time a player can purchase tools from simple items such as Stone Pickaxe to more complex items such as a MASSIVE
                                        Laser Beam and much more! These tools increase the player's rate of $DIAMOND mining. The goal is simple: Mine as much
                                        $DIAMOND as possible, collect more tools and miners, and dominate the MinerVerse
                                    </p>
                                    <br /> <br />
                                    <p className='px-20 text-lg font-bold text-center text-red-600'>
                                        Game is currently in development. All features mentioned are finalized and will not change, but additional features may
                                        be implemented in the future.
                                    </p>
                                </div>
                            </div>
                            <div className='relative'>
                                <h2 className='text-3xl font-bold mb-8'>Summary</h2>
                                <div className='text-xl flex flex-col justify-center space-y-4 px-5 emoji-list'>
                                    <p>
                                        <span>💎 </span>
                                        <span>There are 10,000 Miners available to mint for 1.25 AVAX each.</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>Miners can be staked in the Mine to mine $DIAMOND.</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>To earn more DPM you need to purchase craftables which requires you to spend $DIAMOND</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>
                                            Once you have some $DIAMOND you can take a few or all of it to the $DIAMOND Authenticator to find out the true value
                                            of your Diamonds! Just beware that this could come at a cost, if the Diamonds fail to be authenticated you will lose
                                            half of the $DIAMOND you put in, but if they succeed your $DIAMOND value will double!
                                        </span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>Half of the Miners are burned each day until no more Miners remain.</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>All sales are done on a first come first serve basis in order to keep things fair.</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>
                                            When minting your Miner there is a 5% chance of minting a Super Miner instead, which guarantees 5 $DIAMOND per
                                            minute…now that’s what I call lucky.
                                        </span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>We've introduced several mechanics which we believe will lead to a fair and long-lasting game.</span>
                                    </p>
                                </div>
                            </div>
                            <div className='relative'>
                                <h2 className='text-3xl font-bold mb-8'>Miners</h2>
                                <div className='text-xl flex normal-list'>
                                    <p>
                                        Miners are ERC721 NFTS that can be minted to start your journey into the MinerVerse. When minting, there is a 95% chance
                                        of minting a Miner, and a 5% chance of minting a Super MinerMiners mine 1 $DIAMOND per minute. Super Miners mine 5
                                        $DIAMOND per minute. You'll have to spend $DIAMOND to get craftables and improve your mine. Miners can be traded on
                                        popular sites such as NFTrade and TofuNFT.
                                    </p>

                                    <div className='w-[900px] h-[250px] relative'>
                                        <Image src='/images/miner_1.png' layout='fill' objectFit='contain' />
                                    </div>
                                    <div className='w-[900px] h-[250px] relative'>
                                        <Image src='/images/miner_2.png' layout='fill' objectFit='contain' />
                                    </div>
                                </div>
                                <p className='text-center text-xl my-10'>The minting revenue will be split the following way:</p>
                                <div className='text-xl flex flex-col justify-center space-y-4 px-5 emoji-list'>
                                    <p>
                                        <span>💎 </span>
                                        <span>25% for operational costs and further developments</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>5% to charity</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>15% for community building</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>25% for MinerVerse 2.0</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>30% for the devs</span>
                                    </p>
                                </div>
                            </div>

                            <div className='relative'>
                                <h2 className='text-3xl font-bold mb-8'>Mine</h2>

                                <div className='flex'>
                                    <div className='text-xl flex flex-col justify-center space-y-4 px-5 emoji-list'>
                                        <p>
                                            <span>💎 </span>
                                            <span>Work your miners here</span>
                                        </p>
                                        <p>
                                            <span>💎 </span>
                                            <span>This is where your Miners will mine.</span>
                                        </p>
                                        <p>
                                            <span>💎 </span>
                                            <span>A regular Miner will mine 1 Diamond Per Minute(DPM), while the Super Miner mines at 5 DPM.</span>
                                        </p>
                                        <p>
                                            <span>💎 </span>
                                            <span>When you claim the mined $DIAMOND, 20% goes into the Vault.</span>
                                        </p>
                                        <p>
                                            <span>💎 </span>
                                            <span>Miners can be kept in the mines at all times.</span>
                                        </p>
                                    </div>

                                    <div className='w-[800px] h-[300px] relative'>
                                        <Image src='/images/mine-entrance-front.png' layout='fill' objectFit='contain' />
                                    </div>
                                </div>
                            </div>
                            <div className='relative'>
                                <h2 className='text-3xl font-bold mb-8'>$DIAMOND</h2>

                                <div className='text-xl flex flex-col justify-center space-y-4 px-5 emoji-list'>
                                    <p>
                                        <span>💎 </span>
                                        <span>$DIAMOND is an ERC20 token that can be used in-game to buy Craftables.</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>There is no limit to the amount of $DIAMOND one can hold.</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>$DIAMOND can be staked in the Vault to earn interest and kept in there for as long as you’d like</span>
                                    </p>
                                    <p>When ready the $DIAMOND can be unstaked…</p>
                                    <p>
                                        <span>💎 </span>
                                        <span>Fast unstake: 50% of your $DIAMOND will be lost but will be received instantly</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>Slow unstake: 20% of your $DIAMOND will be lost but will take 2 days to be received</span>
                                    </p>
                                </div>
                            </div>
                            <div className='relative overflow-hidden'>
                                <h2 className='text-3xl font-bold mb-8'>Craftables</h2>

                                <div className='text-xl mb-5'>
                                    <p>
                                        If you want to generate more $DIAMOND, you have two options: get more Miners or mint Craftables. Craftables provide a
                                        massive boost in $DIAMOND mining when staked in the Mines.
                                    </p>
                                    <br />
                                    <p>
                                        Craftables are also ERC721 NFT that can be traded in popular sites such as NFTrade and TofuNFT. All tools have limited
                                        supply and are bought using $DIAMOND
                                    </p>
                                    <br />
                                    <p>A quick glance at some of the Craftables and how they would work,</p>
                                </div>
                                <div className='relative overflow-x-auto'>
                                    <table className='w-full text-md text-left'>
                                        <thead className='text-md uppercase bg-transparent'>
                                            <tr className='border-4 border-amber-900'>
                                                <th scope='col' className='px-4 py-3'>
                                                    Craftable
                                                </th>
                                                <th scope='col' className='px-4 py-3'>
                                                    Name
                                                </th>
                                                <th scope='col' className='px-4 py-3'>
                                                    Description
                                                </th>
                                                <th scope='col' className='px-4 py-3'>
                                                    Cost
                                                </th>
                                                <th scope='col' className='px-4 py-3'>
                                                    Max Supply
                                                </th>
                                                <th scope='col' className='px-4 py-3'>
                                                    DPM
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='bg-transparent border-4 border-amber-900'>
                                                <td className='px-4 py-4 text-right'>
                                                    <Image src='/images/stone-pickaxe.png' objectFit='contain' height={300} width={300} />
                                                </td>
                                                <th scope='row' className='px-4 py-4 font-medium'>
                                                    Stone Pickaxe
                                                </th>
                                                <td className='px-4 py-4'>
                                                    As fun as mining with your hands sounds, a trusty pickaxe is what every miner should have!
                                                </td>
                                                <td className='px-4 py-4'>5,000</td>
                                                <td className='px-4 py-4'>2,000</td>
                                                <td className='px-4 py-4'>5</td>
                                            </tr>
                                            <tr className='bg-transparent border-4 border-amber-900'>
                                                <td className='px-4 py-4 text-right'>
                                                    <Image src='/images/magic-drill.png' objectFit='contain' height={300} width={300} />
                                                </td>
                                                <th scope='row' className='px-4 py-4 font-medium'>
                                                    Magic Drill
                                                </th>
                                                <td className='px-4 py-4'>
                                                    This drill was said to have been handled by one of the mightiest wizards of all time..or at least that’s
                                                    what the pawnshop owner told me.
                                                </td>
                                                <td className='px-4 py-4'>140,000</td>
                                                <td className='px-4 py-4'>800</td>
                                                <td className='px-4 py-4'>350</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='relative'>
                                <h2 className='text-3xl font-bold mb-8'>Vault</h2>

                                <div className='flex items-start'>
                                    <div className='text-xl flex flex-col justify-center space-y-4 px-5 emoji-list'>
                                        <p>
                                            <span>💎 </span>
                                            <span>Stake in a vault and retrieve interest on your diamonds over time.</span>
                                        </p>
                                        <p>
                                            <span>💎 </span>
                                            <span>Unstake instantly but you lose 50% of your diamonds.</span>
                                        </p>
                                        <p>
                                            <span>💎 </span>
                                            <span>Unstake slowly and wait 2 days but lose only 20% of your diamonds.</span>
                                        </p>
                                    </div>
                                    <div className='w-[800px] h-[300px] relative'>
                                        <Image src='/images/vault.png' layout='fill' objectFit='contain' />
                                    </div>
                                </div>
                            </div>
                            <div className='relative'>
                                <h2 className='text-3xl font-bold mb-8'>Strategy</h2>

                                <div className='text-xl'>
                                    <div className='flex items-start'>
                                        <p className='w-[70%]'>
                                            As you can see, the MinerVerse has been designed around three main principles: fun, longevity, and strategy. With
                                            gameplay expected to last a while - just like your favorite childhood games, MinerVerse is sure to keep you
                                            entertained. The mechanics of The Vault guarantee that your balance of $DIAMOND can only go up if you deposit
                                            $DIAMOND and withdraw using the 2 day cooldown period.
                                        </p>

                                        <div className='w-[30%] h-[150px] relative'>
                                            <Image src='/images/diamond-trophy.png' layout='fill' objectFit='contain' />
                                        </div>
                                    </div>
                                    <br />
                                    <p>
                                        But keep in mind that keeping your $DIAMOND in the vault prevents you from spending it on craftables that will mine you
                                        more $DIAMOND. We won’t tell you how to invest your $DIAMOND, but be smart about it!
                                    </p>
                                </div>
                            </div>
                            <div className='-mb-8 pt-8'>
                                <div className='w-[200px] h-[100px] relative'>
                                    <Image src='/images/sign-here.png' layout='fill' objectFit='contain' />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default whitepaper;
