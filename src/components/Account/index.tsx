import React from 'react';
import ThetaImg from '@assets/images/chains/theta-logo.svg';
import PrimaryButton from '../atoms/buttons/PrimaryButton';
import TfuelImg from '@assets/images/tokens/tfuel.svg';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { Collapse } from 'antd';
import CN from 'classnames';
import CopyAddress from '../CopyAddress';
import styles from './style.module.scss';

const { Panel } = Collapse;

const Account: React.FC = () => {
  const { address } = useAccount();
  const { data } = useBalance({ address });
  const { disconnect } = useDisconnect();

  return (
    <div className={CN(styles.account)}>
      <div className="flex items-center justify-center gap-2">
        <img src={ThetaImg} className="mr-1 w-[48px] rounded-full" />
      </div>
      <Collapse bordered={false} expandIconPosition="end">
        <Panel
          header={
            <div className="flex gap-2 rounded-full justify-left items-center">
              <img src={TfuelImg} className="mr-1 w-[16px] rounded-full" />
              <CopyAddress
                address={address || ''}
                className="text-[13px]"
                iconSize={14}
              />
            </div>
          }
          key="1"
        >
          <div className="flex justify-start items-start py-[4px] text-base font-black mb-2">
            {data?.formatted ? (+`${data?.formatted}`).toFixed(4) : '0'}{' '}
            {data?.symbol}
          </div>

          <PrimaryButton className="w-full" onClick={() => disconnect()}>
            Disconnect
          </PrimaryButton>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Account;
