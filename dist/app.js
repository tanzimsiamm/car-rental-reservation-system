"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_route_1 = require("./modules/car/car.route");
const booking_route_1 = require("./modules/booking/booking.route");
const notFound_1 = __importDefault(require("./middleware/notFound"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const auth_route_1 = require("./modules/auth/auth.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use("/api/auth", auth_route_1.authRoutes);
app.use("/api/cars", car_route_1.carRoutes);
app.use("/api/bookings", booking_route_1.bookingRoutes);
app.get("/", (req, res) => {
    res.send("hello!");
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
