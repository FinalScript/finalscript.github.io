import React from 'react';
import Image from 'next/image';

export const InstallMetaMask = () => {
    return (
        <a
            href='https://metamask.io'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center space-x-3 bg-orange-500 shadow-center-lg shadow-orange-500 font-semibold text-white rounded-lg px-4 py-2 '>
            <div className='relative w-7 h-7'>
                <Image src='/assets/images/metamask.svg' layout='fill' />
            </div>
            <span>Install Metamask →</span>
        </a>
    );
};
