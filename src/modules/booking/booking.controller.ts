import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.service';
import catchAsync from '../../utils/catchAsync';

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

const getSingleBooking = catchAsync (async (req, res) => {
  const result = await bookingServices.getSingleBooking(req.params.bookingId);
  
  sendResponse(res, {
   statusCode: httpStatus.OK,
   success: true,
   message: 'Booking retrieved successfully',
   data: result,
 });
})

const updateBooking = catchAsync (async (req, res) => {
 const result = await bookingServices.updateBooking(req.params.bookingId , req.body);
 
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Booking updated successfully',
  data: result,
});
})

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