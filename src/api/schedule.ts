import http from '@/lib/http'
import { ScheduleForm, ScheduleType } from '@/utils/formType';
import { ResponseStatus } from '@/utils/types';

const scheduleApi = {
  createSchedule: async (scheduleData: ScheduleForm ) => await http.post<ResponseStatus>('/schedules', scheduleData),
  getScheduleByUser: async () => await http.get<ScheduleType[]>('/schedules'),
  updateSchedule: async (scheduleId: number, scheduleData: ScheduleForm) => await http.put<ResponseStatus>(`/schedules/${scheduleId}`, scheduleData ),
  deleteSchedule: async (scheduleId: number) => await http.delete<ResponseStatus>(`/schedules/${scheduleId}`)
}

export default scheduleApi;