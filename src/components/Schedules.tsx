"use client";
import React, { useState } from "react";
import { Button, Table, Badge } from "flowbite-react";
import Link from "next/link";
import routes from "@/utils/routes";
import { FcLeft } from "react-icons/fc";
import TemplateCreatedForm from "./TemplateCreatedForm";
import { ScheduleType } from "@/utils/formType";
import { formatDate, REPEAT_TYPE, TaskTypeColor } from "@/utils/helper";
import moment from "moment";
import DeleteScheduleModal from "./DeleteScheduleModal";

interface ISchedules {
  scheduleList: ScheduleType[];
}

interface IModalForm {
  isOpenModal: boolean;
  schedule: ScheduleType | undefined;
}

function Schedules({ scheduleList }: ISchedules) {
  const [isAddTemplate, setIsAddTemplate] = useState<boolean>(false);
  const [isUpdateTemplate, setIsUpdateTemplate] = useState<IModalForm>({
    isOpenModal: false,
    schedule: undefined,
  });
  const [isDeleteSchedule, setIsDeleteSchedule] = useState<IModalForm>({
    isOpenModal: false,
    schedule: undefined,
  });

  const handleDeleteSchedule = (schedule: ScheduleType) => {
    setIsDeleteSchedule({
      isOpenModal: true,
      schedule: schedule,
    });
  };

  const handleCloseScheduleModal = () => {
    setIsDeleteSchedule({
      isOpenModal: false,
      schedule: undefined,
    });
  };

  const handleOpenScheduleForm = (item: ScheduleType) => {
    setIsUpdateTemplate({
      isOpenModal: true,
      schedule: item,
    })
  };

  const handleCloseUpdateTemplate = () => {
    setIsUpdateTemplate({
      isOpenModal: false,
      schedule: undefined,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <Link
          href={routes.task}
          className="hover:underline hover:text-green-600 flex items-center gap-1 text-md"
        >
          <FcLeft />
          <span>Back to daily tasks</span>
        </Link>
        <Button
          outline
          color={"success"}
          onClick={() => setIsAddTemplate(true)}
        >
          Create a Schedule
        </Button>
      </div>

      <Table className="mt-8">
        <Table.Head>
          <Table.HeadCell className="bg-green-100 py-1 md:py-5 text-center max-w-40">
            Type
          </Table.HeadCell>
          <Table.HeadCell className="bg-green-100 py-1 md:py-5 text-center w-96">
            Task
          </Table.HeadCell>
          <Table.HeadCell className="bg-green-100 py-1 md:py-5 text-center max-w-40">
            Repeat
          </Table.HeadCell>
          <Table.HeadCell className="bg-green-100 py-1 md:py-5 text-center max-w-36">
            Started At
          </Table.HeadCell>
          <Table.HeadCell className="bg-green-100 py-1 md:py-5 text-center max-w-40">
            Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {scheduleList.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell className="flex justify-center items-center">
                <Badge
                  className="p-2 rounded-none w-max"
                  color={TaskTypeColor[item.type]}
                >
                  {item.type}
                </Badge>
              </Table.Cell>
              <Table.Cell>{item.task}</Table.Cell>
              <Table.Cell className="text-center">
                {item.repeatType === REPEAT_TYPE.Daily && (
                  <p> Every {item.repeatEach} day(s)</p>
                )}
                {item.repeatType === REPEAT_TYPE.Monthly && (
                  <p> Every {item.repeatEach} month(s)</p>
                )}
                {item.repeatType === REPEAT_TYPE.Weekly && (
                  <p> {item.repeatEach}</p>
                )}
                {item.repeatType === REPEAT_TYPE.Off && <p>Off</p>}
              </Table.Cell>
              <Table.Cell className="text-center">
                {formatDate(moment(item.startedAt), "DD-MMM-YYYY")}
              </Table.Cell>
              <Table.Cell className="flex gap-1 md:gap-3 justify-center items-center">
                <Button
                  outline
                  color={"warning"}
                  onClick={() => handleOpenScheduleForm(item)}
                >
                  Update
                </Button>
                <Button
                  color="failure"
                  onClick={() => handleDeleteSchedule(item)}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {isAddTemplate && (
        <TemplateCreatedForm
          isOpenModal={isAddTemplate}
          onClose={() => setIsAddTemplate(false)}
        />
      )}
      {isDeleteSchedule.isOpenModal && (
        <DeleteScheduleModal
          isOpenModal={isDeleteSchedule.isOpenModal}
          schedule={isDeleteSchedule.schedule as ScheduleType}
          onClose={handleCloseScheduleModal}
        />
      )}
      {isUpdateTemplate.isOpenModal && (
        <TemplateCreatedForm
          isOpenModal={isUpdateTemplate.isOpenModal}
          onClose={handleCloseUpdateTemplate}
          schedule={isUpdateTemplate.schedule}
        />
      )}
    </div>
  );
}

export default Schedules;
