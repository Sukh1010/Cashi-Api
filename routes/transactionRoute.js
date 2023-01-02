import express from "express";
import {
  createtransaction,
  deletetransaction,
  gettransaction,
  gettransactionById,
  updatetransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", gettransaction);
router.get("/:id", gettransactionById);
router.post("/", createtransaction);
router.put("/:id", updatetransaction);
router.delete("/:id", deletetransaction);

export default router;
