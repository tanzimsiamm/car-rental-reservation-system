import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await authServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  const { token, user } = result;

  res.json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: user,
    token,
  });
});

export const authControllers = {
  registerUser,
  loginUser,
};
