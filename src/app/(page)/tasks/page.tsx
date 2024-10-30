
import tasksApi from '@/api/tasks';
import TasksList from '@/components/TasksList';
import { formatDate } from '@/utils/helper';
import moment from 'moment';
import React from 'react';


const TasksPage = async () => {
  const response = await tasksApi.getTaskByDate(formatDate(moment(new Date)));
  return (
    <TasksList taskData={response}/>
  );
}

export default TasksPage;
