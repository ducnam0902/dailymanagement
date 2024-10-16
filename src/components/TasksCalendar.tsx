'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import {
  EventContentArg,
  EventInput,
  EventSourceFuncArg,
  EventSourceInput
} from '@fullcalendar/core/index.js';
import tasksApi from '@/api/tasks';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import { formatDate, handleErrorApiResponse } from '@/utils/helper';
import classNames from 'classnames';
import moment from 'moment';
function renderEventContent(eventInfo: EventContentArg) {
  const { event } = eventInfo;
  return (
    <p className={'mx-2 my-1'}>
      {event.extendedProps.isCompleted ? <FcCheckmark className='inline-block mr-2'/> : <FcCancel className='inline-block mr-2'/>}
      <span className={classNames('text-md whitespace-normal', {
        'text-red-500': !event.extendedProps.isCompleted,
        'text-green-500': event.extendedProps.isCompleted
      })}>{event.title}</span>
    </p>
  );
}

const TaskCalendar = () => {
  const handleFetchData = async (
    inforDate: EventSourceFuncArg,
    successCallback: (eventInputs: EventInput[]) => void,
    failureCallback: (error: Error) => void
  ) => {
    try {
      const response = await tasksApi.getTaskByWeek({
        startDate: formatDate(moment(inforDate.start)),
        endDate: formatDate(moment(inforDate.end))
      });
      const data: EventSourceInput = response?.map((item) => ({
        title: item.note,
        date: item.dateCreated,
        isCompleted: item.isCompleted,
        type: item.type
      }));
      successCallback(data);
    } catch (error) {
      if (error instanceof Error) {
        failureCallback(error);
      }
      handleErrorApiResponse(error);
    }
  };

  return (
    <main className="m-8 taskCalendar">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        eventContent={renderEventContent}
        firstDay={1}
        titleFormat={{ year: 'numeric', month: 'long', day: '2-digit' }}
        dayHeaderClassNames={'bg-green'}
        buttonText={{
          today: 'Today'
        }}
        contentHeight={'auto'}
        dayHeaderFormat={{ weekday: 'long' }}
        events={handleFetchData}
        eventColor='transparent'
        eventOrder={'isCompleted'}
      />
    </main>
  );
};

export default TaskCalendar;
