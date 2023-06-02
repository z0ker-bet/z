import React from 'react';
import GameCard from '@components/GameCard';
import PageTitle from '@/components/Layout/PageTitle';
import BlackjackIcon from '@assets/images/games/blackjack.png';
import MineIcon from '@assets/images/games/mine.png';
import CoinFlipIcon from '@assets/images/games/coin-flip.png';
import RangeIcon from '@assets/images/games/range.png';
import { ROUTES_NAMES } from '@/router/router';
import { Col, Row } from 'antd';

type ItemType = {
  title: string;
  link?: string;
  icon: any;
};
const GameItems: ItemType[] = [
  {
    title: 'BLACKJACK',
    icon: BlackjackIcon,
    link: ROUTES_NAMES.BLACKJACK,
  },
  {
    title: 'MINE',
    icon: MineIcon,
  },
  {
    title: 'COIN FLIP',
    icon: CoinFlipIcon,
  },
  {
    title: 'RANGE',
    icon: RangeIcon,
  },
];

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 text-white">
      <PageTitle title="BLACKJACK" />
      <div className="w-full flex flex-row gap-6 justify-center items-center">
        <Row gutter={[16, 16]} className="w-full">
          {GameItems.map((item: ItemType) => (
            <Col xs={24} md={12} xl={6} key={item.title}>
              <div className="flex w-full">
                <GameCard
                  title={item.title}
                  icon={item.icon}
                  link={item.link}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
