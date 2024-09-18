'use client';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button } from 'flowbite-react';
import { Sansita_Swashed } from 'next/font/google';
import NoteCreateForm from './NoteCreatedForm';
import NoteUpdateForm from './NoteUpdateForm';
import { NoteType } from '@/utils/formType';
import { Badge } from 'flowbite-react';
import { handleErrorApiResponse, noteTypeColor } from '@/utils/helper';
import noteApi from '@/api/note';

const sansitaSwashed = Sansita_Swashed({ subsets: ['latin'] });


type NotTypeList = {
  [key: string]: NoteType[];
};

const today: string = moment(new Date()).format('YYYY-MM-DD');

const StickyNote = () => {
  const [isAddNote, setIsAddNote] = useState(false);
  const [noteList, setNoteList] = useState<NotTypeList>({});
  const fetchNoteList = async () => {
    try {
      const response: NoteType[] = await noteApi.getNoteByDate(today);
      const noteData = response.reduce(
        (previousValue: NotTypeList, currentValue: NoteType) => {
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
      setNoteList(noteData)
    } catch (error) {
      handleErrorApiResponse(error);
    }
  }

  useEffect(() => {
    fetchNoteList();
  }, []);

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
      <div className="bg-[#C7F0C4] px-4">
        {Object.keys(noteList)?.map((sectionTitle) => {
          return (
            <section className='pt-4' key={sectionTitle}>
              <Badge color={noteTypeColor[sectionTitle]} className="w-fit py-2">
                {sectionTitle}
              </Badge>
              {noteList[sectionTitle].map((item) => (
                <NoteUpdateForm key={item.id} {...item} />
              ))}
            </section>
          );
        })}
        {isAddNote && <NoteCreateForm/>}
      </div>
    </div>
  );
};

export default StickyNote;
