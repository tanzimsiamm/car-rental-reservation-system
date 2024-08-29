import { Request, Response } from 'express';
import { carServices } from './car.service';

const createCar = async (req: Request, res: Response) => {
  try {
    const car = await carServices.createCar(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Car created successfully',
      data: car
    });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message
    });
  }
};
const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await carServices.getAllCars();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Cars retrieved successfully',
      data: cars
    });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message
    });
  }
};

const getCarById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const car = await carServices.getCarById(id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Car retrieved successfully',
      data: car
    });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message
    });
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const carData = req.body;
    const updatedCar = await carServices.updateCarById(id, carData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Car updated successfully',
      data: updatedCar
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message
    });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCar = await carServices.deleteCarById(id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Car deleted successfully',
      data: deletedCar
    });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message
    });
  }
};


export const carControllers = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
}