'use client';
import React, { useState } from 'react';
import FormField from './FormField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Modal } from 'flowbite-react';
import { handleErrorApiResponse, TaskTypeColor } from '@/utils/helper';
import { INPUT_TYPE } from '@/utils/constants';
import taskApi from '@/api/tasks';
import { toast } from 'react-toastify';
import upperFirst from 'lodash/upperFirst';
import { useRouter } from 'next/navigation';

const options = Object.keys(TaskTypeColor);

const NoteValidationSchema = z.object({
  note: z.string({ message: 'Note is required' }),
  type: z.string({ message: 'Type is required' })
});

type NoteType = z.infer<typeof NoteValidationSchema>;

type TaskCreatedType = {
  dateCreated: string
  onClose: () => void,
  isOpenModal: boolean,
}

const TaskCreatedForm = ({ isOpenModal, dateCreated, onClose }: TaskCreatedType) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateNote = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        type: data.type,
        dateCreated,
        note: upperFirst(data.note)
      }
      const response = await taskApi.createTask(payload);
      if (response.ok) {
        router.refresh();
        toast.success('Created note successfully');
      }
    } catch (error) {
      handleErrorApiResponse(error)
    } finally {
      onClose();
      setIsLoading(false);
    }
  });

  return (
    <Modal show={isOpenModal} onClose={onClose} popup>
      <Modal.Header/>
      <Modal.Body>
        <h1 className='text-xl lg:text-3xl mb-4'>Create a task</h1>
        <form onSubmit={handleCreateNote} className="">
          <div className='mb-8' >
            <FormField
              label='Task'
              placeholder='What do you plan to do?'
              name="note"
              control={control}
              error={errors.note}
              className='w-full'
            />
          </div>
          <div className='mb-8' >
            <FormField
              label='Type'
              name="type"
              control={control}
              error={errors.type}
              options={options}
              kindOfInput={INPUT_TYPE.SELECT}
              className='w-full'
            />
          </div>
          <div className='mt-4 flex justify-end '>
            <Button color="gray" className='focus:z-1 mr-4' onClick={onClose}>
              Cancel
            </Button>
            <Button isProcessing={isLoading} disabled={isLoading} type="submit" color="success" className='focus:z-1'>
              Create
            </Button>
          </div>
        </form>
      </Modal.Body>

    </Modal>
  );
};

export default TaskCreatedForm;
