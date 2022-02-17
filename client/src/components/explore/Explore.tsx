import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";

import "./Explore.scss";
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
import AuthModal from "../Extras/modals/authModal/AuthModal";
import LoadingSpinner from "../Extras/LoadingSpinner";

const Explore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state: Store) => state.location);
  const { token } = useSelector((state: Store) => state.auth);
  const { location, isLoading } = state;
  const [query, setQuery] = useState<string>("");
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const navigateToCreatePage = (): void => {
    if (token) return navigate("/create");
    setShowAuthModal(true);
  };

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

  //PAGINATION
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);
  //Get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = location.slice(indexOfFirstPost, indexOfLastPost);
  //Change Page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    return () => {
      console.log(":logging off");
    };
  }, []);

  return (
    <>
      <main className="explore">
        <aside className="aside">
          <div className="aside__container">
            <button onClick={navigateToCreatePage}>Add Location</button>
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
            <div>
              <input
                type="text"
                value={query}
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </aside>
        <section>
          <div className="explore__container">
            <header className="explore__header">
              <h1>Locations</h1>
            </header>
          </div>
          {!isLoading ? (
            <div className="grid">
              <div className="grid-container">
                <Location item={handleFilter(currentPosts)} />
              </div>
            </div>
          ) : (
            <LoadingSpinner
              color={"#fff"}
              loading={isLoading}
              loadingText="Loading. Please wait...."
            />
          )}
        </section>
      </main>
      {/* <div className="container">
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
      </div> */}
      {/* {!isLoading ? (
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
      <AuthModal visible={showAuthModal} setVisible={setShowAuthModal} />

      <Footer /> */}
      <AuthModal visible={showAuthModal} setVisible={setShowAuthModal} />
    </>
  );
};

export default Explore;
