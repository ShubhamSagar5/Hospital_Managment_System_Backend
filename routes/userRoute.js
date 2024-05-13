import express from 'express'
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutUser, registerPatient } from '../controller/userController.js'
import { isAdminAuthenticated,isPatientAuthenticated } from '../middleware/auth.js'


const router = express.Router()

router.post("/register/patient",registerPatient)
router.post("/login",login)
router.post("/admin/addAdmin",isAdminAuthenticated,addNewAdmin)
router.get("/doctors",getAllDoctors)
router.get("/admin/me",isAdminAuthenticated,getUserDetails)
router.get("/patient/me",isPatientAuthenticated,getUserDetails)
router.get("/admin/logout",isAdminAuthenticated,logoutAdmin)
router.get("/patient/logout",isPatientAuthenticated,logoutUser)
router.post("/doctor/addDoctor",isAdminAuthenticated,addNewDoctor)

export default router