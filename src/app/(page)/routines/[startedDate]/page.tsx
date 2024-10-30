import React from 'react';
import moment from 'moment';

import HeadingDancing from '@/components/HeadingDancing';
import { formatDate } from '@/utils/helper';
import tasksApi from '@/api/tasks';
import { TaskType } from '@/utils/formType';
import { capitalize } from 'lodash';
import classNames from 'classnames';
import { FcIdea } from 'react-icons/fc';
import { Checkbox } from 'flowbite-react';
import CalendarButton from '@/components/CalendarButton';
interface IRoutinesPage {
  params: {
    startedDate: string
  }
}

const RoutinesPage = async ({ params }: IRoutinesPage) => {
  const { startedDate } = params;
  const momentDate = moment(new Date(startedDate));
  const weekdays: {[key: string]: string} = {
    monday: formatDate(momentDate.startOf('isoWeek')),
    tuesday: formatDate(momentDate.add(1, 'day')),
    wednesday: formatDate(momentDate.add(1, 'day')),
    thurday: formatDate(momentDate.add(1, 'day')),
    friday: formatDate(momentDate.add(1, 'day')),
    saturday: formatDate(momentDate.add(1, 'day')),
    sunday: formatDate(momentDate.add(1, 'day'))
  }

  const response = await tasksApi.getTaskByWeek({
    startDate: weekdays.monday,
    endDate: weekdays.sunday
  });

  const data = response.reduce((prevData: {[key: string]: TaskType[] }, currData: TaskType) => {
    if (Object.keys(prevData).includes(currData.dateCreated)) {
      const previousData = prevData[currData.dateCreated];
      return {
        ...prevData,
        [currData.dateCreated]: [
          ...previousData,
          currData
        ]
      }
    }
    return {
      ...prevData,
      [currData.dateCreated]: [
        currData
      ]
    }
  }, {});

  return (
    <>
      <HeadingDancing>Daily Tasks</HeadingDancing>
      <main >
        <div className='sm:hidden flex  flex-col justify-center items-center max-h-ful mt-10'>
          <FcIdea className='text-7xl mt-50'/>
          <h1 className='text-2xl text-center mt-10'>Rotate the screen to see daily tasks </h1>
        </div>
        <div className="m-8 hidden sm:block">
          <div className='flex justify-between items-center'>
            <HeadingDancing className='text-md '>{formatDate(moment(weekdays.monday), 'DD MMM YYYY')} - {formatDate(moment(weekdays.sunday), 'DD MMM YYYY')}</HeadingDancing>
            <CalendarButton startedDate={startedDate}/>
          </div>
          <div className='text-center flex items-center'>
            {
              Object.keys(weekdays).map(item => (
                <div key={item} className={
                  classNames('flex-1 border-zinc-300 border-t-2 border-r-2 border-solid py-3 bg-[#4D933C] text-white text-xs lg:text-md ', {
                    'border-l-2': item === 'monday'
                  })
                }>
                  <p>{capitalize(item)}</p>
                  <p>{formatDate(moment(weekdays[item]), 'DD-MM-YYYY')}</p>
                </div>
              ))
            }
          </div>
          <div className='flex items-stretch' >
            {
              Object.values(weekdays).map(item => <div key={item} className={
                classNames('border-zinc-300 border-b-2 border-r-2  border-solid w-full md:px-2 lg:px-3 text-xs lg:text-sm', {
                  'border-l-2': item === weekdays.monday
                })
              }>
                {
                  data[item]?.map(task => (<p key={task.id} className='my-3 w-fit flex justify-center items-center'>
                    <Checkbox id="remember" disabled checked={task.isCompleted } className='mr-2 rounded-none checked:text-[#3F8853]'/>
                    <span className='whitespace-normal text-black text-xs'>{task.task}</span>
                  </p>))
                }
              </div>)
            }
          </div>
        </div>
      </main>
    </>
  );
}

export default RoutinesPage;
