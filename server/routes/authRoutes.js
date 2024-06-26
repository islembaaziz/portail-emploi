import express from 'express';
import {
  registerController,
  loginController,
  adminLoginController,
} from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

//ip limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

//router object
const router = express.Router();

// Register route with userAuth middleware || POST
router.post('/register', limiter, registerController);

// Login route || POST
router.post('/login', limiter, loginController);

//Admin Login route || POST

router.post('/admin-login', limiter, adminLoginController);
export default router;
