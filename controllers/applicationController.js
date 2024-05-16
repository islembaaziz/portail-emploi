import applicationModel from '../models/applicationModel.js';


export const createapplication = async (req, res, next) => {
  try {
    const { jobId } = req.body;
    const userId = req.body.user.userId;

    // Check if the user has already applied for the job
    const existingApplication = await applicationModel.findOne({ jobId, createdBy: userId });
    if (existingApplication) {
      return res.status(400).json({ message: "User has already applied for this job" });
    }

    // If user hasn't applied, create the application
    const application = await applicationModel.create({ jobId, createdBy: userId });
    res.status(201).json({ application });
  } catch (error) {
    next(error);
  }
};
export const getAllUserApplicationController = async(req, res,next) => {
  try {
    const userId = req.body.user.userId;
    const userApplications = await applicationModel.find({ createdBy: userId }).populate('jobId').populate('createdBy');
    res.status(200).json({ applications: userApplications });
  } catch (error) {
    next(error);
  }
}
export default createapplication;