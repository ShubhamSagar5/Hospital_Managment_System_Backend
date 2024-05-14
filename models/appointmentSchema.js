import mongoose from "mongoose";
import validator from "validator";


const appointmentSchema = new mongoose.Schema({
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
    aadharNumber:{
        type:String,
        required:true,
        minLength:[12,"Aadharcard Must Contain Exact 12 Digit"],
        maxLength:[12,"Aadharcard Must Contain Exact 12 Digit"]
    },
    dob:{
        type:Date,
        required:[true,"DOB is required"],
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    },
    appointment_date:{
        type:String,
        required:true
    },
    doctor:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    department:{
        type:String,
        required:true
    },
    hasVisited:{
        type:Boolean,
        default:false
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
    
        required:true
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending",
        required:true
    }

})


export const Appointment = mongoose.model("Appointment",appointmentSchema)