import { Contract } from 'web3-eth-contract';
import React, { useEffect, useState } from 'react';
import { contractAddresses } from '../config';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';

interface Props {
    eventContract?: Contract | undefined;
    account?: string;
}

const Event = ({ eventContract, account }: Props) => {
    const [currentEvent, setCurrentEvent] = useState<any>();
    const [gemInput, setGemInput] = useState(0);

    useEffect(() => {
        getActiveEvent();
    }, [eventContract]);

    const getActiveEvent = async () => {
        if (eventContract?.methods && account) {
            const activeEvent = await eventContract?.methods.activeEvent().call();

            const event = await eventContract?.methods.events(activeEvent).call();

            setCurrentEvent(event);
        }
    };

    const gemPlay = async () => {
        if (eventContract?.methods && account) {
            eventContract?.methods.gemPlay(Web3.utils.toWei(new BigNumber(gemInput).toFixed(0))).send({ to: contractAddresses.event, from: account, value: 0 });
        }
    };

    return (
        <div className='text-center flex flex-col space-y-2 items-center justify-between bg-gray-700 text-white shadow-lg p-2 px-6 rounded-lg'>
            <h3 className='text-2xl font-bold'>Event: {currentEvent?.name}</h3>
            <div className='w-full flex flex-col space-y-3'>
                <input
                    value={gemInput}
                    onChange={(e: any) => {
                        setGemInput(e.target.value);
                    }}
                    type='number'
                    max={20000}
                    placeholder='0'
                    className='text-center border-none outline-none bg-gray-600 text-white rounded w-full'
                />
                <div className='flex space-x-2 w-full'>
                    <button onClick={gemPlay} className='py-1 px-3 bg-rose-500 disabled:hover:bg-rose-500 hover:bg-rose-600 rounded-md flex-grow'>
                        Play
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Event;
