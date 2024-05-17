import userModel from '../models/userModel.js';


export const updateUserController = async (req, res, next) => {
  const { name, lastName, email, adresse } = req.body;
  if (!name || !lastName || !email || !adresse ) {
    return next('Please Provide All Fields');
  }
  try {
    const user = await userModel.findById(req.body.user.userId);
    if (!user) {
      return res.status(404).json({
        message: 'User Not Found',
        success: false,
      });
    }
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.adresse = adresse;

    await user.save({ validateBeforeSave: false });
   
    res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      error: error.message,
    });
  }
};

export const getUserContoller = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.user.userId);
    if (!user) {
      return res.status(404).json({
        message: 'User Not Found',
        success: false,
      });
    }
    user.password = undefined;
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      error: error.message,
    });
  }
};
