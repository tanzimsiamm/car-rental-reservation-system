import { z } from "zod";

export const createBookingValidationSchema = z.object({
    date : z.string(),
    carId : z.string(),
    startTime : z.string(),
})