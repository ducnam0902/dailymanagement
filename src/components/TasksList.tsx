'use client';
import React, { useState } from 'react';
import { Table, Dropdown, Badge, Button, Checkbox, Modal } from 'flowbite-react';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import TaskCreatedForm from './TaskCreatedForm';
import { TaskType } from '@/utils/formType';
import { handleErrorApiResponse, TaskTypeColor } from '@/utils/helper';
import tasksApi from '@/api/tasks';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppContext } from '@/AppProvider';
import { ACTION_ENUM } from '@/utils/initialContext';
import HeadingDancing from './HeadingDancing';

interface TaskListInterface {
  taskData: TaskType[],
}

const TasksList = ({ taskData }: TaskListInterface) => {

  const [isAddTask, setIsAddTask] = useState(false);
  const [isConfirmUpdateModal, setIsConfirmUpdateModal] = useState<boolean>(false);
  const [listCheckedTask, setListCheckedTask] = useState<string[]>([]);
  const { dispatch } = useAppContext();
  const router = useRouter();
  const handleChangesTask = (event: React.ChangeEvent<HTMLInputElement> ) => {
    if (event.target.checked) {
      if (!listCheckedTask.includes(event.target.name)) {
        setListCheckedTask([
          ...listCheckedTask,
          event.target.name
        ])
      }
    } else {
      const newListCheckedTask = listCheckedTask.filter(item => item !== event.target.name);
      setListCheckedTask(newListCheckedTask);
    }
  }

  const handleUpdateTasks = async () => {
    try {
      setIsConfirmUpdateModal(false);
      dispatch({ type: ACTION_ENUM.SET_LOADING, payload: true })
      const response = await tasksApi.markTasksCompleted(listCheckedTask);
      if (response.ok) {
        router.refresh();
        setListCheckedTask([]);
        toast.success('Completed tasks successffully');
      }
    } catch (error) {
      handleErrorApiResponse(error);
    } finally {
      dispatch({ type: ACTION_ENUM.SET_LOADING, payload: false })
    }
  }

  return (
    <div className='mx-8'>
      <div className="flex flex-col sm:flex-row  sm:items-center sm:justify-between">
        <HeadingDancing>Daily Tasks</HeadingDancing>
        <div className='flex justify-between mb-4 sm:my-8 sm:justify-end gap-1 sm:gap-4'>
          <Button className='focus:z-1' color={'success'} onClick={() => setIsConfirmUpdateModal(true)} disabled={listCheckedTask.length === 0}>
            Update tasks
          </Button>
          <Dropdown label="Create" outline color={'success'} dismissOnClick={false}>
            <Dropdown.Item onClick={() => setIsAddTask(true)}>Create a task</Dropdown.Item>
            <Dropdown.Item>Create a template</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell className='w-1 bg-green-100'></Table.HeadCell>
          <Table.HeadCell className='hidden md:table-cell md:w-6 bg-green-100'>Type</Table.HeadCell>
          <Table.HeadCell className='bg-green-100'>Task Name</Table.HeadCell>
          <Table.HeadCell className='bg-green-100'><FcCheckmark className='text-2xl'/></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            taskData?.map((item: TaskType) => (
              <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <Checkbox className='rounded-none checked:text-[#3F8853] disabled:opacity-70' defaultChecked={item.isCompleted} id={item.id.toString()} name={item.id.toString()} onChange={handleChangesTask} disabled={item.isCompleted}/>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell md:w-6 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <Badge className='p-2 rounded-none w-max' color={TaskTypeColor[item.type]}>  {item.type}</Badge>
                </Table.Cell>
                <Table.Cell className='text-xs md:text-md px-1 md:px-4'>{item.note}</Table.Cell>
                <Table.Cell className='text-center'>{item.isCompleted ? <FcCheckmark className='text-2xl'/> : <FcCancel className='text-2xl'/>}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
      {isAddTask && <TaskCreatedForm isOpenModal={isAddTask} onClose={() => setIsAddTask(false)}/>}
      {isConfirmUpdateModal && <Modal show={isConfirmUpdateModal} onClose={() => setIsConfirmUpdateModal(false)}>
        <Modal.Header>
          <h1 className='text-md sm:text-xl'>Confirm completed task?</h1>
        </Modal.Header>
        <Modal.Body>
          <h2 className='text-sm md:text-lg'>Here are some tasks that you selected: </h2>
          <ul className='ml-4 text-sm md:text-xl'>
            {
              listCheckedTask.map(item => (<li key={item} className='my-2'>
                &#x2022;
                <span className='text-xs md:text-lg'> {taskData.find(taskItem => taskItem.id.toString() === item)?.note}</span>
              </li>))
            }
          </ul>

          <h3 className='text-sm md:text-lg'>Are you sure you want to complete some tasks?</h3>
          <div className='mt-4 flex justify-end '>
            <Button color="gray" className='focus:z-1 mr-4' onClick={() => setIsConfirmUpdateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTasks} color="success" className='focus:z-1'>
              Complete
            </Button>
          </div>
        </Modal.Body>
      </Modal>}
    </div>
  );
};

export default TasksList;
