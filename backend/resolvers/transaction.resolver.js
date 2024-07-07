import Transaction from "../models/transaction.schema.js";
const transactionResolver = {
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("error in getting create transactions", error);
        throw new Error("server error: " + error.message);
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (error) {
        console.error("error in updating create transactions", error);
        throw new Error("server error: " + error.message);
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (error) {
        console.error("error in deleting  transactions", error);
        throw new Error("server error: " + error.message);
      }
    },
  },
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("user not found");
        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ user: userId });
        return transactions;
      } catch (error) {
        console.error("error in getting user transactions", error);
        throw new Error("server error: " + error.message);
      }
    },
    transaction: async (_, __, { transactionId }) => {
      try {
        if (!context.getUser()) throw new Error("user not found");
        const transaction = await Transaction.findById({ _id: transactionId });
        return transaction;
      } catch (error) {
        console.error("error in getting particular transaction", error);
        throw new Error("server error: " + error.message);
      }
    },
  },
};
export default transactionResolver;
