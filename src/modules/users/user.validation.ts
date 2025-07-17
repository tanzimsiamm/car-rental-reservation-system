import { z } from "zod";

export const userValidationSchema = z.object({
    name : z.string(),
    email : z.string(),
    role : z.enum(['user','admin']),
    password : z.string(),
    phone : z.string(),
    address : z.string()
});