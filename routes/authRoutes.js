import express from 'express';
import {
  registerController,
  loginController,
} from '../controllers/authCOntroller.js';

//router object
const router = express.Router();

//------------routes---------------
//REGISTER || POST
router.post('/register', registerController);
// LOGIN || POST
router.post('/login', loginController);

//export
export default router;
