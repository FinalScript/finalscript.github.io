import Web3 from 'web3';

export const networkConfig = {
    chainName: 'Avalanche Fuji Testnet',
    chainId: Web3.utils.toHex(43113),
    nativeCurrency: { name: 'AVAX', decimals: 18, symbol: 'AVAX' },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
};

export const contractAddresses = {
    miner: '0x809fC7086BE9BCE0c2143145e10DE8e76A70BAB9',
    mine: '0x745B47aA97584B476564c6B81847A24Ff296D8E2',
    diamond: '0x48c0518D6E068c893674cFBf21092748cfB14596',
    vault: '0x0CF1a4A96f19Bd1FB2c7D6A728182cB36E9b0bb5',
};

export const siteProtection = {
    whitelistedWallets: [
        '0x0BE2F9e6A907B73bA1BD85E98B72403627A33E88',
        '0x99E437ae983E40346F7EcEdAabd0b4c6adFC6BE8',
        '0xb9FC257A258C5Ef6C42a4af5a92353A5570c7d67',
        '0x72E494939f08f1710d61e1D53CDc8b2f6Ee65b49',
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
