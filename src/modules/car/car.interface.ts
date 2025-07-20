export type TCar = {
  _id?: string;
  name: string;
  carType: string;
  location: string;
  description: string;
  color: string;
  images: string[];
  isElectric: boolean;
  status: string;
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
};

export type TReturnCar = {
  bookingId: string;
  endTime?: string;
};

export type TCarsQuery = {
  carType?: string;
  costRange?: string;
  sortByCost?: string;
  location?: string;
  status?: string;
};
