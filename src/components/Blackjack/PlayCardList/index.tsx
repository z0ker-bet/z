import React, { useMemo } from 'react';
import CN from 'classnames';
import PlayCardItem, { CARD_WIDTH } from '../PlayCardItem';
import DealerAvatar from '@/components/DealerAvatar';
import CopyAddress from '@/components/CopyAddress';
import { Button } from 'antd';
import { ZERO_ADDRESS } from '@/constants';
import LoadingCard from '@/components/LoadingCard';
import BetInfo from '../BetInfo';

type PlayCardListType = {
  values: number[];
  isOwnerView?: boolean;
  minPoint: number;
  maxPoint: number;
  isDealer: boolean;
  isActive: boolean;
  isOwner: boolean;
  isLoadingShuffle: boolean;
  address: string;
  isDoubled?: boolean;
};

const PlayCardList: React.FC<PlayCardListType> = ({
  values,
  isOwnerView,
  minPoint,
  maxPoint,
  isDealer,
  isActive,
  isOwner,
  address,
  isLoadingShuffle,
  isDoubled,
}) => {
  // const positionClassname = isOwnerView ? 'bottom-[5%] mb-[70px]' : 'top-[5%]';
  const positionClassname = isOwnerView ? 'top-[300px]' : 'top-[10px]';
  const point = useMemo(() => {
    if (maxPoint === minPoint || maxPoint > 21) return minPoint;

    return maxPoint;
  }, [minPoint, maxPoint]);
  return (
    <div
      className={CN(
        'w-full flex flex-row gap-[10px] justify-center items-center absolute',
        positionClassname
      )}
    >
      <div className={`flex flex-col justify-center items-center gap-0`}>
        <div
          className={CN('flex justify-center items-center relative p-2', {
            'border-brand border-[3px] rounded-[4px]': isActive,
          })}
          style={{
            position: 'relative',
            boxSizing: 'content-box',
            width: `${CARD_WIDTH + (values.length - 1) * (CARD_WIDTH - 20)}px`,
            height: 138,
          }}
        >
          <div
            className={CN({
              'opacity-10': isLoadingShuffle,
            })}
          >
            {values.map((value, index) => (
              <PlayCardItem key={`${index}`} value={+value} indexItem={index} />
            ))}
          </div>

          {isLoadingShuffle && <LoadingCard />}
          {isDoubled && (
            <div className="absolute left-[-120px] flex gap-3">
              <BetInfo price={0} isDoubled />
            </div>
          )}
        </div>
        <div className="flex justify-center items-center gap-2 text-base text-white">
          <div className="mt-2 px-5 py-1 rounded-[4px] flex justify-center items-center bg-[#283346]">
            {point}
          </div>
        </div>
        <div className="flex justify-center items-center gap-3 text-base text-white mt-3">
          {isDealer && <DealerAvatar />}
          <span>
            {isOwner && isOwnerView
              ? 'You'
              : isDealer
              ? 'Dealer'
              : address && address !== ZERO_ADDRESS
              ? 'Player'
              : ''}
          </span>
          {address && address !== ZERO_ADDRESS && (
            <Button className="flex gap-6 rounded-full justify-center items-center bg-[#414040] text-base">
              <CopyAddress address={address || ''} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayCardList;
