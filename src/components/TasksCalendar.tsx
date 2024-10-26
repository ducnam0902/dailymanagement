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
import { formatDate, handleErrorApiResponse } from '@/utils/helper';

import moment from 'moment';
import { Checkbox } from 'flowbite-react';
function renderEventContent(eventInfo: EventContentArg) {
  const { event } = eventInfo;
  return (
    <p className={'mx-4 my-2'}>
      <Checkbox id="remember" disabled checked={event.extendedProps.isCompleted } className='mr-2 rounded-none checked:text-[#3F8853]'/>
      <span className='text-[0.9rem] whitespace-normal text-black'>{event.title}</span>
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
        buttonText={{
          today: 'Today'
        }}
        contentHeight={'auto'}
        dayHeaderFormat={{ weekday: 'long' }}
        events={handleFetchData}
        eventColor='transparent'
        eventOrder={'isCompleted'}
        dayHeaderContent={(dateOptions) => {
          const dateFormat = moment(dateOptions.date).format('DD-MM-YYYY');
          return <div>
            <h3 className='font-normal'>{dateOptions.text}</h3>
            <h4 className='font-medium text-sm'>{dateFormat}</h4>
          </div>
        }}
      />
    </main>
  );
};

export default TaskCalendar;
