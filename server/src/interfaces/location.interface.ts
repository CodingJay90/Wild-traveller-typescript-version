import { Document } from "mongoose";
import IComment from "./comment.interface";

export type AuthorType = {
  id: string;
  author: string;
  username?: string;
  avatar?: string;
};

export default interface ILocation extends Document {
  location: string;
  image: string;
  description: string;
  createdAt: string;
  author: AuthorType;
  comment: [string | IComment];
}
