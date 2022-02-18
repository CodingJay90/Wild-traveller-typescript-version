import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AuthModal from "../components/Extras/modals/authModal/AuthModal";
import { Store } from "../redux/reducers";
import { getCookie } from "../services/utils/cookiesFunctions";
interface Props {
  children: JSX.Element;
}

// const ProtectedRoutes = () => {
//   const { isAuthenticated } = useSelector((state: Store) => state.auth);
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };
const ProtectedRoutes: FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: Store) => state.auth);
  const token = getCookie("auth_token");
  console.log(isAuthenticated);
  return getCookie("auth_token") ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
