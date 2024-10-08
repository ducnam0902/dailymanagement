'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import {
  EventContentArg,
  EventInput,
  EventSourceFuncArg,
  EventSourceInput
} from '@fullcalendar/core/index.js';
import noteApi from '@/api/note';
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { handleErrorApiResponse } from '@/utils/helper';
import classNames from 'classnames';

function renderEventContent(eventInfo: EventContentArg) {
  const { event } = eventInfo;
  return (
    <section className={'mx-2 my-1 flex gap-2 items-center flex-wrap'}>
      {event.extendedProps.isCompleted ? <FcCheckmark/> : <FcCancel/>}
      <p className={classNames('text-md', {
        'text-red-500': !event.extendedProps.isCompleted,
        'text-green-500': event.extendedProps.isCompleted,
      })}>{event.title}</p>
    </section>
  );
}

const NoteCalendar = () => {
  const handleFetchData = async (
    inforDate: EventSourceFuncArg,
    successCallback: (eventInputs: EventInput[]) => void,
    failureCallback: (error: Error) => void
  ) => {
    try {
      const response = await noteApi.getNoteByWeek({
        startDate: inforDate.startStr,
        endDate: inforDate.endStr
      })
      const data: EventSourceInput = response?.map((item) => ({
        title: item.note,
        date: item.createdAt,
        isCompleted: item.isCompleted,
        type: item.type
      }));
      successCallback(data);
    } catch (error) {
      if(error instanceof Error) {
        failureCallback(error);
      }
      handleErrorApiResponse(error);
  }
  };

  return (
    <main className="m-8 noteCalendar">
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
      />
    </main>
  );
};

export default NoteCalendar;
