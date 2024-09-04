import { z } from "zod";

const createCarValidationSchema = z.object({
    name : z.string(),
    description : z.string(),
    color : z.string(),
    isElectric : z.boolean(),
    status : z.string().optional(),
    features : z.array(z.string()),
    pricePerHour : z.number(),
    isDeleted : z.boolean().optional()
})

const updateCarValidationSchema = z.object({
    name : z.string().optional(),
    description : z.string().optional(),
    color : z.string().optional(),
    isElectric : z.boolean().optional(),
    status : z.string().optional(),
    features : z.array(z.string()).optional(),
    pricePerHour : z.number().optional(),
    isDeleted : z.boolean().optional()
})

const returnCarValidationSchema = z.object({
    bookingId : z.string(),
    endTime : z.string(),
})

export const carValidations = {
    createCarValidationSchema,
    updateCarValidationSchema, returnCarValidationSchema
}
