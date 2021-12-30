import React from "react";
import LocationItem from "./LocationItem";
import "../explore/Explore.css";
import { ILocation } from "../../utils/LocationInterface";

interface IProps {
  item: ILocation[];
}

const Location = ({ item }: IProps) => {
  return (
    <div className="grid">
      {item.map((i) => {
        return <LocationItem key={i._id} item={i} />;
      })}
    </div>
  );
};

export default Location;