import mongoose from 'mongoose' 

const  databaseName = "/database"

const dbConnection  = () => {
   mongoose.connect(process.env.MONGODB_URI,{
    dbName:"Hospital_Managment_System"
   }).then(()=>{
    console.log("database connect successfully")
   }).catch((error)=>{
        console.log("error occur while connecting to database")
   })
}


export default dbConnection