import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const game: NextPage = () => {
    return (
        <>
            <Head>
                <title>Game | MinerVerse</title>
            </Head>
            <section className='text-gray-400 bg-transparent body-font h-screen flex justify-center items-center'>Game page</section>
        </>
    );
};

export default game;
