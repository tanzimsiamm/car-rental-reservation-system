import { USER_ROLE } from "./user.constant";

export type TUser = {
    name: string;
    email: string;
    role: 'user' | 'admin';
    password: string;
    phone: string;
    address: string;
};

export type TuserRole = keyof typeof USER_ROLE;
