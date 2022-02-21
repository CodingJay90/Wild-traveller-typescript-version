import { FaEnvira } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Home.scss";
import image from "../../img/img7.jpg";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <div className="home__hero">
        <div className="home__hero-overlay">
          <div className="home__hero-content">
            <h1 className="home__hero-heading">Wild Traveler.</h1>
            <p className="home__hero-subHeading">
              Explore the world at the convineince of your bedroom
            </p>
            <NavLink className="btn btn-outline-secondary w-100" to="/explore">
              <FaEnvira />
              Get Started
            </NavLink>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
