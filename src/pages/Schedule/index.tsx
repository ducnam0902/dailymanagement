import AddSchedule from "@/components/AddSchedule";
import HeadingTitle from "@/components/common/HeadingTitle";
import Type from "@/components/common/Type";
import { useAppDispatch } from "@/redux/hooks";
import { hideLoading, showLoading } from "@/redux/loading/loading";
import { showToast } from "@/redux/toast/toast";
import ScheduleService from "@/services/ScheduleService";
import { ScheduleType } from "@/types/schedule";
import { FORMAT_DATE_DD_MMM_YYYY } from "@/utils/format";
import { REPEAT_TYPE } from "@/utils/helper";
import moment from "moment";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";

import React, { useEffect, useState } from "react";

const renderRepeatEach = (
  type: keyof typeof REPEAT_TYPE,
  repeatEach: string
) => {
  const typeWords = type === REPEAT_TYPE.Daily ? "day(s)" : "month(s)";

  return `Each: ${repeatEach} ${type === REPEAT_TYPE.Weekly ? "" : typeWords}`;
};

const renderRepeatColumn = (data: ScheduleType) => {
  return (
    <div>
      <p>{`Repeat: ${data.repeatType}`}</p>
      <p>{renderRepeatEach(data.repeatType, data.repeatEach)}</p>
    </div>
  );
};

const renderDate = (data: ScheduleType) => {
  return (
    <div>
      <p>{moment(data.startedAt).format(FORMAT_DATE_DD_MMM_YYYY)}</p>
    </div>
  );
};

const Schedule = () => {
  const [scheduleList, setScheduleList] = useState<ScheduleType[]>([]);
  const [deletedSchedule, setDeletedSchedule] = useState<ScheduleType | null>(
    null
  );
  const [visibleDeletedDialog, setVisibleDeletedDialog] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const fetchScheduleList = async () => {
    try {
      dispatch(showLoading());
      const resp = await ScheduleService.getScheduleByUser();
      setScheduleList(resp);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchScheduleList();
  }, []);

  const handleReloadSchedule = async () => {
    await fetchScheduleList();
  };

  const renderActionColumn = (data: ScheduleType) => {
    const handleShowDeleteSchedule = () => {
      setDeletedSchedule(data);
      setVisibleDeletedDialog(true);
    };
    return (
      <section className="flex flex-col lg:flex-row gap-2 ">
        <Button label="Update" severity="success" size="small" />
        <Button
          label="Delete"
          severity="danger"
          size="small"
          onClick={handleShowDeleteSchedule}
        />
      </section>
    );
  };

  const handleDeleteSchedule = async () => {
    try {
      dispatch(showLoading());
      const resp = await ScheduleService.deleteSchedule(deletedSchedule.id);
      if (resp.ok) {
        dispatch(
          showToast({
            type: "success",
            summary: "Delete schedule Successfully!",
          })
        );
        await handleReloadSchedule();
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          type: "danger",
          summary: "Delete schedule fail!",
        })
      );
    } finally {
      dispatch(hideLoading());
      setVisibleDeletedDialog(false);
      setDeletedSchedule(null);
    }
  };

  return (
    <section className="mx-6">
      <HeadingTitle title="Schedule" />
      <section className=" mb-6 flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Schedule tasks</h3>
        <div>
          <AddSchedule onReloadSchedule={handleReloadSchedule} />
        </div>
      </section>
      <DataTable value={scheduleList} dataKey="id">
        <Column
          field="type"
          header="Type"
          headerClassName="w-16"
          body={Type}
        ></Column>
        <Column field="task" header="Task"></Column>
        <Column
          header="Repeat"
          className="w-96"
          body={renderRepeatColumn}
        ></Column>
        <Column header="Date" className="w-40" body={renderDate}></Column>
        <Column
          className="w-40"
          header="Action"
          body={renderActionColumn}
        ></Column>
      </DataTable>
      <Dialog
        draggable={false}
        header="Delete a schedule"
        visible={visibleDeletedDialog}
        onHide={() => {
          setVisibleDeletedDialog(false);
          setDeletedSchedule(null);
        }}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "60vw", "641px": "100vw" }}
      >
        <h2 className="text-xl font-semibold mb-4">
          Are you sure you want to delete a schedule:
        </h2>
        <h2 className="text-xl font-normal leading">
          Schedule: {deletedSchedule?.task}
        </h2>
        <h2 className="text-xl font-normal leading">
          Repeat: {deletedSchedule?.repeatType}
        </h2>
        <h2 className="text-xl font-normal leading">
          {renderRepeatEach(
            deletedSchedule?.repeatType,
            deletedSchedule?.repeatEach
          )}
        </h2>

        <section className="flex justify-end gap-4 mt-4">
          <Button
            type="submit"
            label="Delete"
            severity="success"
            className="w-fit focus:shadow-2xl disabled:opacity-75"
            onClick={handleDeleteSchedule}
          />
          <Button
            type="button"
            label="Cancel"
            className="w-fit focus:shadow-2xl"
            severity="secondary"
            outlined
            onClick={() => {
              setVisibleDeletedDialog(false);
              setDeletedSchedule(null);
            }}
          />
        </section>
      </Dialog>
    </section>
  );
};

export default Schedule;
