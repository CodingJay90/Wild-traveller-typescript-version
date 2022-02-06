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
          </div>
        </div>
      </div>

      <div className="home__explore">
        <h1 className="home__explore-header">Your only Explore feeline app</h1>
        <div className="home__explore__group">
          <div className="home__explore__group-item">
            <h2>Want to explore?</h2>
            <h4>Click the button bellow to get started</h4>
            <NavLink className="btn btn-outline-secondary w-100" to="/explore">
              <FaEnvira />
              Get Started
            </NavLink>
          </div>
          <div className="home__explore__group-item">
            {/* <h5>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              officiis, modi libero aliquam impedit corrupti?
            </h5> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  return (
    <div className="Home">
      <div className="jumbotron">
        <div className="showcase">
          <h1>Wild Traveler.</h1>
          <h2>Explore the world at the convineince of your bedroom</h2>
        </div>
      </div>
      <div className="section">
        <div className="item-group explore">
          <h2>Want to explore?</h2>
          <h4>Click the button bellow to get started</h4>
          <NavLink className="btn btn-outline-secondary w-100" to="/explore">
            <FaEnvira />
            Get Started
          </NavLink>
        </div>
        <div className="item-group">
          <h2>Your only Explore feeline app</h2>
          <h5>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            officiis, modi libero aliquam impedit corrupti?
          </h5>
          <img src={image} alt="" width="600" height="300" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
