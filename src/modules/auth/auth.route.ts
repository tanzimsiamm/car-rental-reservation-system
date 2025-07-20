import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { loginValidationSchema } from "./auth.validation";
import { authControllers } from "./auth.controller";
import { userValidationSchema } from "../users/user.validation";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidationSchema),
  authControllers.registerUser
);

router.post(
  "/signin",
  validateRequest(loginValidationSchema),
  authControllers.loginUser
);

export const authRoutes = router;
