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
import { useForm } from "../../hooks/useForm";
import ConfirmModal from "../Extras/modals/confirmModal/ConfirmModal";

const Dashboard = () => {
  const { specificUser, currentUser, isLoading } = useSelector(
    (state: Store) => state.auth
  );
  // const currentUser = useSelector((state: Store) => state.auth.currentUser);
  // const isLoading = useSelector((state: Store) => state.auth.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [values, setValues] = useState({
    username: specificUser?.username,
    bio: specificUser?.bio,
    avatar,
    title: specificUser?.title,
    country: specificUser?.country,
    city: specificUser?.city,
    firstName: specificUser?.firstName,
    lastName: specificUser?.lastName,
  });
  // const { values, onChange, onSubmit } = useForm(authCallback, {
  //   ...formValues,
  // });

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateUser(values));
    console.log(values);
  }

  useEffect(() => {
    if (currentUser?._id) dispatch(getSpecificUser(currentUser?._id || ""));
  }, [currentUser]);

  const handleDelete = () => {
    // dispatch(deleteUser());
    navigate("/explore");
  };

  // console.log(currentUser);

  return (
    <React.Fragment>
      <div className="dashboard">
        <div className="main-content">
          <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
            <span className="mask bg-gradient-default opacity-8"></span>
            <div className="container-fluid d-flex align-items-center">
              <div className="row">
                <div className="col-lg-7 col-md-10">
                  <h1 className="display-2 text-white">
                    Hello {specificUser?.firstName}!
                  </h1>
                  <p className="text-white mt-0 mb-5">
                    This is your profile page. You can see the progress you've
                    made with your work and manage your projects or assigned
                    tasks
                  </p>
                  <button
                    onClick={() => setToggle(!toggle)}
                    className="btn btn-info"
                  >
                    Edit profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid mt--7">
            <div className="row">
              <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div className="card card-profile shadow">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 order-lg-2">
                      <div className="card-profile-image">
                        <a href="#">
                          <img
                            src={specificUser?.avatar}
                            width="180"
                            height="180"
                            className="rounded-circle"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></div>
                  <div className="card-body pt-0 pt-md-4">
                    <div className="row">
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          <div>
                            <span className="heading">
                              {specificUser?.locations}
                            </span>
                            <span className="description">Posts</span>
                          </div>
                          <div>
                            <span className="heading">
                              {specificUser?.comments}
                            </span>
                            <span className="description">Comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3>
                        {specificUser?.firstName} {specificUser?.lastName}
                      </h3>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2"></i>
                        {specificUser?.city},{specificUser?.country}
                      </div>
                      <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2"></i>
                        {specificUser?.title} - <p>{specificUser?.username}</p>
                      </div>
                      <hr className="my-4" />
                      <p>{specificUser?.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 order-xl-1">
                {toggle && (
                  <div className="card bg-secondary shadow">
                    <div className="card-header bg-white border-0">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h3 className="mb-0">My account</h3>
                        </div>
                        <div className="col-4 text-right">
                          <p className="btn btn-sm btn-primary">Settings</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <form onSubmit={onSubmit}>
                        <h6 className="heading-small text-muted mb-4">
                          User information
                        </h6>
                        <div className="pl-lg-4">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group focused">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  First name
                                </label>
                                <input
                                  onChange={onChange}
                                  type="text"
                                  name="firstName"
                                  className="form-control form-control-alternative"
                                  placeholder="First name"
                                  value={values.firstName}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group focused">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-last-name"
                                >
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  onChange={onChange}
                                  name="lastName"
                                  className="form-control form-control-alternative"
                                  placeholder="Last name"
                                  value={values.lastName}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group focused">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Username
                                </label>
                                <input
                                  type="text"
                                  name="username"
                                  onChange={onChange}
                                  className="form-control form-control-alternative"
                                  placeholder="Username"
                                  value={values.username}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="title"
                                >
                                  Title
                                </label>
                                <input
                                  type="text"
                                  onChange={onChange}
                                  name="title"
                                  className="form-control form-control-alternative"
                                  placeholder="E.g Web Developer"
                                  value={values.title}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group focused">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Avatar
                                </label>
                                <FileBase
                                  type="file"
                                  multiple={false}
                                  onDone={({ base64 }: { base64: string }) =>
                                    setValues({ ...values, avatar: base64 })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <h6 className="heading-small text-muted mb-4">
                          Contact information
                        </h6>
                        <div className="pl-lg-4">
                          <div className="row"></div>
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group focused">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-city"
                                >
                                  City
                                </label>
                                <input
                                  onChange={onChange}
                                  type="text"
                                  id="city"
                                  className="form-control form-control-alternative"
                                  placeholder="City"
                                  value={values.city}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group focused">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-country"
                                >
                                  Country
                                </label>
                                <input
                                  onChange={onChange}
                                  type="text"
                                  id="country"
                                  className="form-control form-control-alternative"
                                  placeholder="Country"
                                  value={values.country}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <h6 className="heading-small text-muted mb-4">
                          About me
                        </h6>
                        <div className="pl-lg-4">
                          <div className="form-group focused">
                            <label>About Me</label>
                            <textarea
                              rows={4}
                              onChange={onChange}
                              name="bio"
                              value={values.bio}
                              className="form-control form-control-alternative"
                              placeholder="A few words about yourself"
                            ></textarea>
                          </div>
                        </div>
                        <button className="btn btn-primary">Update</button>
                        <a
                          href="#show"
                          data-toggle="modal"
                          className="btn btn-danger"
                        >
                          Delte Account
                        </a>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        message="Do you really want to delete these records? This process cannot be undone."
        callback={deleteUser}
      />
    </React.Fragment>
  );
};

export default Dashboard;
