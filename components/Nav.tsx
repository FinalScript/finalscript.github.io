import Image from 'next/image';
import diamondIcon from '../assets/images/diamond.png';
import { WalletButton } from './WalletButton';

export const Nav = () => {
    return (
        <header className='text-gray-400 bg-transparent body-font fixed w-full'>
            <div className='container mx-auto flex flex-wrap justify-between flex-col md:flex-row items-center'>
                <a className='flex title-font font-medium items-center text-white p-2 mb-4 md:mb-0'>
                    <div className='w-16'>
                        <Image src={diamondIcon} />
                    </div>
                    <span className='ml-3 text-xl'>MinerVerse</span>
                </a>

                <WalletButton />
            </div>
        </header>
    );
};
