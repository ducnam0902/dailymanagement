import HeadingTitle from "@/components/common/HeadingTitle";
import TaskService from "@/services/TaskService";
import { TaskData } from "@/types/tasks";
import {
  FORMAT_DATE_DD_MMMM_YYYY,
  FORMAT_DATE_YYYY_MM_DD,
} from "@/utils/format";
import moment from "moment";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { DataView } from "primereact/dataview";
import { Column } from "primereact/column";
import { useAppDispatch } from "@/redux/hooks";
import { hideLoading, showLoading } from "@/redux/loading/loading";
import clsx from "clsx";
import AddTask from "@/components/AddTask";
import { showToast } from "@/redux/toast/toast";
import Type from "@/components/common/Type";

const today = moment();
const todayFormatUI = today.format(FORMAT_DATE_DD_MMMM_YYYY);

const listTemplate = (items) => {
  if (!items || items.length === 0) return null;

  const list = items.map((task: TaskData) => {
    return (
      <section key={task.id} className="flex gap-4 items-center mb-2">
        <i className="pi pi-check-circle" style={{ color: "text-primary" }} />
        <p className="text-base">{task.task}</p>
      </section>
    );
  });

  return <div className="grid grid-nogutter ml-4">{list}</div>;
};

const Task = () => {
  const [tasksList, setTasksList] = useState<TaskData[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<TaskData[]>([]);
  const [visibleCompleteTask, setVisibleCompleteTask] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const fetchTodayTaskList = async () => {
    const todayFormatAPI = today.format(FORMAT_DATE_YYYY_MM_DD);
    try {
      dispatch(showLoading());
      const resp = await TaskService.getTaskByDate(todayFormatAPI);
      setTasksList(resp);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchTodayTaskList();
  }, []);

  const isRowSelectable = (event) => !event.data.isCompleted;
  const handleRowClassName = (data, options) => {
    const selectedCase = options.props.selection ?? [];
    const isSelectedCase = selectedCase.find((item) => item.id === data.id);
    return clsx(
      {
        "line-through": data.isCompleted,
        "hover:bg-[#EBFAF2]": !data.isCompleted,
        "opacity-50": data.isCompleted,
        "bg-[#EBFAF2]": isSelectedCase?.id === data?.id,
      },
      "text-black"
    );
  };

  const handleCompleteTask = async () => {
    const taskIdList = selectedTasks.map((item) => item.id.toString());
    try {
      dispatch(showLoading());
      const resp = await TaskService.markTasksCompleted(taskIdList);
      if (resp.ok) {
        dispatch(
          showToast({
            type: "success",
            summary: "Complete task Successfully!",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          type: "danger",
          summary: "Complete task fail!",
        })
      );
    } finally {
      setVisibleCompleteTask(false);
      setSelectedTasks([]);
      await fetchTodayTaskList();
    }
  };

  return (
    <section className="mx-6">
      <HeadingTitle title="Tasks" />
      <section className=" mb-6 flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Daily Tasks {todayFormatUI}</h3>
        <div>
          <AddTask onReloadTask={fetchTodayTaskList} />
          <Button
            label="Complete Tasks"
            severity="success"
            icon="pi pi-check-circle"
            iconPos="right"
            disabled={selectedTasks?.length <= 0}
            onClick={() => setVisibleCompleteTask(true)}
          />
        </div>
      </section>
      <DataTable
        selectionMode="multiple"
        value={tasksList}
        selection={selectedTasks}
        showSelectAll={false}
        onSelectionChange={(e) => setSelectedTasks(e.value)}
        dataKey="id"
        isDataSelectable={isRowSelectable}
        rowClassName={handleRowClassName}
        emptyMessage={<div className="text-center">No tasks </div>}
      >
        <Column
          field="type"
          header="Type"
          headerClassName="w-16"
          body={Type}
        ></Column>
        <Column field="task" header="Task"></Column>
        <Column selectionMode="multiple" className="w-4"></Column>
      </DataTable>
      <Dialog
        draggable={false}
        header="Complete tasks"
        visible={visibleCompleteTask}
        onHide={() => {
          setVisibleCompleteTask(false);
        }}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "60vw", "641px": "100vw" }}
      >
        <h2 className="text-xl font-semibold mb-4">
          Are you sure you want to complete daily tasks:
        </h2>
        <DataView value={selectedTasks} listTemplate={listTemplate} />
        <section className="flex justify-end gap-4 mt-4">
          <Button
            type="submit"
            label="Complete"
            severity="success"
            className="w-fit focus:shadow-2xl disabled:opacity-75"
            onClick={handleCompleteTask}
          />
          <Button
            type="button"
            label="Cancel"
            className="w-fit focus:shadow-2xl"
            severity="secondary"
            outlined
            onClick={() => {
              setVisibleCompleteTask(false);
            }}
          />
        </section>
      </Dialog>
    </section>
  );
};

export default Task;
