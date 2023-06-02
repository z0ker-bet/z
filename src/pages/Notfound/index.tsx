import { type FC } from "react";
import { Link } from "react-router-dom";
import useNotfound, { type Props, type ReceivedProps } from "./hook";
import { Typography } from "antd";
import CN from 'classnames';
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import styles from './style.module.scss';

const NotfoundLayout: FC<Props> = (_props) => {
  return (
    <section className={CN("w-full min-h-screen flex flex-1 items-center p-16", styles.notFoundPage)}>
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="flex flex-col justify-center items-center max-w-md text-center">
          <Typography.Text
            color="brand.400"
            className="mb-8 text-9xl font-extrabold dark:text-gray-600"
          >
            404
          </Typography.Text>
          <Typography.Text className="text-2xl font-semibold md:text-3xl">
            {`Sorry, we couldn't find this page.`}
          </Typography.Text>
          <Typography.Text className="mt-4 mb-8">
            But don't worry, you can find plenty of other things on our homepage.
          </Typography.Text>
          <Link
            to={"/"}
          >
            <SecondaryButton>
              Back to homepage
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

const Notfound: FC<ReceivedProps> = (props) => (
  <NotfoundLayout {...useNotfound(props)} />
);

export default Notfound;
