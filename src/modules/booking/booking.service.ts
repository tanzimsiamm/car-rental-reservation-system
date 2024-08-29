import mongoose from 'mongoose';
import { Car } from '../car/car.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (bookingData: TBooking): Promise<TBooking> => {
  const carId = new mongoose.Types.ObjectId(bookingData.car);
  const userId = new mongoose.Types.ObjectId(bookingData.user);
  const car = await Car.findById(bookingData.car)
  if (!car) {
    throw new Error('Car is not available');
}

  // Create booking
  const booking = new Booking({
    ...bookingData,
    car: carId,
    user: userId
  });
  await booking.save();

  return booking;
};

const getAllBookings = async () => {
  const bookings = await Booking.find().populate('user').populate('car');
  return bookings;
};

 const updateBooking = async (bookingId: string, endTime: string, totalCost: number) => {
  const result = await Booking.findByIdAndUpdate(bookingId, { endTime, totalCost }, { new: true });
  return result;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  updateBooking
}