import { ScheduleType } from '@/types/schedule'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'
import ScheduleForm from '../ScheduleForm'

interface IUpdateSchedule {
    data: ScheduleType,
    onReloadSchedule: () => void
}

const UpdateSchedule = ({ data, onReloadSchedule }: IUpdateSchedule) => {
    const [visibleDialog, setVisibleDialog] =
        useState<boolean>(false);

     const handleCloseDialog = () => {
        setVisibleDialog(false);
     }

    return (
        <section>
            <Button label="Update" severity="success" size="small" onClick={() => setVisibleDialog(true)} />
            <Dialog
            className='z-500'
                draggable={false}
                header="Update a schedule"
                visible={visibleDialog}
                onHide={() => {
                    setVisibleDialog(false);
                }}
                style={{ width: "30vw" }}
                breakpoints={{ "960px": "60vw", "641px": "100vw" }}
            >
                 <ScheduleForm schedule={data} onCloseModal={handleCloseDialog} onReloadSchedule={onReloadSchedule} />
            </Dialog>
        </section>
    )
}

export default UpdateSchedule
