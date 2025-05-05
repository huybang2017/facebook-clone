import { z } from "zod";

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  profilePicture?: string;
  coverPhoto?: string;
  gender: string;
  role: string;
  userModel: string;
}

export const schema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().min(1, "Email is required").email(),
    gender: z.string().min(1, "Gender is required"),
    role: z.string().min(1, "Role is required"),
    dateOfBirth: z.string().min(1, "Date of Birth is required"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password cannot exceed 20 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must match the password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password & Confirm Password do not match!",
    path: ["confirmPassword"],
  });

export interface UserData {
  userId: number;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

export interface UserDataModelList extends UserData {
  uniqueId: number;
}
