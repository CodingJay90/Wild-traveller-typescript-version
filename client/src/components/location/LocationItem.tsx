import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import "./LocationItem.scss";

import { ILocation } from "../../services/utils/interfaces/LocationInterface";

export interface LocationProps {
  item: ILocation;
}

const LocationItem: FC<LocationProps> = ({ item }) => {
  const { location, image, description, _id } = item;
  console.log(item);
  return (
    <>
      {/* <div className="card">
        <div className="card__header">
          <img src={image} alt={image} />
        </div>
        <div className="card__body"></div>
      </div> */}
    </>
    // <div className="LocationItem">
    //   <div className="container">
    //     <div className="item">
    //       <div className="image">
    //         <img src={image} alt={image} width="300" />
    //       </div>
    //       <div className="detail">
    //         <h1>{location}</h1>
    //         <h4>{description.substring(0, 30)}...</h4>
    //         <Link
    //           className="btn btn-outline-secondary"
    //           to={`/details/${_id}/${location}`}
    //           state={item}
    //         >
    //           <FaEllipsisV />
    //           View More
    //         </Link>
    //       </div>
    //     </div>
    //     <hr className="sep-2" />
    //   </div>
    // </div>
  );
};

export default LocationItem;
