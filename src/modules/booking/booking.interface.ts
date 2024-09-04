export type TBooking = {
  date : string;
  user : object;
  car : object;
  startTime : string;
  endTime : string;
  totalCost : number;
}

export type TCreateBooking = {
  carId : string,
  date : string,
  startTime : string,
}