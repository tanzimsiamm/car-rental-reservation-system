"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = require("./booking.model");
const user_model_1 = require("../users/user.model");
const car_model_1 = require("../car/car.model");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createBooking = (userEmail, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // get userData by email 
    const userData = yield user_model_1.User.findOne({ email: userEmail }, { createdAt: 0, updatedAt: 0, password: 0, __v: 0 });
    // update the car status available to unavailable 
    const carData = yield car_model_1.Car.findByIdAndUpdate(payload.carId, { status: 'unavailable' }, { new: true });
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'user is not exist');
    }
    if (!carData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'car is not exist');
    }
    if (carData.isDeleted === true) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'car is not found');
    }
    const bookingData = Object.assign({}, payload);
    bookingData.user = userData;
    bookingData.car = carData;
    const result = yield booking_model_1.Booking.create(bookingData);
    return result;
});
const getAllBookings = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = {};
    if ((query === null || query === void 0 ? void 0 : query.carId) && (query === null || query === void 0 ? void 0 : query.date)) {
        queryObj['car._id'] = new mongoose_1.default.Types.ObjectId(query.carId);
        queryObj.date = query.date;
    }
    const result = yield booking_model_1.Booking.find(queryObj);
    return result;
});
const getUserBookings = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ 'user.email': userEmail });
    return result;
});
exports.bookingServices = {
    createBooking,
    getAllBookings,
    getUserBookings
};
