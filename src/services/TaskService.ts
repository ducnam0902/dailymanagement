import http from "./api-factory";
import { OkResponse } from "../types/common";
import { CreateTaskData, TaskData } from "@/types/tasks";

const TaskService = {
  createTask: async (data: CreateTaskData): Promise<OkResponse> => {
    const resp = await http.post("/task", data);
    return resp.data;
  },
  getTaskByDate: async (date: string): Promise<TaskData[]> => {
    const resp = await http.get<TaskData[]>(`/task/${date}`);
    return resp.data;
  },
  markTasksCompleted: async (taskIdList: string[]): Promise<OkResponse> => {
    const resp = await http.post(`/task/markCompleted`, taskIdList);
    return resp.data;
  },
  getTaskByWeek: async () => {
    const resp = await http.get("/user/currentUser");
    return resp;
  },
};

export default TaskService;
