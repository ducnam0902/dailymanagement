'use client';
import React, { useState } from 'react';
import FormField from './FormField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Modal } from 'flowbite-react';
import { formatDate, handleErrorApiResponse, TaskTypeColor } from '@/utils/helper';
import { INPUT_TYPE } from '@/utils/constants';
import taskApi from '@/api/tasks';
import { toast } from 'react-toastify';
import upperFirst from 'lodash/upperFirst';
import { useRouter } from 'next/navigation';
import moment from 'moment';

const options = Object.keys(TaskTypeColor);

const TaskValidationSchema = z.object({
  task: z.string({ message: 'Task field is required' }),
  type: z.string({ message: 'Type is required' }),
  dateCreated: z.string({ message: 'Date is required' })
});

type TaskType = z.infer<typeof TaskValidationSchema>;

type TaskCreatedType = {
  onClose: () => void,
  isOpenModal: boolean,
}

const TaskCreatedForm = ({ isOpenModal, onClose }: TaskCreatedType) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TaskType>({
    resolver: zodResolver(TaskValidationSchema),
    defaultValues: {
      task: '',
      type: options[0],
      dateCreated: formatDate(moment(new Date()), 'DD MMMM YYYY')
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateTask = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        type: data.type,
        dateCreated: formatDate(moment(new Date(data.dateCreated)), 'YYYY-MM-DD'),
        task: upperFirst(data.task)
      }
      const response = await taskApi.createTask(payload);
      if (response.ok) {
        router.refresh();
        toast.success('Created a task successfully');
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
      <Modal.Body className='!h-80'>
        <h1 className='text-xl lg:text-3xl font-bold'>Create a task</h1>

        <form onSubmit={handleCreateTask} className="">
          <div className='my-8' >
            <FormField
              label='Date'
              name="dateCreated"
              control={control}
              error={errors.type}
              options={options}
              kindOfInput={INPUT_TYPE.DATEPICKER}
              className='w-full z-auto'
            />
          </div>
          <div className='my-10' >
            <FormField
              label='Task'
              placeholder='What do you plan to do?'
              name="task"
              control={control}
              error={errors.task}
              className='w-full'
            />
          </div>

          <div className='my-8' >
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
          <div className='mt-12 flex justify-end '>
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
