import React, { useCallback, useEffect, useState } from 'react';
import SideMenu from './SideMenu';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import styles from './style.module.scss';
import CN from 'classnames';
import { useChainId, useDisconnect, useNetwork } from 'wagmi';
import WrongNetworkModal from '../WrongNetworkModal';

type LayoutProps = {};

const MainLayout: React.FC<LayoutProps> = () => {
  const { chain } = useNetwork();
  const [wrongNetwork, setWrongNetwork] = useState<boolean>(false);
  const chainId = useChainId();
  const { disconnectAsync } = useDisconnect();

  const checkNetwork = useCallback(async () => {
    try {
      if (chain?.id && chain?.id !== chainId) {
        await disconnectAsync();
        setWrongNetwork(true);
      } else {
        setWrongNetwork(false);
      }
    } catch (error) {
      console.log('Network error', error);
    }
  }, [chain?.id, chainId]);

  useEffect(() => {
    checkNetwork();
  }, [chain?.id, chainId, disconnectAsync]);

  return (
    <div
      className={CN(
        'flex min-w-screen h-screen overflow-scroll',
        styles.pageLayout
      )}
    >
      <SideMenu />
      <div className="flex-1 flex flex-col main-content">
        <Header />
        <div className="px-6 py-4 h-full overflow-scroll">
          <Outlet />
        </div>
      </div>
      {wrongNetwork && (
        <WrongNetworkModal onClose={() => setWrongNetwork(false)} />
      )}
    </div>
  );
};

export default MainLayout;
