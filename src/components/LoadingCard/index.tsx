import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime';
import styles from './style.module.scss';

type LoadingCardType = {
  className?: string;
};

const SIZE = 30;

const LoadingCard: React.FC<LoadingCardType> = () => {
  useEffect(() => {
    anime({
      targets: '.item-1',
      keyframes: [
        {
          translateX: 0,
          translateY: 0,
        },
        {
          translateX: -SIZE,
          translateY: 0,
        },
        {
          translateX: -SIZE,
          translateY: SIZE,
        },
        {
          translateX: 0,
          translateY: SIZE,
        },
        {
          translateX: 0,
          translateY: 0,
        },
      ],
      easing: 'easeInOutSine',
      duration: 2000,
      loop: true,
    });

    anime({
      targets: '.item-2',
      keyframes: [
        {
          translateX: 0,
          translateY: 0,
        },
        {
          translateX: 0,
          translateY: SIZE,
        },
        {
          translateX: SIZE,
          translateY: SIZE,
        },
        {
          translateX: SIZE,
          translateY: 0,
        },
        {
          translateX: 0,
          translateY: 0,
        },
      ],
      easing: 'easeInOutSine',
      duration: 2000,
      loop: true,
    });
    anime({
      targets: '.item-3',
      keyframes: [
        {
          translateX: 0,
          translateY: 0,
        },
        {
          translateX: SIZE,
          translateY: 0,
        },
        {
          translateX: SIZE,
          translateY: -SIZE,
        },
        {
          translateX: 0,
          translateY: -SIZE,
        },
        {
          translateX: 0,
          translateY: 0,
        },
      ],
      easing: 'easeInOutSine',
      duration: 2000,
      loop: true,
    });
    anime({
      targets: '.item-4',
      keyframes: [
        {
          translateX: 0,
          translateY: 0,
        },
        {
          translateX: 0,
          translateY: -SIZE,
        },
        {
          translateX: -SIZE,
          translateY: -SIZE,
        },
        {
          translateX: -SIZE,
          translateY: 0,
        },
        {
          translateX: 0,
          translateY: 0,
        },
      ],
      easing: 'easeInOutSine',
      duration: 2000,
      loop: true,
    });
  }, []);
  return (
    <div className={styles.loadingCard}>
      <div className="item item-1"></div>
      <div className="item item-2"></div>
      <div className="item item-3"></div>
      <div className="item item-4"></div>
    </div>
  );
};

export default LoadingCard;
