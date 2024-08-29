import { TCar } from "./car.interface"
import { Car } from "./car.model"

const createCar = async( papylod: TCar) =>{
  const result = await Car.create(papylod);
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

const updateCarById = async (id: string, updateData: Partial<TCar>) =>{
  const result = await Car.findByIdAndUpdate(
    id,
    {$set: updateData},
    {new: true}
  );
  return result;
}

const deleteCarById = async(id: string) =>{
  const result = await Car.findByIdAndDelete(id);
  return result;
}

export const carServices = {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById,
}
