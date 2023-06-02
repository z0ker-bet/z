import React from 'react';
import { Avatar } from 'antd';
import PlayerImg from '@assets/images/roles/player.svg';
import PlayerActiveImg from '@assets/images/roles/player-active.svg';

type PlayerAvatarType = {
  isAtive: boolean;
};

const PlayerAvatar: React.FC<PlayerAvatarType> = ({ isAtive }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Avatar src={isAtive ? PlayerActiveImg : PlayerImg} size={48} />
    </div>
  );
};

export default PlayerAvatar;
