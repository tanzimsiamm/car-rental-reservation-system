import { Request, Response } from "express";
import { Car } from "./car.model";

const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find({ isDeleted: false });
    res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: cars,
      })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};