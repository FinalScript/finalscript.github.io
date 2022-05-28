import { BlockchainData } from '../../types';
import {
    CONNECTION_FAILED,
    DIAMOND_CONTRACT,
    MINER_CONTRACT,
    MINE_CONTRACT,
    UPDATE_ACCOUNT,
    UPDATE_BALANCE,
    UPDATE_HASMETAMASK,
    UPDATE_ISRIGHTNETWORK,
    UPDATE_NETWORK,
    UPDATE_WEB3,
    VAULT_CONTRACT,
} from '../constants';

const initialState = {
    account: '',
    balance: '',
    network: '',
    isRightNetwork: false,
    hasMetaMask: true,
    minerContract: undefined,
    mineContract: undefined,
    diamondContract: undefined,
    vaultContract: undefined,
    web3: undefined,
};

const blockchainReducer = (state: BlockchainData = initialState, action: any) => {
    switch (action.type) {
        case CONNECTION_FAILED:
            return {
                ...state,
                errorMsg: action.payload.errorMsg,
            };
        case UPDATE_BALANCE:
            return {
                ...state,
                balance: action.payload.balance,
            };
        case UPDATE_NETWORK:
            return {
                ...state,
                network: action.payload.network,
            };
        case UPDATE_ISRIGHTNETWORK:
            return {
                ...state,
                isRightNetwork: action.payload.isRightNetwork,
            };
        case UPDATE_ACCOUNT:
            return {
                ...state,
                account: action.payload.account,
            };
        case UPDATE_WEB3:
            return {
                ...state,
                web3: action.payload.web3,
            };
        case MINER_CONTRACT:
            return {
                ...state,
                minerContract: action.payload.minerContract,
            };
        case MINE_CONTRACT:
            return {
                ...state,
                mineContract: action.payload.mineContract,
            };
        case DIAMOND_CONTRACT:
            return {
                ...state,
                diamondContract: action.payload.diamondContract,
            };
        case VAULT_CONTRACT:
            return {
                ...state,
                vaultContract: action.payload.vaultContract,
            };
        case UPDATE_HASMETAMASK:
            return {
                ...state,
                hasMetaMask: action.payload.hasMetaMask,
            };
        default:
            return state;
    }
};

export default blockchainReducer;
