import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import "./Register.scss";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../footer/Footer";
import {
  clearError,
  loginUser,
  registerUser,
  resetState,
} from "../../../redux/action-creators/auth.action";
import { Store } from "../../../redux/reducers";
import LoadingSpinner from "../../Extras/LoadingSpinner";
import { useForm } from "../../../hooks/useForm";
import ToastAlert from "../../toast/ToastAlert";

const Auth = () => {
  const { values, onChange, onSubmit } = useForm(authCallback, {
    email: "",
    username: "",
    password: "",
    bio: "",
    gender: "",
    avatar: "",
  });
  const signupRef = useRef<HTMLDivElement>(null);
  const signinRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const state = useSelector((state: Store) => state.auth);
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const { isLoading, isAuthenticated, error } = state;
  const [showToast, setShowToast] = useState(false);

  const [value, setValue] = useState({
    email: "",
    username: "",
    password: "",
    bio: "",
    gender: "",
    avatar: "",
  });
  const [isSignin, setIsSignin] = useState<Boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (error?.errorMessages.length || isAuthenticated) {
      setSpinnerLoader(isLoading);
      // dispatch(resetState());
      console.log(error, "ss");
      error?.errorMessages.map((msg) => toast.error(msg, { theme: "dark" }));
    }
    if (isAuthenticated) {
      setSpinnerLoader(isLoading);
      toast.success(!isSignin ? "SignUp successful" : "Login successful", {
        theme: "dark",
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [state, error]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);
  console.log(values);

  // const onChange = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ): void => setValue({ ...value, [event.target.name]: event.target.value });

  const handleSubmit = () => {
    setSpinnerLoader(true);
    setShowToast(true);
    if (!isSignin) dispatch(registerUser(values));
    if (isSignin) dispatch(loginUser(values));
  };

  function authCallback() {
    handleSubmit();
  }

  const toggleComponents = (): void => {
    setIsSignin(!isSignin);
    signupRef.current?.classList.toggle("d-none");
    signinRef.current?.classList.toggle("d-none");
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="sign-panels">
          <div className="login " ref={signinRef}>
            <div className="title">
              <span>Sign In</span>
              <p>
                Welcome back, please login to your account. You can login with
                facebook, twitter or by your regular user login.
              </p>
            </div>
            <div>
              <a href="#" className="btn-face">
                <i className="fa fa-facebook" aria-hidden="true"></i> Facebook
              </a>
              <a href="#" className="btn-twitter">
                <i className="fa fa-twitter" aria-hidden="true"></i> Twitter
              </a>
            </div>
            <div className="or">
              <span>OR</span>
            </div>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={onChange}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={onChange}
                name="password"
              />
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me sign in</label>
              <button className="btn-signin">Sign In</button>

              <a href="#" className="btn-reset btn-fade">
                Recover your password{" "}
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
              <a
                href="#"
                className="btn-member btn-fade"
                onClick={toggleComponents}
              >
                Not a member yet?{" "}
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            </form>
          </div>

          <div className="signup d-none" ref={signupRef}>
            <div className="title">
              <span>Sign Up</span>
              <p>
                Create a new account. You can sign up with your facebook or
                twitter accunt. Or your regular user login.
              </p>
            </div>

            <div>
              <a href="#" className="btn-face">
                <i className="fa fa-facebook" aria-hidden="true"></i> Facebook
              </a>
              <a href="#" className="btn-twitter">
                <i className="fa fa-twitter" aria-hidden="true"></i> Twitter
              </a>
            </div>

            <div className="or">
              <span>OR</span>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                name="username"
                onChange={onChange}
                type="text"
                placeholder="Username"
              />
              <input
                name="email"
                onChange={onChange}
                type="text"
                placeholder="Email Address"
              />
              <input
                name="password"
                onChange={onChange}
                type="password"
                placeholder="Password"
              />
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }: { base64: string }) =>
                  setValue({ ...value, avatar: base64 })
                }
              />
              <button className="btn-signin">Sign Up</button>
              <a
                href="#"
                className="btn-login btn-fade"
                onClick={toggleComponents}
              >
                Already have an account, Sign In{" "}
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            </form>
          </div>

          <div className="recover-password d-none">
            <div className="title">
              <span>Recover Password</span>
              <p>Enter in the username or email associated with your account</p>
            </div>

            <form action="">
              <input
                type="email"
                placeholder="Username/Email Address"
                id="resetPassword"
                required
              />
              <span className="error"></span>
              <a href="#" className="btn-signin btn-password">
                Submit Reset
              </a>
              <a href="#" className="btn-login btn-fade">
                <i className="fa fa-long-arrow-left" aria-hidden="true"></i>{" "}
                Cancel and go back to Login page{" "}
              </a>
            </form>

            <div className="notification">
              <p>
                Good job. An email containing information on how to reset your
                passworld was sent to
                <span className="reset-mail"></span>. Please follow the
                instruction in that email to reset your password. Thanks!
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastAlert visible={showToast} heading={"authwerrr"} msg="eror woo" />
      <LoadingSpinner
        color={"#fff"}
        loading={spinnerLoader}
        loadingText="Signing up. Please wait...."
      />

      {/* </form> */}
      {/* <div className="Signup">
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
      */}
      {/* <ToastContainer /> */}
    </React.Fragment>
  );
};

export default Auth;
