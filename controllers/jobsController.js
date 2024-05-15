import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

// ====== CREATE JOB ======
export const createJobController = async (req, res, next) => {
  try {
    const { company, position } = req.body;
    if (!company || !position) {
      throw new Error("Please provide all fields");
    }
    req.body.createdBy = req.body.user.userId;
    const job = await jobsModel.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    next(error);
  }
};

// ======= GET JOBS ===========
export const getAllJobsController = async (req, res, next) => {
  try {
    const { status, workType, search, sort } = req.query;

    const queryObject = {};

    if (status && status !== "all") {
      queryObject.status = status;
    }
    if (workType && workType !== "all") {
      queryObject.workType = workType;
    }
    if (search) {
      queryObject.position = { $regex: search, $options: "i" };
    }

    let queryResult = jobsModel.find(queryObject);

    if (sort === "latest") {
      queryResult = queryResult.sort("-createdAt");
    } else if (sort === "oldest") {
      queryResult = queryResult.sort("createdAt");
    } else if (sort === "a-z") {
      queryResult = queryResult.sort("position");
    } else if (sort === "z-a") {
      queryResult = queryResult.sort("-position");
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    queryResult = queryResult.skip(skip).limit(limit);

    const totalJobsStatus = await jobsModel.countDocuments(queryObject);
    const numOfPage = Math.ceil(totalJobsStatus / limit);

    const jobs = await queryResult;

    res.status(200).json({
      totalJobsStatus,
      jobs,
      numOfPage,
    });
  } catch (error) {
    next(error);
  }
};


// ======= UPDATE JOBS ===========
export const updateJobController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company, position } = req.body;

    if (!company || !position) {
      throw new Error("Please provide all fields");
    }

    const job = await jobsModel.findById(id);

    if (!job) {
      throw new Error(`No job found with ID: ${id}`);
    }

    if (req.body.user.userId !== job.createdBy.toString()) {
      throw new Error("You are not authorized to update this job");
    }

    const updatedJob = await jobsModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ updatedJob });
  } catch (error) {
    next(error);
  }
};

// ======= DELETE JOBS ===========
export const deleteJobController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await jobsModel.findById(id);

    if (!job) {
      throw new Error(`No job found with ID: ${id}`);
    }

    if (req.body.user.userId !== job.createdBy.toString()) {
      throw new Error("You are not authorized to delete this job");
    }

    await job.deleteOne();
    
    res.status(200).json({ message: "Success, Job Deleted!" });
  } catch (error) {
    next(error);
  }
};

// =======  JOBS STATS & FILTERS ===========
export const jobStatsController = async (req, res, next) => {
  try {
    if (!req.body.user || !req.body.user.userId) {
      throw new Error("User not authenticated");
    }

    const stats = await jobsModel.aggregate([
      {
        $match: {
          createdBy: mongoose.Types.ObjectId(req.body.user.userId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const defaultStats = {
      pending: 0,
      reject: 0,
      interview: 0,
    };

    stats.forEach((stat) => {
      if (stat._id === "pending") {
        defaultStats.pending = stat.count;
      } else if (stat._id === "reject") {
        defaultStats.reject = stat.count;
      } else if (stat._id === "interview") {
        defaultStats.interview = stat.count;
      }
    });

    let monthlyApplication = await jobsModel.aggregate([
      {
        $match: {
          createdBy: mongoose.Types.ObjectId(req.body.user.userId),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    monthlyApplication = monthlyApplication.map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    }).reverse();

    res.status(200).json({ totalJobsStatus: stats.length, defaultStats, monthlyApplication });
  } catch (error) {
    next(error);
  }
};
