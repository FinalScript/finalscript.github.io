// log
import { Dispatch } from 'redux';
import { store } from '../store';

const setIsLoading = (isLoading: boolean) => {
    return {
        type: 'SET_LOADING',
        payload: { isLoading },
    };
};
