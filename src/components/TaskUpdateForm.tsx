'use client'
import React from 'react';
import FormField from './FormField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import classNames from 'classnames';
import * as z from 'zod';
import { TaskType, UpdateTaskValidationSchema } from '@/utils/formType';
import { handleErrorApiResponse } from '@/utils/helper';
import taskApi from '@/api/tasks';
import { toast } from 'react-toastify';
import { useAppContext } from '@/AppProvider';
import { ACTION_ENUM } from '@/utils/initialContext';
type UpdateNoteType = z.infer<typeof UpdateTaskValidationSchema>;

type NoteUpdateFromType = TaskType & {
  onClose: () => void
}
const NoteUpdateForm = ({ id, note, isCompleted, onClose }: NoteUpdateFromType) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitSuccessful }
  } = useForm<UpdateNoteType>({
    resolver: zodResolver(UpdateTaskValidationSchema),
    defaultValues: {
      isCompleted: isCompleted
    }
  });
  const { dispatch } =useAppContext();
  const handleUpdateNote = handleSubmit(async (data) => {
    try {
      dispatch({ type: ACTION_ENUM.SET_LOADING, payload: true })
      if (data.isCompleted) {
        const response: TaskType = await taskApi.markTaskCompleted(id);
        if (response.isCompleted === data.isCompleted) {
          toast.success('Mark note completed sucess!')
          onClose()
        }
      }
    } catch (error) {
      handleErrorApiResponse(error);
    } finally {
      dispatch({ type: ACTION_ENUM.SET_LOADING, payload: false })
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
        {(isDirty && !isSubmitSuccessful) && (
          <Button className="w-fit focus:z-1" size={'xs'} type="submit" color="success">
            Update note
          </Button>
        )}
      </form>
    </div>
  );
};

export default NoteUpdateForm;
