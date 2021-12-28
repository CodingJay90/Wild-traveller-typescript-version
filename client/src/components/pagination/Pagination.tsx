import React from "react";
import { Link } from "react-router-dom";
import "./Pagination.css";

interface IProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (num: number) => void;
  currentPage: number;
}

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: IProps) => {
  // console.log(currentPage)
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="Pagination">
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return (
            <li className="page-item" key={number}>
              <Link
                to="#"
                onClick={() => paginate(number)}
                className="page-link"
              >
                {number}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
