import http from "./api-factory";
import { OkResponse } from "../types/common";
import {
  CreateScheduleData,
  ScheduleType,
} from "@/types/schedule";

const ScheduleService = {
  createSchedule: async (data: CreateScheduleData): Promise<OkResponse> => {
    const resp = await http.post<OkResponse>("/schedules", data);
    return resp.data;
  },
  getScheduleByUser: async (): Promise<ScheduleType[]> => {
    const resp = await http.get<ScheduleType[]>("/schedules");
    return resp.data;
  },
  updateSchedule: async (
    scheduleId: number,
    scheduleData: CreateScheduleData
  ): Promise<OkResponse> => {
    const resp = await http.put<OkResponse>(
      `/schedules/${scheduleId}`,
      scheduleData
    );
    return resp.data;
  },
  deleteSchedule: async (scheduleId: number): Promise<OkResponse> => {
    const resp = await http.delete<OkResponse>(`/schedules/${scheduleId}`);
    return resp.data;
  },
};

export default ScheduleService;
