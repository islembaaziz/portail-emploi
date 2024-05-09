import express from 'express';
import {
  registerController,
  loginController,
} from '../controllers/authController.js';
import userAuth from '../middelwares/authMiddelware.js'; // Corrected import path

const router = express.Router();

// Register route with userAuth middleware
router.post('/register', userAuth, registerController);
// Login route
router.post('/login', loginController);

export default router;
