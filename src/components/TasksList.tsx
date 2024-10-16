'use client';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Badge } from 'flowbite-react';
import { Sansita_Swashed } from 'next/font/google';

import TaskUpdateForm from '@/components/TaskUpdateForm';
import TaskCreatedForm from './TaskCreatedForm';
import tasksApi from '@/api/tasks';
import { TaskType } from '@/utils/formType';
import { formatDate, handleErrorApiResponse, TaskTypeColor } from '@/utils/helper';
import { useAppContext } from '@/AppProvider';
import { ACTION_ENUM } from '@/utils/initialContext';

type TaskResponseData = {
  [key: keyof typeof TaskTypeColor]: TaskType[];
};

const sansitaSwashed = Sansita_Swashed({ subsets: ['latin'] });

const TasksList = () => {
  const { dispatch } = useAppContext();
  const [isAddTask, setIsAddTask] = useState(false);
  const [dateSearch, setDateSearch] = useState(moment(new Date()));
  const [taskData, setTaskData] = useState<TaskResponseData>({});
  const handleFetchDailyTask = async () => {
    try {
      dispatch({ type: ACTION_ENUM.SET_LOADING, payload: true })
      const response: TaskType[] = await tasksApi.getTaskByDate(formatDate(dateSearch));
      const taskList = response?.reduce(
        (previousValue: TaskResponseData, currentValue: TaskType) => {
          if (Object.keys(previousValue).includes(currentValue.type)) {
            const currentList = previousValue[currentValue.type];
            return {
              ...previousValue,
              [currentValue.type]: [...currentList, currentValue]
            };
          } else {
            previousValue[currentValue.type] = [currentValue];
            return previousValue;
          }
        },
        {}
      );
      setTaskData(taskList);
    } catch (error) {
      handleErrorApiResponse(error);
    } finally {
      dispatch({ type: ACTION_ENUM.SET_LOADING, payload: false })
    }
  };

  const handleRefreshTaskApi= async () => {
    setIsAddTask(false);
    await handleFetchDailyTask();
  }

  useEffect(() => {
    handleFetchDailyTask();
  }, []);


  return (
    <div>
      <div className=" bg-[#118E02] w-full text-base px-4 py-2 text-white flex justify-between items-center">
        <h3 className={sansitaSwashed.className}>
          Date: {formatDate(dateSearch, 'DD MMM YYYY')}
        </h3>
        <Button
          outline
          color="success"
          size={'xs'}
          onClick={() => setIsAddTask(true)}
        >
          Create
        </Button>
      </div>
      {isAddTask && <TaskCreatedForm dateCreated={formatDate(dateSearch)} onClose={handleRefreshTaskApi}/>}

      <div className="bg-[#C7F0C4] px-4">
        {Object.keys(taskData)?.map((sectionTitle) => {
          return (
            <section className='pt-4' key={sectionTitle}>
              <Badge color={TaskTypeColor[sectionTitle]} className="w-fit py-2">
                {sectionTitle}
              </Badge>
              {taskData[sectionTitle].map((item) => (
                <TaskUpdateForm key={item.id} {...item} onClose={handleRefreshTaskApi} />
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default TasksList;
