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

export const getAllApplicationsController = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get all applications with pagination
    const applications = await applicationModel
      .find()
      .populate('jobId')
      .populate('createdBy')
      .skip(skip)
      .limit(limit);

    // Get the total number of applications
    const totalApplicationsStatus = await applicationModel.countDocuments();
    const numOfPages = Math.ceil(totalApplicationsStatus / limit);

    res
      .status(200)
      .json({
        applications,
        totalApplications: totalApplicationsStatus,
        numOfPages,
      });
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

// ======= DELETE application ===========
export const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await applicationModel.findById(id);
    if (!application) {
      throw new Error(`No application found with ID: ${id}`);
    }
    if (
      req.body.user.role !== 'Admin' &&
      req.body.user.role !== 'RH' &&
      userId !== application.createdBy.toString()
    ) {
      return res
        .status(403)
        .json({ error: 'You are not authorized to delete this application' });
    }
    await application.deleteOne();
    res.status(200).json({ message: 'Success, Application Deleted!' });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { user } = req.body;

    // Check if the user is authorized to update the application
    if (req.body.user.role !== 'Admin' && req.body.user.role !== 'RH') {
      return res
        .status(403)
        .json({ error: 'You are not authorized to update this application' });
    }

    // Validate status
    const validStatuses = ['en attente', 'rejeter', 'entretien'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Find and update the application
    const application = await applicationModel.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ error: `No application found with ID: ${id}` });
    }

    application.status = status;
    await application.save();

    res
      .status(200)
      .json({
        message: 'Application status updated successfully',
        application,
      });
  } catch (error) {
    next(error);
  }
};
export default {
  createApplication,
  getAllApplicationsController,
  getApplicationStatus,
  deleteApplication,
  updateApplicationController,
};
