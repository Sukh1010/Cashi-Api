import { Schema } from "mongoose";
import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "TransactionItem",
    },
  ],
  products: Array,
  subtotal: Number,
  discount: Number,
  tax: Number,
  grandtotal: Number,
});

export default mongoose.model("Transaction", transactionSchema);
