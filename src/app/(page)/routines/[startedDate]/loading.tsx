'use client';
import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { LoaderSizeProps } from 'react-spinners/helpers/props';

type ILoading = {
    loading?: boolean;
    size: number
} | LoaderSizeProps;

const Loading: React.FC<ILoading> = ({ loading, size = 150, ...props }) => {

  return (
    <div className='flex justify-center items-center h-screen'>
      <Image src={logo} alt="Daily management Logo" className='w-[100px]' width={0} height={0} priority={true} />
      <PuffLoader
        color="#44ce42"
        loading={loading}
        className="!absolute"
        size={size}
        aria-label="Loading Spinner"
        {...props}
      />
    </div>

  );
};

export default Loading;
