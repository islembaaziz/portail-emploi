//package imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
//security packages
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize';
//files import
import connectDB from './config/db.js';
//routes import
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddelware from './middelwares/errorMiddelware.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import jobsRoutes from './routes/jobsRoute.js';


//Dotenv config
dotenv.config();

// mongodb connection
connectDB();

//rest object
const app = express();

//middelwares
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/role', roleRoutes);
app.use('/api/v1/job', jobsRoutes);


//validation middelware
app.use(errorMiddelware);

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} on port : ${PORT} `
  );
});
