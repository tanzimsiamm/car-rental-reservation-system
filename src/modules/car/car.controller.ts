import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { carServices } from './car.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createCar = catchAsync (async (req, res) => {
  // console.log('test', req.user)

    const result = await carServices.createCar(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car created successfully',
      data: result,
    });
  })


const getAllCars = catchAsync (async (req, res) => {
    const result = await carServices.getAllCars(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    })
  });

const getCarById = catchAsync (async (req, res) => {
    const { id } = req.params;
    const result = await carServices.getCarById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car retrieved successfully',
      data: result,
    })
  });

const updateCar = catchAsync (async (req, res) => {
    const { id } = req.params;
    const carData = req.body;
    const result = await carServices.updateCarById(id, carData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car updated successfully',
      data: result,
    })
  });

const deleteCar = catchAsync (async (req, res) => {
    const { id } = req.params;
    const result = await carServices.deleteCarById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car deleted successfully',
      data: result,
    })
  });

  const returnCar = catchAsync (async (req, res) => {
    const result = await carServices.returnCar(req.body);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Failed to return car. Invalid data or time range.",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car returned successfully",
    data: result,
  });
});

export const carControllers = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  returnCar
}