import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job', // Reference to the Job model
      required: true,
    },
    status: {
        type: String,
        enum: ["en attente", "rejeter", "entretien"],
        default: "en attente",
      },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);
