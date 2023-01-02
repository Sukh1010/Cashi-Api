import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => console.log("MongoDb is connected"));
}
// a mongoose stuf (mongoose.connect ....) return always a promise
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.error(`Error: ${error.message}`.red.underline.bold);
//     process.exit(1);
//   }
// };

export default connectDB;
