import express from "express";
import {
    createRoleController
} from "../controllers/roleController.js"
import userAuth from "../middelwares/authMiddelware.js";


const router = express.Router();

// CREATE ROLE || POST
router.post("/create-role", userAuth, createRoleController);


export default router;