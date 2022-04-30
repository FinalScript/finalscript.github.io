import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralState } from '../types';
import { useEffect, useState } from 'react';
import { clearBotSpeech, toggleBot } from '../redux/general/generalActions';

export const Mark = () => {
    const dispatch = useDispatch<any>();
    const generalReducer = useSelector((state: GeneralState) => state.general);
    const [markAlreadyClicked, setMarkAlreadyClicked] = useState(false);

    useEffect(() => {
        const markAlreadyClicked = sessionStorage.getItem('markAlreadyClicked') === 'true';

        setMarkAlreadyClicked(markAlreadyClicked);
    }, []);

    const toggleMark = () => {
        if (generalReducer.botCurrentSpeech) {
            dispatch(clearBotSpeech());
        } else {
            if (!markAlreadyClicked) {
                setMarkAlreadyClicked(true);
                sessionStorage.setItem('markAlreadyClicked', 'true');
            }
            dispatch(toggleBot());
        }
    };

    return (
        <div className='relative'>
            <div
                className={
                    'fixed flex justify-center right-[18%] z-30 transition-all duration-300 select-none ' +
                    (generalReducer.botCurrentSpeech || generalReducer.botToggled ? '-bottom-24' : '-bottom-32 animate-bounce hover:animate-none')
                }>
                <AnimatePresence>
                    {generalReducer.botCurrentSpeech && !generalReducer.botToggled && (
                        <motion.div
                            key={'text-bubble'}
                            exit={{
                                scale: 0,
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, transformOrigin: 'bottom right', transition: { duration: 0.2, delay: 0.4, ease: 'easeInOut' } }}
                            className='absolute flex justify-center items-center bottom-[200px] right-[150px] px-10 py-3 text-gray-900 rounded-xl md:mt-0'>
                            <div className='absolute w-full h-full overflow-hidden select-none text-bubble'>
                                <Image src='/images/text-bubble.png' layout='fill' objectFit='fill' />
                            </div>
                            <div className='z-50 mb-10 w-max max-w-[20rem]'>
                                <p className={'text-center w-full ' + (generalReducer.botCurrentSpeech.isError ? ' text-red-500' : ' text-black')}>
                                    {generalReducer.botCurrentSpeech.message}
                                </p>
                            </div>
                        </motion.div>
                    )}
                    <motion.div
                        key={'text-bot-mark'}
                        exit={{
                            opacity: 0,
                            translateY: 400,
                        }}
                        initial={{ opacity: 0, translateY: 400 }}
                        animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3 } }}
                        className={'drop-shadow-mark h-[30vh] w-[13.5vh] transition-all duration-500 select-none '}>
                        <Image title='Mark Bot' src='/images/mark.png' layout='fill' objectFit='contain' className='cursor-pointer' onClick={toggleMark} />
                    </motion.div>

                    {!markAlreadyClicked && !generalReducer.botCurrentSpeech && (
                        <motion.div
                            key={'exclamation-mark'}
                            exit={{
                                opacity: 0,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, scale: [0, 2, 1], transition: { duration: 0.5 } }}
                            className='z-20 flex items-center justify-center text-center absolute bottom-[33vh] rounded-xl md:mt-0'>
                            <div className='h-[80px] w-[70px] flex items-center exclamation-mark cursor-pointer'>
                                <Image src='/images/exclamation-mark.png' layout='fill' objectFit='contain' />
                            </div>
                        </motion.div>
                    )}

                    <motion.div className='z-20 p-5 flex items-center justify-center space-x-5 absolute bottom-[31vh] text-gray-900 rounded-xl md:mt-0'>
                        <AnimatePresence>
                            {generalReducer.botToggled && (
                                <>
                                    <motion.a
                                        href='https://discord.gg/2hVNsWRaJV'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        key={'discord-button'}
                                        variants={{
                                            hidden: { opacity: 0, translateX: -100, zIndex: -5, transition: { delay: 0.3, duration: 0.1 } },
                                            show: { opacity: 1, translateX: 0, zIndex: -4, transition: { delay: 0.2, duration: 0.4 } },
                                        }}
                                        exit='hidden'
                                        initial='hidden'
                                        animate='show'
                                        whileHover={{ scale: 1.1 }}
                                        className='relative w-[50px] h-[50px] cursor-pointer discord-button'>
                                        <Image src='/images/discord-icon.png' layout='fill' objectFit='contain' />
                                    </motion.a>
                                    <motion.div
                                        key={'whitepaper-button'}
                                        variants={{
                                            hidden: { opacity: 0, translateX: -100, zIndex: -7, transition: { delay: 0.2, duration: 0.1 } },
                                            show: { opacity: 1, translateX: 0, zIndex: -6, transition: { delay: 0.4, duration: 0.4 } },
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
                                            <div className='h-[50px] w-[200px] flex items-center whitelist-button cursor-pointer'>
                                                <Image src='/images/whitepaper-button.png' layout='fill' objectFit='contain' />
                                            </div>
                                        </Link>
                                    </motion.div>
                                    <motion.a
                                        href='https://twitter.com/MinerVerseNFT'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        key={'twitter-button'}
                                        variants={{
                                            hidden: { opacity: 0, translateX: -100, zIndex: -8, transition: { delay: 0.1, duration: 0.1 } },
                                            show: { opacity: 1, translateX: 0, zIndex: -7, transition: { delay: 0.6, duration: 0.4 } },
                                        }}
                                        exit='hidden'
                                        initial='hidden'
                                        animate='show'
                                        whileHover={{ scale: 1.1 }}
                                        className='relative w-[50px] h-[50px] cursor-pointer twitter-button'>
                                        <Image src='/images/twitter-icon.png' layout='fill' objectFit='contain' />
                                    </motion.a>
                                </>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
