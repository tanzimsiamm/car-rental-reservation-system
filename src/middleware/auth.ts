import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/users/user.model";

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
    }
    // check if the token is valid
    const decoded = jwt.verify(
      token.split(" ")[1],
      config.jwt_access_secret as string
    );
    const { role, email } = decoded as JwtPayload;

    const user = await User.find({ email, role });

    if (!user) {
      throw new AppError(401, "User not found");
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized to access this route");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
