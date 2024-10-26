import http from '@/lib/http'
import { CreateTaskDto, CurrentWeekType, TaskType } from '@/utils/formType';
import { ResponseStatus } from '@/utils/types';
type CustomOptions = Omit<RequestInit, 'method'>;

const tasksApi = {
  createTask: async (taskData: CreateTaskDto ) => await http.post<ResponseStatus>('/note', taskData),
  getTaskByDate: async (date: string, options?: Omit<CustomOptions, 'body'>) => await http.get<TaskType[]>(`/note/${date}`, options),
  markTaskCompleted: async (taskId: number) => await http.put<TaskType>(`/note/${taskId}`),
  getTaskByWeek: async (currentWeek: CurrentWeekType) => await http.post<TaskType[]>('/note/getByWeek', currentWeek),
  markTasksCompleted: async (taskIdList: string[]) => await http.post<ResponseStatus>('/note/markCompleted', taskIdList)
}

export default tasksApi;