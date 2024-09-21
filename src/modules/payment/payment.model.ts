import { Schema, model } from "mongoose";
import { TPayment } from "./payment.interface";


const PaymentSchema = new Schema({
    email : {
        type : String,
        required: true
    },
    cost: {
        type : Number,
        required: true
    },
    transactionId : {
        type : String,
        required: true
    },
    date : {
        type : String,
        required: true
    },
    bookingId : {
        type : String,
        required: true
    }
}, {
    timestamps : true
})

export const Payment = model <TPayment> ('Payment', PaymentSchema);