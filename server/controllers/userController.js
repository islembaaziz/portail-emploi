import userModel from '../models/userModel.js';
import Application from '../models/applicationModel.js';

export const updateUserController = async (req, res, next) => {
  const { name, lastName, email, adresse } = req.body;
  if (!name || !lastName || !email || !adresse) {
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

// ====== GET ALL USERS ======
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find().select('-password'); // Exclude the password field
    res.status(200).json({
      success: true,
      data: users,
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

// ====== DELETE USER ======
export const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: `No user found with ID: ${id}` });
    }
    
    if (req.body.user.role !== 'Admin') {
      return res.status(403).json({ error: 'You are not authorized to delete users' });
    }

    await user.deleteOne();

    // Delete associated applications
    await Application.deleteMany({ createdBy: id });

    res.status(200).json({ message: 'Success, User and associated applications deleted!' });
  } catch (error) {
    next(error);
  }
};

// ====== Update USER using id ======
export const updateUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, lastName, email, adresse, role } = req.body;

    if (!name || !lastName || !email || !adresse || !role) {
      throw new Error('Please provide all fields');
    }

    const user = await userModel.findById(id);

    if (!user) {
      throw new Error(`No user found with ID: ${id}`);
    }

    if (req.body.user.role !== 'Admin') {
      return res
        .status(403)
        .json({ error: 'You are not authorized to update this job' });
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ updatedUser });
  } catch (error) {
    next(error);
  }
};
