import React, { useState } from "react";
import {
  FaAddressCard,
  FaCampground,
  FaGift,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hamburger from "../../img/hamburger.png";
import { Store } from "../../redux/reducers";
import { deleteCookie } from "../../services/utils/cookiesFunctions";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const state = useSelector((state: Store) => state.auth);
  const { token, currentUser } = state;

  const logout = () => {
    // localStorage.removeItem("auth_token");
    deleteCookie("auth_token");
    deleteCookie("keepSignedIn");
    toast.success("Logging you out", { theme: "dark" });
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1500);
  };

  return (
    <nav className="navbar">
      <div className="navbar__group">
        <div className="navbar__group-item brand">
          <NavLink className="brand" to="/">
            <span>
              <FaCampground size={40} />
            </span>
            Wild Travelller
          </NavLink>
          <img
            onClick={() => setMenuOpen(!menuOpen)}
            src={hamburger}
            width="40"
            alt=""
            className="navbar__group-menuIcon"
          />
        </div>
      </div>
      {!token ? (
        <div
          className={
            !menuOpen ? "navbar__group" : "navbar__group navbar__group--none"
          }
        >
          <div className="navbar__group-item">
            <NavLink to="/login">Login / Register</NavLink>
          </div>
        </div>
      ) : (
        <div
          className={
            !menuOpen ? "navbar__group" : "navbar__group navbar__group--none"
          }
        >
          {currentUser && (
            <>
              <div className="navbar__group-item">
                <NavLink to="/dashboard">{currentUser?.username}</NavLink>
              </div>
              <div className="navbar__group-item">
                <NavLink to="/dashboard">
                  <img
                    src={
                      currentUser?.avatar ||
                      "https://img2.pngio.com/default-avatar-port-perry-hospital-foundation-gravatar-png-1600_1600.png"
                    }
                    alt=""
                  />
                </NavLink>
              </div>
              <div className="navbar__group-item" onClick={logout}>
                Log Out
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
