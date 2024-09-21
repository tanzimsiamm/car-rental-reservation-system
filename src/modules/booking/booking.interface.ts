import { TCar } from "../car/car.interface";

export type TBooking = {
  date : string;
  user : object;
  car : TCar;
  phone : string;
  location: string;
  paymentMethod : string;
  startTime : string;
  endTime : string;
  totalCost : number;
  status : string;
  isReturnProcess : boolean;
  isPaid : boolean;
}
