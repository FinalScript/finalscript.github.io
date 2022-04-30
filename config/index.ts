import Web3 from 'web3';

export const networkConfig = {
    chainName: 'Avalanche Fuji Testnet',
    chainId: Web3.utils.toHex(43113),
    nativeCurrency: { name: 'AVAX', decimals: 18, symbol: 'AVAX' },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
};

export const minerConfig = {
    contractAddress: '0x68071b628211eB53c494E640e3EC9425e10BF37f',
};

export const siteProtection = {
    whitelistedWallets: [
        '0x0BE2F9e6A907B73bA1BD85E98B72403627A33E88',
        '0x99E437ae983E40346F7EcEdAabd0b4c6adFC6BE8',
        '0xb9FC257A258C5Ef6C42a4af5a92353A5570c7d67',
    ],
    whitelistOnly: true,
};
