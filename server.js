import express from "express";
import dotenv from "dotenv";
import connectDB from "../backend/config/database.js";
import userRoute from "../backend/routes/userRoute.js";
import productRoute from "../backend/routes/productRoute.js";
import categoryRoute from "../backend/routes/categoryRoute.js";
import transactionRoute from "../backend/routes/transactionRoute.js";
//import cloudinary
import cloudConfig from "./config/cloudConfig.js";
import fileUpload from "express-fileupload";
// first yeh dono
const app = express();
app.use(express.json());
//then yeh dono
dotenv.config();
connectDB();

//call cloudinary
cloudConfig();
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/transactions", transactionRoute);

const port = process.env.PORT;

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${port}`)
);
