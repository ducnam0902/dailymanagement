import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ScheduleForm from "../ScheduleForm";

interface IAddSchedule {
  onReloadSchedule: () => void;
}

const AddSchedule = ({ onReloadSchedule }: IAddSchedule) => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleCloseDialog = () => {
    setVisible(false);
  };

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
        <ScheduleForm onCloseModal={handleCloseDialog} onReloadSchedule={onReloadSchedule} />
      </Dialog>
    </>
  );
};

export default AddSchedule;
