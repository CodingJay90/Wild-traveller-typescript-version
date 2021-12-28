import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import "./Register.css";
import { toast } from "react-toastify";
import Footer from "../../footer/Footer";
import {
  loginUser,
  registerUser,
  resetState,
} from "../../../redux/action-creators/auth.action";
import { Store } from "../../../redux/reducers";
import LoadingSpinner from "../../Extras/LoadingSpinner";
interface IProps {
  type: string;
}

const Auth = ({ type }: IProps) => {
  const dispatch = useDispatch();
  const state = useSelector((state: Store) => state.auth);
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const { isLoading, isAuthenticated, error } = state;

  const [value, setValue] = useState({
    email: "",
    username: "",
    password: "",
    bio: "",
    gender: "",
    avatar: "",
  });
  const navigate = useNavigate();
  const toastMessage = (msg: string): void => {
    toast.info(msg, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    console.log(isLoading, "state");
    if (error || isAuthenticated) {
      setSpinnerLoader(isLoading);
      dispatch(resetState());
      console.log(error);
      error?.errorMessages.map((msg) => toastMessage(msg));
    }
    if (isAuthenticated) {
      setSpinnerLoader(isLoading);
      toastMessage(
        type === "signup" ? "SignUp successful" : "Login successful"
      );
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [state]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => setValue({ ...value, [event.target.name]: event.target.value });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpinnerLoader(true);
    if (type === "signup") dispatch(registerUser(value));
    if (type === "signin") dispatch(loginUser(value));
  };

  return (
    <React.Fragment>
      <div className="Signup">
        <div className="container">
          <h1>{type === "signup" ? "Register" : "Login"}</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={onChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChange}
            />
            {type === "signup" && (
              <>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={onChange}
                />

                <label htmlFor="avatar">Avatar (optional)</label>
                <FileBase64
                  type="file"
                  multiple={false}
                  onDone={({ base64 }: { base64: string }) =>
                    setValue({ ...value, avatar: base64 })
                  }
                />
                <label htmlFor="password">Gender</label>
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

                <label htmlFor="bio">Bio</label>
                <textarea
                  placeholder="bio"
                  name="bio"
                  onChange={onChange}
                ></textarea>
              </>
            )}

            <button className="btn btn-warning">
              {type === "signup" ? "Register" : "Login"}
            </button>
          </form>
          <p>
            Already had an account ?{" "}
            <span>
              <Link to="login">{type === "signup" ? "Log in" : "Sign up"}</Link>
            </span>
          </p>
          <h1> {JSON.stringify(spinnerLoader)}</h1>
        </div>
      </div>
      <div>
        <Footer />
      </div>
      <LoadingSpinner
        color={"#fff"}
        loading={spinnerLoader}
        loadingText="Signing up. Please wait...."
      />
    </React.Fragment>
  );
};

export default Auth;
