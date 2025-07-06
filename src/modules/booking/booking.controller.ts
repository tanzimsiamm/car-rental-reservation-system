import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.service';
import catchAsync from '../../utils/catchAsync';
import { Booking } from './booking.model';

const createBooking = catchAsync (async (req, res) => {
  // get user email from token decoded data 
  const userEmail = req?.user?.email;

 const result = await bookingServices.createBooking(userEmail , req.body);
 
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Car booked successfully',
  data: result,
});
})

const getAllBookings = catchAsync (async (req, res) => {
  const result = await bookingServices.getAllBookings(req.query);
  
  sendResponse(res, {
   statusCode: httpStatus.OK,
   success: true,
   message: 'Bookings retrieved successfully',
   data: result,
 });
});

const getStatistics = catchAsync (async (req, res) => {
  const result = await bookingServices.getStatistics();
  
  sendResponse(res, {
   statusCode: httpStatus.OK,
   success: true,
   message: 'STatistics retrieved successfully',
   data: result,
 });
});

// GET /api/bookings/:bookingId
export const getSingleBooking = catchAsync (async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId)
    .populate("user", "-password") // exclude password field
    .populate("car");

  if (!booking) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Booking not found",
      data: null,
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking fetched successfully",
    data: booking,
  });
});

// PUT /api/bookings/:bookingId
export const updateBooking = catchAsync (async (req, res) => {
  const { bookingId } = req.params;
  const payload = req.body;

  const updatedBooking = await Booking.findByIdAndUpdate(bookingId, payload, {
    new: true,
  });

  if (!updatedBooking) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Booking not found or update failed",
      data: null,
    });
  }

 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Booking cancelled successfully',
  data: updatedBooking,
});
});


const cancelBooking = catchAsync (async (req, res) => {
 const result = await bookingServices.cancelBooking(req.body);
 
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Booking cancelled successfully',
  data: result,
});
})


const getUserBookings = catchAsync (async (req, res) => {
  // get user email from token decoded data 
  const userEmail = req?.user?.email;

   const result = await bookingServices.getUserBookings(userEmail);
   
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Bookings retrieved successfully',
    data: result,
  });
})


export const bookingControllers = {
  createBooking,
    getAllBookings,
    getUserBookings,
    getStatistics,
    getSingleBooking,
    cancelBooking,
    updateBooking
}