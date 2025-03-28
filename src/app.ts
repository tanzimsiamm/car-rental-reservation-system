import express, { Application, Request, Response } from 'express'
import { carRoutes } from './modules/car/car.route';
import { bookingRoutes } from './modules/booking/booking.route';
import notFound from './middleware/notFound';
import globalErrorHandler from './middleware/globalErrorHandler';
import { authRoutes } from './modules/auth/auth.route';
import { userRoutes } from './modules/users/user.routes';
import { paymentRoutes } from './modules/payment/payment.routes';
import cors from 'cors'

const app: Application = express();

// parsers
app.use(express.json());

//cors
app.use(cors( {origin: "*"}));

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("hello!");
});

app.use(globalErrorHandler)

app.use(notFound)

export default app;