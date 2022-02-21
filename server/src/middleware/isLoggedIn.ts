import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import IUser, { AuthRequest, IJwt } from "../interfaces/user.interface";

const isLoggedIn = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "No token found" });

  try {
    const verified = jwt.verify(token, config.jwt_secret) as IJwt;
    req.user = verified.user;
    next();
  } catch (err: any) {
    res.status(400).json({ error: "invalid token" });
  }
};

export default isLoggedIn;
