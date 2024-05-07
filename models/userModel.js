import mongoose from 'mongoose';
import validator from 'validator';

//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is Required'],
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      minLength: [6, 'Password length should be greater than 6 charachter'],
    },
    adresse: {
      type: String,
      required: [true, 'Adresse is Required'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
