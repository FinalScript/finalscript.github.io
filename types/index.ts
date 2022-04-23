import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';

declare global {
    interface Window {
        ethereum: any;
        web3: any;
    }
}

export interface BlockchainData {
    account?: string;
    balance?: string;
    network?: string;
    isRightNetwork: boolean;
    errorMsg?: string;
    smartContract?: Contract;
    web3?: Web3;
}

export interface BlockchainState {
    blockchain: BlockchainData;
}

export interface ContractData {
    isWhiteListed: boolean;
    gameStarted: boolean;
    presaleOpen: boolean;
    baseSalesOpen: boolean;
    baseSupply: number;
    presaleSupply: number;
    maxPresaleSupply: number;
    maxBaseSupply: number;
    maxTotalSupply: number;
    totalSupply: number;
    maxPerMint: number;
    nftTax: string;
    price: string;
    superPercentage: number;
    error: boolean;
    errorMsg: string;
}

export interface ContractDataState {
    contractData: ContractData;
}

export interface GeneralData {
    isLoading: boolean;
}

export interface GeneralState {
    general: GeneralData;
}
