import mongoose, { Schema } from "mongoose";
import logging from "../config/logging";
import IComment from "../interfaces/comment.interface";

const CommentSchema: Schema = new Schema(
  {
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
      avatar: String,
    },
    text: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IComment>("Comment", CommentSchema);
