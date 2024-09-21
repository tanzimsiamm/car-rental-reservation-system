

import express from 'express';
import { paymentControllers } from './payment.controller';
import auth from '../../middleware/auth';
const router = express.Router();


// create payment intent for user 
router.post('/', paymentControllers.createPaymentIntent )


// save payment history 
router.post('/', auth('user'), paymentControllers.savePaymentInfo )


export const paymentRoutes = router;