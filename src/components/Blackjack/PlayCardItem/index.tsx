import React, { useEffect, useMemo, useState } from 'react';
import HiddenPlayCard from '@assets/images/playcards/hidden-1.svg';
import { getCardAssetSrcFromValue } from '@/utils';
import anime from 'animejs/lib/anime';

type PlayCardItemType = {
  value: number;
  indexItem: number;
};

const MIN_VALUE = 1;
const MAX_VALUE = 52;

export const PADDING_LIST = 8;
export const CARD_WIDTH = 100;

const PlayCardItem: React.FC<PlayCardItemType> = ({ value, indexItem }) => {
  const [isFirstClose, setIsFirstClose] = useState<boolean>(false);
  const isOpen = useMemo(() => value >= MIN_VALUE && value <= MAX_VALUE, [
    value,
  ]);

  const CardPlayerImage = isOpen
    ? getCardAssetSrcFromValue(value)
    : HiddenPlayCard;

  useEffect(() => {
    anime({
      targets: `.card-item-${indexItem}`,
      rotate: {
        value: 360,
        duration: 1800,
        easing: 'easeInOutSine',
      },
      // scale: {
      //   value: 1,
      //   duration: 1600,
      //   delay: 800,
      //   easing: 'easeInOutQuart',
      // },
      translateX: [
        {
          value: 100,
          easing: 'easeOutSine',
          duration: 500,
        },
        {
          value: 0,
          easing: 'easeInOutSine',
          duration: 500,
        },
      ],
      // scale: [
      //   { value: 0.4, easing: 'easeOutSine', duration: 500 },
      //   { value: 1, easing: 'easeInOutQuad', duration: 1200 },
      // ],
      // delay: stagger(200, { grid: [8, 12], from: 'center' }),
      easing: 'easeInOutSine',
      duration: 800,
      loop: false,
      delay: indexItem * 200,
      autoplay: true,
    });
    if (!value) {
      setIsFirstClose(true);
    }
  }, []);

  useEffect(() => {
    if (!!value && isFirstClose) {
      setIsFirstClose(false);
      anime({
        targets: `.card-item-${indexItem}-open`,
        scale: [
          { value: 0.4, easing: 'easeOutSine', duration: 500 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200 },
        ],
        delay: 0,
        easing: 'easeInOutSine',
        duration: 800,
        loop: false,
        autoplay: true,
      });
    }
  }, [value]);

  return (
    <img
      className={`card-item-${indexItem} ${
        !!value ? `card-item-${indexItem}-open` : ''
      }`}
      style={{
        filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.4))',
        position: 'absolute',
        top: PADDING_LIST,
        width: CARD_WIDTH,
        transition: 'src 2s',
        left: `${
          indexItem === 0
            ? PADDING_LIST
            : PADDING_LIST + indexItem * (CARD_WIDTH - 20)
        }px`,
      }}
      src={CardPlayerImage}
    />
  );
};

export default PlayCardItem;
