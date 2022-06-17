import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralState } from '../types';
import { useEffect, useState } from 'react';
import { clearBotSpeech, toggleBot } from '../redux/general/generalActions';
import { markConfig } from '../config';

export const Mark = () => {
    const dispatch = useDispatch<any>();
    const generalReducer = useSelector((state: GeneralState) => state.general);
    const [markAlreadyClicked, setMarkAlreadyClicked] = useState(false);

    useEffect(() => {
        const markAlreadyClicked = localStorage.getItem('markAlreadyClicked') === 'true';

        setMarkAlreadyClicked(markAlreadyClicked);
    }, []);

    const toggleMark = () => {
        if (generalReducer.botCurrentSpeech) {
            dispatch(clearBotSpeech());
        } else {
            if (!markAlreadyClicked) {
                setMarkAlreadyClicked(true);
                localStorage.setItem('markAlreadyClicked', 'true');
            }
            dispatch(toggleBot());
        }
    };

    return (
        <div
            className={
                'absolute flex justify-center z-20 transition-all duration-300 select-none p-inherit ' +
                (generalReducer.botCurrentSpeech || generalReducer.botToggled ? '-bottom-[14vh]' : '-bottom-[18vh] animate-bounce')
            }>
            <AnimatePresence>
                <motion.div key={'mark-image'} className={'z-30 drop-shadow-mark h-[30vh] w-[13.5vh] transition-all duration-500 select-none p-inherit '}>
                    <Image title='Mark Bot' src='/images/mark.png' layout='fill' objectFit='contain' className='cursor-pointer' onClick={toggleMark} />
                </motion.div>

                {generalReducer.botCurrentSpeech && !generalReducer.botToggled && (
                    <motion.div
                        key={'text-bubble'}
                        exit={{
                            scale: 0,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transformOrigin: 'bottom left', transition: { duration: 0.3, delay: 0.5, ease: 'easeInOut' } }}
                        className='left-5 md:left-10 z-10 w-max max-w-[16rem] md:max-w-[20rem] lg:max-w-[24rem] flex flex-col justify-center items-center absolute bottom-[33vh] text-gray-900'>
                        <div className='mt-[3vh] md:mt-[5vh] -z-10 absolute w-full h-full overflow-hidden select-none text-bubble'>
                            <Image src='/images/text-bubble.png' layout='fill' objectFit='fill' />
                        </div>
                        <p
                            className={
                                'z-10 p-[5vh] md:p-[5vh] text-center w-full text-xs md:text-sm ' + (generalReducer.botCurrentSpeech.isError ? ' text-red-500' : ' text-black')
                            }>
                            {generalReducer.botCurrentSpeech.message}
                        </p>
                    </motion.div>
                )}

                {!markAlreadyClicked && !generalReducer.botCurrentSpeech && (
                    <motion.div
                        key={'exclamation-mark'}
                        exit={{
                            opacity: 0,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, scale: [0, 2, 1], transition: { duration: 0.5 } }}
                        className='z-10 p-[2vh] flex items-center justify-center text-center absolute bottom-[32vh]'>
                        <div className='h-[5vh] w-[1vh] lg:h-[10vh] lg:w-[6vh]  flex items-center exclamation-mark cursor-pointer'>
                            <Image src='/images/exclamation-mark.png' layout='fill' objectFit='contain' />
                        </div>
                    </motion.div>
                )}
                <motion.div className='z-20 p-5 left-0 md:left-auto w-auto flex flex-col space-y-[2vh] justify-center absolute bottom-[31vh] text-gray-900'>
                    <AnimatePresence>
                        {generalReducer.botToggled && (
                            <>
                                <motion.div className='flex md:justify-center space-x-[2vh] z-10'>
                                    <motion.a
                                        href='https://twitter.com/MinerVerseNFT'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        key={'twitter-button'}
                                        variants={{
                                            hidden: { opacity: 0, translateY: 100, zIndex: -7, transition: { delay: 0.2, duration: 0.1 } },
                                            show: { opacity: 1, translateY: 0, zIndex: -6, transition: { delay: 0.4, duration: 0.4 } },
                                        }}
                                        exit='hidden'
                                        initial='hidden'
                                        animate='show'
                                        whileHover={{ scale: 1.1 }}
                                        className='relative w-[50px] h-[50px] cursor-pointer twitter-button'>
                                        <Image src='/images/twitter-icon.png' layout='fill' objectFit='contain' />
                                    </motion.a>
                                    <motion.a
                                        href='https://discord.gg/2hVNsWRaJV'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        key={'discord-button'}
                                        variants={{
                                            hidden: { opacity: 0, translateY: 100, zIndex: -8, transition: { delay: 0.1, duration: 0.1 } },
                                            show: { opacity: 1, translateY: 0, zIndex: -7, transition: { delay: 0.6, duration: 0.4 } },
                                        }}
                                        exit='hidden'
                                        initial='hidden'
                                        animate='show'
                                        whileHover={{ scale: 1.1 }}
                                        className='relative w-[50px] h-[50px] cursor-pointer discord-button'>
                                        <Image src='/images/discord-icon.png' layout='fill' objectFit='contain' />
                                    </motion.a>
                                </motion.div>
                                <motion.div
                                    key={'whitepaper-button'}
                                    variants={{
                                        hidden: { opacity: 0, translateY: 100, zIndex: 10, transition: { delay: 0.3, duration: 0.1 } },
                                        show: { opacity: 1, translateY: 0, zIndex: 11, transition: { delay: 0.2, duration: 0.4 } },
                                    }}
                                    onClick={() => {
                                        dispatch(toggleBot());
                                    }}
                                    exit='hidden'
                                    initial='hidden'
                                    animate='show'
                                    whileHover={{ scale: 1.1 }}
                                    className='h-[50px] flex items-center whitelist-button cursor-pointer'>
                                    <Link href={'/whitepaper'}>
                                        <div className='h-[50px] w-[180px] flex items-center whitelist-button cursor-pointer'>
                                            <Image src='/images/whitepaper-button.png' layout='fill' objectFit='contain' />
                                        </div>
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
