import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function auth(req, res, next) {
  // console.log("hello--");

  try {
    // console.log("hello--1");

    let token = req.headers.authorization.split(" ")[1];
    // console.log("hello--2");

    if (!token) res.send("you are not authorized");
    let verify = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.send(`Error : ${error.message}`);
  }
}

export default auth;
