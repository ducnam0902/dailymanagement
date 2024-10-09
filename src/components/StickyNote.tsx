'use client';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Badge } from 'flowbite-react';
import { Sansita_Swashed } from 'next/font/google';

import NoteUpdateForm from '@/components/NoteUpdateForm';
import NoteCreateForm from './NoteCreatedForm';
import noteApi from '@/api/note';
import { NoteType } from '@/utils/formType';
import { formatDate, handleErrorApiResponse, noteTypeColor } from '@/utils/helper';
import { useAppContext } from '@/AppProvider';
import { ACTION_ENUM } from '@/utils/initialContext';

type NoteResponseData = {
  [key: keyof typeof noteTypeColor]: NoteType[];
};

const sansitaSwashed = Sansita_Swashed({ subsets: ['latin'] });

const StickyNote = () => {
  const { dispatch } = useAppContext();
  const [isAddNote, setIsAddNote] = useState(false);
  const [dateSearch, setDateSearch] = useState(moment(new Date()));
  const [noteData, setNoteData] = useState<NoteResponseData>({});
  const handleFetchDailyNote = async () => {
    try {
      dispatch({ type: ACTION_ENUM.SET_LOADING, payload: true })
      const response: NoteType[] = await noteApi.getNoteByDate(formatDate(dateSearch));
      const noteList = response?.reduce(
        (previousValue: NoteResponseData, currentValue: NoteType) => {
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
      setNoteData(noteList);
    } catch (error) {
      handleErrorApiResponse(error);
    } finally {
      dispatch({ type: ACTION_ENUM.SET_LOADING, payload: false })
    }
  };

  useEffect(() => {
    handleFetchDailyNote();
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
          onClick={() => setIsAddNote(true)}
        >
          Create
        </Button>
      </div>
      {isAddNote && <NoteCreateForm dateCreated={formatDate(dateSearch)}/>}

      <div className="bg-[#C7F0C4] px-4">
        {Object.keys(noteData)?.map((sectionTitle) => {
          return (
            <section className='pt-4' key={sectionTitle}>
              <Badge color={noteTypeColor[sectionTitle]} className="w-fit py-2">
                {sectionTitle}
              </Badge>
              {noteData[sectionTitle].map((item) => (
                <NoteUpdateForm key={item.id} {...item} />
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default StickyNote;
