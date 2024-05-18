import userModel from '../models/userModel.js';

export const registerController = async (req, res, next) => {
  const { name, lastName, email, password, adresse, role } = req.body;
   // Check if the user is an admin
   if (role !== 'Admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

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
  if (!role) {
    next('role is required');
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
    role,
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
      role: user.role,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //Validation
  if (!email || !password) {
    return next('Please Provide All Fields');
  }
  // find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next('Invalid Username or password');
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next('Invalid Username or password');
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: 'Login Successfully',
    user,
    token,
  });
};


export const adminLoginController = async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return next('Please provide all fields');
  }

  // Find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next('Invalid username or password');
  }

  // Check role
  if (user.role !== 'Admin' && user.role !== 'HR') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next('Invalid username or password');
  }

  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: 'Admin login successfully',
    user,
    token,
  });
};
