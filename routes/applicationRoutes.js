import express from 'express';
import {
  createApplication,
  getAllUserApplicationController,
  deleteApplication,
  getApplicationStatus,
} from '../controllers/applicationController.js';
import userAuth from '../middelwares/authMiddelware.js';

const router = express.Router();

//routes
// CREATE application || POST
router.post('/create-application', userAuth, createApplication);

//GET application || GET
router.get('/get-application', userAuth, getAllUserApplicationController);

//GET application status || GET
router.get('/application-status', userAuth, getApplicationStatus);

//DELETE application || DELETE
router.delete('/delete-application/:id', userAuth, deleteApplication);


export default router;
