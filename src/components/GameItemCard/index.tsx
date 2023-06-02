import { Card } from 'antd';
import React, { useMemo } from 'react';
import { SYMBOL } from '@/contracts';
import { BOARD_DATA_TYPE } from '@/constants/types';
import styles from './style.module.scss';
import CN from 'classnames';

import { Link } from 'react-router-dom';
import { ROUTES_NAMES } from '@/router/router';
import PrimaryButton from '../atoms/buttons/PrimaryButton';
import SecondaryButton from '../atoms/buttons/SecondaryButton';
import CopyAddress from '../CopyAddress';

type Props = {
  board: BOARD_DATA_TYPE;
};

const GameItemCard: React.FC<Props> = ({ board }) => {
  const tagInfo: { className: string; label: string } = useMemo(() => {
    switch (board.status) {
      case 'Current Board':
        return { className: 'item-playing', label: 'Current Board' };
      case 'playing':
        return { className: 'item-playing', label: 'Playing' };
      case 'waiting':
        return { className: 'item-waiting', label: 'Waiting' };
      case 'ended':
        return { className: 'item-ended', label: 'Ended' };

      default:
        return { className: 'item-error', label: 'Error' };
    }
  }, [board.status]);
  return (
    <Card
      className={CN(styles.gameItemCard, {
        [styles.currentBoardItem]: board.status === 'Current Board',
      })}
    >
      <div className="flex flex-col gap-[16px]">
        <div className={CN('item-tag', { [tagInfo.className]: true })}>
          {tagInfo.label}
        </div>
        <div className="text-bold text-[22px] text-white">
          BLACKJACK #{board.id}
        </div>
        <div className="flex flex-col justify-between text-bold md:flex-row">
          <div className="w-1/3 flex flex-col justify-center items-start text-bold gap-[8px]">
            <p className="text-[#888888] text-[14px]">Bid Price</p>
            <p className="text-white text-base">
              {board.betPrice} {SYMBOL}
            </p>
          </div>
          <div className="w-1/3 flex flex-col justify-center items-start text-bold gap-[8px]">
            <p className="text-[#888888] text-[14px]">Dealer</p>
            {!!board.dealer && <CopyAddress address={board.dealer} />}
          </div>
          <div className="w-1/3 flex flex-col justify-center items-start text-bold gap-[8px]">
            <p className="text-[#888888] text-[14px]">Player</p>
            {!!board.player && <CopyAddress address={board.player} />}
          </div>
        </div>
        <div className="w-full mt-2">
          <Link
            to={`${ROUTES_NAMES.BLACKJACK_DETAIL.replace(
              ':gameId',
              `${board.id}`
            )}`}
          >
            {board.status === 'Current Board' ? (
              <PrimaryButton className="w-full">Play Now</PrimaryButton>
            ) : (
              <SecondaryButton className="w-full">
                {board.status === 'waiting' ? 'Join Now' : 'View'}
              </SecondaryButton>
            )}
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default GameItemCard;
