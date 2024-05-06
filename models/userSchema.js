import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
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
    password:{
        type:String,
        required:true,
        minLength:[8,"Password Must Contain at least character"],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"]
    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
        public_id:String,
        url:String
    }

})




userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword,this.password)
}

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES})
}


export const User = mongoose.model("User",userSchema) 
