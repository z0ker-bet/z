import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router/router';
import { ConfigProvider, theme } from 'antd';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
// import { thetaMainnet, thetaTestnet } from '@constants/chains';
// import { bscTestnet } from 'wagmi/chains';
import { thetaTestnet } from '@constants/chains';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  // const chains = [thetaTestnet, thetaMainnet];
  // const chains = [bscTestnet];
  const chains = [thetaTestnet];

  const projectId =
    import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID ??
    'ed924112de82f98489a64e066d0e8e80';

  const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 2, chains }),
    provider,
  });

  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              fontFamily: 'Archivo, sans-serif',
              colorPrimary: '#ffffff',
            },
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode="light"
      />
    </Provider>
  );
}

export default App;
