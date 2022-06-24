import Web3 from 'web3';

export const networkConfig = {
    // chainName: 'Avalanche Fuji Testnet',
    // chainId: Web3.utils.toHex(43113),
    // nativeCurrency: { name: 'AVAX', decimals: 18, symbol: 'AVAX' },
    // rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    // snowtrace: 'https://testnet.snowtrace.io/tx/',
    chainName: 'Avalanche Network',
    chainId: Web3.utils.toHex(43114),
    nativeCurrency: { name: 'AVAX', decimals: 18, symbol: 'AVAX' },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    snowtrace: 'https://snowtrace.io/tx/',
};

export const contractAddresses = {
    // miner: '0xBF250712815651145db3cbDdfde6AbA5B33fe032',
    // mine: '0xe219D01675588a2a7e1Fc56aCFB8CcCe9F237F61',
    // diamond: '0xc1b7e232F44Dd5Ff4D9d1F86367b69F528E96Dd2',
    // vault: '0x58851729451197043b804AA5eD84d80C3fAc2255',
    // event: '0xEfdcA8d91cB3c7969d597b01de025Ee2fbEe0640',
    miner: '0x745Bd15c80abAB0Ed7473346533571B41258B364',
    mine: '0xe219D01675588a2a7e1Fc56aCFB8CcCe9F237F61',
    diamond: '0xc1b7e232F44Dd5Ff4D9d1F86367b69F528E96Dd2',
    vault: '0x58851729451197043b804AA5eD84d80C3fAc2255',
    event: '0xEfdcA8d91cB3c7969d597b01de025Ee2fbEe0640',
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
