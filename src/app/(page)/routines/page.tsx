import React from 'react';
import { Dancing_Script } from 'next/font/google';
import classNames from 'classnames';

import NoteCalendar from '@/components/NoteCalendar';
const dancingScript = Dancing_Script({ subsets: ['latin'] })
const RoutinesPage = () => {
  return (
    <div>
      <h1 className={classNames(dancingScript.className, 'text-4xl my-4 text-center italic')}>Habit Tracker</h1>
      <NoteCalendar/>
    </div>
  );
}

export default RoutinesPage;
