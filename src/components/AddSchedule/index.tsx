import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import { TaskType } from "@/types/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { upperFirst } from "lodash-es";
import moment from "moment";
import { FORMAT_DATE_YYYY_MM_DD } from "@/utils/format";
import { useAppDispatch } from "@/redux/hooks";
import { hideLoading, showLoading } from "@/redux/loading/loading";
import { showToast } from "@/redux/toast/toast";
import {
  AddScheduleSchema,
  CreateScheduleData,
  ScheduleForm,
} from "@/types/schedule";
import ScheduleService from "@/services/ScheduleService";
import { REPEAT_TYPE, WEEKDAY } from "@/utils/helper";
import { Checkbox } from "primereact/checkbox";
import clsx from "clsx";
import CustomDropdown from "../common/CustomDropdown";
import CustomCalendar from "../common/CustomCalendar";

const taskTypeList = Object.values(TaskType).map((item) => ({
  label: upperFirst(item.toLocaleLowerCase()),
  value: item,
}));

const repeatOptions = Object.keys(REPEAT_TYPE).map((item) => ({
  label: upperFirst(item.toLocaleLowerCase()),
  value: item,
}));

interface IAddSchedule {
  onReloadSchedule: () => void;
}

const AddSchedule = ({ onReloadSchedule }: IAddSchedule) => {
  const [visible, setVisible] = useState<boolean>(false);
  const methods = useForm<ScheduleForm>({
    resolver: zodResolver(AddScheduleSchema),
    defaultValues: {
      startedAt: new Date(),
      repeatType: REPEAT_TYPE.Off,
    },
  });
  const dispatch = useAppDispatch();
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      dispatch(showLoading());
      const payload: CreateScheduleData = {
        ...data,
        startedAt: moment(data.startedAt).format(FORMAT_DATE_YYYY_MM_DD),
      };
      const resp = await ScheduleService.createSchedule(payload);
      if (resp.ok) {
        dispatch(
          showToast({
            type: "success",
            summary: "Create task Successfully!",
          })
        );
        onReloadSchedule();
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

  console.log("render comp");
  return (
    <>
      <Button
        iconPos="right"
        icon="pi pi-plus"
        label="Add Schedule"
        severity="info"
        className="mr-4"
        onClick={() => setVisible(true)}
      />

      <Dialog
        draggable={false}
        header="Create a schedule"
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
                        value={value}
                        options={taskTypeList}
                        placeholder="Select a Task Type"
                        onChange={(e) => onChange(e.value)}
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
              name="startedAt"
              control={control}
              render={({ field }) => {
                const {  onChange, value } = field;
                return (
                  <>
                    <label
                      htmlFor="startedAt"
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
                       invalid={!!errors.startedAt}
                      />
                    </div>
                  </>
                );
              }}
            />
            {errors?.startedAt && (
              <small className="mt-1 text-red-500 text-left h-5">
                {errors.startedAt.message}
              </small>
            )}
          </section>

          <Controller
            name="repeatType"
            control={control}
            render={({ field }) => {
              const { onChange, value } = field;
              const handleChangeRepeatType = (e) => {
                const newRepeatType = e.value;
                onChange(newRepeatType);
                if (
                  newRepeatType === REPEAT_TYPE.Daily ||
                  newRepeatType === REPEAT_TYPE.Monthly
                ) {
                  setValue("repeatEach", "1");
                }
                if (newRepeatType === REPEAT_TYPE.Weekly) {
                  setValue("repeatEach", "Monday");
                }
              };
              return (
                <>
                  <section className="flex flex-col mb-8">
                    <label
                      htmlFor="repeatType"
                      className="text-left text-base mb-2"
                    >
                      Repeat type
                    </label>
                    <div className="w-full">
                      <CustomDropdown
                        invalid={!!errors.repeatType}
                        value={value}
                        options={repeatOptions}
                        placeholder="Select a repeat type"
                        onChange={handleChangeRepeatType}
                      />
                    </div>
                    {errors?.repeatType && (
                      <small className="mt-1 text-red-500 text-left h-5">
                        {errors.repeatType.message}
                      </small>
                    )}
                  </section>
                  {(value === REPEAT_TYPE.Daily ||
                    value === REPEAT_TYPE.Monthly) && (
                      <section className="flex items-center mb-8 justify-start">
                        <label
                          htmlFor="repeatEach"
                          className="text-left text-base mr-4"
                        >
                          Repeat Each
                        </label>

                        <div>
                          <InputText
                            id="repeatEach"
                            className="hover:border-secondary focus:border-secondary focus:shadow-2xl w-20"
                            invalid={!!errors.repeatEach}
                            {...register("repeatEach")}
                          />
                          {errors?.repeatEach && (
                            <small className="mt-1 text-red-500 text-left h-5 w-10">
                              {errors.repeatEach.message}
                            </small>
                          )}
                        </div>
                        <span className="font-medium text-base ml-4">
                          {value === REPEAT_TYPE.Daily && "day(s)"}
                          {value === REPEAT_TYPE.Monthly && "month(s)"}
                        </span>
                      </section>
                    )}

                  {value === REPEAT_TYPE.Weekly && (
                    <section className="flex flex-col mb-8">
                      <label
                        htmlFor="repeatType"
                        className="text-left text-base mb-2"
                      >
                        Repeat Each
                      </label>
                      <div className="w-full mt-2">
                        <Controller
                          name="repeatEach"
                          control={control}
                          render={({ field }) => {
                            const { value, onChange } = field;
                            const handleChangeRepeatEach = (e) => {
                              const repeatEachList = value.split(",");

                              if (e.checked) repeatEachList.push(e.value);
                              else
                                repeatEachList.splice(
                                  repeatEachList.indexOf(e.value),
                                  1
                                );

                              onChange(repeatEachList.join(", "));
                            };
                            return (
                              <div className="flex align-items-center">
                                {WEEKDAY.map((item) => (
                                  <div key={item} className="mr-2">
                                    <Checkbox
                                      inputId={item}
                                      name={item}
                                      value={item}
                                      onChange={handleChangeRepeatEach}
                                      checked={value.includes(item)}
                                      className="hidden"
                                    />
                                    <label
                                      htmlFor={item}
                                      className={clsx(
                                        "text-xs leading-none px-3 py-2 border-2  rounded-full cursor-pointer",
                                        {
                                          "border-primary border-2 ":
                                            value.includes(item),
                                        }
                                      )}
                                    >
                                      {item.slice(0, 1)}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            );
                          }}
                        />
                      </div>
                      {errors?.repeatEach && (
                        <small className="mt-1 text-red-500 text-left h-5">
                          {errors.repeatEach.message}
                        </small>
                      )}
                    </section>
                  )}
                </>
              );
            }}
          />

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

export default AddSchedule;
