// log
import { Dispatch } from 'redux';
import { CustomAlert } from '../../types';
import { store } from '../store';

export const setIsLoading = (isLoading: boolean) => {
    return {
        type: 'SET_LOADING',
        payload: { isLoading },
    };
};

export const addAlert = (newAlert: CustomAlert) => {
    return {
        type: 'ADD_ALERT',
        payload: { newAlert },
    };
};

export const removeAlert = (key: string) => {
    return {
        type: 'REMOVE_ALERT',
        payload: { key },
    };
};
