import { TaskData, TaskType } from "@/types/tasks";
import React from "react";
import { Tag } from "primereact/tag";
const taskColorTag = {
  [TaskType.ACTIVITY]: "",
  [TaskType.DEVELOP]: "info",
  [TaskType.ROUTINE]: "success",
  [TaskType.PLAN]: "secondary",
  [TaskType.SHOPPING]: "danger",
  [TaskType.OTHER]: "warning",
};

const Type = (data: TaskData) => {
  return <Tag severity={taskColorTag[data.type]} value={data.type} />;
};

export default Type;
