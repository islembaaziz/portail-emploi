import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'role name is required'],
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Role', roleSchema);
