import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GeneralState } from '../types';

const whitelist = () => {
    const generalReducer = useSelector((state: GeneralState) => state.general);
    const formRef = useRef<any>();

    useEffect(() => {
        console.log(formRef);
    }, [formRef]);

    return (
        <div className='relative overflow-auto h-screen w-screen flex justify-center'>
            <div className='flex flex-col h-full items-center py-24 relative'>
                <iframe
                    ref={formRef}
                    src='https://docs.google.com/forms/d/e/1FAIpQLSfCVev1Db5GQTOiuF4EMBgVPt_wLJQE-Ju4ZhhyMRGUPp5o_g/viewform?embedded=true'
                    frameBorder='0'
                    marginHeight={0}
                    marginWidth={0}
                    className='bg-transparent border-none m-0 p-0 h-[90vh] w-screen fixed'>
                    Loading…
                </iframe>
            </div>
        </div>
    );
};

export default whitelist;
