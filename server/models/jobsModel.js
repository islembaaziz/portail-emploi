import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      requied: [true, 'Companay name is require'],
    },
    position: {
      type: String,
      required: [true, 'Job Position is required'],
    },
    workType: {
      type: String,
      enum: ['temps-plein', 'temps-partiel', 'stage', 'contaract', 'emplois-distance','emplois-saisonnier'],
      required: true,
    },
    workLocation: {
      type: String,
      required: [true, 'Work location is required'],
    },
    description: {
      type: String,
      default: 'Djeruyiuba',
      required: [true, 'Job description is required'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);
