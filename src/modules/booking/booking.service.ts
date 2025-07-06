import mongoose from "mongoose";
import { Booking } from "./booking.model";
import { User } from "../users/user.model";
import { Car } from "../car/car.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";

const createBooking = async (userEmail: string, payload: TBooking) => {
  // get userData by email
  const userData = await User.findOne(
    { email: userEmail },
    { createdAt: 0, updatedAt: 0, password: 0, __v: 0 }
  );

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // Find the car by its ID
  // The `payload.car` on the frontend is an object, but here we need its `_id` to update and reference.
  const carId = payload.car?._id || payload.car; // Handle if payload.car is already just the ID or an object with _id
  const carData = await Car.findById(carId);

  if (!carData) {
    throw new AppError(httpStatus.NOT_FOUND, "Car does not exist");
  }

  if (carData.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, "Car is not found (deleted)");
  }

  if (carData.status === "unavailable") {
    throw new AppError(httpStatus.BAD_REQUEST, "Car is currently unavailable");
  }

  // Update the car status from available to unavailable
  await Car.findByIdAndUpdate(carId, { status: "unavailable" }, { new: true });

  // Construct the booking data with user and car references (ObjectIds)
  const bookingData = {
    ...payload,
    user: userData._id, // Assign the user's ObjectId
    car: carData._id, // Assign the car's ObjectId
  };

  const result = await Booking.create(bookingData);

  // Populate the user and car details in the result for the response
  await result.populate("user");
  await result.populate("car");

  return result;
};

const getAllBookings = async (query: Record<string, unknown>) => {
  const queryObj: Record<string, unknown> = {};

  if (query?.carId && query?.date) {
    queryObj["car._id"] = new mongoose.Types.ObjectId(query.carId as string);
    queryObj.date = query.date;
  }

  const result = await Booking.find(queryObj);
  return result;
};

const getStatistics = async () => {
  // Count total bookings
  const totalBookings = await Booking.countDocuments();

  // Count available cars
  const availableCars = await Car.countDocuments({
    isDeleted: false,
    status: "available",
  });

  // Calculate total revenue from bookings
  const bookings = await Booking.find({}).select("totalCost");
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (booking.totalCost || 0),
    0
  );

  const statistics = {
    totalBookings,
    availableCars,
    totalRevenue,
  };

  return statistics;
};

const getSingleBooking = async (bookingId: string) => {
  const result = await Booking.findById(bookingId);
  return result;
};

const updateBooking = async (bookingId: string, payload: Partial<TBooking>) => {
  const result = await Booking.findByIdAndUpdate(bookingId, payload, {
    new: true,
  });
  return result;
};


const cancelBooking = async (payload: { bookingId: string; carId: string }) => {
  const result = await Booking.findByIdAndUpdate(payload.bookingId, {
    status: "cancelled",
  });

  if (result) {
    await Car.findByIdAndUpdate(payload.carId, { status: "available" });
    return result;
  }
};

const getUserBookings = async (userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) return [];

  const result = await Booking.find({ user: user._id })
    .populate("car", "name color status images pricePerHour isElectric")
    .populate("user", "name email");

  return result;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getUserBookings,
  getStatistics,
  getSingleBooking,
  updateBooking,
  cancelBooking,
};
