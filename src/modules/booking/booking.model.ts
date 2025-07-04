// backend/src/modules/booking/booking.model.ts
import { model, Schema, Types } from "mongoose"; // Import Types
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId, // Referencing the User model
      ref: "User", // This should match the model name 'User'
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId, // Referencing the Car model
      ref: "Car", // Assuming your car model is named 'Car'
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "pending",
    },
    isReturnProcess: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Booking = model<TBooking>("Booking", bookingSchema);