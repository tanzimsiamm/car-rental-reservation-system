import { Router } from 'express';
import { bookingControllers } from './booking.controller';

const router = Router();

router.post('/', bookingControllers.createBooking);
router.get('/', bookingControllers.getAllBookings);
router.put('/:bookingId', bookingControllers.updateBooking);

export const bookingRoutes = router;
