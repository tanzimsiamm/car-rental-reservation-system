import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  date: { type: String, required: true },
  user: { type: Object, required: true },
  car: { type: Object, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, default: null },
  totalCost: { type: Number, default: 0 }
}, {
  timestamps: true
});

export const Booking = model<TBooking>('Booking', bookingSchema);