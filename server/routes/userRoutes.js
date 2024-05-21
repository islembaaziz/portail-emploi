import express from 'express';
import {
  updateUserController,
  getUserContoller,
  getAllUsers,
  deleteUserController,
  updateUserId,
} from '../../server/controllers/userController.js';
import userAuth from '../../server/middelwares/authMiddelware.js';
import upload from '../../server/middelwares/uploadMiddleware.js';


//router object
const router = express.Router();

//routes
// GET USER DATA || POST
router.post('/getUser', userAuth, getUserContoller);

// UPDATE USER || PUT
router.put('/update-user/:userId', userAuth, upload.single('cv'), updateUserController);

// GET ALL USERS || GET
router.get('/get-users', userAuth, getAllUsers);

//DELET USER || DELETE
router.delete('/delete-user/:id', userAuth, deleteUserController);

//update user using id
router.patch('/updateUser/:id', userAuth, updateUserId);
export default router;
