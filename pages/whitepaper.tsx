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
                        animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3, delay: generalReducer.isLoading ? 1 : 0 } }}
                        className={'paper h-min mt-36  '}>
                        <div className='absolute z-10 w-[150px] h-[80px] sm:w-[200px] sm:h-[100px] lg:w-[300px] lg:h-[150px] ml-3 mt-3 sm:ml-8 sm:mt-6 lg:ml-10 lg:mt-8'>
                            <Image src='/images/confidental.png' layout='fill' objectFit='contain' />
                        </div>
                        <div className='whitepaper relative'>
                            <header className='flex flex-col justify-center items-center space-y-10 mb-8'>
                                <div className='w-[100%] h-[150px] relative'>
                                    <Image src='/images/minerverse-logo.png' layout='fill' objectFit='contain' />
                                </div>
                                <h1 className='lg:text-8xl text-5xl sm:text-6xl md:text-7xl font-bold'>WHITEPAPER</h1>
                            </header>
                            <div className='relative pb-10'>
                                <p className='text-xl lg:text-2xl font-bold text-center'>
                                    The mud on your boots, the dirt on your face, the diamonds in your eyes, and the smell of freedom…or maybe that’s just
                                    Larry… <br />
                                    <br />
                                    <br />
                                    <span className='whitespace-nowrap'>Welcome to MinerVerse!</span>
                                </p>
                            </div>
                            <div className='relative'>
                                <h2 className='text-2xl lg:text-3xl font-bold mb-8'>What is MinerVerse?</h2>
                                <div className='text-base lg:text-xl'>
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
                                    <p className='lg:px-20 text-sm lg:text-lg font-bold text-center text-red-600'>
                                        Game is currently in development. All features mentioned are finalized and will not change, but additional features may
                                        be implemented in the future.
                                    </p>
                                </div>
                            </div>
                            <div className='relative'>
                                <h2 className='text-2xl lg:text-3xl font-bold mb-8'>Summary</h2>
                                <div className='text-sm lg:text-xl flex flex-col justify-center space-y-4 px-3 emoji-list'>
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
                                <h2 className='text-2xl lg:text-3xl font-bold mb-8'>Miners</h2>
                                <div className='text-sm lg:text-xl flex items-start normal-list'>
                                    <p>
                                        Miners are ERC721 NFTS that can be minted to start your journey into the MinerVerse. When minting, there is a 95% chance
                                        of minting a Miner, and a 5% chance of minting a Super Miner. Miners mine 1 $DIAMOND per minute. Super Miners mine 5
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
                                <div className='text-sm lg:text-xl flex flex-col justify-center space-y-4 px-5 emoji-list'>
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
                                        <span>25% for the devs</span>
                                    </p>
                                    <p>
                                        <span>💎 </span>
                                        <span>30% for operational costs and further developments</span>
                                    </p>
                                </div>
                                <br />
                                <div className='flex justify-center'>
                                    <div className='w-full h-[250px] relative'>
                                        <Image src='/images/revenue-split.png' layout='fill' objectFit='contain' />
                                    </div>
                                </div>
                            </div>

                            <div className='relative'>
                                <h2 className='text-2xl lg:text-3xl font-bold mb-8'>Mine</h2>

                                <div className='flex flex-col space-y-8 lg:flex-row'>
                                    <div className='text-sm lg:text-xl flex flex-col justify-center space-y-4 px-5 emoji-list'>
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

                                    <div className='w-full lg:w-[800px] h-[300px] relative'>
                                        <Image src='/images/mine-entrance-front.png' layout='fill' objectFit='contain' />
                                    </div>
                                </div>
                            </div>
                            <div className='relative'>
                                <h2 className='text-2xl lg:text-3xl font-bold mb-8'>$DIAMOND</h2>

                                <div className='text-sm lg:text-xl flex flex-col justify-center space-y-4 px-5 emoji-list'>
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
                                <h2 className='text-2xl lg:text-3xl font-bold mb-8'>Craftables</h2>

                                <div className='text-base lg:text-xl mb-5'>
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
                                <h2 className='text-2xl lg:text-3xl font-bold mb-8'>Vault</h2>

                                <div className='flex flex-col lg:flex-row space-y-8'>
                                    <div className='text-sm lg:text-xl flex flex-col justify-center space-y-4 px-5 emoji-list'>
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
                                    <div className='w-full lg:w-[800px] h-[300px] relative'>
                                        <Image src='/images/vault.png' layout='fill' objectFit='contain' />
                                    </div>
                                </div>
                            </div>
                            <div className='relative'>
                                <h2 className='text-2xl lg:text-3xl font-bold mb-8'>Events</h2>
                                <div className='text-base lg:text-xl'>
                                    <p>
                                        During your mining adventures you may encounter special events that will occur throughout the game such as a Diamond
                                        Apocalypse which will cut the diamond mining rate in half, or a Miners Miracle which will sky rocket the mining rate.
                                        These events will occur at a random time and will last a full 24 hours!
                                    </p>
                                </div>
                                <br />
                                <ul className='list-decimal list-inside'>
                                    <li className='relative'>
                                        <h2 className='text-base lg:text-xl font-bold mb-5 inline-block'>Diamond Apocalypse</h2>
                                        <ul className='text-sm lg:text-base list-none list-inside'>
                                            <li>
                                                When the Diamond Apocalypse strikes diamonds will be scarce and the $DIAMOND mining rate will be cut in half!
                                            </li>
                                            <br />
                                            <li>
                                                With the apocalypse underway any diamonds stored in the Vault may be stolen by other miners, the only way to
                                                protect yourself is to purchase and use a Gold Lock. Only 2000 Gold Locks are purchasable with your $DIAMOND
                                                throughout the entire game and can only be bought when the Bizarre Locksmith appears. Once a lock has been used
                                                it will break and a new one will have to be purchased for future uses.
                                            </li>
                                            <br />
                                            <li>
                                                But if you happen to be the one scouring for diamonds during the apocalypse you can only do so once and the rate
                                                stolen can vary between 5% and 25% of the attacked miners vaulted $DIAMOND.
                                            </li>
                                        </ul>
                                    </li>
                                    <br />
                                    <li className='relative'>
                                        <h2 className='text-base lg:text-xl font-bold mb-5 inline-block'>Miners Miracle</h2>
                                        <ul className='text-sm lg:text-base list-none list-inside'>
                                            <li>Lucky days are upon us when the Miners Miracle arrives, $DIAMOND begins to rain from the skies!</li>
                                            <br />
                                            <li>$DIAMOND mining rate will double, $DIAMOND put into the vault has a small chance to double.</li>
                                            <br />
                                            <li>
                                                While the miners are dazed by the miracles, others can go on the attack once and steal from other miners'
                                                vaults. The rate stolen can vary between 5% and 25% of the attacked miners vaulted $DIAMOND.
                                            </li>
                                            <br />
                                            <li>
                                                To protect yourself during these attacks a Golden Lock can be used to stop attackers from stealing from your
                                                vault. Only 2000 Gold Locks are purchasable with your $DIAMOND throughout the entire game and can only be bought
                                                when the Bizarre Locksmith appears. Once a lock has been used it will break and a new one will have to be
                                                purchased for future uses.
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className='relative'>
                                <h2 className='text-2xl lg:text-3xl font-bold mb-8'>Gold Locks</h2>
                                <div className='flex justify-start items-start flex-col lg:flex-row space-y-8 lg:space-y-0'>
                                    <div className='text-sm lg:text-xl flex flex-col justify-center space-y-4 px-3 emoji-list'>
                                        <p>
                                            <span>💎 </span>
                                            <span>Special ERC20 NFT that gives protection to the vault from other miners trying to steal diamonds</span>
                                        </p>
                                        <p>
                                            <span>💎 </span>
                                            <span>Miners can be staked in the Mine to mine $DIAMOND</span>
                                        </p>
                                        <p>
                                            <span>💎 </span>
                                            <span>Limited quantity of 2000 </span>
                                        </p>
                                        <p>
                                            <span>💎 </span>
                                            <span>Sold by the “Bizarre Locksmith” when he’s in the shop</span>
                                        </p>
                                        <p>
                                            <span>💎 </span>
                                            <span>Locksmith will only sell one lock per miner NFT</span>
                                        </p>
                                        <p>
                                            <span>💎 </span>
                                            <span>Once all locks are sold, they’ll be available to buy from other miners in a third party marketplace</span>
                                        </p>
                                    </div>
                                    <div className='w-full lg:w-[250px] h-[220px] relative'>
                                        <Image src='/images/golden-lock.png' layout='fill' objectFit='contain' />
                                    </div>
                                </div>
                            </div>
                            <div className='relative overflow-hidden'>
                                <h2 className='text-2xl lg:text-3xl font-bold mb-8'>Shop</h2>
                                <div className='text-base lg:text-xl mb-5'>
                                    <p>The shop offers loads of deals to miners for sale!</p>
                                    <br />
                                    <p>
                                        Different miners may appear at random each day at the shop and remain for 24 hours, just beware that all deals come at a
                                        hefty cost of $DIAMOND so make sure to make the right decisions with your $DIAMOND when the time comes.
                                    </p>
                                </div>
                                <br />
                                <div className='flex justify-center'>
                                    <div className='w-full h-[250px] relative'>
                                        <Image src='/images/mystery-trio.png' layout='fill' objectFit='contain' />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className='relative overflow-x-auto'>
                                    <table className='w-full text-md text-center'>
                                        <thead className='text-md uppercase bg-transparent'>
                                            <tr className='border-4 border-amber-900'>
                                                <th scope='col' className='px-4 py-3'>
                                                    Excited Gemologist
                                                </th>
                                                <th scope='col' className='px-4 py-3'>
                                                    Sketchy Dealer
                                                </th>
                                                <th scope='col' className='px-4 py-3'>
                                                    Bizarre Locksmith
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='bg-transparent border-4 border-amber-900'>
                                                <td className='px-4 py-3'>
                                                    The Gemologist is quite the character, willing to take a few or all of your $DIAMOND to find out its true
                                                    value! Just beware that this could come at a cost, if the Diamonds fail to be authenticated you will lose
                                                    half of the $DIAMOND you put in, but if they succeed your $DIAMOND value will double!
                                                </td>
                                                <td className='px-4 py-3'>
                                                    A Dealer will let you enter a lottery among your miner friends. He will give you a chance to buy a single
                                                    entry ticket per miner NFT owned. At the end of his visit, the winner of the lottery will be rewarded with
                                                    80% of the $DIAMOND pool winnings, with him keeping the rest as...profit.
                                                </td>
                                                <td className='px-4 py-3'>
                                                    This Locksmith came prepared offering a lock nft that could be used to protect your vault from potential
                                                    attacks. Beware, these locks come with a very expensive $DIAMOND price and are limited in quantity so miners
                                                    can only buy one per Miner NFT owned.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='relative'>
                                <h2 className='text-2xl lg:text-3xl font-bold mb-8'>Strategy</h2>

                                <div className='text-base lg:text-xl'>
                                    <div className='flex items-start'>
                                        <div className='w-[70%]'>
                                            <p>
                                                As you can see, the MinerVerse has been designed around three main principles: fun, longevity, and strategy.
                                                With gameplay expected to last a while - just like your favorite childhood games, MinerVerse is sure to keep you
                                                entertained.
                                            </p>
                                            <br />
                                            <p>
                                                The mechanics of The Vault guarantee that your balance of $DIAMOND can only go up if you deposit $DIAMOND and
                                                withdraw using the 2 day cooldown period. But keep in mind that keeping your $DIAMOND in the Vault prevents you
                                                from spending it on upgrades that will mine you more $DIAMOND.
                                            </p>
                                            <br />
                                        </div>

                                        <div className='w-[30%] h-[250px] relative'>
                                            <Image src='/images/diamond-trophy.png' layout='fill' objectFit='contain' />
                                        </div>
                                    </div>
                                    <br />
                                    <p>
                                        With the introduction of the shop and events, miners will have the opportunity to plan ahead and take risks with various
                                        encounters.
                                    </p>
                                    <br />
                                    <p>We won’t tell you how to invest your $DIAMOND, but be smart about it!</p>
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
