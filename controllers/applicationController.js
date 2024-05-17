import applicationModel from '../models/applicationModel.js';

export const createApplication = async (req, res, next) => {
  try {
    const { jobId } = req.body;
    const userId = req.body.user.userId;

    // Check if the user has already applied for the job
    const existingApplication = await applicationModel.findOne({
      jobId,
      createdBy: userId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: 'User has already applied for this job' });
    }

    // If user hasn't applied, create the application
    const application = await applicationModel.create({
      jobId,
      createdBy: userId,
    });
    res.status(201).json({ application });
  } catch (error) {
    next(error);
  }
};

export const getAllUserApplicationController = async (req, res, next) => {
  try {
    const userId = req.body.user.userId;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const userApplications = await applicationModel
      .find({ createdBy: userId })
      .populate('jobId')
      .populate('createdBy')
      .skip(skip)
      .limit(limit);

    const totalApplicationsStatus = await applicationModel.countDocuments({
      createdBy: userId,
    });
    const numOfPages = Math.ceil(totalApplicationsStatus / limit);
    res.status(200).json({ applications: userApplications, totalApplications: totalApplicationsStatus, numOfPages });
  } catch (error) {
    next(error);
  }
};

// Get application status for a specific job
export const getApplicationStatus = async (req, res, next) => {
  try {
    const userId = req.body.user.userId;
    const { jobId } = req.query;

    const application = await applicationModel.findOne({
      jobId,
      createdBy: userId,
    });
    if (application) {
      return res.status(200).json({ hasApplied: true });
    } else {
      return res.status(200).json({ hasApplied: false });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  createApplication,
  getAllUserApplicationController,
  getApplicationStatus,
};
