import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";

const registerUser = async (payload: TUser) => {
  const result = await User.create(payload);
  result.password = "";
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  // check user existence
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "user not exist");
  }
  // check password
  if (user.password !== payload.password) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password incorrect");
  }
  // create a token for user
  const jwtPayload = { email: user.email, role: user.role };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires,
  });

  user.password = "";
  return { user, token };
};

export const authServices = {
  registerUser,
  loginUser,
};
