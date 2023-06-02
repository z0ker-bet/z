import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import CN from 'classnames';
import PrimaryIconLeft from '@assets/images/icons/arrow-left-primary.svg';
import DisabledIconLeft from '@assets/images/icons/arrow-left-disabled.svg';
import PrimaryIconRight from '@assets/images/icons/arrow-right-primary.svg';
import DisabledIconRight from '@assets/images/icons/arrow-right-disabled.svg';

type SecondaryButtonType = ButtonProps & {
  iconType?: 'left' | 'right';
};

const SecondaryButton: React.FC<SecondaryButtonType> = ({
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
        'flex flex-row justify-center items-center gap-2 px-6 py-5 bg-transparent text-brand rounded-[5px] border-brand text-sm font-extrabold uppercase disabled:border-[#414040] disabled:text-[#888888] ',
        props.className || ''
      )}
    >
      {iconType === 'left' && (
        <img
          src={disabled ? DisabledIconLeft : PrimaryIconLeft}
          className="h-4 w-4"
        />
      )}
      {children}
      {iconType === 'right' && (
        <img
          src={disabled ? DisabledIconRight : PrimaryIconRight}
          className="h-4 w-4"
        />
      )}
    </Button>
  );
};

export default SecondaryButton;
