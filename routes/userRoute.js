import express from "express";
import {
  createuser,
  deleteuser,
  getuserById,
  getusers,
  loginUser,
  logoutuser,
  recieveForgotMailPassword,
  sendForgotPasswordMail,
  updateuser,
} from "../controllers/userController.js";

import auth from "../controllers/authController.js";

const router = express.Router();
router.get("/logout", logoutuser); //hmesha getbyid to uper dena
router.get("/forgot/password", sendForgotPasswordMail);
router.put("/password/reset", recieveForgotMailPassword);
router.get("/", getusers);
router.get("/:id", getuserById);
router.post("/", auth, createuser);
router.put("/:id", auth, updateuser);
router.delete("/:id", auth, deleteuser);
router.post("/login", loginUser);

export default router;
