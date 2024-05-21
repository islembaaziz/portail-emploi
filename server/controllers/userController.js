import userModel from '../models/userModel.js';
import Application from '../models/applicationModel.js';
import upload from '../middelwares/uploadMiddleware.js';

export const updateUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, lastName, email, adresse } = req.body;

    // Check if the required fields are present in the request body
    if (!name || !lastName || !email || !adresse) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const updateData = { name, lastName, email, adresse };

    // Check if a new CV file is uploaded
    if (req.file) {
      updateData.cv = req.file.filename;
    }

    // Update the user information
    const user = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'User Not Found',
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
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


export const getUserContoller = async (req, res, next) => {
  try {
    const userId = req.body.user.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User Not Found',
        success: false,
      });
    }
    user.password = undefined;
    res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        adresse: user.adresse,
        cv: user.cv,
      },
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
