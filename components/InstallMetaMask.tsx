import React from 'react';
import Image from 'next/image';

export const InstallMetaMask = () => {
    return (
        <a
            href='https://metamask.io'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center space-x-3 bg-orange-500 shadow-center-lg shadow-orange-500 font-semibold text-white rounded-lg px-[1vw] py-[.8vh] text-[1.8vh]'>
            <div className='relative w-[3vh] h-[3vh]'>
                <Image src='/images/metamask.svg' layout='fill' />
            </div>
            <span className='whitespace-nowrap'>Install Metamask →</span>
        </a>
    );
};
