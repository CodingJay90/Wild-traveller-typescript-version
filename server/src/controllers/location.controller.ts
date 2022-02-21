import { NextFunction, Request, Response } from "express";
import Location from "../models/location.model";
import { AuthRequest } from "../interfaces/user.interface";

const getLocations = async (req: Request, res: Response) => {
  try {
    const foundLocation = await Location.find({})
      .sort({ date: -1 })
      .populate("comment");

    res.status(200).json(foundLocation);
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const createLocation = async (req: AuthRequest, res: Response) => {
  try {
    const author = {
      id: req.user?._id,
      username: req.user?.username,
    };
    const data = {
      location: req.body.location,
      image: req.body.image,
      description: req.body.description,
      author: author,
    };
    const newLocation = await Location.create(data);
    res.status(200).json(newLocation);
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const getSpecificLocation = async (req: Request, res: Response) => {
  try {
    const foundLoaction = await Location.findById(req.params.id).populate(
      "comment"
    );
    res.status(200).json(foundLoaction);
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};
const updateLocation = async (req: Request, res: Response) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({ success: true, updatedLocation });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const deleteLocation = async (req: Request, res: Response) => {
  try {
    Location.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json({ success: true }))
      .catch((err) =>
        res.status(400).json({ success: false, message: err.message })
      );
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

export default {
  getLocations,
  createLocation,
  getSpecificLocation,
  updateLocation,
  deleteLocation,
};
