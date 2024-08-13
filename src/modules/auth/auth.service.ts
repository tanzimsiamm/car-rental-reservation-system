import { TUser } from "../users/user.interface";
import { User } from "../users/user.model";

const registerUser = async (payload: TUser) => {
    const user = new User(payload);
    await user.save();
    return user;
  };
  
 const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      // Compare passwords and return token if valid
      return user;
    }
    throw new Error('Invalid email or password');
  };

  export const authServices = {
    registerUser,
    loginUser,
  }