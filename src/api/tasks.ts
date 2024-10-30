import http from '@/lib/http'
import { CreateTaskDto, CurrentWeekType, TaskType } from '@/utils/formType';
import { ResponseStatus } from '@/utils/types';
type CustomOptions = Omit<RequestInit, 'method'>;

const tasksApi = {
  createTask: async (taskData: CreateTaskDto ) => await http.post<ResponseStatus>('/task', taskData),
  getTaskByDate: async (date: string, options?: Omit<CustomOptions, 'body'>) => await http.get<TaskType[]>(`/task/${date}`, options),
  markTaskCompleted: async (taskId: number) => await http.put<TaskType>(`/task/${taskId}`),
  getTaskByWeek: async (currentWeek: CurrentWeekType) => await http.post<TaskType[]>('/task/getByWeek', currentWeek),
  markTasksCompleted: async (taskIdList: string[]) => await http.post<ResponseStatus>('/task/markCompleted', taskIdList)
}

export default tasksApi;