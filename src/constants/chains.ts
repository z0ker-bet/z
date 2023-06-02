import { Chain } from 'wagmi/chains';

export const thetaTestnet: Chain = {
  id: 365,
  name: 'Theta Testnet',
  network: 'theta-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Theta FUEL',
    symbol: 'TFUEL',
  },
  rpcUrls: {
    infura: { http: ['https://eth-rpc-api-testnet.thetatoken.org/rpc'] },
    default: { http: ['https://eth-rpc-api-testnet.thetatoken.org/rpc'] },
    public: { http: ['https://eth-rpc-api-testnet.thetatoken.org/rpc'] },
  },
  blockExplorers: {
    etherscan: {
      name: 'Thetascan',
      url: 'https://testnet-explorer.thetatoken.org',
    },
    default: {
      name: 'Thetascan',
      url: 'https://testnet-explorer.thetatoken.org',
    },
  },
  testnet: true,
};

export const thetaMainnet: Chain = {
  id: 361,
  name: 'Theta Mainnet',
  network: 'theta-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Theta FUEL',
    symbol: 'TFUEL',
  },
  rpcUrls: {
    infura: { http: ['https://eth-rpc-api.thetatoken.org/rpc'] },
    default: { http: ['https://eth-rpc-api.thetatoken.org/rpc'] },
    public: { http: ['https://eth-rpc-api.thetatoken.org/rpc'] },
  },
  blockExplorers: {
    etherscan: {
      name: 'Thetascan',
      url: 'https://explorer.thetatoken.org',
    },
    default: {
      name: 'Thetascan',
      url: 'https://explorer.thetatoken.org',
    },
  },
  testnet: false,
};
