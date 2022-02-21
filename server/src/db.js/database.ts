import mongoose from "mongoose";
import config from "../config/config";

async function connectDB() {
  try {
    await mongoose.connect(config.mongo);

    console.log("Database is connected");
  } catch (error) {
    console.error(error);
  }
}

export default connectDB;
