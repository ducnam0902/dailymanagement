'use client';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { LoaderSizeProps } from 'react-spinners/helpers/props';
const override = {
  display: 'block',
  margin: '100px auto'
};

type ILoading = {
    loading?: boolean;
    size: number
} | LoaderSizeProps;

const Loading: React.FC<ILoading> = ({ loading, size = 150, ...props }) => {
  return (
    <ClipLoader
      color="44ce42"
      loading={loading}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      {...props}
    />
  );
};

export default Loading;
