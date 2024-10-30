
import tasksApi from '@/api/tasks';
import TasksList from '@/components/TasksList';
import { formatDate } from '@/utils/helper';
import moment from 'moment';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Tasks',
  description: 'Daily tasks - To define tasks for today and next day'
};


const TasksPage = async () => {
  const response = await tasksApi.getTaskByDate(formatDate(moment(new Date)));
  return (
    <TasksList taskData={response}/>
  );
}

export default TasksPage;
