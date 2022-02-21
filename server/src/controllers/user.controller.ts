import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import User from "../models/user.model";
import Location from "../models/location.model";
import Comment from "../models/comment.model";
import { generateToken } from "../utils/signToken";
import IUser, { AuthRequest } from "../interfaces/user.interface";
const imagesArray = [
  "https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4.png",
  "https://media.istockphoto.com/vectors/anonymous-gender-neutral-face-avatar-incognito-head-silhouette-vector-id1334533935?b=1&k=20&m=1334533935&s=170667a&w=0&h=dzIHGt2seqmK-AgONwY52LkjHiv651roemNHDgoBaHI=",
  "https://e7.pngegg.com/pngimages/529/6/png-clipart-computer-icons-airplane-smiley-person-icon-yellow.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYBgkmyXnekpz06gd_1dgDuB_fXCwntWbsUzWWpk7rQd_1wcqFdZyVgv6p-c2_NQtIxPM&usqp=CAU",
  "https://pngimage.net/wp-content/uploads/2019/05/human-avatar-png-4.png",
];

function createErrorResponse(...msg: any): string[] {
  return msg;
}

const createUser = async (req: Request, res: Response) => {
  let { email, username, avatar, password, bio, title } = req.body;
  if (!avatar)
    avatar = imagesArray[Math.floor(Math.random() * imagesArray.length)];
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt).catch((err) => {
    throw err;
  });

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err: string[] = [];
      errors.array().map((i) => err.push(i.msg));
      return res.status(400).json({
        success: false,
        errorMessages: err,
      });
    }

    const newUser = await User.create({
      email,
      avatar,
      username,
      bio,
      title,
      password: hashedPassword,
    });
    const token = generateToken(newUser);
    res.header("Authorization", token);
    res.status(200).json({ success: true, user: newUser, token });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

function aaa(...args: any) {
  return args;
}
const loginUser = async (req: Request, res: Response) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (req.body.email === "")
      return res.status(400).json({
        success: false,
        errorMessages: createErrorResponse("Email field cannot be empty"),
      });
    if (!foundUser) {
      return res.status(400).json({
        success: false,
        errorMessages: createErrorResponse(
          "A user with the given email does not exist"
        ),
      });
    }
    const validatePassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!validatePassword) {
      return res.status(400).json({
        success: false,
        errorMessages: createErrorResponse(
          "Invalid Credentials. Password does not match"
        ),
      });
    }
    const token = generateToken(foundUser);
    res.status(200).json({ success: true, token, user: foundUser });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const accessUser = async (req: AuthRequest, res: Response) => {
  User.findById(req.user?._id)
    .then((user) => res.json(user))
    .catch((err) => {
      throw err;
    });
};

const getSpecificUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    const locations = await Location.find({ ["author.id"]: req.params.id });
    const comments = await Comment.find({ ["author.id"]: req.params.id });
    res.status(200).json({
      success: true,
      user: user,
      comments: comments.length,
      locations: locations.length,
    });
  } catch (error: any) {
    res.status(400).json(error.message);
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
