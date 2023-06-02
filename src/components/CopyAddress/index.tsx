import React, { useCallback, useState } from 'react';
import DONE from '@assets/images/icons/done.svg';
import COPY from '@assets/images/icons/copy.svg';
import { useCopyToClipboard } from 'react-use';
import { truncateAddress } from '@/utils';
import CN from 'classnames';

type CopyAddressType = {
  address: string;
  className?: string;
  iconSize?: number;
};

const CopyAddress: React.FC<CopyAddressType> = ({
  address,
  className,
  iconSize = 16,
}) => {
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopyToClipboard = useCallback(
    (event: any) => {
      event.stopPropagation();
      copyToClipboard(`${address}`);
      setCopyButtonStatus(true);
      setTimeout(() => {
        setCopyButtonStatus(copyButtonStatus);
      }, 2500);
    },
    [copyButtonStatus, copyToClipboard, address]
  );

  const handleClickDone = useCallback((event: any) => {
    event.stopPropagation();
  }, []);

  return (
    <div
      className={CN('flex gap-[8px] text-white text-base', {
        [className || '']: !!className,
      })}
    >
      {truncateAddress(address)}
      <div className="flex justify-center cursor-pointer">
        {copyButtonStatus ? (
          <img
            src={DONE}
            onClick={handleClickDone}
            style={{ width: iconSize }}
          />
        ) : (
          <img
            src={COPY}
            onClick={handleCopyToClipboard}
            style={{ width: iconSize }}
          />
        )}
      </div>
    </div>
  );
};

export default CopyAddress;
