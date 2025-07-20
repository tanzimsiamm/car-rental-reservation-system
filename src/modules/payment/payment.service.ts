import { TPayment } from "./payment.interface";
import { Payment } from "./payment.model";

const savePayment = async (payload: TPayment) => {
  const result = await Payment.create(payload);
  return result;
};

export const paymentServices = {
  savePayment,
};
