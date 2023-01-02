import express from "express";
import {
  createcategory,
  deletecategory,
  getcategory,
  getcategoryById,
  updatecategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getcategory);
router.get("/:id", getcategoryById);
router.post("/", createcategory);
router.put("/:id", updatecategory);
router.delete("/:id", deletecategory);

export default router;
