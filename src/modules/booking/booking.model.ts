import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  date : {
      type : String,
      required : true,
  },
  user: {
      type : Object,
      required : true
  },
  car : {
      type : Object,
      required : true,
  },
  phone : {
      type: String,
      required: true,
  },
  location : {
      type: String,
      required: true,
  },
  paymentMethod : {
      type: String,
      required: true,
  },
  startTime : {
      type : String,
      required : true,
  },
  endTime: {
      type : String,
      default: null
  },
  totalCost: {
      type: Number,
      default: 0
  },
  status: {
      type: String,
      default: 'pending'
  },
  isReturnProcess: {
      type: Boolean,
      default: false
  },
  isPaid: {
      type: Boolean,
      default: false
  },
}, { timestamps : true })

export const Booking = model<TBooking>('Booking', bookingSchema);