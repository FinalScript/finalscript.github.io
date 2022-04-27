import Image from 'next/image';
import Link from 'next/link';
import { WalletButton } from './WalletButton';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GeneralState } from '../types';
import { useEffect, useState } from 'react';

export const Nav = () => {
    const generalReducer = useSelector((state: GeneralState) => state.general);

    return (
        <>
            {!generalReducer.isLoading && (
                <motion.header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 1 } }}
                    className={'text-gray-400 pb-4 bg-opacity-90 bg-transparent body-font fixed z-30 w-full '}>
                    <div className='container tracking-widest mx-auto flex flex-wrap lg:justify-between flex-col md:flex-row items-center justify-center'>
                        <Link href={'/'}>
                            <div className='flex cursor-pointer title-font font-medium items-center text-white p-2'>
                                <div className='w-16 h-16 mb-4 relative'>
                                    <Image src='/images/diamond.png' layout='fill' alt='nav-logo' />
                                </div>
                                <h2 className='ml-3 text-4xl font-bold text-shadow-white'>MinerVerse</h2>
                            </div>
                        </Link>

                        <WalletButton />
                    </div>
                </motion.header>
            )}
        </>
    );
};
