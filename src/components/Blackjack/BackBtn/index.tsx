import React from 'react';
import ExitIcon from '@assets/images/icons/exit.svg';
import { Button } from 'antd';

const BackBtn: React.FC = () => {
  return (
    <Button
      type="ghost"
      className="min-h-[40px] min-w-[40px] flex justify-center items-center gap-2 box-content flex-row px-0 py-0 bg-[#FF6B00] hover:border-white"
    >
      <img src={ExitIcon} className="w-[20px]" />
    </Button>
  );
};

export default BackBtn;
