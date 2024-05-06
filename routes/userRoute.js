import express from 'express'
import { registerPatient } from '../controller/userController.js'


const router = express.Router()

router.post("/register/patient",registerPatient)



export default router