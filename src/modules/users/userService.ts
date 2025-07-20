import { TUser } from "./user.interface";
import { User } from "./user.model";

const getAllUsers = async () => {
  const result = await User.find({});
  return result;
};

const getSingleUser = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const updateUser = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
