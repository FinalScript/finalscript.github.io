import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

const Login = ({ redirectPath }: any) => {
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <motion.div
            key={'diamondLoading'}
            exit={{
                opacity: 0,
            }}
            initial={{
                opacity: 0,
            }}
            animate='visible'
            variants={{
                hidden: {
                    opacity: 0,
                },
                visible: {
                    opacity: 1,
                    transition: {
                        delay: 0.3,
                    },
                },
            }}
            className='h-screen bg-zinc-900 text-white flex items-center justify-center'>
            <div className='bg-zinc-800 rounded-xl p-10'>
                <h1 className='text-center mb-5'>
                    <span className='text-2xl text-gray-200'>Welcome to</span>
                    <br />
                    <span className='text-4xl bold'>MinerVerse</span>
                </h1>
                <p className='text-center text-gray-200 mb-5'>Game is currently in development.</p>
                <form>
                    <label className='flex items-center space-x-3 mb-5'>
                        <span className='py-1'>Password</span>
                        <input
                            type='password'
                            className='form-input block w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-1'
                            placeholder='Your site password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}></input>
                    </label>
                    <button
                        type='submit'
                        className='mt-3 w-full bg-cyan-400 text-white p-2 font-bold rounded hover:bg-cyan-500'
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch({ type: 'SET_ENTERED_PASSWORD', payload: { enteredPassword: password } });
                            window.location.href = redirectPath ?? '/';
                        }}>
                        Login
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default Login;
