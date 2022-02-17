import React from "react";
import LocationItem from "./LocationItem";
import "./LocationItem.scss";
import { ILocation } from "../../services/utils/interfaces/LocationInterface";

interface IProps {
  item: ILocation[];
}

const Location = ({ item }: IProps) => {
  return (
    <>
      <div className="container">
        {item.map((i) => {
          return <LocationItem key={i._id} item={i} />;
        })}
      </div>
    </>
  );
};

export default Location;
