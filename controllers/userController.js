import userModel from '../models/userModel.js';

export const updateUserController = async (req, res, next) => {
  const { name, lastName, email, adresse, role } = req.body;
  if (!name || !lastName || !email || !adresse || !role) {
    next('Please Provide All Fields');
  }
  const user = await userModel.findOne({ _id: req.user.userId });
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.adresse = adresse;
  user.role = role;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};

//get user data
export const getUserContoller = async (req, res, next) => {
  try {
    const user = await userModel.findById({ _id: req.body.user.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: 'User Not Found',
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'auth error',
      success: false,
      error: error.message,
    });
  }
};
