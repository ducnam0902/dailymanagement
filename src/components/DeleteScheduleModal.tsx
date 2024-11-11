'use client'
import React, { useState } from 'react';
import { Button, Modal, List } from 'flowbite-react';
import { ScheduleType } from '@/utils/formType';
import { handleErrorApiResponse } from '@/utils/helper';
import scheduleApi from '@/api/schedule';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface IDeleteScheduleModal {
    isOpenModal: boolean,
    onClose: () => void,
    schedule: ScheduleType
}

function DeleteScheduleModal({ isOpenModal, onClose, schedule }: IDeleteScheduleModal) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteSchedule = async () => {
    try {
        setIsLoading(true);
        const response = await scheduleApi.deleteSchedule(schedule.id);
        if (response.ok) {
          router.refresh();
          toast.success('Delete a schedule successfully');
        }
      } catch (error) {
        handleErrorApiResponse(error)
      } finally {
        onClose();
        setIsLoading(false);
      }
  }
  return (
    <Modal show={isOpenModal} onClose={onClose}>
      <Modal.Header>
        <h1 className='text-xl lg:text-3xl'>Delete a Shedule</h1>
      </Modal.Header>
      <Modal.Body className='!h-80'>
        <h2 className='text-lg font-semibold'>Are you want to delete a schedule?</h2>
        <List>
          <List.Item>ID: <span className='font-bold'>{schedule.id}</span></List.Item>
          <List.Item>Type: <span className='font-bold'>{schedule.type}</span></List.Item>
          <List.Item>Task: <span className='font-bold'>{schedule.task}</span></List.Item>
          <List.Item>Repeat Type: <span className='font-bold'>{schedule.repeatType}</span></List.Item>
          <List.Item>Repeat Each: <span className='font-bold'>{schedule.repeatEach}</span></List.Item>
        </List>
        <div className='flex justify-end gap-4 mt-8'>
          <Button color="failure" className='focus:z-1' onClick={handleDeleteSchedule}  isProcessing={isLoading} disabled={isLoading}>
              Delete Schedule
          </Button>
          <Button color="gray" className='focus:z-1 mr-4' onClick={onClose}>
              Cancel
          </Button>
        </div>

      </Modal.Body>
    </Modal>
  );
}

export default DeleteScheduleModal;
