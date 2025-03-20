import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    stripeId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
