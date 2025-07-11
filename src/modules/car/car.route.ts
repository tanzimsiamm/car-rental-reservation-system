import { Router } from "express";
import { carControllers } from "./car.controller";
import { carValidations } from "./car.validation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  auth("admin"),
  validateRequest(carValidations.createCarValidationSchema),
  carControllers.createCar
);

router.get("/", carControllers.getAllCars);

router.put(
  "/return",
  auth("admin"),
  validateRequest(carValidations.returnCarValidationSchema),
  carControllers.returnCar
);

router.get("/:id", carControllers.getCarById);

router.put(
  "/:id",
  auth("admin"),
  validateRequest(carValidations.updateCarValidationSchema),
  carControllers.updateCar
);

router.delete("/:id", auth("admin"), carControllers.deleteCar);

export const carRoutes = router;
