import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.NODE_MAILER_USERNAME,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

export default transport;
