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
    <form onSubmit={handleCreateNote} className="flex items-start py-4 gap-4">
      <div className="basis-9/12">
        <FormField
          name="note"
          control={control}
          error={errors.note}
          className="w-full"
        />
      </div>
      <div className="basis-1/6">
        <FormField
          name="type"
          control={control}
          error={errors.type}
          className="w-full"
          options={options}
          kindOfInput={INPUT_TYPE.SELECT}
        />
      </div>
      <div className="basis-1/12 flex justify-end">
        <Button className=" w-fit" type="submit" color="success">
          Create note
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
