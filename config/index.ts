import Web3 from 'web3';

export const networkConfig = {
    chainName: 'Avalanche Fuji Testnet',
    chainId: Web3.utils.toHex(43113),
    nativeCurrency: { name: 'AVAX', decimals: 18, symbol: 'AVAX' },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
};

export const contractAddresses = {
    miner: '0x68071b628211eB53c494E640e3EC9425e10BF37f',
    mine: '0xBA7e7689BeD8d31fc1BE1e4c12e6d0f9f9F2fcc7',
    diamond: '0x462Da0D57E9F932321b3970E899ee0C4770f6839',
    vault: '0xC73A2906ca86eC802e57e119F8C2746890c6B887',
};

export const siteProtection = {
    whitelistedWallets: [
        '0x0BE2F9e6A907B73bA1BD85E98B72403627A33E88',
        '0x99E437ae983E40346F7EcEdAabd0b4c6adFC6BE8',
        '0xb9FC257A258C5Ef6C42a4af5a92353A5570c7d67',
    ],
    whitelistOnly: true,
};

export const markConfig = {
    welcomeSpeeches: [
        { message: 'Welcome back, friend!' },
        { message: 'Hello there, my name is Mark. Welcome to the mine!' },
        { message: 'Greetings traveller!' },
        { message: 'Top of the morning, friend!' },
    ],
};
