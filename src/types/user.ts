import * as z from "zod";
import { containsAtLeastCharacter } from "@/utils/helper.js";
export type UserResponse = {
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  image: string;
};

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
