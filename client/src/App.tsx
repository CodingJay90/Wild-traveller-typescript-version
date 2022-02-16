import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import ContactPage from "./pages/ContactPage";
import CreateLocationPage from "./pages/CreateLocationPage";
import EditLocationPage from "./pages/EditLocationPage";
import ExplorePage from "./pages/ExplorePage";
import Homepage from "./pages/Homepage";
import LocationDetailsPage from "./pages/LocationDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/Dashboard";
import { getSpecificUser, loadUser } from "./redux/action-creators/auth.action";
import { getLocations } from "./redux/action-creators/location.action";
import { AuthState } from "./redux/reducers/auth.reducer";
import FreakingComponent from "./FreakingComponent";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AuthModal from "./components/Extras/modals/authModal/AuthModal";
import { getCookie } from "./services/utils/cookiesFunctions";
import Test from "./Test";
import { checkTokenExpiration } from "./services/utils/auth";

function App() {
  const dispatch = useDispatch();
  const authToken = getCookie("auth_token");
  useEffect(() => {
    console.log(checkTokenExpiration(authToken));
    if (!checkTokenExpiration(authToken)) dispatch(loadUser());
    dispatch(getLocations());
    // if (authToken) dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path="/details/:id/:locationName"
            element={<LocationDetailsPage />}
          />
          <Route path="/create" element={<ProtectedRoutes />}>
            <Route element={<CreateLocationPage />} />
          </Route>
          <Route path="/edit/:id" element={<EditLocationPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/userProfile/:id" element={<ProfilePage />} />
          <Route path="/dashboard" element={<ProtectedRoutes />}>
            <Route element={<UserProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
