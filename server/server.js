//package imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import 'express-async-errors';
//security packages
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
//files import
import connectDB from './config/db.js';
//routes import
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddelware from '../server/middelwares/errorMiddelware.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import jobsRoutes from './routes/jobsRoute.js';
import applicationRoutes from './routes/applicationRoutes.js';

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
// Get the directory name in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//static folder 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/role', roleRoutes);
app.use('/api/v1/job', jobsRoutes);
app.use('/api/v1/apply', applicationRoutes);

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
