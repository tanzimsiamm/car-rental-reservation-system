import { Router } from 'express';
import { bookingControllers } from './booking.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { createBookingValidationSchema } from './booking.validation';

const router = Router();

router.get('/',
    auth('admin'),
    bookingControllers.getAllBookings);

router.post('/',
    auth('user'),
    validateRequest(createBookingValidationSchema),
    bookingControllers.createBooking)

router.get('/my-bookings',
    auth('user'),
    bookingControllers.getUserBookings);

router.patch('/cancel',
    auth('user'),
    bookingControllers.cancelBooking);

router.get('/statistics',
    auth('admin'),
    bookingControllers.getStatistics);

router.get('/:productId',
    auth('user', 'admin'),
    bookingControllers.getSingleBooking);

router.put('/:productId',
    auth('user', 'admin'),
    bookingControllers.updateBooking);

export const bookingRoutes = router;
