import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <footer>
        <div className="container">
          <div className="footer-cols">
            <ul>
              <li>Shop & Learn</li>
              <li>
                <Link to="/">Lorem</Link>
              </li>
              <li>
                <Link to="/">Ipsum</Link>
              </li>
              <li>
                <Link to="/">Dolor amit</Link>
              </li>
              <li>
                <Link to="/">Locations</Link>
              </li>
            </ul>

            <ul>
              <li>Wild Store</li>
              <li>
                <Link to="/">Find Link Location</Link>
              </li>
              <li>
                <Link to="/">Today at Wild</Link>
              </li>
              <li>
                <Link to="/">Wild Camp</Link>
              </li>
              <li>
                <Link to="/">financing</Link>
              </li>
              <li>
                <Link to="/">Ipsum amit</Link>
              </li>
            </ul>

            <ul>
              <li>Education & Business</li>
              <li>
                <Link to="/">Wild & Education</Link>
              </li>
              <li>
                <Link to="/">Shop For College</Link>
              </li>
              <li>
                <Link to="/">Wild And Business</Link>
              </li>
              <li>
                <Link to="/">Shop for Business</Link>
              </li>
              <li>
                <Link to="/">Jobs</Link>
              </li>
            </ul>

            <ul>
              <li>About Wild</li>
              <li>
                <Link to="/">NewsRoom</Link>
              </li>
              <li>
                <Link to="/">Wild Leadership</Link>
              </li>
              <li>
                <Link to="/">Investors</Link>
              </li>
              <li>
                <Link to="/">Events</Link>
              </li>
              <li>
                <Link to="/">Contact Wild</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom text-center">
          Copyright &copy; 2020 Wild Travellers
        </div>
      </footer>
    </div>
  );
};

export default Footer;
