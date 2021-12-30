import React, { useEffect } from "react";
import "../dashboard/Profile.css";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { getSpecificUser } from "../../redux/action-creators/auth.action";
import { useParams } from "react-router-dom";
import { Store } from "../../redux/reducers";

const UserProfile = () => {
  const params = useParams();
  const user = useSelector((state: Store) => state.auth.specificUser);
  const isLoading = useSelector((state: Store) => state.auth.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecificUser(params.id || ""));
  }, [dispatch]);
  console.log(user);
  return (
    <React.Fragment>
      <div className="Profile">
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
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
