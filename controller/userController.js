import ErrorHandler from "../middleware/ErrorMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { User } from "../models/userSchema.js";
import { generateJsonWebToken } from "../utilis/jwtToken.js";



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
        firstName,lastName,email,phone,aadharNumber,dob,gender,password,role })


    const registerUserDeatils = await User.findOne({aadharNumber}).select("-password")

    return res.status(200).json({
        success:true,
        data:registerUserDeatils,
        message:"User Created Successfully"
    })
})


export const login = asyncHandler(async(req,res,next)=>{

    const {email,password,confirmPassword,role} = req.body

    if(!email || !password || !confirmPassword){
        return next(new ErrorHandler("Please Fill Full Form",400))
    }

    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and ConfirmPassword Not Match",400))
    }

    const user = await User.findOne({email}).select("+password") 

    if(!user){
        return next(new ErrorHandler("User Not Find Please Register!",400))
    }

    const isPasswordMatch = await user.comparePassword(password) 

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid Password"))
    }

    if(role !== user.role){
        return next(new ErrorHandler("User Not Find With This Role",400))
    }

   generateJsonWebToken(user,"User Logged In Successfully",200,res)

})