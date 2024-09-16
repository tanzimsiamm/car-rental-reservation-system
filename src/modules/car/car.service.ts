import { Booking } from "../booking/booking.model";
import { TCar, TReturnCar } from "./car.interface"
import { Car } from "./car.model"

const createCar = async( payload: TCar) =>{
  const result = await Car.create(payload);
  return result;
};

const getAllCars = async() =>{
  const result = await Car.find();
  return result
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
  const booking = await Booking.findById(payload.bookingId)
  
  // calculating totalCost 
  const startTime = booking?.startTime;
  const endTime = payload?.endTime;

  let date1: any = new Date(`1970-01-01T${startTime}:00Z`);
  let date2 : any = new Date(`1970-01-01T${endTime}:00Z`);

  let differenceMilliseconds = date2 - date1;
  let diffHours = differenceMilliseconds / (1000 * 60 * 60);
  const totalCost = diffHours * booking?.car?.pricePerHour;

      // update the car status 
      const carId = booking?.car?._id;
      await Car.findByIdAndUpdate(carId, { status: 'available'})

  // update the booking 
 const result =  await Booking.findByIdAndUpdate(payload.bookingId, { 
      endTime, totalCost , 'car.status': 'available'
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
