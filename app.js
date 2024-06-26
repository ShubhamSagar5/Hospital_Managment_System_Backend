import express from 'express' 
import { config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import dbConnection from "./database/dbConnection.js";
import messageRoute from './routes/messageRoute.js'
import { errorMiddleware } from './middleware/ErrorMiddleware.js'
import userRoute from "./routes/userRoute.js"
import appointmentRoute from "./routes/appointmentRoute.js"


const app = express() 

config({path:"./config/config.env"})

app.use(cors({
    origin:[process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true

}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}))
app.use(cookieParser())




app.use("/api/v1/message",messageRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/appointment",appointmentRoute)



dbConnection()

app.use(errorMiddleware)


export default app