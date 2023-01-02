import express from "express";
import {
  createproduct,
  deleteproduct,
  getproductById,
  getproducts,
  updateproduct,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", getproducts);
router.get("/:id", getproductById);
router.post("/", createproduct);
router.put("/:id", updateproduct);
router.delete("/:id", deleteproduct);

export default router;
