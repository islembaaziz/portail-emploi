import express from 'express'
import { registerController } from '../controllers/authCOntroller.js';

//router object
const router = express.Router()

//routes
router.post('/register', registerController )

//export
export default router