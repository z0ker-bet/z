import { FC } from 'react';

type PageTitleType = {
  title: string;
};

const PageTitle: FC<PageTitleType> = ({ title }) => {
  return (
    <div className="w-full flex justify-start items-center font-black text-[38px]">
      {title}
    </div>
  );
};

export default PageTitle;
