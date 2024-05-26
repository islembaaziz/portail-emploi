import userModel from '../models/userModel.js';


export const registerController = async (req, res, next) => {
  const { name, lastName, email, password, adresse, role } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!lastName) {
      return res.status(400).json({ error: 'Last name is required' });
    }
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password is required and should be at least 6 characters long' });
    }
    if (!adresse) {
      return res.status(400).json({ error: 'Address is required' });
    }
    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already used, please login' });
    }

    const user = await userModel.create({
      name,
      lastName,
      email,
      password,
      adresse,
      role,
    });

    const token = user.createJWT();
    res.status(201).send({
      success: true,
      message: 'User created successfully',
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        adresse: user.adresse,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
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
  if (user.role !== 'Admin' && user.role !== 'RH') {
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
