import { Button, Typography } from 'antd';
import React from 'react';
import Twitter from '@/assets/images/home/twitter.svg';
import Youtube from '@/assets/images/home/youtube.svg';
import Discord from '@/assets/images/home/discord.svg';

const Footer: React.FC = () => {
  return (
    <div className="w-full flex justify-between items-center z-10">
      <div className="flex items-center gap-2">
        <Button icon={<img src={Discord} />} disabled type="ghost" />
        <Button icon={<img src={Twitter} />} disabled type="ghost" />
        <Button icon={<img src={Youtube} />} disabled type="ghost" />
      </div>
      <Typography.Text className="flex-1 text-center text-[#888888]">
        © Copyright 2023 Zoker Game.
      </Typography.Text>
      <div className="flex items-center gap-2">
        <Button type="ghost" disabled>
          {' '}
          Term & Privacy{' '}
        </Button>
        <Button type="ghost" disabled>
          {' '}
          Support
        </Button>
      </div>
    </div>
  );
};

export default Footer;
