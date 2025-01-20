import * as z from "zod";
import { containsAtLeastCharacter } from "@/utils/helper.js";
export type UserResponse = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  image: string;
};

export type UserData = Omit<UserResponse, "accessToken" | "refreshToken">;

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password have at least 6 characters" })
    .refine((value) => containsAtLeastCharacter(value, "number"), {
      message: "Password have at least a number",
    })
    .refine((value) => containsAtLeastCharacter(value, "uppercase"), {
      message: "Password have at least an uppercase character",
    })
    .refine((value) => containsAtLeastCharacter(value, "lowercase"), {
      message: "Password have at least a lowercase character",
    })
    .refine((value) => containsAtLeastCharacter(value, "specialCharacter"), {
      message: "Password have at least a special character",
    }),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .refine((value) => value.length > 0, {
        message: "First name is required field",
      })
      .refine((value) => !containsAtLeastCharacter(value, "specialCharacter"), {
        message: "First name must not have special characters",
      }),
    lastName: z
      .string()
      .refine((value) => value.length > 0, {
        message: "Last name is required field",
      })
      .refine((value) => !containsAtLeastCharacter(value, "specialCharacter"), {
        message: "Last name must not have special characters",
      }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password have at least 6 characters" })
      .refine((value) => containsAtLeastCharacter(value, "number"), {
        message: "Password have at least a number",
      })
      .refine((value) => containsAtLeastCharacter(value, "uppercase"), {
        message: "Password have at least an uppercase character",
      })
      .refine((value) => containsAtLeastCharacter(value, "lowercase"), {
        message: "Password have at least a lowercase character",
      })
      .refine((value) => containsAtLeastCharacter(value, "specialCharacter"), {
        message: "Password have at least a special character",
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password have at least 6 characters" }),
    image: z.string({ message: "Image is required" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Confirm password did not match with the password",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
