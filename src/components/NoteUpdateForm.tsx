import React from 'react';
import FormField from './FormField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import classNames from 'classnames';
import * as z from 'zod';
import { NoteType, UpdateNoteValidationSchema } from '@/utils/formType';
import { handleErrorApiResponse } from '@/utils/helper';
import noteApi from '@/api/note';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type UpdateNoteType = z.infer<typeof UpdateNoteValidationSchema>;
const NoteUpdateForm = ({ id, note, isCompleted }: NoteType) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<UpdateNoteType>({
    resolver: zodResolver(UpdateNoteValidationSchema),
    defaultValues: {
      isCompleted: isCompleted
    }
  });
  const router = useRouter();
  const handleUpdateNote = handleSubmit(async (data) => {
    try {
      if (data.isCompleted) {
        const response: NoteType = await noteApi.markNoteCompleted(id);
        if (response.isCompleted === data.isCompleted) {
          toast.success('Mark note completed sucess!')
          router.refresh();
        }
      }
    } catch (error) {
      handleErrorApiResponse(error);
    }
  });

  return (
    <div className="py-3 ml-8">
      <form
        onSubmit={handleUpdateNote}
        className="flex justify-between items-start"
      >
        <div className="flex">
          <FormField
            name="isCompleted"
            control={control}
            error={errors.isCompleted}
            type="checkbox"
            color="success"
            disabled={isCompleted}
            {...(isCompleted && { checked: true })}
          />
          <h3
            className={classNames('ml-3 text-[#222227]', {
              'line-through': isCompleted
            })}
          >
            {note}
          </h3>
        </div>
        {isDirty && (
          <Button className="w-fit" size={'xs'} type="submit" color="success">
            Update note
          </Button>
        )}
      </form>
    </div>
  );
};

export default NoteUpdateForm;
