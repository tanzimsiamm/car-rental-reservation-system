"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    role: zod_1.z.enum(['user', 'admin']),
    password: zod_1.z.string(),
    phone: zod_1.z.string(),
    address: zod_1.z.string()
});
