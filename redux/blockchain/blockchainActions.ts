// constants
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import { networkConfig, contractAddresses } from '../../config/index';
import { Dispatch } from 'redux';
import { addAlert, setBotError, setBotSpeech } from '../general/generalActions';
import { shortenAddress } from '../../utils/shortenAddress';

import minerAbi from '../../config/miner-abi.json';
import mineAbi from '../../config/mine-abi.json';
import diamondAbi from '../../config/diamond-abi.json';
import vaultAbi from '../../config/vault-abi.json';
import eventAbi from '../../config/event-abi.json';

import {
    DIAMOND_CONTRACT,
    EVENT_CONTRACT,
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

const updateAccount = (account: string | null) => {
    return {
        type: UPDATE_ACCOUNT,
        payload: { account },
    };
};

const updateAccountBalance = (balance: string) => {
    return {
        type: UPDATE_BALANCE,
        payload: { balance },
    };
};

const updateNetwork = (network: Object | null) => {
    return {
        type: UPDATE_NETWORK,
        payload: { network },
    };
};

const updateRightNetwork = (isRightNetwork: boolean) => {
    return {
        type: UPDATE_ISRIGHTNETWORK,
        payload: { isRightNetwork },
    };
};

const updateWeb3 = (web3: Web3 | null) => {
    return {
        type: UPDATE_WEB3,
        payload: { web3 },
    };
};

const updateMinerContract = (minerContract: Contract | null) => {
    return {
        type: MINER_CONTRACT,
        payload: { minerContract },
    };
};

const updateMineContract = (mineContract: Contract | null) => {
    return {
        type: MINE_CONTRACT,
        payload: { mineContract },
    };
};

const updateDiamondContract = (diamondContract: Contract | null) => {
    return {
        type: DIAMOND_CONTRACT,
        payload: { diamondContract },
    };
};

const updateVaultContract = (vaultContract: Contract | null) => {
    return {
        type: VAULT_CONTRACT,
        payload: { vaultContract },
    };
};

const updateEventContract = (eventContract: Contract | null) => {
    return {
        type: EVENT_CONTRACT,
        payload: { eventContract },
    };
};

const updateHasMetaMask = (hasMetaMask: boolean) => {
    return {
        type: UPDATE_HASMETAMASK,
        payload: { hasMetaMask },
    };
};

export const switchNetwork = async () => {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: networkConfig.chainId }],
        });
    } catch (err: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (err.code === 4902) {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [networkConfig],
            });
        }
    }
};

export const checkBalance = (address: string) => {
    return async (dispatch: Dispatch) => {
        const web3 = new Web3(window.ethereum);

        web3.eth.getBalance(address).then((res) => {
            dispatch(updateAccountBalance(Web3.utils.fromWei(res)));
        });
    };
};

export const checkConnection = () => {
    return async (dispatch: any) => {
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
            const web3 = new Web3(ethereum);

            dispatch(updateWeb3(web3));

            web3.eth.getChainId().then((res) => {
                dispatch(updateNetwork(Web3.utils.toHex(res)));

                if (Web3.utils.toHex(res) === networkConfig.chainId) {
                    const minerContractObj = new web3.eth.Contract(minerAbi as AbiItem[], contractAddresses.miner);
                    const mineContractObj = new web3.eth.Contract(mineAbi as AbiItem[], contractAddresses.mine);
                    const diamondContractObj = new web3.eth.Contract(diamondAbi as AbiItem[], contractAddresses.diamond);
                    const vaultContractObj = new web3.eth.Contract(vaultAbi as AbiItem[], contractAddresses.vault);
                    const eventContractObj = new web3.eth.Contract(eventAbi as AbiItem[], contractAddresses.event);

                    dispatch(updateMinerContract(minerContractObj));
                    dispatch(updateMineContract(mineContractObj));
                    dispatch(updateDiamondContract(diamondContractObj));
                    dispatch(updateVaultContract(vaultContractObj));
                    dispatch(updateEventContract(eventContractObj));

                    dispatch(updateRightNetwork(true));
                } else {
                    // dispatch(setBotError(`You're not on the right network, friend. Please switch to ${networkConfig.chainName}`));
                    dispatch(updateMinerContract(null));
                }
            });

            web3.eth.getAccounts().then((res) => {
                dispatch(updateAccount(res[0]));

                if (res[0]) {
                    web3.eth.getBalance(res[0]).then((res) => {
                        dispatch(updateAccountBalance(Web3.utils.fromWei(res)));
                    });
                }
            });

            ethereum.on('accountsChanged', (code: string[], reason: string) => {
                const accountSwitch = code[0];

                if (accountSwitch) {
                    const provider = new Web3(window.ethereum).eth;

                    provider.getBalance(accountSwitch).then((res) => {
                        dispatch(updateAccountBalance(Web3.utils.fromWei(res)));
                    });

                    dispatch(setBotSpeech(`Welcome ${shortenAddress(accountSwitch)}!`));
                    dispatch(updateAccount(accountSwitch));
                } else {
                    dispatch(updateAccount(null));
                }
            });

            ethereum.on('chainChanged', (code: string, reason: string) => {
                const provider = new Web3(window.ethereum).eth;

                if (code) {
                    dispatch(updateNetwork(parseInt(code)));

                    if (code === networkConfig.chainId) {
                        const minerContractObj = new web3.eth.Contract(minerAbi as AbiItem[], contractAddresses.miner);
                        const mineContractObj = new web3.eth.Contract(mineAbi as AbiItem[], contractAddresses.mine);
                        const diamondContractObj = new web3.eth.Contract(diamondAbi as AbiItem[], contractAddresses.diamond);
                        const vaultContractObj = new web3.eth.Contract(vaultAbi as AbiItem[], contractAddresses.vault);
                        const eventContractObj = new web3.eth.Contract(eventAbi as AbiItem[], contractAddresses.event);

                        dispatch(updateMinerContract(minerContractObj));
                        dispatch(updateMineContract(mineContractObj));
                        dispatch(updateDiamondContract(diamondContractObj));
                        dispatch(updateVaultContract(vaultContractObj));
                        dispatch(updateEventContract(eventContractObj));

                        dispatch(setBotSpeech(`Welcome back to the ${networkConfig.chainName}!`));
                        dispatch(updateRightNetwork(true));
                    } else {
                        dispatch(setBotError(`You're not on the right network, friend. Please switch to the ${networkConfig.chainName}`));
                        dispatch(updateMinerContract(null));
                        dispatch(updateRightNetwork(false));
                    }

                    provider.getAccounts().then((res) => {
                        dispatch(updateAccount(res[0]));

                        if (res[0]) {
                            provider.getBalance(res[0]).then((res) => {
                                dispatch(updateAccountBalance(Web3.utils.fromWei(res)));
                            });
                        }
                    });
                } else {
                    dispatch(updateNetwork(null));
                    dispatch(updateRightNetwork(false));
                }
            });
        } else {
            dispatch(updateHasMetaMask(false));
        }
    };
};

export const connect = () => {
    return async (dispatch: any) => {
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
            let web3 = new Web3(ethereum);
            web3.eth.setProvider(ethereum);
            dispatch(updateWeb3(web3));
            try {
                await ethereum.request({
                    method: 'eth_requestAccounts',
                });
            } catch (err: any) {
                if (err.code === 4001) {
                    dispatch(setBotError(err.message));
                }
            }
        } else {
            dispatch(updateHasMetaMask(false));
        }
    };
};
