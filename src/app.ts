import express, { Application, Request, Response } from 'express'
import { carRoutes } from './modules/car/car.route';
import { bookingRoutes } from './modules/booking/booking.route';
import notFound from './middleware/notFound';

const app: Application = express();

// parsers
app.use(express.json());

app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("hello!");
});

app.use(notFound)

export default app;