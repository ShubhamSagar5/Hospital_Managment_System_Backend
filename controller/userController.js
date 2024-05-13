import ErrorHandler from "../middleware/ErrorMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { User } from "../models/userSchema.js";
import { generateJsonWebToken } from "../utilis/jwtToken.js";
import cloudinary from "cloudinary"


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

    generateJsonWebToken(user,"User Created Successfully",200,res)

    // return res.status(200).json({
    //     success:true,
    //     data:registerUserDeatils,
    //     message:"User Created Successfully"
    // })
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


export const addNewAdmin = asyncHandler( async(req,res,next) => {

    const {firstName,lastName,email,phone,aadharNumber,dob,gender,password} = req.body

    if(!firstName || !lastName || !email || !phone || !aadharNumber || !dob || !gender || !password){
        return next(new ErrorHandler("Please fill full form"))
    }

    const isRegister = await User.findOne({email}) 
    
    if(isRegister){
        return next(new ErrorHandler(`${isRegister.role} is Register with this email`))
    }

    const admin = await User.create({firstName,lastName,email,phone,aadharNumber,dob,gender,password,role:"Admin"}) 

    return res.status(200).json({
        success:true,
        data:admin,
        message:"New Admin Added Successfully"
    })
})


export const getAllDoctors = asyncHandler(async(req,res,next)=>{
    const doctors = await User.find({role:"Doctor"}) 

    return res.status(200).json({
        success:true,
        doctors: doctors,
        message:"All Doctors Get Successfully"
    })
})

export const getUserDetails = asyncHandler(async(req,res,next)=>{

    const user = req.user 

    return res.status(200).json({
        success:true,
        userDeatails : user,
        message:"User Info Get Successfully "
    })

})

export const logoutAdmin = asyncHandler(async(req,res,next)=>{
    return res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Admin Logout Successfully"
    })
}) 

export const logoutUser = asyncHandler(async(req,res,next)=>{
    return res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"User Logout Successfully "
    })
})


export const addNewDoctor = asyncHandler(async(req,res,next)=>{

    if(!req.files || Object.keys(req.files).length === 0 ){
        return next(new ErrorHandler("Doctor Avatar is Required",400))
    }

    const {docAvatar} = req.files

    const allowedFormat = ["image/png","image/jpeg","image/webp"]

    if(!allowedFormat.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("Image or Avatar File type Not Supported"))
    }

    const {firstName,lastName,email,phone,aadharNumber,dob,gender,password,doctorDepartment} = req.body

    if(!firstName || !lastName || !email || !phone || !aadharNumber || !dob || !gender || !password || !doctorDepartment){
        return next(new ErrorHandler("Please fill full form" ))
    }


    const isRegister = await User.findOne({email})

    if(isRegister){  
        return next(new ErrorHandler("Doctor is alreday register with this email",400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)


    const doctor  = await User.create({firstName,lastName,email,phone,aadharNumber,dob,gender,password,doctorDepartment,role:"Doctor",docAvatar:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url
    }})

    return res.status(200).json({
        success:true,
        message:"New Doctor Added Successfully",
        doctor:doctor
    })

})