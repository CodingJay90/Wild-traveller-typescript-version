import React, { useEffect, useState } from "react";
import { FaCaretDown, FaEllipsisV, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import "./LocationDetails.css";
// import CreateCommentForm from "../forms/commentForm/CreateCommentForm";
import { Store } from "../../redux/reducers";
import { LocationProps } from "./LocationItem";
import {
  deleteComment,
  deleteLocation,
  getSpecificComment,
  getSpecificLocation,
} from "../../redux/action-creators/location.action";
import { ILocation } from "../../utils/LocationInterface";
import NoContent from "../Extras/NoContent";
import CreateCommentForm from "../forms/commentForm/CommentForm";

interface IParams {
  id?: string;
  locationName?: string;
}

const LocationDetails = () => {
  const locationProp = useLocation();
  const params: IParams = useParams();
  const [toggle, setToggle] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const [populateForm, setPopulateForm] = useState(false);
  const [comment_id, setCommentId] = useState<null | string>(null);
  const currentUser = useSelector((state: Store) => state.auth.currentUser);
  const currentLocation = useSelector(
    (state: Store) => state.location.specificLocation
  );
  const { isLoading, error } = useSelector((state: Store) => state.location);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const length = currentLocation?.comment.length;
  const [toggleArray, setToggleArray] = useState<boolean[]>(
    new Array(length).fill(false)
  );

  const onDeleteLocation = (id: string) => {
    dispatch(deleteLocation(id));
    navigate("/explore");
  };

  useEffect(() => {
    dispatch(getSpecificLocation(params.id || ""));
    if (currentUser?._id == currentLocation?.author.id) {
      console.log("show the bitch");
    }
  }, [dispatch, params.id]);

  function toggleCommentOptions(i: any) {
    const temp = [...toggleArray];
    temp[i] = !temp[i];
    setToggleArray(temp);
  }

  if (error) {
    return <NoContent />;
  }

  return (
    <div className="LocationDetails">
      {/* {error && <NoContent />} */}
      <div className="container">
        <div className="img-container">
          <img src={currentLocation?.image} alt="" />
          {currentUser && currentUser?._id == currentLocation?.author.id && (
            <span className="btn-controller">
              <FaCaretDown size={52} onClick={() => setToggle(!toggle)} />{" "}
            </span>
          )}

          {currentUser && currentUser?._id === currentLocation?.author.id ? (
            <span className="options">
              {toggle && (
                <span className="button">
                  <Link
                    to={`/edit/${currentLocation?._id}`}
                    state={locationProp}
                    className={toggle ? "btn btn-default" : "none"}
                  >
                    Edit
                  </Link>
                  <button
                    className={toggle ? "btn btn-danger" : "none"}
                    onClick={() => onDeleteLocation(currentLocation?._id || "")}
                    // to="#"
                  >
                    Delete
                  </button>
                </span>
              )}
            </span>
          ) : null}
        </div>
        <div className="details">
          <h1>Name : {currentLocation?.location}</h1>
          <h3>Description : {currentLocation?.description}</h3>
          <h4>Created By : {currentLocation?.author.username}</h4>
          <p>Created: {moment(currentLocation?.createdAt).fromNow()}</p>
        </div>
      </div>

      <h2>Comments</h2>
      <hr className="sep-2" />

      {!isLoading && currentLocation?.comment ? (
        currentLocation?.comment.map((data, index) => {
          return (
            <div className="comment-container" key={data._id}>
              <div className="comment">
                <div className="avatar">
                  {data.avatar ? (
                    <img src={data.avatar} alt="" />
                  ) : (
                    <img
                      src="https://img2.pngio.com/default-avatar-port-perry-hospital-foundation-gravatar-png-1600_1600.png"
                      alt=""
                    />
                  )}
                </div>
                <div className="text">
                  <div className="comment-content">
                    <h4>
                      <Link
                        style={{ color: "blue" }}
                        to={{
                          pathname: `/userProfile/${data.author.id}`,
                        }}
                        // state: { data }
                      >
                        {data.author.username}{" "}
                      </Link>
                      {currentUser &&
                        currentUser._id === data.author.id &&
                        "(You)"}{" "}
                    </h4>
                    <p>{data.text}</p>
                    <div className="comment-btn">
                      {currentUser &&
                      toggleArray[index] &&
                      currentUser._id === data.author.id ? (
                        <span className="button">
                          <button
                            className={
                              toggleArray[index] ? "comment-btn" : "none"
                            }
                            onClick={() => {
                              setPopulateForm(!populateForm);
                              dispatch(
                                getSpecificComment(
                                  currentLocation?._id,
                                  data._id
                                )
                              );
                              setCommentId(data._id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className={
                              toggleArray[index] ? "comment-btn" : "none"
                            }
                            onClick={() => {
                              dispatch(
                                deleteComment(currentLocation?._id, data._id)
                              );
                              window.location.reload();
                            }}
                          >
                            Delete
                          </button>
                        </span>
                      ) : null}
                    </div>
                  </div>
                  {
                    /* {compare comment author } */
                    currentUser && currentUser._id === data.author.id ? (
                      <FaEllipsisV
                        className="options-btn"
                        onClick={() => toggleCommentOptions(index)}
                      />
                    ) : null
                  }
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div
          style={{ margin: "4rem auto", textAlign: "center", display: "block" }}
        >
          <h1>Loading Comments....</h1>
          <FaSpinner size={50} className="App-logo-spin App-logo" />
        </div>
      )}

      <CreateCommentForm
        // item={currentLocation}
        populateForm={populateForm}
        comment_id={comment_id || ""}
        location_id={params.id || ""}
      />
    </div>
  );
};

export default LocationDetails;
