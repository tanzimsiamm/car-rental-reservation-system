import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDb = async(payload: TCar) =>{
      const  { name, description, color, isElectric, features, pricePerHour } = payload;
      const car = new Car({ name, description, color, isElectric, features, pricePerHour });
      await car.save();
}

export const carServices = {
    createCarIntoDb
}