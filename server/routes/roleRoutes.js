import express from 'express';
import {
  createRoleController,
  getAllRoles,
} from '../controllers/roleController.js';
import userAuth from '../middelwares/authMiddelware.js';

const router = express.Router();

// CREATE ROLE || POST
router.post('/create-role', userAuth, createRoleController);
// GET ALL ROLE || GET
router.get('/get-role', userAuth, getAllRoles);

export default router;
