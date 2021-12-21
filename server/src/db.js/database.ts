import mongoose from "mongoose";
import config from "../config/config";

async function connectDB() {
  try {
    // const mongooseOptions: ConnectionOptions = {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   // authSource: "admin",
    //   // user: config.MONGO_USER,
    //   // pass: config.MONGO_PASSWORD,
    // };

    await mongoose.connect(config.mongo);

    console.log("Database is connected");
  } catch (error) {
    console.error(error);
  }
}

export default connectDB;
