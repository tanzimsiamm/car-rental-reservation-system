"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)('admin'), booking_controller_1.bookingControllers.getAllBookings);
router.get('/my-bookings', (0, auth_1.default)('user'), booking_controller_1.bookingControllers.getUserBookings);
router.post('/', (0, auth_1.default)('user'), (0, validateRequest_1.default)(booking_validation_1.createBookingValidationSchema), booking_controller_1.bookingControllers.createBooking);
exports.bookingRoutes = router;
