
import tasksApi from '@/api/tasks';
import TasksList from '@/components/TasksList';
import { formatDate } from '@/utils/helper';
import moment from 'moment';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Tasks',
  description: 'Daily Tasks - Define what you need to done today'
};

const TasksPage = async () => {
  const response = await tasksApi.getTaskByDate(formatDate(moment(new Date)));
  return (
    <TasksList taskData={response}/>
  );
}

export default TasksPage;
