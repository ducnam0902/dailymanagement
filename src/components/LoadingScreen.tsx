'use client'
import { useAppContext } from '@/AppProvider';
import Image from 'next/image';
import React from 'react';
import logo from '@/assets/logo.png';
import PuffLoader from 'react-spinners/PuffLoader';
const LoadingScreen = () => {
  const { isLoading } = useAppContext();
  if ( isLoading)
    return (
      <div className='absolute top-0 left-0 z-900 h-screen w-screen bg-white opacity-75 flex justify-center items-center'>
        <Image src={logo} alt="Daily management Logo" width={100} height={50} priority={true} />
        <PuffLoader
          color="#44ce42"
          loading={isLoading}
          className='!absolute z-102'
          aria-label="Loading Spinner"
          size={'200px'}
          speedMultiplier={0.8}
        />
      </div>
    );
}

export default LoadingScreen;
