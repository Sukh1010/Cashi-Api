import { mongoose, Schema } from "mongoose";

const productScheama = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 12,
      required: true,
      // unique: true,
    },
    // category: {
    //   type: Schema.Types.ObjectId,
    //   ref: "category",
    // },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },

    image: {
      type: String,
    },

    description: { type: String, minLength: 5, maxLength: 60 },
    price: String,
    deletedAt: Date,

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timeStamps: true }
  // (new date()).toisostring()
);

export default mongoose.model("Product", productScheama);
