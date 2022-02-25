import React, { useEffect } from "react";
// import "../dashboard/Profile.css";
import "./UserProfile.scss";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { getSpecificUser } from "../../redux/action-creators/auth.action";
import { useParams } from "react-router-dom";
import { Store } from "../../redux/reducers";
import { IUser } from "../../services/utils/interfaces/authInterface";
import LoadingSpinner from "../Extras/LoadingSpinner";
import NoContent from "../Extras/NoContent";

const UserProfile = () => {
  const params = useParams();
  const user = useSelector((state: Store) => state.auth.specificUser) as IUser;
  const { error, isLoading } = useSelector((state: Store) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecificUser(params.id || ""));
  }, [dispatch]);

  if (error) {
    return <NoContent />;
  }

  if (!user?._id)
    return <NoContent heading="Ooops!" content="User not found" />;
  return (
    <React.Fragment>
      {isLoading || !user ? (
        <LoadingSpinner
          color={"#fff"}
          loading={isLoading}
          loadingText="Loading. Please wait...."
        />
      ) : (
        <div className="profile">
          <div className="profile__container">
            <div className="profile__header">
              <h1>{user.username?.toUpperCase()}'s Profile</h1>
              <h5>{user.title}</h5>
            </div>
            <div className="profile__info">
              <div className="profile__info-about">
                <h4>About me</h4>
                <p>{user.bio}</p>
              </div>
              <div className="profile__info-image">
                <img src={user.avatar} alt="" />
              </div>
              <div className="profile__info-details">
                <h4>Details</h4>
                <h5>Username:</h5>
                <p>{user.username}</p>

                {user.firstName && <h5>Name:</h5>}
                <p>
                  {user.firstName} {user.lastName}
                </p>
                {user.country && <h5>Location:</h5>}
                <p>
                  {user.country} {user.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="Profile">
        {!isLoading ? (
          <div className="container">
            <h1>{user ? user.username : " "} Profile</h1>
            <div className="grid-container">
              <img src={user ? user.avatar : " "} alt="" />
              <div className="details">
                <h2>{user ? user.username : " "}</h2>
                <h3>{user ? user.email : " "}</h3>
                <h4>Gender: {user ? user.gender : " "}</h4>
                <h4>Bio: {user?.bio}</h4>
              </div>
            </div>
            <hr />
          </div>
        ) : (
          <FaSpinner size={50} className="App-logo-spin App-logo" />
        )}
        <Footer />
      </div> */}
    </React.Fragment>
  );
};

export default UserProfile;
