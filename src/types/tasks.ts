import * as z from "zod";

export enum TaskType {
  ROUTINE = "ROUTINE",
  PLAN = "PLAN",
  ACTIVITY = "ACTIVITY",
  DEVELOP = "DEVELOP",
  SHOPPING = "SHOPPING",
  OTHER = "OTHER",
}

export type TaskData = {
  id: number;
  task: string;
  type: string;
  isCompleted: boolean;
  dateCreated: string;
  createdAt: string;
  updatedAt: string;
};

export const AddTaskSchema = z.object({
  type: z.nativeEnum(TaskType, { message: "Type must be in enum list" }),
  task: z
    .string({ message: "Task is required" })
    .min(3, { message: "Task is must be at least 3 characters" }),
  dateCreated: z.date({ message: "Date is required" }),
});

export type TaskForm = z.infer<typeof AddTaskSchema>;

export type CreateTaskData = Omit<TaskForm, "dateCreated"> & {
  dateCreated: string;
};
