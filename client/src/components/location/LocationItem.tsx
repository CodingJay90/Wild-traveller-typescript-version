import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./LocationItem.scss";
import moment from "moment";

import { ILocation } from "../../services/utils/interfaces/LocationInterface";

export interface LocationProps {
  item: ILocation;
}

const LocationItem: FC<LocationProps> = ({
  item: { location, image, description, _id, createdAt, author },
}) => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <Link to={`/details/${_id}/${location}`}>
            <img src={image} alt={location} />
          </Link>
        </div>
        <div className="card-body">
          <h4>{location}</h4>
          <p>
            {description.substring(0, 50)}...{" "}
            <Link to={`/details/${_id}/${location}`}>View more</Link>
          </p>
          <div className="user">
            {/* <Link
              to={{
                pathname: `/userProfile/${author.id}`,
              }}
            >
              <img
                src="https://studyinbaltics.ee/wp-content/uploads/2020/03/3799Ffxy.jpg"
                alt="user"
              />
            </Link> */}
            <div className="user-info">
              <Link
                to={{
                  pathname: `/userProfile/${author.id}`,
                }}
              >
                <h5>{author.username}</h5>
              </Link>
              <small>{moment(createdAt).fromNow()}</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationItem;
