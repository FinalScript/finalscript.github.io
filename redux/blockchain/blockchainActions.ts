// constants
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import minerAbi from '../../config/miner-abi.json';
import { networkConfig, minerConfig } from '../../config/index';
import { Dispatch } from 'redux';

const updateAccount = (account: string | null) => {
    return {
        type: 'UPDATE_ACCOUNT',
        payload: { account },
    };
};

const updateAccountBalance = (balance: string) => {
    return {
        type: 'UPDATE_BALANCE',
        payload: { balance },
    };
};

const updateNetwork = (network: Object | null) => {
    return {
        type: 'UPDATE_NETWORK',
        payload: { network },
    };
};

const updateRightNetwork = (isRightNetwork: boolean) => {
    return {
        type: 'UPDATE_RIGHTNETWORK',
        payload: { isRightNetwork },
    };
};

const updateWeb3 = (web3: Web3 | null) => {
    return {
        type: 'UPDATE_WEB3',
        payload: { web3 },
    };
};

const updateSmartContract = (smartContract: Contract | null) => {
    return {
        type: 'UPDATE_SMARTCONTRACT',
        payload: { smartContract },
    };
};

const connectFailed = (errorMsg: string) => {
    return {
        type: 'CONNECTION_FAILED',
        payload: { errorMsg },
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

export const checkConnection = () => {
    return async (dispatch: Dispatch) => {
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
            const web3 = new Web3(ethereum);

            dispatch(updateWeb3(web3));

            web3.eth.getChainId().then((res) => {
                dispatch(updateNetwork(Web3.utils.toHex(res)));

                if (Web3.utils.toHex(res) === networkConfig.chainId) {
                    const SmartContractObj = new web3.eth.Contract(minerAbi as AbiItem[], minerConfig.contractAddress);

                    dispatch(updateSmartContract(SmartContractObj));
                    dispatch(updateRightNetwork(true));
                } else {
                    dispatch(updateSmartContract(null));
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

                    dispatch(updateAccount(accountSwitch));
                } else {
                    dispatch(updateAccount(null));
                }
            });

            ethereum.on('chainChanged', (code: string, reason: string) => {
                const provider = new Web3(window.ethereum).eth;

                if (code) {
                    dispatch(updateNetwork(parseInt(code)));

                    console.log(code, networkConfig.chainId);
                    if (code === networkConfig.chainId) {
                        const SmartContractObj = new web3.eth.Contract(minerAbi as AbiItem[], minerConfig.contractAddress);

                        dispatch(updateSmartContract(SmartContractObj));
                        dispatch(updateRightNetwork(true));
                    } else {
                        dispatch(updateSmartContract(null));
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
            dispatch(connectFailed('Install Metamask.'));
        }
    };
};

export const connect = () => {
    return async (dispatch: Dispatch) => {
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
            let web3 = new Web3(ethereum);
            web3.eth.setProvider(ethereum);
            dispatch(updateWeb3(web3));
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            dispatch(connectFailed('Install Metamask.'));
        }
    };
};
