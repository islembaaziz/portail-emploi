import express from "express";
import {createapplication, getAllUserApplicationController} from "../controllers/applicationController.js"
import userAuth from "../middelwares/authMiddelware.js";


const router = express.Router();

//routes
// CREATE application || POST
router.post('/create-application', userAuth, createapplication);

//GET application || GET
router.get("/get-application", userAuth, getAllUserApplicationController);
export default router;