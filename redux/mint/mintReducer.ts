import { MintData } from '../../types';
import { MINTDATA_FAILED, MINTDATA_SUCCESS, UPDATE_ISWHITELISTED } from '../constants';

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
    presaleStartTime: '0',
    baseSaleStartTime: '0',
    error: false,
    errorMsg: '',
};

const mintReducer = (state: MintData = initialState, action: any) => {
    switch (action.type) {
        case MINTDATA_SUCCESS:
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
                presaleStartTime: action.payload.presaleStartTime,
                baseSaleStartTime: action.payload.baseSaleStartTime,
            };

        case MINTDATA_FAILED:
            return {
                ...state,
                error: true,
                errorMsg: action.payload.errorMsg,
            };

        case UPDATE_ISWHITELISTED:
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

export default mintReducer;
