import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import CustomDropdown from "../common/CustomDropdown";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import {
  AddTaskSchema,
  CreateTaskData,
  TaskForm,
  TaskType,
} from "@/types/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { upperFirst } from "lodash-es";
import CustomCalendar from "../common/CustomCalendar";
import moment from "moment";
import { FORMAT_DATE_YYYY_MM_DD } from "@/utils/format";
import { useAppDispatch } from "@/redux/hooks";
import { hideLoading, showLoading } from "@/redux/loading/loading";
import TaskService from "@/services/TaskService";
import { showToast } from "@/redux/toast/toast";

const taskTypeList = Object.values(TaskType).map((item) => ({
  label: upperFirst(item.toLocaleLowerCase()),
  value: item,
}));

interface IAddTask {
  onReloadTask: () => void;
}

const AddTask = ({ onReloadTask }: IAddTask) => {
  const [visible, setVisible] = useState<boolean>(false);
  const methods = useForm<TaskForm>({
    resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      dateCreated: new Date(),
    },
  });
  const dispatch = useAppDispatch();
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      dispatch(showLoading());
      const payload: CreateTaskData = {
        ...data,
        dateCreated: moment(data.dateCreated).format(FORMAT_DATE_YYYY_MM_DD),
      };
      const resp = await TaskService.createTask(payload);
      if (resp.ok) {
        dispatch(
          showToast({
            type: "success",
            summary: "Create task Successfully!",
          })
        );
        onReloadTask();
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          type: "danger",
          summary: "Create task Failed!",
        })
      );
    } finally {
      handleCloseDialog();
      dispatch(hideLoading());
    }
  });

  const handleCloseDialog = () => {
    setVisible(false);
    reset();
  };

  return (
    <>
      <Button
        iconPos="right"
        icon="pi pi-plus"
        label="Add Task"
        severity="info"
        onClick={() => setVisible(true)}
        size="small"
      />

      <Dialog
        className="z-500"
        draggable={false}
        header="Create a task"
        visible={visible}
        onHide={() => {
          if (!visible) return;
          handleCloseDialog();
        }}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "60vw", "641px": "100vw" }}
      >
        <form onSubmit={onSubmit}>
          <section className="flex flex-col mb-8">
            <Controller
              name="type"
              control={control}
              render={({ field }) => {
                const { onChange, value } = field;
                return (
                  <>
                    <label htmlFor="Type" className="text-left text-base mb-2">
                      Task type
                    </label>
                    <div className="w-full">
                      <CustomDropdown
                        invalid={!!errors.type}
                        placeholder="Select a Task Type"
                        onChange={(e) => onChange(e.value)}
                        value={value}
                        options={taskTypeList}
                      />

                    </div>
                  </>
                );
              }}
            />

            {errors?.type && (
              <small className="mt-1 text-red-500 text-left h-5">
                {errors.type.message}
              </small>
            )}
          </section>
          <section className="flex flex-col mb-8">
            <label htmlFor="task" className="text-left text-base mb-2">
              Task name
            </label>
            <InputText
              id="task"
              placeholder="Enter your task"
              className="hover:border-secondary focus:border-secondary w-full focus:shadow-2xl"
              invalid={!!errors.task}
              {...register("task")}
            />
            {errors?.task && (
              <small className="mt-1 text-red-500 text-left h-5">
                {errors.task.message}
              </small>
            )}
          </section>
          <section className="flex flex-col mb-8">
            <Controller
              name="dateCreated"
              control={control}
              render={({ field }) => {
                const { onChange, value } = field;
                return (
                  <>
                    <label
                      htmlFor="dateCreated"
                      className="text-left text-base mb-2"
                    >
                      Date
                    </label>
                    <div className="p-inputgroup flex-1">
                      <CustomCalendar
                        value={value}
                        onChange={(e) => onChange(e.value)}
                        minDate={new Date()}
                        dateFormat="dd MM yy"
                        invalid={!!errors.dateCreated}
                      />
                    </div>
                  </>
                );
              }}
            />
            {errors?.dateCreated && (
              <small className="mt-1 text-red-500 text-left h-5">
                {errors.dateCreated.message}
              </small>
            )}
          </section>
          <section className="flex justify-end gap-4">
            <Button
              disabled={isSubmitting}
              type="submit"
              label="Create"
              severity="success"
              className="w-fit focus:shadow-2xl disabled:opacity-75"
            />
            <Button
              type="button"
              label="Cancel"
              className="w-fit focus:shadow-2xl"
              severity="secondary"
              outlined
              onClick={handleCloseDialog}
            />
          </section>
        </form>
      </Dialog>
    </>
  );
};

export default AddTask;
