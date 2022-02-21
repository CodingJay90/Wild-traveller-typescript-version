import React from "react";
import { Link } from "react-router-dom";
import "./Pagination.scss";

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
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination">
      <ul className="pagination__container">
        {pageNumbers.map((number) => {
          return (
            pageNumbers.length > 1 && (
              <li className="pagination__item" key={number}>
                <Link
                  to="#"
                  onClick={() => paginate(number)}
                  className="page-link"
                >
                  {number}
                </Link>
              </li>
            )
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
