import { Message } from "../models/messageSchema.js"

export const sendMessage = async(req,res)=>{
    try {
        const {firstName,lastName,email,phone,message} = req.body 
        
        if(!firstName || !lastName || !email || !phone || !message){
            return res.status(404).json({
                success:false,
                message:"All fileds are required"
            })
        }

        const savedMessage = await Message.create({firstName,lastName,email,phone,message})
        
        return res.status(200).json({
            success:true,
            message:"Message Send Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}