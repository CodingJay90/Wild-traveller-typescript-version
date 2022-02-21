import React, { useEffect, useState } from "react";
import { FaCaretDown, FaEllipsisV, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import "./LocationDetails.scss";
// import CreateCommentForm from "../forms/commentForm/CreateCommentForm";
import { Store } from "../../redux/reducers";
import { LocationProps } from "./LocationItem";
import {
  deleteComment,
  deleteLocation,
  getSpecificComment,
  getSpecificLocation,
} from "../../redux/action-creators/location.action";
import { ILocation } from "../../services/utils/interfaces/LocationInterface";
import NoContent from "../Extras/NoContent";
import CreateCommentForm from "../forms/commentForm/CommentForm";
import ConfirmModal from "../Extras/modals/confirmModal/ConfirmModal";

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
  const [commentUpdateText, setCommentUpdateText] = useState<string>("");
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

  const onDeleteLocation = (): void => {
    dispatch(deleteLocation(currentLocation?._id || ""));
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
      <div className="card" id="card_1">
        <div className="card__content">
          <div className="card__details">
            <h2>{currentLocation?.location}</h2>
            <p>{currentLocation?.description}</p>
            <div className="card__footer">
              <div className="card__footer-details">
                <p>Created By : {currentLocation?.author.username}</p>
                <p>Created: {moment(currentLocation?.createdAt).fromNow()}</p>
              </div>
              {/* <a href="#top" className="btn btn--accent">
                Read more
              </a> */}
              {currentUser &&
              currentUser?._id === currentLocation?.author.id ? (
                <>
                  {!toggle && (
                    <div className="card__footer-btn">
                      <Link
                        to={`/edit/${currentLocation?._id}`}
                        state={locationProp}
                        className={toggle ? "btn btn--accent" : "none"}
                      >
                        Edit
                      </Link>
                      <a
                        href="#show"
                        data-toggle="modal"
                        className={toggle ? "btn btn--accent" : "none"}
                      >
                        Delete
                      </a>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
          <figure>
            <img src={currentLocation?.image} alt="Image description" />
          </figure>
        </div>
      </div>

      <div>
        <ol className="timeline">
          <CreateCommentForm
            populateForm={populateForm}
            comment_id={comment_id || ""}
            location_id={params.id || ""}
            commentUpdateText={commentUpdateText}
            setPopulateForm={setPopulateForm}
          />
          {!isLoading && currentLocation?.comment ? (
            currentLocation?.comment.map((data, index) => {
              console.log(data);
              return (
                <li key={data._id} className="timeline-item | extra-space">
                  <span className="timeline-item-icon | filled-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="currentColor"
                        d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM7 10v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"
                      />
                    </svg>
                  </span>
                  <div className="timeline-item-wrapper">
                    <div className="timeline-item-description">
                      <i className="avatar | small">
                        {data.avatar ? (
                          <img src={data.avatar} alt="" />
                        ) : (
                          <img
                            src="https://img2.pngio.com/default-avatar-port-perry-hospital-foundation-gravatar-png-1600_1600.png"
                            alt="avaar"
                          />
                        )}
                      </i>
                      <span>
                        <Link
                          to={{
                            pathname: `/userProfile/${data.author.id}`,
                          }}
                        >
                          {data.author.username}{" "}
                        </Link>
                        posted a comment on{" "}
                        <time dateTime="20-01-2021">
                          {moment(data?.createdAt).format("lll")}
                        </time>
                      </span>
                    </div>
                    <div className="comment">
                      <div className="comment__btn">
                        {currentUser && currentUser._id === data.author.id ? (
                          <FaEllipsisV
                            className="options-btn"
                            onClick={() => toggleCommentOptions(index)}
                          />
                        ) : null}
                        {currentUser &&
                        toggleArray[index] &&
                        currentUser._id === data.author.id ? (
                          <span className="comment__btn-options">
                            <button
                              className={
                                toggleArray[index] ? "comment-btn" : "none"
                              }
                              onClick={() => {
                                setPopulateForm(true);
                                setCommentUpdateText(data.text);
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
                              }}
                            >
                              Delete
                            </button>
                          </span>
                        ) : null}
                      </div>
                      <p>{data.text}</p>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div
              style={{
                margin: "4rem auto",
                textAlign: "center",
                display: "block",
              }}
            >
              <h1>Loading Comments....</h1>
              <FaSpinner size={50} className="App-logo-spin App-logo" />
            </div>
          )}
          {/* <button className="show-replies">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-forward"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 11l4 4l-4 4m4 -4h-11a4 4 0 0 1 0 -8h1" />
            </svg>
            Show 3 replies
          </button> */}
        </ol>
      </div>
      <ConfirmModal
        message="This process cannot be undone."
        callback={onDeleteLocation}
      />
    </div>
  );
};

export default LocationDetails;
