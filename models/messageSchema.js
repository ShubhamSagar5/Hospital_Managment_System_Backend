import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name at Least Contain Minimum 3 Letter"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last Name at Least Contain Minimum 3 Letter"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please Provide Valid Email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone Number Must Contain 10 Digit"],
        maxLength:[10,"Phone Number Must Contain 10 Digit"]
    },
    message:{
        type:String,
        minLength:[10,"Message Must Contain at least 10 character"]
    }

})


export const Message = mongoose.model("Message",messageSchema)