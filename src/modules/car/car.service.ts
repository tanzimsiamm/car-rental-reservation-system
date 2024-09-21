import { SortOrder } from "mongoose";
import { Booking } from "../booking/booking.model";
import { TCar, TCarsQuery, TReturnCar } from "./car.interface"
import { Car } from "./car.model"

const createCar = async( payload: TCar) =>{
  const result = await Car.create(payload);
  return result;
};

const getAllCars = async (query: TCarsQuery) => {
  const filter : Record<string ,unknown> = { isDeleted : false};

  //  {
          // location : 'tangail'
          // carType : 'sedun'
          // costRange : '10-35'
          // sortByCost : -1
          // status : 'unavailable'
  //  }

// Add search value to filter if provided
if (query.location) {
filter.$or = [
  { location: { $regex: query.location, $options: 'i' } },
];
}

// Add carType to filter if provided
if (query.carType) {
filter.carType = query.carType;
}

// Add status to filter if provided
if (query.status) {
filter.status = query.status;
}

// Add pricePerHour to filter if provided
if (query.costRange) {
const [startingCost, endingCost] = query.costRange.split('-').map(Number);
filter.pricePerHour = { $gte: startingCost, $lte: endingCost };
//   console.log(filter)
}

// Set sort option based on sortByPrice if provided
const sortOption : {
 pricePerHour?: SortOrder;
} = {};

if (query.sortByCost) {
sortOption.pricePerHour = Number(query.sortByCost) as SortOrder;
}

const cars = await Car.find(filter).sort(sortOption);
return cars;
};


const getCarById = async(id : string) =>{
  const result = await Car.findById(id);
  return result;
}

const updateCarById = async (id: string , payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload ,{new: true });
  return result;
}

const deleteCarById = async ( id: string) => {
  const result = await Car.findByIdAndDelete(id, { isDeleted: true } );
  return result;
}

const returnCar = async (payload : TReturnCar) => {
  // get the booking by id 
  const booking  = await Booking.findById(payload.bookingId)
  
  // calculating totalCost 
  const startTime = booking?.startTime;
  const endTime = booking?.endTime;

  const date1: any = new Date(`1970-01-01T${startTime}:00Z`);
  const date2 : any = new Date(`1970-01-01T${endTime}:00Z`);

  const differenceMilliseconds = date2 - date1;
  const diffHours = differenceMilliseconds / (1000 * 60 * 60);
  let totalCost : number;
  if(booking?.car.pricePerHour){
    totalCost = diffHours * booking.car.pricePerHour
  }else{
    totalCost = 0;
  }

      // update the car status 
      const carId = booking?.car?._id;
      await Car.findByIdAndUpdate(carId, { status: 'available'})

  // update the booking 
 const result =  await Booking.findByIdAndUpdate(payload.bookingId, { 
  totalCost : totalCost, 
  'car.status': 'available',
   status : 'completed',
    isReturnProcess: false
  }, { new : true })

return result;
}


export const carServices = {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById,
  returnCar
}
