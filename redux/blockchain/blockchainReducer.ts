import { BlockchainData } from '../../types';

const initialState = {
    account: '',
    balance: '',
    network: '',
    isRightNetwork: false,
    hasMetaMask: true,
    smartContract: undefined,
    web3: undefined,
};

const blockchainReducer = (state: BlockchainData = initialState, action: any) => {
    switch (action.type) {
        case 'CONNECTION_FAILED':
            return {
                ...state,
                errorMsg: action.payload.errorMsg,
            };
        case 'UPDATE_BALANCE':
            return {
                ...state,
                balance: action.payload.balance,
            };
        case 'UPDATE_NETWORK':
            return {
                ...state,
                network: action.payload.network,
            };
        case 'UPDATE_RIGHTNETWORK':
            return {
                ...state,
                isRightNetwork: action.payload.isRightNetwork,
            };
        case 'UPDATE_ACCOUNT':
            return {
                ...state,
                account: action.payload.account,
            };
        case 'UPDATE_WEB3':
            return {
                ...state,
                web3: action.payload.web3,
            };
        case 'UPDATE_SMARTCONTRACT':
            return {
                ...state,
                smartContract: action.payload.smartContract,
            };
        case 'UPDATE_HASMETAMASK':
            return {
                ...state,
                hasMetaMask: action.payload.hasMetaMask,
            };
        default:
            return state;
    }
};

export default blockchainReducer;
