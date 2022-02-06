import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";

import "./Explore.css";
import video from "../../img/video-1.mp4";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer/Footer";
import { FaSpinner } from "react-icons/fa";
import { Store } from "../../redux/reducers";
import {
  sortLocation,
  sortLocationByDateCreated,
} from "../../redux/action-creators/location.action";
import Location from "../location/Location";
import { ILocation } from "../../services/utils/interfaces/LocationInterface";

const Explore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state: Store) => state.location);
  const { token } = useSelector((state: Store) => state.auth);
  const { location, isLoading } = state;
  useEffect(() => {
    console.log(location);
  }, [state]);
  const [query, setQuery] = useState("");
  //   console.log(location.length);

  //   //SORTING
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    value === "a-z" && dispatch(sortLocation());
    value === "z-a" && location.sort().reverse();
    value === "date-created" && dispatch(sortLocationByDateCreated());
    navigate("/explore");
  };
  //   //Filter function
  const handleFilter = (rows: ILocation[]): ILocation[] => {
    return rows.filter((row) => row.location.toLowerCase().indexOf(query) > -1);
  };

  //   const naviagate = useNavigate();

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  //Get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = location.slice(indexOfFirstPost, indexOfLastPost);
  //Change Page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="Explore">
      <div className="showcase">
        <div className="video-showcase">
          <video src={video} muted loop autoPlay />
          <div className="hero">
            <h1>Explore the world of Images</h1>
            <h2>
              Share Your Travel experience and let people know what they think
              about it
            </h2>
            <h3>Start by adding your Location</h3>
            <Link className="btn btn-outline-warning" to="/create">
              Add Location
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="drop-down-container">
          <select
            title="sorting"
            name="sort"
            className=" dropdown"
            onChange={handleSelectChange}
          >
            <option value="default">Sort by</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="date-created">Date Created</option>
          </select>
          <h2>Locations</h2>
          <div className=" input">
            <input
              type="text"
              value={query}
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <hr />
      </div>
      {!isLoading ? (
        <div className="grid">
          <div className="grid-container">
            {/* <Location item={location} /> */}
            <Location item={handleFilter(currentPosts)} />
          </div>
        </div>
      ) : (
        <div
          style={{ margin: "4rem auto", textAlign: "center", display: "block" }}
        >
          <h1>Loading....</h1>
          <FaSpinner size={50} className="App-logo-spin App-logo" />
        </div>
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={location.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <Footer />
    </div>
  );
};

export default Explore;
