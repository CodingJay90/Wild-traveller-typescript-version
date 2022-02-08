import React, { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthModal from "../components/modals/AuthModal";
interface Props {
  children: JSX.Element;
}

const ProtectedRoutes: FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = "ss";
  // return !auth ? children : <AuthModal visible={true} />;
  return !auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
