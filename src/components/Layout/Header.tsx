// import { EthereumClassic } from 'iconsax-react';
import React from 'react';
import { Account } from '..';
// import { Web3Button } from '@web3modal/react';
import { useAccount } from 'wagmi';
import SecondaryButton from '../atoms/buttons/SecondaryButton';
import { useWeb3Modal } from '@web3modal/react';

const Header: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { open, isOpen } = useWeb3Modal();

  return (
    <div className="w-full h-[96px] flex gap-3 py-4 px-6 justify-end items-center relative">
      {/* <div className="hidden header-left flex font-bold text-base text-white gap-6 lg:flex">
        <div className="flex gap-2">
          <span>Volume:</span>
          <span className="text-[#FF6B00]">$123,456,789</span>
        </div>
        <div className="flex gap-2">
          <span>Bets:</span>
          <span className="text-[#FF6B00]">456,789</span>
        </div>
      </div> */}
      <div className="header-right flex justify-center items-center gap-4">
        {!address || !isConnected ? (
          <SecondaryButton
            onClick={() => open()}
            iconType="right"
            loading={isOpen}
          >
            CONNECT WALLET
          </SecondaryButton>
        ) : (
          <Account />
        )}
      </div>
    </div>
  );
};

export default Header;
