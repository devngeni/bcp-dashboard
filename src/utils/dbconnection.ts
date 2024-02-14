// import "dotenv/config";
import mongoose from "mongoose";

//const dbUrl = Environment._db__;
const dbUrl = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl as string);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
