import express from 'express'
import { login, registerPatient } from '../controller/userController.js'


const router = express.Router()

router.post("/register/patient",registerPatient)
router.post("/login",login)



export default router