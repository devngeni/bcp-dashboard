// import "dotenv/config";
import mongoose from "mongoose";
import { Environment } from "../../../constants/environment";

//const dbUrl = Environment._db__;
const dbUrl = process.env.NEXT_PUBLIC_MONGO_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl as string);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
