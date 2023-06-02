import React, { useState } from 'react';
import BetInfo from '../BetInfo';
import { BET_INFO_LIST } from '@/constants';
import CN from 'classnames';
import { SYMBOL } from '@/contracts';
import { Typography } from 'antd';
import CreateGameBtn from './CreateGameBtn';

type CreateGameGroupBtnType = {
  onFinish?: () => void;
  className?: string;
  classNameBtn?: string;
};

const CreateGameGroupBtn: React.FC<CreateGameGroupBtnType> = ({
  onFinish,
  className,
  classNameBtn,
}) => {
  const [betPrice, setBetPrice] = useState(50);

  return (
    <div
      className={CN(
        'w-full flex flex-col items-center justify-center gap-3',
        className
      )}
    >
      <div className="flex items-center justify-center gap-3">
        {BET_INFO_LIST.map((bet: number) => (
          <BetInfo
            key={`${bet}`}
            price={bet}
            className="w-[80px] h-[80px] text-[16px] cursor-pointer"
            isActive={bet === betPrice}
            onClick={() => setBetPrice(bet)}
            hiddenSymbol
          />
        ))}
      </div>
      <div className="flex flex-col px-5 py-3 items-center justify-center gap-3 bg-[rgba(0,0,0,0.5)] text-white border-[#ff6b00] border-[1px] rounded-[10px] text-base">
        <Typography.Text className="text-[18px] font-bold">
          Bet:{' '}
          <span className="text-[#ff6b00] text-[18px] font-black">
            {betPrice}
          </span>{' '}
          {SYMBOL}
        </Typography.Text>
        {BET_INFO_LIST.map((item) => (
          <>
            {betPrice === item && (
              <CreateGameBtn
                betPrice={item}
                onFinish={onFinish}
                className={classNameBtn}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default CreateGameGroupBtn;
