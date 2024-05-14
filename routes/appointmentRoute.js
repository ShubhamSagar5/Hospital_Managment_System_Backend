import express from 'express'
import { isPatientAuthenticated } from '../middleware/auth.js'
import { postAppointment } from '../controller/postAppointmentController.js'

const router = express.Router() 

router.post('/send',isPatientAuthenticated,postAppointment)


export default router