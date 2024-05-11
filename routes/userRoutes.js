import express from "express";
import { updateUserController, getUserContoller } from "../controllers/userController.js";
import userAuth from "../middelwares/authMiddelware.js";

//router object
const router = express.Router();

//routes
// GET USER DATA || POST
router.post('/getUser', userAuth, getUserContoller);

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

export default router;