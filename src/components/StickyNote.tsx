'use client';
import React, { useState } from 'react';
import moment from 'moment';
import { Button } from 'flowbite-react';
import { Sansita_Swashed } from 'next/font/google';
import NoteCreateForm from './NoteCreatedForm';

const sansitaSwashed = Sansita_Swashed({ subsets: ['latin'] });
const today: string = moment(new Date()).format('DD-MMM-YYYY');

const StickyNote = () => {
  const [isAddNote, setIsAddNote] = useState(false);

  return (
    <div>
      <div className=" bg-[#118E02] w-full text-base px-4 py-2 text-white flex justify-between items-center">
        <h3 className={sansitaSwashed.className}>
          Date: {today}
        </h3>
        <Button
          outline
          color="success"
          size={'xs'}
          onClick={() => setIsAddNote(true)}
        >
          Create
        </Button>
      </div>
      {isAddNote && <NoteCreateForm/>}
    </div>
  );
};

export default StickyNote;
