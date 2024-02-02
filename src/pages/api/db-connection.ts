// import "dotenv/config";
import mongoose from "mongoose";
import { Environment } from "../../../constants/environment";

//const dbUrl = Environment._db__;
const dbUrl =
  "mongodb+srv://bettercallpaul:sQOkWzfk5e6FTuRW@bcp-dev.el8ezcc.mongodb.net/bcb-dev";

export const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl as string);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
