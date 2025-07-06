import { SortOrder } from "mongoose";
import { Booking } from "../booking/booking.model";
import { TCar, TCarsQuery, TReturnCar } from "./car.interface";
import { Car } from "./car.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCar = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCars = async (query: TCarsQuery) => {
  const filter: Record<string, unknown> = { isDeleted: false };

  {
    location: "tangail";
    carType: "sedun";
    costRange: "10-35";
    sortByCost: -1;
    status: "unavailable";
  }

  // Add search value to filter if provided
  if (query.location) {
    filter.$or = [{ location: { $regex: query.location, $options: "i" } }];
  }

  // Add carType to filter if provided
  if (query.carType) {
    filter.carType = query.carType;
  }

  // Add status to filter if provided
  if (query.status) {
    filter.status = query.status;
  }

  // Add pricePerHour to filter if provided
  if (query.costRange) {
    const [startingCost, endingCost] = query.costRange.split("-").map(Number);
    filter.pricePerHour = { $gte: startingCost, $lte: endingCost };
    //   console.log(filter)
  }

  // Set sort option based on sortByPrice if provided
  const sortOption: {
    pricePerHour?: SortOrder;
  } = {};

  if (query.sortByCost) {
    sortOption.pricePerHour = Number(query.sortByCost) as SortOrder;
  }

  const cars = await Car.find(filter).sort(sortOption);
  return cars;
};

const getCarById = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

const updateCarById = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCarById = async (id: string) => {
  const result = await Car.findByIdAndDelete(id, { isDeleted: true });
  return result;
};

export const returnCar = async (payload: TReturnCar) => {
  const booking = await Booking.findById(payload.bookingId).populate<{ car: TCar }>("car");

  if (!booking) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid booking ID");
  }

  const startTime = booking.startTime;
  const endTime = payload.endTime || booking.endTime;

  if (!startTime || !endTime) {
    throw new AppError(httpStatus.BAD_REQUEST, "Missing start or end time");
  }

  // Parse time correctly (24-hour format)
  const start = new Date(`1970-01-01T${startTime}:00Z`);
  const end = new Date(`1970-01-01T${endTime}:00Z`);

  const diffMs = end.getTime() - start.getTime();
  if (isNaN(diffMs) || diffMs <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to return car. Invalid data or time range."
    );
  }

  const hours = diffMs / (1000 * 60 * 60);
  const rate = booking.car?.pricePerHour;

  if (!rate) {
    throw new AppError(httpStatus.BAD_REQUEST, "Car pricing info missing");
  }

  const totalCost = hours * rate;

  await Car.findByIdAndUpdate(booking.car._id, { status: "available" });

  const result = await Booking.findByIdAndUpdate(
    payload.bookingId,
    {
      totalCost,
      endTime,
      status: "completed",
      isReturnProcess: false,
    },
    { new: true }
  );

  return result;
};

export const carServices = {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById,
  returnCar,
};
