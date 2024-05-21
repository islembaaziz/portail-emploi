import express from 'express';
import {
  createApplication,
  getAllApplicationsController,
  deleteApplication,
  getApplicationStatus,
  updateApplicationController,
  getAllUserApplicationController,
} from '../controllers/applicationController.js';
import userAuth from '../middelwares/authMiddelware.js';

const router = express.Router();

//routes
// CREATE application || POST
router.post('/create-application', userAuth, createApplication);

//GET all application || GET
router.get('/get-application', userAuth, getAllApplicationsController);
//GET all user application || GET
router.get('/get-user-application', userAuth, getAllUserApplicationController);

//GET application status || GET
router.get('/application-status', userAuth, getApplicationStatus);

//DELETE application || DELETE
router.delete('/delete-application/:id', userAuth, deleteApplication);

//UPDATE application || PATCH
router.patch('/update-application/:id', userAuth, updateApplicationController)


export default router;
