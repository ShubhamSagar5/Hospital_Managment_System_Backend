import express from 'express'
import { isAdminAuthenticated, isPatientAuthenticated } from '../middleware/auth.js'
import { deleteAPpointment, getAllAppointment, postAppointment, updateAppointmentStatus } from '../controller/postAppointmentController.js'

const router = express.Router() 

router.post('/send',isPatientAuthenticated,postAppointment)
router.get('/getAll',isAdminAuthenticated,getAllAppointment)
router.put('/update/:id',isAdminAuthenticated,updateAppointmentStatus)
router.delete('/delete/:id',isAdminAuthenticated,deleteAPpointment)

export default router