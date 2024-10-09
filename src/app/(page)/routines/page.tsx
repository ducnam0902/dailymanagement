import React from 'react';

import NoteCalendar from '@/components/NoteCalendar';
import HeadingDancing from '@/components/HeadingDancing';

const RoutinesPage = () => {
  return (
    <>
      <HeadingDancing>Habit Tracker</HeadingDancing>
      <NoteCalendar/>
    </>
  );
}

export default RoutinesPage;
