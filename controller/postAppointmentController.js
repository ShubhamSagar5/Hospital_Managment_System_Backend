import ErrorHandler from "../middleware/ErrorMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { User } from "../models/userSchema.js";
import {Appointment} from "../models/appointmentSchema.js"

export const postAppointment = asyncHandler(async(req,res,next)=>{

    const {firstName,lastName ,email,phone,aadharNumber,dob,gender,appointment_date,doctor_firstName,doctor_lastName,department,hasVisited,address} = req.body 
     
    if(!firstName || !lastName || !email || !phone || !aadharNumber || !dob || !gender || !appointment_date || !doctor_firstName || !doctor_lastName || !department || !hasVisited || !address){
        return next(new ErrorHandler("Please fill full form",400))
    }

    const isConflict = await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
        doctorDepartment:department
    }) 

    if(isConflict.length === 0){
        return next(new ErrorHandler("Doctor is not found!",400))
    }

    if(isConflict.length > 1){
        return next(new ErrorHandler("Doctors conflict Please contact through email or phone"))
    }

    const patientId = req.user._id 
    const doctorId = isConflict[0]._id

    const sendAppointment = await Appointment.create({
        firstName,lastName ,email,phone,aadharNumber,dob,gender,appointment_date,doctor:{
            firstName:doctor_firstName,
            lastName:doctor_lastName
        },department,hasVisited,doctorId,patientId ,address
    })

    return res.status(200).json({
        succees:true,
        message:"Appointment sent successfully"
    })
})