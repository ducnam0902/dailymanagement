'use client';
import React, { useState } from 'react';
import FormField from './FormField';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal } from 'flowbite-react';
import { formatDate, handleErrorApiResponse, TaskTypeColor, REPEAT_TYPE } from '@/utils/helper';
import { INPUT_TYPE } from '@/utils/constants';
import upperFirst from 'lodash/upperFirst';
import moment from 'moment';
import RepeatTypeForm from './RepeatTypeForm';
import { ScheduleForm, ScheduleType, TemplateCreatedFormValidationType } from '@/utils/formType';
import scheduleApi from '@/api/schedule';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const options = Object.keys(TaskTypeColor);

type TemplateCreatedFormType = {
  onClose: () => void,
  isOpenModal: boolean,
  schedule?: ScheduleType | undefined,
}

const TemplateCreatedForm = ({ isOpenModal, onClose, schedule }: TemplateCreatedFormType) => {
  const isUpdateForm = schedule !== undefined;
  const methods = useForm<ScheduleForm>({
    resolver: zodResolver(TemplateCreatedFormValidationType),
    defaultValues: {
      task: isUpdateForm ? schedule.task : '',
      type: isUpdateForm ? schedule.type : options[0],
      startedAt: formatDate(moment( isUpdateForm ?  new Date(schedule.startedAt) : new Date()), 'DD MMMM YYYY'),
      repeatType: isUpdateForm ? schedule.repeatType : REPEAT_TYPE.Daily,
      repeatEach: isUpdateForm ? schedule.repeatEach : '1'
    }
  });
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleTask = handleSubmit(async(data) => {
    try {
      setIsLoading(true);
      const payload: ScheduleForm = {
        type: data.type,
        task: upperFirst(data.task),
        startedAt: formatDate(moment(new Date(data.startedAt)), 'YYYY-MM-DD'),
        repeatType: data.repeatType,
        repeatEach: data.repeatEach
      }
      let response;
      if(isUpdateForm) {
        response = await scheduleApi.updateSchedule(schedule?.id as number, payload);
      } else {
        response = await scheduleApi.createSchedule(payload);
      }
      if (response.ok) {
        router.refresh();
        toast.success( `${isUpdateForm ? 'Update' : 'Create' } a schedule successfully` );
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
        <h1 className='text-xl lg:text-3xl font-bold'>{ isUpdateForm ? 'Update ' : 'Create '} a shedule</h1>

        <div className='my-8' >
          <FormField
            label='Started at'
            name="startedAt"
            control={control}
            error={errors.type}
            options={options}
            kindOfInput={INPUT_TYPE.DATEPICKER}
            className='w-full z-auto'
          />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleTask} className="">
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

            <RepeatTypeForm/>

            <div className='mt-12 flex justify-end '>
              <Button color="gray" className='focus:z-1 mr-4' onClick={onClose}>
              Cancel
              </Button>
              <Button isProcessing={isLoading} disabled={isLoading} type="submit" color="success" className='focus:z-1'>
              {isUpdateForm ? 'Update ': 'Create '} a schedule
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
};

export default TemplateCreatedForm;
