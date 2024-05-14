import ErrorHandler from "../middleware/ErrorMiddleware.js"
import asyncHandler from "../middleware/asyncHandler.js"
import { Message } from "../models/messageSchema.js"

export const sendMessage = asyncHandler(async(req,res,next)=>{

    const {firstName,lastName,email,phone,message} = req.body 
    
    if(!firstName || !lastName || !email || !phone || !message){
        
        return next(new ErrorHandler("Please fill full form",400))
    }

    const savedMessage = await Message.create({firstName,lastName,email,phone,message})
    
    return res.status(200).json({
        success:true,
        message:"Message Send Successfully"
    })


   
})


export const getAllMessage = asyncHandler(async(req,res,next)=>{
    const message = await Message.find() 

    return res.status(200).json({
        success:true,
        message
    })
})