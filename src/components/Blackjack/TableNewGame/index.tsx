import React from 'react';
import styles from './style.module.scss';
import { useAccount } from 'wagmi';
import CreateGameGroupBtn from '../CreateGameGroupBtn';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import { Link } from 'react-router-dom';
import { ROUTES_NAMES } from '@/router/router';
import { useWeb3Modal } from '@web3modal/react';

type TableNewGameType = {
  onFinish: () => any;
  currentGame?: number;
};

const TableNewGame: React.FC<TableNewGameType> = ({
  onFinish,
  currentGame,
}) => {
  const { isConnected } = useAccount();
  const { open, isOpen } = useWeb3Modal();

  return (
    <div className={styles.tableNewGame}>
      <div className="w-full flex flex-col justify-center items-center uppercase font-black text-[90px] leading-none text-white">
        <span>BLACK</span>
        <span className="mb-6">JACK</span>
        {isConnected ? (
          <>
            {!currentGame ? (
              <CreateGameGroupBtn onFinish={onFinish} className="mt-8" />
            ) : (
              <Link to={`${ROUTES_NAMES.BLACKJACK}/${currentGame}`}>
                <SecondaryButton className="mt-8" iconType="right">
                  Play Game #{currentGame}
                </SecondaryButton>
              </Link>
            )}
          </>
        ) : (
          <SecondaryButton
            onClick={() => open()}
            iconType="right"
            loading={isOpen}
            className="mt-8"
          >
            CONNECT WALLET
          </SecondaryButton>
        )}
      </div>
    </div>
  );
};

export default TableNewGame;
