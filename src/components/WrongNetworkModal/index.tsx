import { type FC } from "react";
import { Modal, Typography } from "antd";
import CN from 'classnames';
import ThetaImg from '@assets/images/chains/theta-logo.svg';
import styles from './style.module.scss';
import PrimaryButton from "../atoms/buttons/PrimaryButton";
import { CHAINS_TYPE } from "@/contracts";

type WrongNetworkModalType = {
  onClose: any
}

const WrongNetworkModal: FC<WrongNetworkModalType> = ({ onClose }) => {
  return (
    <Modal open footer={null} className={CN(styles.wrongNetworkModal)} closable={false}>
      <section className={CN("w-full flex flex-1 items-center p-0 text-white")}>
        <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
          <div className="flex flex-col justify-center items-center max-w-md text-center">
            <Typography.Text
              color="brand.400"
              className="mb-8 text-3xl font-extrabold dark:text-gray-600"
            >
              Wrong Network
            </Typography.Text>
            <img src={ThetaImg} className="mr-1 w-[64px] rounded-full" />
            <Typography.Text className="my-8 text-xl font-base">
              Please switch to<span className="font-semibold mx-1">THETA {CHAINS_TYPE}</span> Chain
            </Typography.Text>
            <PrimaryButton className="mt-4" onClick={onClose}>Close</PrimaryButton>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default WrongNetworkModal;
