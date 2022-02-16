import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AuthModal from "../components/Extras/modals/authModal/AuthModal";
import { Store } from "../redux/reducers";
interface Props {
  children: JSX.Element;
}

const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state: Store) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
// const ProtectedRoutes: FC<{ children: JSX.Element }> = ({ children }) => {
//   const { isAuthenticated } = useSelector((state: Store) => state.auth);
//   // return !auth ? children : <AuthModal visible={true} />;
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

export default ProtectedRoutes;
