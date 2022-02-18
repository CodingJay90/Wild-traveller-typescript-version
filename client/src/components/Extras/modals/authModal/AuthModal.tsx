import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rodal from "rodal";
import "./AuthModal.scss";

// include styles
import "rodal/lib/rodal.css";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loginUser,
  registerUser,
} from "../../../../redux/action-creators/auth.action";
import { Store } from "../../../../redux/reducers";
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
  errors?: string[] | undefined;
  isSignUp?: boolean;
  inUpClick?: () => void;
  submitForm: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state: Store) => state.auth);
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/explore");
      setVisible(false);
    }
  }, [isAuthenticated]);

  function inUpClick(): void {
    setIsSignup(!isSignUp);
    animateFields("signupInputs");
    dispatch(clearError());
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

  const handleSubmit = () => {
    if (!isSignUp) return dispatch(loginUser(values, true));
    dispatch(registerUser(values, true));
  };

  function submitForm() {
    handleSubmit();
  }

  return (
    <div className="auth__modal">
      <Rodal
        visible={visible}
        onClose={() => {
          dispatch(clearError());
          setVisible(false);
        }}
      >
        <div>
          <Login
            isSignUp={isSignUp}
            inputs={loginInputsState}
            inUpClick={inUpClick}
            submitForm={onSubmit}
            errors={error?.errorMessages}
            onChange={onChange}
          />
          <SignUp
            isSignUp={isSignUp}
            inputs={signupInputsState}
            inUpClick={inUpClick}
            submitForm={onSubmit}
            errors={error?.errorMessages}
            onChange={onChange}
          />
        </div>
      </Rodal>
    </div>
  );
};
interface EProps {
  errors: string[] | undefined;
}
const Error = ({ errors }: EProps) => {
  return (
    <>
      {errors ? (
        <div className="error__alert">
          <ul>
            {errors?.map((i: string) => (
              <li>{i}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

const Login = ({
  inputs,
  isSignUp,
  inUpClick,
  submitForm,
  errors,
  onChange,
}: InputsProps) => (
  <div className={isSignUp ? "login login--closed" : "login"}>
    <h1>Log In required!</h1>
    <hr />
    <Form onChange={onChange} inputs={inputs} submitForm={submitForm} />
    <SignupLink inUpClick={inUpClick} />
    <Error errors={errors} />
  </div>
);

const SignUp = ({
  inputs,
  isSignUp,
  inUpClick,
  submitForm,
  errors,
  onChange,
}: InputsProps) => (
  <div className={isSignUp ? "signUp" : "signUp signUp--closed"}>
    <h1>Sign Up</h1>
    <hr />
    <Form onChange={onChange} inputs={inputs} submitForm={submitForm} />
    <LoginLink inUpClick={inUpClick} />
    <Error errors={errors} />
  </div>
);

const Form = ({ inputs, submitForm, onChange }: InputsProps) => {
  const inputsMapped = inputs.map((i: InputInterface) => (
    <Input
      label={i.label}
      type={i.type}
      show={i.show}
      validated={i.validated}
      id={i.id}
      key={i.id}
      name={i.name}
      onChange={onChange}
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

const Input = ({
  label,
  type,
  show,
  validated,
  id,
  validateField,
  name,
  onChange,
}: any) => (
  <div className={show ? "form__field form__field--in" : "form__field"}>
    <label className="form__label">
      {label}
      <i
        className={validated ? "fa fa-check animate-check" : ""}
        aria-hidden="true"
      ></i>
    </label>
    <input className="input" type={type} onChange={onChange} name={name} />
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

export default AuthModal;
