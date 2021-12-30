import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { Store } from "../../redux/reducers";
import {
  deleteUser,
  getSpecificUser,
  updateUser,
} from "../../redux/action-creators/auth.action";

const Profile = () => {
  const currentUser = useSelector((state: Store) => state.auth.currentUser);
  const isLoading = useSelector((state: Store) => state.auth.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: currentUser?.username,
    email: currentUser?.email,
    password: currentUser?.password,
    avatar: currentUser?.avatar,
    bio: currentUser?.bio,
    gender: currentUser?.gender,
  });
  const [toggle, setToggle] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    dispatch(updateUser(value));
  };

  useEffect(() => {
    // dispatch(getSpecificUser(currentUser?._id || ""));
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteUser());
    navigate("/explore");
  };

  return (
    <React.Fragment>
      <div className="Profile">
        <div className="container">
          {!isLoading && getSpecificUser !== null ? (
            <>
              <div>
                <h1>Dashboard</h1>
                <div className="grid-container">
                  <img src={currentUser?.avatar} alt="" />
                  <div className="details">
                    <h2>{currentUser?.username}</h2>
                    <h3>{currentUser?.email}</h3>
                    <p>
                      Bio: <span>{currentUser?.bio}</span>
                    </p>
                    <p>
                      Gender: <span>{currentUser?.gender}</span>
                    </p>
                  </div>
                </div>
                <hr />
              </div>

              <div className="options">
                <h4>Edit Profile</h4>
                <button
                  className="btn edit-btn"
                  onClick={() => setToggle(!toggle)}
                >
                  Edit
                </button>
                <button className="btn delete-btn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
              {toggle && (
                <div className="form">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      title="username"
                      value={value.username}
                      name="username"
                      onChange={onChange}
                    />
                    <input
                      type="email"
                      title="email"
                      value={value.email}
                      name="email"
                      onChange={onChange}
                    />
                    <input
                      type="password"
                      title="password"
                      value={value.password}
                      name="password"
                      onChange={onChange}
                    />
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }: { base64: string }) =>
                        setValue({ ...value, avatar: base64 })
                      }
                    />
                    <div className="gender">
                      <label htmlFor="male">Male</label>
                      <input
                        type="radio"
                        id="male"
                        placeholder="Gender"
                        value="Male"
                        name="gender"
                        onChange={onChange}
                      />
                      <label htmlFor="female">Female</label>
                      <input
                        id="female"
                        type="radio"
                        placeholder="Gender"
                        value="Female"
                        name="gender"
                        onChange={onChange}
                      />
                    </div>
                    <textarea
                      title="bio"
                      rows={10}
                      name="bio"
                      onChange={onChange}
                    >
                      {value.bio}
                    </textarea>
                    <button className="btn btn-warning">Update</button>
                  </form>
                </div>
              )}
            </>
          ) : (
            <h1>Loading....</h1>
          )}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Profile;
