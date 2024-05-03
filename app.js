import express from 'express' 
import { config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import dbConnection from "./database/dbConnection.js";
import messageRoute from './routes/messageRoute.js'


const app = express() 

config({path:"./config/config.env"})

app.use(cors({
    origin:[process.env.FRONTED_URL,process.env.DASHBOARD_URL],
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

dbConnection()


app.use("/api/v1/message",messageRoute)

export default app