import { bookingServices } from './booking.service';
import { Request, Response } from 'express';

 const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body)
    const newBooking = await bookingServices.createBooking(req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Bookings retrieved successfully',
      data: newBooking
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

 const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { carId, date } = req.query;
    const bookings = await bookingServices.getAllBookings();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Bookings retrieved successfully',
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

 const updateBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { endTime, totalCost } = req.body;
    const updatedBooking = await bookingServices.updateBooking(bookingId, endTime, totalCost);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Bookings retrieved successfully',
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};
export const bookingControllers = {
  createBooking,
    getAllBookings,
    updateBooking
}