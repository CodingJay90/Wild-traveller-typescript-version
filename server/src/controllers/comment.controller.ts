import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import Comment from "../models/comment.model";
import Location from "../models/location.model";
import IUser, { AuthRequest } from "../interfaces/user.interface";
import IComment from "../interfaces/comment.interface";
import ILocation from "../interfaces/location.interface";

const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const foundLocation = (await Location.findById({
      _id: req.params.id,
    })) as ILocation;
    const comment = (await Comment.create(req.body)) as IComment;
    console.log(req.body);
    const user = (await User.findById(req.user?._id)) as IUser;
    comment.author.id = user?._id;
    comment.author.username = req.user?.username;
    comment.avatar = user?.avatar;
    await comment.save();
    foundLocation.comment.push(comment);
    await foundLocation.save();
    res.status(200).json({ success: true, comment, user });
  } catch (err: any) {
    res.status(400).json(err.message);
    console.log(err);
  }
};

const getSpecificComment = async (req: Request, res: Response) => {
  try {
    const foundComment = await Comment.findById(req.params.comment_id);
    res.status(200).json({ success: true, foundComment });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
    console.log(err);
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.comment_id,
      req.body,
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({ success: true, updatedComment });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
    console.log(error);
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    Comment.findByIdAndRemove(req.params.comment_id, {
      useFindAndModify: false,
    })
      .then(() => res.json({ success: true }))
      .catch((err) =>
        res.status(400).json({ success: false, message: err.message })
      );
  } catch (error: any) {
    res.status(400).json(error.message);
    console.log(error);
  }
};

export default {
  createComment,
  getSpecificComment,
  updateComment,
  deleteComment,
};
