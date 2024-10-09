import React from 'react';
import { Dancing_Script } from 'next/font/google'
import classNames from 'classnames';
const dancingScript = Dancing_Script({ subsets: ['latin'] })

type HeadingDancingType = {
    children: React.ReactNode
}

const HeadingDancing = ({children}: HeadingDancingType) => {
  return (
    <h1 className={classNames(dancingScript.className, 'text-4xl my-4 text-center italic')}>{children}</h1>
  );
}

export default HeadingDancing;
