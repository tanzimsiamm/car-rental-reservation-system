import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";


const auth =(...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        // console.log(token)
        // if the token is sent from the client
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized')
        }
        // check if the token is valid
        jwt.verify(token.split(' ')[1], config.jwt_access_secret as string, function(err, decoded) {
            // err
            if(err){
                throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized')
            }
            // decoded undefined
            // const {email, role} = decoded
            const role = (decoded as JwtPayload).role

            if(requiredRoles && !requiredRoles.includes(role)){
                throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized')
            }

            req.user = decoded as JwtPayload
            next()
          });
  })
  };
export default auth;