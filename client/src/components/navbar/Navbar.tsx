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
import "./Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hamburger from "../../img/hamburger.png";
import { Store } from "../../redux/reducers";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const state = useSelector((state: Store) => state.auth);
  const { token, currentUser } = state;

  const logout = () => {
    localStorage.removeItem("auth_token");
    toast.success("Logging you out");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="Navbar">
      <nav className="navbar">
        <ul className="nav-group">
          <li className="nav-item brand">
            <NavLink className="brand" to="/">
              <FaCampground size={40} /> Wild Travelller
            </NavLink>
            <img
              onClick={() => setMenuOpen(!menuOpen)}
              src={hamburger}
              width="40"
              alt=""
              className="menu-icon"
            />
          </li>
        </ul>
        <ul className={!menuOpen ? "nav-group" : "d-none nav-group"}>
          <li className="nav-item">
            <FaHome /> <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <FaAddressCard /> <NavLink to="/contact">Contact</NavLink>
          </li>
          <li className="nav-item">
            <FaGift /> Promotion
          </li>
        </ul>
        {!token ? (
          <ul className={!menuOpen ? "nav-group" : "d-none nav-group"}>
            <li className="nav-item">
              <NavLink to="/signup">SignUp</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        ) : (
          <ul className={!menuOpen ? "nav-group" : "d-none nav-group"}>
            {currentUser && (
              <>
                <li className="nav-item">
                  <NavLink to="/profile">{currentUser.username}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="profile">
                    <img
                      src={
                        currentUser.avatar ||
                        "https://img2.pngio.com/default-avatar-port-perry-hospital-foundation-gravatar-png-1600_1600.png"
                      }
                      alt=""
                    />
                  </NavLink>
                </li>

                <li className="nav-item" onClick={logout}>
                  Log Out <FaSignOutAlt />
                </li>
              </>
            )}
          </ul>
        )}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          bodyClassName="white"
          progressClassName="Toastify__progress-bar--dark"
        />
      </nav>
    </div>
  );
};

export default Navbar;
