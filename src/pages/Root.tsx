import MainLayout from '@/components/Layout';
import React from 'react';

type RootProps = {};

const Root: React.FC<RootProps> = () => {
  return (
    <div className="h-full w-full">
      <MainLayout />
    </div>
  );
};

export default Root;
