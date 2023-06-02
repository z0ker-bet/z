import React from 'react';
import { Link } from 'react-router-dom';
import CN from 'classnames';
import styles from './style.module.scss';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import { Button, Typography } from 'antd';
import TextLogo from '@/assets/images/home/text_logo.svg';
import Zoker from '@/assets/images/home/home.svg';
import CardBackground from '@/assets/images/home/card-background.png';

import Coin1 from '@/assets/images/home/coin_1.png';
import Coin2 from '@/assets/images/home/coin_2.png';
import Coin3 from '@/assets/images/home/coin_3.png';
import Coin4 from '@/assets/images/home/coin_4.png';
import Coin5 from '@/assets/images/home/coin_5.png';
import Coin6 from '@/assets/images/home/coin_6.png';
import Coin7 from '@/assets/images/home/coin_7.png';
import Footer from '@/components/Layout/Footer';

const Home: React.FC = () => {
  return (
    <div
      className={CN(
        'relative w-screen h-screen px-1 py-2 xl:py-7 xl:px-24 flex flex-col justify-start',
        styles.homePage
      )}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <img src={Coin1} className="w-10 absolute top-[35%]" />
        <img src={Coin2} className="w-10 absolute top-[20%] left-[33%]" />
        <img src={Coin3} className="w-10 absolute left-[33%] top-[60%]" />
        <img src={Coin4} className="w-10 absolute right-0 top-[80%]" />
        <img src={Coin5} className="w-10 absolute top-[20%] right-[10%]" />
        <img src={Coin6} className="w-10 absolute left-[20%] bottom-[20%]" />
        <img src={Coin7} className="w-20 absolute bottom-0 right-[33%]" />
      </div>
      <div className="w-full flex items-center justify-between z-10">
        <Link to="/">
          <img src={TextLogo} />
        </Link>
        <div className="flex items-center gap-3">
          <a
            href="https://medium.com/@zoker_bet/zero-knowledge-the-next-trend-of-crypto-or-just-a-child-who-cannot-grow-up-2f4ba50ebb7b"
            target="_blank"
          >
            <Button type="ghost" className="font-extrabold">
              DOCS
            </Button>
          </a>

          <Link to={'/games'}>
            <SecondaryButton iconType="right">LAUNCH APP</SecondaryButton>
          </Link>
        </div>
      </div>

      <div className="pt-10 flex flex-col gap-6 justify-center items-center w-full h-full xl:flex-row xl:pt-0 xl:justify-between">
        <div className="w-full flex flex-col justify-center items-center text-center z-10 xl:w-1/2 xl:justify-start xl:items-start xl:text-left">
          <Typography.Title className="font-black text-4xl uppercase mb-7 leading-[62px]">
            Bet on fairness
            <br />
            win with privacy
          </Typography.Title>
          <Typography.Text className="mb-6 font-bold text-lg text-[#888888]">
            The on-chain gambling platform powered by zk technology
          </Typography.Text>
          <Link to={'/games'}>
            <PrimaryButton>Play now</PrimaryButton>
          </Link>
        </div>
        <div className="flex items-center justify-center z-1 absolute w-full h-full opacity-20 xl:w-1/2 xl:h-1/2 xl:opacity-100 xl:relative">
          <div className={styles.glow} />
          <img src={Zoker} className={styles.zoker} />
        </div>
        <div className="z-10 mt-[50px] flex flex-col gap-6 sm:flex-row xl:flex-col xl:mt-0">
          <div className={CN('ml-0', styles.card)}>
            <Typography.Text className="font-bold text-white z-10">
              Total Transaction
            </Typography.Text>
            <Typography.Text className="font-black text-[#ff6b00] text-3xl z-10">
              1000+
            </Typography.Text>
            <img
              src={CardBackground}
              className="absolute top-0 left-0 right-0 bottom-0 z-0"
            />
          </div>
          <div className={CN('ml-0 xl:ml-[50px]', styles.card)}>
            <Typography.Text className="font-bold text-white z-10">
              Total User
            </Typography.Text>
            <Typography.Text className="font-black text-[#ff6b00] z-10 text-3xl">
              452
            </Typography.Text>
            <img
              src={CardBackground}
              className="absolute top-0 left-0 right-0 bottom-0 z-0"
            />
          </div>
          <div className={CN('ml-0 xl:ml-[-20px]', styles.card)}>
            <Typography.Text className="font-bold text-white z-10">
              Total Betting Volume ($)
            </Typography.Text>
            <Typography.Text className="font-black text-[#ff6b00] z-10 text-3xl">
              5000+
            </Typography.Text>
            <img
              src={CardBackground}
              className="absolute top-0 left-0 right-0 bottom-0 z-0"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
