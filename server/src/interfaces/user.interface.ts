import { Request } from "express";
import { Document } from "mongoose";

export default interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  gender: string;
  bio: string;
  avatar: string;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface IJwt extends AuthRequest {
  iat?: string;
  exp?: string;
}
