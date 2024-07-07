import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
    enum: ["cash", "card"],
  },
  category: {
    type: String,
    required: true,
    enum: ["saving", "expense", "investment"],
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: Number,
    default: "Unknown",
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
