import HeadingDancing from '@/components/HeadingDancing';
import TasksList from '@/components/TasksList';
import React from 'react';

const TasksPage = async () => {
  return (
    <>
      <HeadingDancing>Daily Tasks</HeadingDancing>
      <TasksList/>
    </>
  );
}

export default TasksPage;
