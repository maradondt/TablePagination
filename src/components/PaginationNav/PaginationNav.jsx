import React from 'react';
import { usePagination, LEFT_PAGE, RIGHT_PAGE } from './usePagination';

const PaginationNav = (props) => {
  const {
    totalRecords,
    onPageChanged,
    pageLimit,
    pageNeighbours,
    page,
  } = props;

  const {
    pages,
    currentPage,
    handleClick,
    handleMoveLeft,
    handleMoveRight,
  } = usePagination(
    totalRecords,
    onPageChanged,
    pageLimit,
    pageNeighbours,
    page
  );

  return (
    <>
      <nav aria-label="Table Pagination">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE) {
              return (
                <li key={index} className="page-item">
                  <button
                    className="page-link"
                    aria-label="Previous"
                    onClick={handleMoveLeft}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
              );
            }
            if (page === RIGHT_PAGE) {
              return (
                <li key={index} className="page-item">
                  <button
                    className="page-link"
                    aria-label="Next"
                    onClick={handleMoveRight}
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              );
            }
            return (
              <li
                key={index}
                className={`page-item${currentPage === page ? ' active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={handleClick(page)}
                  disabled={currentPage === page}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default PaginationNav;
