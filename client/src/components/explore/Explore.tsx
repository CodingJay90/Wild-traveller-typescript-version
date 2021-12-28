import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Explore.css";
import video from "../../img/video-1.mp4";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer/Footer";
import { FaSpinner } from "react-icons/fa";

const Explore = () => {
  //   const data = useSelector((state) => state.location.location);
  //   const isLoading = useSelector((state) => state.location.isLoading);
  //   const token = useSelector((state) => state.auth.token);
  //   const dispatch = useDispatch();
  //   const [location, setLocation] = useState([]);
  //   const [q, setQ] = useState("");
  //   console.log(location.length);

  //   //SORTING
  //   const handleSelectChange = (e) => {
  //     const value = e.target.value;
  //     value === "a-z" && dispatch(sortLocation());
  //     value === "z-a" && location.sort().reverse();
  //     value === "date-created" && dispatch(sortLocationByDateCreated());
  //     props.history.push("/explore");
  //   };
  //   //Filter function
  //   const handleFilter = (rows) => {
  //     return rows.filter((row) => row.location.toLowerCase().indexOf(q) > -1);
  //   };

  //   const naviagate = useNavigate();

  //   //PAGINATION
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [postsPerPage] = useState(6);
  //   //Get current post
  //   const indexOfLastPost = currentPage * postsPerPage;
  //   const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //   const currentPosts = location.slice(indexOfFirstPost, indexOfLastPost);
  //   //Change Page
  //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //   //Toast message
  //   const toastError = () =>
  //     toast("You are unauthenticated, You need to be logged in to view places", {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       className: "Toastify__toast--error",
  //     });

  //   useEffect(() => {
  //     if (!token) {
  //       console.log("no token found");
  //       toastError();
  //       setTimeout(() => {
  //         naviagate("/login");
  //       }, 2000);
  //     }
  //     setLocation(data);
  //   }, [location, history, dispatch, data, currentPosts, token]);

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
      {/* <div className="container">
        <div className="drop-down-container">
          <select className=" dropdown" onChange={handleSelectChange}>
            <option value="default">Sort by</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="date-created">Date Created</option>
          </select>
          <h2>Locations</h2>
          <div className=" input">
            <input
              type="text"
              value={q}
              placeholder="Search..."
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
        <hr />
      </div>
      {!isLoading && token ? (
        <div className="grid">
          <div className="grid-container">
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
      /> */}
      <Footer />
    </div>
  );
};

export default Explore;
