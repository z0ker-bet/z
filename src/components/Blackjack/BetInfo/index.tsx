import React, { useCallback } from 'react';
import CN from 'classnames';
import styles from './style.module.scss';
import { SYMBOL } from '@/contracts';

type BetInfoType = {
  price: number;
  isActive?: boolean;
  className?: string;
  onClick?: any;
  hiddenSymbol?: boolean;
  isDoubled?: boolean;
};

const BetInfo: React.FC<BetInfoType> = ({
  price,
  className,
  isActive,
  onClick,
  isDoubled,
  hiddenSymbol,
}) => {
  const handleOnClick = useCallback(() => {
    if (onClick) onClick();
  }, [onClick]);
  return (
    <div
      className={CN(
        `flex flex-col justify-center items-center`,
        styles.betInfo,
        styles[`bet-${price}`],
        { [styles.active]: isActive },
        { [styles.isDoubled]: isDoubled },
        className || ''
      )}
      onClick={handleOnClick}
    >
      {isDoubled ? (
        <span>Doubled</span>
      ) : (
        <>
          <span>{price}</span>
          {!hiddenSymbol && <span>{SYMBOL}</span>}
        </>
      )}
    </div>
  );
};

export default BetInfo;
