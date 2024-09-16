"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    user: { type: Object, required: true },
    car: { type: Object, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 }
}, {
    timestamps: true
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
