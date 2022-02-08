import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rodal from "rodal";
import "./AuthModal.scss";

// include styles
import "rodal/lib/rodal.css";
import { useForm } from "../../hooks/useForm";
interface IProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
interface InputInterface {
  label: string;
  type: string;
  show: boolean;
  validated: string;
  id: string;
  name: string;
}
interface InputsProps {
  inputs: InputInterface[];
  isSignUp?: boolean;
  inUpClick?: () => void;
  submitForm: () => void;
}
const loginInputs: InputInterface[] = [
  {
    label: "Email",
    type: "email",
    show: true,
    validated: "",
    id: "a",
    name: "email",
  },
  {
    label: "Password",
    type: "password",
    show: true,
    validated: "",
    id: "b",
    name: "password",
  },
];

const signupInputs: InputInterface[] = [
  {
    label: "Email",
    type: "email",
    show: false,
    validated: "",
    id: "d",
    name: "email",
  },
  {
    label: "User Name",
    type: "text",
    show: false,
    validated: "",
    id: "c",
    name: "username",
  },
  {
    label: "Password",
    type: "password",
    show: false,
    validated: "",
    id: "e",
    name: "password",
  },
];
// zoom
// fade
// flip
// door
// rotate
// slideUp
// slideDown
// slideLeft
// slideRight

const AuthModal = ({ visible, setVisible }: IProps) => {
  const { values, onChange, onSubmit } = useForm(submitForm, {
    email: "",
    username: "",
    password: "",
    bio: "",
    gender: "",
    avatar: "",
  });
  const [isSignUp, setIsSignup] = useState<boolean>(false);
  const [signupInputsState, setSignupInputsState] =
    useState<InputInterface[]>(signupInputs);
  const [loginInputsState, setLoginInputsState] =
    useState<InputInterface[]>(loginInputs);

  function inUpClick(): void {
    setIsSignup(!isSignUp);
    animateFields("signupInputs");
    setTimeout(() => {
      animateFields("loginInputs");
    });
  }

  function animateFields(formName: string): void {
    let start: number,
      length: number,
      newForm: any[] = [];
    if (formName === "loginInputs") {
      newForm = loginInputsState.slice();
    } else if (formName === "signupInputs") {
      newForm = signupInputsState.slice();
    }
    start = 0;
    length = newForm.length;
    console.log(newForm);
    let stagger = (i: number): void => {
      if (i < length) {
        setTimeout(() => {
          newForm[i].show = !newForm[i].show;
          formName === "signupInputs"
            ? setSignupInputsState(newForm)
            : setLoginInputsState(newForm);
          stagger(i + 1);
        }, 70);
      }
    };
    stagger(start);
  }

  const handleSubmit = () => {};

  function submitForm() {
    handleSubmit();
  }

  return (
    <div className="auth__modal">
      <Rodal visible={visible} onClose={() => setVisible(false)}>
        <div>
          <Login
            isSignUp={isSignUp}
            inputs={loginInputsState}
            inUpClick={inUpClick}
            submitForm={submitForm}
          />
          <SignUp
            isSignUp={isSignUp}
            inputs={signupInputsState}
            inUpClick={inUpClick}
            submitForm={submitForm}
          />
        </div>
      </Rodal>
    </div>
  );
};

const Login = ({ inputs, isSignUp, inUpClick, submitForm }: InputsProps) => (
  <div className={isSignUp ? "login login--closed" : "login"}>
    <h1>Log In required!</h1>
    <hr />
    <Form inputs={inputs} submitForm={submitForm} />
    <SignupLink inUpClick={inUpClick} />
  </div>
);

const SignUp = ({ inputs, isSignUp, inUpClick, submitForm }: InputsProps) => (
  <div className={isSignUp ? "signUp" : "signUp signUp--closed"}>
    <h1>Sign Up</h1>
    <hr />
    <Form inputs={inputs} submitForm={submitForm} />
    <LoginLink inUpClick={inUpClick} />
  </div>
);

const Form = ({ inputs, submitForm }: InputsProps) => {
  const inputsMapped = inputs.map((i: InputInterface) => (
    <Input
      label={i.label}
      type={i.type}
      show={i.show}
      validated={i.validated}
      id={i.id}
      key={i.id}
      name={i.name}
    />
  ));

  return (
    <>
      <form onSubmit={submitForm} className="form">
        {inputsMapped}
        <Submit />
      </form>
    </>
  );
};

const Submit = () => (
  <div>
    <button className="submit-button" type="submit">
      Submit
    </button>
  </div>
);

const Input = ({ label, type, show, validated, id, validateField }: any) => (
  <div className={show ? "form__field form__field--in" : "form__field"}>
    <label className="form__label">
      {label}
      <i
        className={validated ? "fa fa-check animate-check" : ""}
        aria-hidden="true"
      ></i>
    </label>
    <input className="input" type={type} />
  </div>
);

const SignupLink = ({ inUpClick }: any) => (
  <div className="signup-link">
    <p className="in-out">
      Don't have an account?{" "}
      <a href="#" onClick={inUpClick}>
        Sign Up Here
      </a>
    </p>
  </div>
);

const LoginLink = ({ inUpClick }: any) => (
  <div className="signup-link">
    <p className="in-out">
      Already have an account?{" "}
      <a href="#" onClick={inUpClick}>
        Log In Here
      </a>
    </p>
  </div>
);

/*
    {/* <div className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content form-wrapper">
        <div className="close-box" data-dismiss="modal">
          <i className="fa fa-times fa-2x"></i>
        </div>
        <div className="container-fluid mt-5">
          <form action="{{route('login')}}" method="post" id="LoginForm">
            <div className="form-group text-center">
              <h4>Login Form</h4>
              <h6>Enter your credentials</h6>
            </div>
            <div className="form-group" style={{position: "relative"}}>
              <label htmlFor="l_email">Email</label>
              <input type="email" id="l_email" className="form-control mb-1" placeholder="someone@something.domain" required/>
              
              
              
            </div>
            <div className="form-group pb-3" style={{position: "relative"}}>
              <label htmlFor="l_password">Password</label>
              <input type="password" id="l_password" className="form-control mb-1" placeholder="*******************" required/>
              <a href="#forgotPassword" style={{display:block position: absolute; right: 0}} title="Fill Email Field and Click it">
                Forgot Password?
              </a>
            </div>
            <div className="form-group pt-2">
              <button className="btn btn-info form-control">Login</button>
            </div>
            <div className="form-group text-center pt-2 social-login">
              <h6>OR Continue with</h6>
              <a href="#" className="google"> <i className="fa fa-google-plus fa-lg"></i> </a>
              <a href="#" className="facebook"> <i className="fa fa-facebook fa-lg"></i> </a>
              <a href="#" className="twitter"> <i className="fa fa-twitter fa-lg"></i> </a>
              <a href="#" className="github"> <i className="fa fa-github fa-lg"></i> </a>
            </div>
          </form>
        </div>
      </div>
        </div>
      </div>*/

export default AuthModal;
