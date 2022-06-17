import Web3 from 'web3';

export const networkConfig = {
    chainName: 'Avalanche Fuji Testnet',
    chainId: Web3.utils.toHex(43113),
    nativeCurrency: { name: 'AVAX', decimals: 18, symbol: 'AVAX' },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    snowtrace: 'https://testnet.snowtrace.io/tx/',
};

export const contractAddresses = {
    miner: '0x58c7E85f951C1aED61ed447C1cBD0c805001CEB2',
    mine: '0xF771098E47b48417Ff4e04405dccDBD3F3Cb410c',
    diamond: '0x9D5b23619f56fE8115E202D59f9e42f6e1cb95e4',
    vault: '0x9b273DF73138120df139C18bc080f2736Bb2A590',
    event: '0xf386ae27E224DAb46D97cE074443eb652fdd060e',
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
