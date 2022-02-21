import mongoose, { Schema } from "mongoose";
import logging from "../config/logging";
import IUser from "../interfaces/user.interface";

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [5, "Password shouldn't be less than six characters long"],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    title: {
      type: String,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.post<IUser>("save", function () {
  logging.info("Mongo", "New user created");
});

export default mongoose.model<IUser>("User", UserSchema);
