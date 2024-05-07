import userModel from '../models/userModel.js';

export const registerController = async (req, res, next) => {
  const { name, lastName, email, password, adresse } = req.body;
  //validate;
  if (!name) {
    next('name is required');
  }
  if (!lastName) {
    next('last name is required');
  }
  if (!email) {
    next(' email is required');
  }
  if (!password) {
    next('password is required and greater than 6 charachter');
  }
  if (!adresse) {
    next('adresse is required');
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next(' Email Already Used Please Login');
  }
  const user = await userModel.create({
    name,
    lastName,
    email,
    password,
    adresse,
  });
  //token
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: 'User Created Successfully',
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      adresse: user.adresse,
    },
    token,
  });
};
