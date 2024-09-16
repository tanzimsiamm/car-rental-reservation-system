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
Object.defineProperty(exports, "__esModule", { value: true });
exports.carServices = void 0;
const booking_model_1 = require("../booking/booking.model");
const car_model_1 = require("./car.model");
const createCar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.create(payload);
    return result;
});
const getAllCars = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.find();
    return result;
});
const getCarById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findById(id);
    return result;
});
const updateCarById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteCarById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findByIdAndDelete(id, { isDeleted: true });
    return result;
});
const returnCar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // get the booking by id 
    const booking = yield booking_model_1.Booking.findById(payload.bookingId);
    // calculating totalCost 
    const startTime = booking === null || booking === void 0 ? void 0 : booking.startTime;
    const endTime = payload === null || payload === void 0 ? void 0 : payload.endTime;
    let date1 = new Date(`1970-01-01T${startTime}:00Z`);
    let date2 = new Date(`1970-01-01T${endTime}:00Z`);
    let differenceMilliseconds = date2 - date1;
    let diffHours = differenceMilliseconds / (1000 * 60 * 60);
    const totalCost = diffHours * ((_a = booking === null || booking === void 0 ? void 0 : booking.car) === null || _a === void 0 ? void 0 : _a.pricePerHour);
    // update the car status 
    const carId = (_b = booking === null || booking === void 0 ? void 0 : booking.car) === null || _b === void 0 ? void 0 : _b._id;
    yield car_model_1.Car.findByIdAndUpdate(carId, { status: 'available' });
    // update the booking 
    const result = yield booking_model_1.Booking.findByIdAndUpdate(payload.bookingId, {
        endTime, totalCost, 'car.status': 'available'
    }, { new: true });
    return result;
});
exports.carServices = {
    createCar,
    getAllCars,
    getCarById,
    updateCarById,
    deleteCarById,
    returnCar
};
