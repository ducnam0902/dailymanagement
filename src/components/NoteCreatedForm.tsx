'use client';
import React from 'react';
import FormField from './FormField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from 'flowbite-react';
import { handleErrorApiResponse, noteTypeColor } from '@/utils/helper';
import { INPUT_TYPE } from '@/utils/constants';
import noteApi from '@/api/note';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'

const options = Object.keys(noteTypeColor);

const NoteValidationSchema = z.object({
  note: z.string({ message: 'Note is required' }),
  type: z.string({ message: 'Type is required' })
});

type NoteType = z.infer<typeof NoteValidationSchema>;
const NoteForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<NoteType>({
    resolver: zodResolver(NoteValidationSchema),
    defaultValues: {
      note: '',
      type: options[0]
    }
  });
  const router = useRouter();

  const handleCreateNote = handleSubmit(async (data) => {
    try {
      const response = await noteApi.createNote(data);
      if (response.ok) {
        toast.success('Created note successfully');
        router.refresh();
      }
    } catch (error) {
      handleErrorApiResponse(error)
    }
  });

  return (
    <form onSubmit={handleCreateNote} className="flex items-start py-4 gap-2 md:gap-4">
      <div className="basis-4/12 sm:basis-8/12">
        <FormField
          name="note"
          control={control}
          error={errors.note}
          className='w-full'

        />
      </div>
      <div className="basis-6/12 sm:basis-3/12">
        <FormField
          name="type"
          control={control}
          error={errors.type}
          options={options}
          kindOfInput={INPUT_TYPE.SELECT}
          className='w-full'
        />
      </div>
      <div className='basis-2/12 sm:basis-1/12'>
        <Button type="submit" color="success" className='w-full'>
          Create
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
