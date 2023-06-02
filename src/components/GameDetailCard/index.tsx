import { Card } from 'antd';
import React, { ReactNode } from 'react';
import styles from './style.module.scss';
import CN from 'classnames';
import DefaultButton from '../atoms/buttons/DefaultButton';

type Props = {
  children: ReactNode;
  gameType?: 'blackjack' | 'blackjack-detail' | 'mine' | 'coinflip' | 'range';
  className?: string;
};

const GameDetailCard: React.FC<Props> = ({ children, gameType, className }) => {
  return (
    <Card className={styles.gameDetailCard}>
      <div
        className={CN(
          'bg-[#252525] w-full min-h-[650px] flex items-center justify-center',
          {
            [gameType || '']: !!gameType,
            [className || '']: !!className,
          }
        )}
      >
        {children}
      </div>

      <div className="flex justify-between items-center gap-2 text-[#888888] font-bold text-2xl py-4 px-5 bg-[#414040]">
        <DefaultButton>How To Play</DefaultButton>
      </div>
    </Card>
  );
};

export default GameDetailCard;
