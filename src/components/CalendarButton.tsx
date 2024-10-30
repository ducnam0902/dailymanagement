'use client'
import React, { useState } from 'react';
import moment from 'moment';

import { Button } from 'flowbite-react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import routes from '@/utils/routes';
import { formatDate } from '@/utils/helper';

type ICalendarButton = {
    startedDate: string
}

const currentWeek = {
  monday: formatDate(moment(new Date()).startOf('isoWeek')),
  sunday: formatDate(moment(new Date()).endOf('isoWeek'))
}

const checkDateinCurrentWeek = (date: string) => {
  if (moment(date).isSameOrAfter(currentWeek.monday) && moment(date).isSameOrBefore(currentWeek.sunday)) {
    return true;
  }
  return false;
}

const CalendarButton = ({ startedDate } : ICalendarButton) => {
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(() => {
    return checkDateinCurrentWeek(startedDate);
  });
  const router = useRouter();

  const handleMoveToCurrentWeek = () => {
    setIsDisabledButton(true);
    router.push(routes.routines(formatDate(moment(new Date()))))
  }

  const handleMoveToNextWeek = () => {
    const nextMonday = formatDate(moment(new Date(startedDate)).endOf('isoWeek').add(1, 'day'));
    setIsDisabledButton(checkDateinCurrentWeek(nextMonday));
    router.push(routes.routines(nextMonday));
  }
  const handleMoveToLastWeek = () => {
    const lastSunday = formatDate(moment(new Date(startedDate)).startOf('isoWeek').subtract(1, 'day'));
    setIsDisabledButton(checkDateinCurrentWeek(lastSunday));

    router.push(routes.routines(lastSunday));
  }

  return (
    <div className='flex gap-4'>
      <Button gradientMonochrome="success" outline className='text-white' disabled={isDisabledButton} onClick={handleMoveToCurrentWeek}>Current week</Button>
      <Button.Group>
        <Button gradientMonochrome="success" onClick={handleMoveToLastWeek}><FiChevronLeft/></Button>
        <Button gradientMonochrome="success" onClick={handleMoveToNextWeek}><FiChevronRight/></Button>
      </Button.Group>
    </div>

  );
}

export default CalendarButton;
