import { z } from "zod";
import { REPEAT_TYPE } from "@/utils/helper";

export const AddScheduleSchema = z
  .object({
    task: z
      .string({ message: "Task field is required" })
      .min(3, { message: "At least 3 characters" }),
    type: z.string({ message: "Type is required" }),
    startedAt: z.date({ message: "Date is required" }),
    repeatType: z.string({ message: "Repeat type is required" }),
    repeatEach: z.string(),
  })
  .superRefine(({ repeatType, repeatEach }, ctx) => {
    if (
      repeatType === REPEAT_TYPE.Daily ||
      repeatType === REPEAT_TYPE.Monthly
    ) {
      if (!Number.isNaN(parseInt(repeatEach, 10)) && Number(repeatEach) <= 0) {
        ctx.addIssue({
          code: "custom",
          message: "Expected positive number",
          path: ["repeatEach"],
        });
      }
    }
    if (repeatType === REPEAT_TYPE.Weekly && repeatEach.length <= 0) {
      ctx.addIssue({
        code: "custom",
        message: "Expected at least a weekday",
        path: ["repeatEach"],
      });
    }
  });

export type ScheduleForm = z.infer<typeof AddScheduleSchema>;

export type CreateScheduleData = Omit<ScheduleForm, "startedAt"> & {
  startedAt: string;
  generatedAt: string;
  timezone: string;
};

export type ScheduleType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  task: string;
  startedAt: string;
  type: string;
  repeatType: keyof typeof REPEAT_TYPE;
  repeatEach: string;
  generatedAt: string;
};
