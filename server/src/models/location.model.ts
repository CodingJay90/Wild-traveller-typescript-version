import mongoose, { Schema } from "mongoose";
import logging from "../config/logging";
import ILocation from "../interfaces/location.interface";

const LocationSchema: Schema = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILocation>("Location", LocationSchema);
