import { z } from "zod";

// Zod schema corresponding to TUser interface
export const userValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  role: z.enum(["user", "admin"]).default("user"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
});