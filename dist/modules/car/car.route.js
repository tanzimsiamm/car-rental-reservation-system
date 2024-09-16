"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoutes = void 0;
const express_1 = require("express");
const car_controller_1 = require("./car.controller");
const car_validation_1 = require("./car.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(car_validation_1.carValidations.createCarValidationSchema), car_controller_1.carControllers.createCar);
router.get('/', car_controller_1.carControllers.getAllCars);
router.get('/:id', car_controller_1.carControllers.getCarById);
router.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(car_validation_1.carValidations.updateCarValidationSchema), car_controller_1.carControllers.updateCar);
router.delete('/:id', (0, auth_1.default)('admin'), car_controller_1.carControllers.deleteCar);
router.put('/return', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(car_validation_1.carValidations.returnCarValidationSchema), car_controller_1.carControllers.returnCar);
exports.carRoutes = router;
