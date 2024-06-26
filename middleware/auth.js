import { User } from "../models/userSchema.js";
import ErrorHandler from "./ErrorMiddleware.js";
import asyncHandler from "./asyncHandler.js";
import jwt from 'jsonwebtoken'

export const isAdminAuthenticated = asyncHandler(async(req,res,next)=>{
    const token = req.cookies.adminToken 

    if(!token){
        return next(new ErrorHandler("Admin Not Authenticated !",400 ))
    }


    const decode =  jwt.verify(token,process.env.JWT_SECRET_KEY) 

    req.user = await User.findById(decode.id) 

    if(req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`,403))
    }

    next()
})


export const  isPatientAuthenticated = asyncHandler(async(req,res,next)=>{
    
    const token = req.cookies.patientToken 
    
    if(!token){
        return next(new ErrorHandler("Patient is Not Authenticated !",400))

    }

    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decode.id) 

    if(req.user.role !== "Patient"){
        return next(new ErrorHandler(`${req.user.role} id not authorized for this role`))
    }

    next()
})