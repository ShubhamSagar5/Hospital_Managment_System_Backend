import ErrorHandler from "../middleware/ErrorMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { User } from "../models/userSchema.js";



export const registerPatient = asyncHandler(async(req,res,next)=>{

    const {firstName,lastName,email,phone,aadharNumber,dob,gender,password,role} = req.body


    if(!firstName || !lastName || !email || !phone || !aadharNumber || !dob || !gender || !password || !role){
        return next(new ErrorHandler("Please fill All the Form",400))
    }

    let user =  await User.findOne({$or:[{firstName},{phone},{email}]}) 

    if(user){
        return next(new ErrorHandler("User Alredy Register",400))
    }

    user = await User.create({
        firstName,lastName,email,phone,aadharNumber,dob,gender,password,role
    })

    return res.status(200).json({
        success:true,
        message:"User Created Successfully"
    })
})