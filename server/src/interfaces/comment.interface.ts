import { Document } from "mongoose";
import { AuthorType } from "./location.interface";

export default interface IComment extends Document {
  text: string;
  avatar: string;
  author: AuthorType;
}
