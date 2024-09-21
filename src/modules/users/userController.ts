import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./userService";

const getAllUsers = catchAsync (async (req, res) => {

    const result = await userServices.getAllUsers();
    
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Users retrieved successfully',
     data: result,
   });
 })
 
 const getSingleUser = catchAsync (async (req, res) => {
 
    const result = await userServices.getSingleUser(req.params.email);
    
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'User retrieved successfully',
     data: result,
   });
 })
 
 const updateUser = catchAsync (async (req, res) => {
    const result = await userServices.updateUser(req.params.id , req.body);
    
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'User updated successfully',
     data: result,
   });
 })
 
 
 const deleteUser = catchAsync (async (req, res) => {
    const result = await userServices.deleteUser(req.params.id);
    
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'User deleted successfully',
     data: result,
   });
 })

export const userControllers = {
   getAllUsers, getSingleUser, updateUser, deleteUser
}
 