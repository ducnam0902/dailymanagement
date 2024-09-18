import StickyNote from '@/components/StickyNote';
import React from 'react';
import { Dancing_Script } from 'next/font/google'
import classNames from 'classnames';

const dancingScript = Dancing_Script({ subsets: ['latin'] })
const NotePage = () => {
  return (
    <>
      <h1 className={classNames(dancingScript.className, 'text-4xl my-4 text-center italic')}>Sticky Note</h1>
      <StickyNote/>
    </>
  );
}

export default NotePage;
