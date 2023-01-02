import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please enter you user name"],
  },
  email: {
    type: String,
    unique: [true, "already exist"],
    // validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: { type: String, minLength: 4, maxLength: 500, required: true },
  fullname: {
    type: String,
    minLength: 3,
    maxLength: 12,
    required: true,
    unique: true,
  },
  role: { type: String, required: true, enum: ["ADMIN", "CASHIER"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // lastActive: Date,
  // deletedAt: Date,
});

export default mongoose.model("User", userSchema);
