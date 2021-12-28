import React, { useEffect } from "react";
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
import UserProfilePage from "./pages/UserProfilePage";
import { getSpecificUser } from "./redux/action-creators/auth.action";
import { AuthState } from "./redux/reducers/auth.reducer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/details" element={<LocationDetailsPage />} />
          <Route path="/create" element={<CreateLocationPage />} />
          <Route path="/edit" element={<EditLocationPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/userProfile/:id" element={<UserProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
