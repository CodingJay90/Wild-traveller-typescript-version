import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { generateToken } from "../utils/signToken";
import IUser, { AuthRequest } from "../interfaces/user.interface";

const createUser = async (req: Request, res: Response) => {
  const { email, username, avatar, password, bio, gender } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt
    .hash(password, salt)
    .catch((err) => console.log(err));

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const newUser = await User.create({
      email,
      avatar,
      username,
      bio,
      gender,
      password: hashedPassword,
    });
    const token = generateToken(newUser);
    res.header("Authorization", token);
    res.status(200).json({ success: true, user: newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (req.body.email === "")
      return res.json({
        success: false,
        message: "Email field cannot be empty",
      });
    if (!foundUser) {
      console.log("User not found");
      return res.json({
        success: false,
        message: "A user with the given email do not exist",
      });
    }
    const validatePassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!validatePassword) {
      return res.json({
        success: false,
        message: "Invalid Credentials. Password does not match",
      });
    }
    const token = generateToken(foundUser);
    res.status(200).json({ success: true, token, user: foundUser });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

const accessUser = async (req: AuthRequest, res: Response) => {
  User.findById(req.user?._id)
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
};

const getSpecificUser = async (req: AuthRequest, res: Response) => {
  try {
    User.findById(req.params.id)
      .then((foundUser) => {
        res.status(200).json({ success: true, foundUser });
      })
      .catch((err) =>
        res.status(400).json({ success: false, message: err.message })
      );
  } catch (error: any) {
    res.status(400).json(error.message);
    console.log(error);
  }
};

const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const updatedUser: IUser = (await User.findByIdAndUpdate(
      { _id: req.user?._id },
      req.body,
      { new: true, useFindAndModify: false }
    )) as IUser;

    generateToken(updatedUser);
    res.status(200).json({ success: true, updatedUser });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    User.findByIdAndDelete({ _id: req.user?._id })
      .then(() => res.status(200).json({ success: true }))
      .catch((err) =>
        res.status(400).json({ success: false, message: err.message })
      );
  } catch (error: any) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

export default {
  createUser,
  loginUser,
  accessUser,
  getSpecificUser,
  updateUser,
  deleteUser,
};
