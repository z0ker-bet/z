import React from 'react';
import { Avatar } from 'antd';
import DealerActiveImg from '@assets/images/logo.svg';

const DealerAvatar: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Avatar
        src={DealerActiveImg}
        size={32}
        // className="border-[#FF6B00] p-1"
      />
    </div>
  );
};

export default DealerAvatar;
