//package imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
//files import
import connectDB from './config/db.js';
//routes import
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js'
import erroMiddelware from './middelwares/errorMiddelware.js'

//Dotenv config
dotenv.config();

// mongodb connection
connectDB();

//rest object
const app = express();

//middelwares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);

//validation middelware
app.use(erroMiddelware);

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(8080, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} on port : ${PORT} `
  );
});
