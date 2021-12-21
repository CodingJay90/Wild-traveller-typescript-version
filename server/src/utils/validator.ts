import { check } from "express-validator";
import IUser from "../interfaces/user.interface";
import User from "../models/user.model";

export const resgisterValidator = [
  check("password")
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 characters long"),
  check("username").notEmpty().withMessage("Username field cannot be empty"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        User.findOne(
          { email: req.body.email },
          function (err: any, user: IUser) {
            if (err) {
              reject(new Error("Server Error"));
            }
            if (Boolean(user)) {
              reject(new Error("E-mail already in use"));
            }
            resolve(true);
          }
        );
      });
    }),
];
