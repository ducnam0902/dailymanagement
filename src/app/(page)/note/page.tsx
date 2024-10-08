import StickyNote from '@/components/StickyNote';
import React from 'react';
import { Dancing_Script } from 'next/font/google'
import classNames from 'classnames';
import noteApi from '@/api/note';
import { NoteType } from '@/utils/formType';
import moment from 'moment';
import { Badge } from 'flowbite-react';
import { noteTypeColor } from '@/utils/helper';
import NoteUpdateForm from '@/components/NoteUpdateForm';
const dancingScript = Dancing_Script({ subsets: ['latin'] })
const today: string = moment(new Date()).format('YYYY-MM-DD');
type NotTypeList = {
  [key: string]: NoteType[];
};
const NotePage = async () => {
  const response: NoteType[] = await noteApi.getNoteByDate(today);
  const noteList = response?.reduce(
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

  return (
    <>
      <h1 className={classNames(dancingScript.className, 'text-4xl my-4 text-center italic')}>Sticky Note</h1>
      <StickyNote/>
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
      </div>
    </>
  );
}

export default NotePage;
