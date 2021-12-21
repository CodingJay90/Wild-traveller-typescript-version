import jwt from "jsonwebtoken";
import config from "../config/config";
import IUser from "../interfaces/user.interface";

export function generateToken(user: IUser) {
  const payload = {
    user: {
      _id: user._id,
      email: user.email,
      username: user.username,
    },
  };

  return jwt.sign(payload, config.jwt_secret, { expiresIn: "24hr" });
}
