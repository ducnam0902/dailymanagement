'use client';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto'
};

interface ILoading {
    loading: boolean;
}

const Loading: React.FC<ILoading> = ({ loading }) => {
  return (
    <ClipLoader
      color="44ce42"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Loading;
