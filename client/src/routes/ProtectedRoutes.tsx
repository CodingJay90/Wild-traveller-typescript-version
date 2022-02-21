import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../services/utils/cookiesFunctions";
const ProtectedRoutes: FC<{ children: JSX.Element }> = ({ children }) => {
  return getCookie("auth_token") ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
