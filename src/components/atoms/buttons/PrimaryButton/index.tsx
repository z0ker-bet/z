import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import CN from 'classnames';
import WhiteIconLeft from '@assets/images/icons/arrow-left-white.svg';
import DisabledIconLeft from '@assets/images/icons/arrow-left-disabled.svg';
import WhiteIconRight from '@assets/images/icons/arrow-right-white.svg';
import DisabledIconRight from '@assets/images/icons/arrow-right-disabled.svg';

type PrimaryButtonType = ButtonProps & {
  iconType?: 'left' | 'right';
};

const PrimaryButton: React.FC<PrimaryButtonType> = ({
  children,
  iconType,
  disabled,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={CN(
        'flex flex-row justify-center items-center px-6 py-5 bg-brand text-white rounded-[5px] gap-2 text-sm font-extrabold uppercase disabled:bg-[#414040] disabled:text-[#888888]',
        props.className || ''
      )}
    >
      {iconType === 'left' && (
        <img
          src={disabled ? DisabledIconLeft : WhiteIconLeft}
          className="h-4 w-4"
        />
      )}
      {children}
      {iconType === 'right' && (
        <img
          src={disabled ? DisabledIconRight : WhiteIconRight}
          className="h-4 w-4"
        />
      )}
    </Button>
  );
};

export default PrimaryButton;
