import mongoose from "mongoose";
const connectToMongoDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDb is connected securely", connect?.connection?.host);
  } catch (error) {
    console.error("Error connect to mongoDB", error.message);
    process.exit(1);
  }
};

export default connectToMongoDb;
