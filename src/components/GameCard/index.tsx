import { Card } from 'antd';
import React from 'react';
import PrimaryIconRight from '@assets/images/icons/arrow-right-primary.svg';
import DisabledIconRight from '@assets/images/icons/arrow-right-disabled.svg';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

type Props = {
  title: string;
  icon: any;
  link?: string;
};

const GameCard: React.FC<Props> = ({ title, icon, link }) => {
  return (
    <Card className={styles.gameCard}>
      {link ? (
        <Link to={link}>
          <div className="relative">
            <img src={icon} className="w-full" />
          </div>

          <div className="flex justify-between items-center gap-2 text-white font-bold text-2xl py-6 px-5 bg-[#414040]">
            {title}
            <img src={PrimaryIconRight} className="h-6 w-6" />
          </div>
        </Link>
      ) : (
        <>
          <div className="relative">
            <img src={icon} className="w-full" />
          </div>

          <div className="flex justify-between items-center gap-2 text-[#888888] font-bold text-2xl py-6 px-5 bg-[#414040]">
            {title}
            <img src={DisabledIconRight} className="h-6 w-6" />
          </div>
        </>
      )}
    </Card>
  );
};

export default GameCard;
