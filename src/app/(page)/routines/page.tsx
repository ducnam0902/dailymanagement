import React from 'react';

import TasksCalendar from '@/components/TasksCalendar';
import HeadingDancing from '@/components/HeadingDancing';

const RoutinesPage = () => {
  return (
    <>
      <HeadingDancing>Habit Tracker</HeadingDancing>
      <TasksCalendar/>
    </>
  );
}

export default RoutinesPage;
