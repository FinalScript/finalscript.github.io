import { ContractData } from '../../types';

const initialState = {
    isWhiteListed: false,
    gameStarted: false,
    presaleOpen: false,
    baseSalesOpen: false,
    baseSupply: 0,
    presaleSupply: 0,
    maxPresaleSupply: 0,
    maxBaseSupply: 0,
    maxTotalSupply: 0,
    totalSupply: 0,
    maxPerMint: 1,
    nftTax: '0',
    price: '0',
    superPercentage: 0,
    error: false,
    errorMsg: '',
};

const dataReducer = (state: ContractData = initialState, action: any) => {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                error: false,
                errorMsg: '',
                gameStarted: action.payload.gameStarted,
                presaleOpen: action.payload.presaleOpen,
                baseSalesOpen: action.payload.baseSalesOpen,
                baseSupply: action.payload.baseSupply,
                presaleSupply: action.payload.presaleSupply,
                maxBaseSupply: action.payload.maxBaseSupply,
                maxPresaleSupply: action.payload.maxPresaleSupply,
                maxTotalSupply: action.payload.maxTotalSupply,
                totalSupply: action.payload.totalSupply,
                maxPerMint: action.payload.maxPerMint,
                nftTax: action.payload.nftTax,
                price: action.payload.price,
                superPercentage: action.payload.superPercentage,
            };

        case 'FETCH_DATA_FAILED':
            return {
                ...state,
                error: true,
                errorMsg: action.payload.errorMsg,
            };

        case 'UPDATE_IS_WHITELISTED':
            return {
                ...state,
                error: true,
                errorMsg: '',
                isWhiteListed: action.payload.isWhiteListed,
            };
        default:
            return state;
    }
};

export default dataReducer;
