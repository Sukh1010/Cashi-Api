import mongoose from "mongoose";

const categoryScheama = mongoose.Schema(
  {
    name: {
      type: String,
      text: true,
    },
    icon: String,
    deletedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Category", categoryScheama);
