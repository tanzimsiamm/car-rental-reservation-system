import { Types } from "mongoose"; // Import Types

export type TBooking = {
  date: string;
  user: Types.ObjectId; // Change from object to Types.ObjectId for ref
  car: Types.ObjectId; // Change from TCar to Types.ObjectId for ref
  phone: string;
  location: string;
  paymentMethod: string;
  startTime: string;
  endTime?: string | null; // Use `| null` for clarity if it can be null
  totalCost?: number;
  status?: string;
  isReturnProcess?: boolean;
  isPaid?: boolean;
};