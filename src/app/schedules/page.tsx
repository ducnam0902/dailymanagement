import scheduleApi from '@/api/schedule';
import HeadingDancing from '@/components/HeadingDancing';
import Schedules from '@/components/Schedules';
import React from 'react';

async function SchedulePage() {
  const scheduleList = await scheduleApi.getScheduleByUser();
  return (
    <div className='mx-8'>
      <HeadingDancing className='text-center my-4'>Schedules</HeadingDancing>
      <Schedules scheduleList={scheduleList}/>
    </div>
  );
}

export default SchedulePage;
