import { Avatar, Badge, Button, Card } from 'antd';
import { TickCircle } from 'iconsax-react';
import React from 'react';
import { User } from 'react-iconly';
import GameImg from '@assets/images/game.png';
import { SYMBOL } from '@/contracts';

type Props = {
  id?: string;
  title: string;
  img: string;
  avatar: string;
  username: string;
  curBid: string | number;
};

const GameTableCard: React.FC<Props> = ({
  title,
  img,
  avatar,
  curBid,
  username,
}) => {
  return (
    <Card>
      <div className="relative">
        <img src={!!img ? img : GameImg} />
        <div className="absolute translate-y-[-50%] border rounded-full p-2 right-3">
          <Badge
            count={<TickCircle className="fill-[#08A0F7]" />}
            offset={['0', '100%']}
          >
            <Avatar
              {...(avatar
                ? {
                    src: avatar,
                  }
                : {
                    icon: <User size={40} />,
                  })}
              className={'flex justify-center items-center bg-gray-200'}
              size={60}
            />
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-4">
        <div>
          <p className="mb-2">{username}</p>
          <h6 className="font-medium text-lg">{title.toUpperCase()}</h6>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500">Current Bid</p>
            <p className="font-medium text-lg">
              {curBid} {SYMBOL}
            </p>
          </div>
          <div className="min-h-full">
            <Button className="h-full">Place a bet</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameTableCard;
