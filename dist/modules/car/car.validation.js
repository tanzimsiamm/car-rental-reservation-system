"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carValidations = void 0;
const zod_1 = require("zod");
const createCarValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    color: zod_1.z.string(),
    isElectric: zod_1.z.boolean(),
    status: zod_1.z.string().optional(),
    features: zod_1.z.array(zod_1.z.string()),
    pricePerHour: zod_1.z.number(),
    isDeleted: zod_1.z.boolean().optional()
});
const updateCarValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    color: zod_1.z.string().optional(),
    isElectric: zod_1.z.boolean().optional(),
    status: zod_1.z.string().optional(),
    features: zod_1.z.array(zod_1.z.string()).optional(),
    pricePerHour: zod_1.z.number().optional(),
    isDeleted: zod_1.z.boolean().optional()
});
const returnCarValidationSchema = zod_1.z.object({
    bookingId: zod_1.z.string(),
    endTime: zod_1.z.string(),
});
exports.carValidations = {
    createCarValidationSchema,
    updateCarValidationSchema, returnCarValidationSchema
};
