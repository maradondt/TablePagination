import React from 'react';
import { usePagination, LEFT_PAGE, RIGHT_PAGE } from './usePagination';
import Button from '../ui/Button/Button';
import styles from './PaginationNav.module.less';

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
      <nav aria-label="Table Pagination" className={styles['pagination-nav']}>
        <ul className={styles['pagination-list']}>
          {pages.map((page, index) => {
            if (page === LEFT_PAGE) {
              return (
                <li key={index} className="page-item">
                  <Button
                    className="page-link"
                    aria-label="Previous"
                    onClick={handleMoveLeft}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </Button>
                </li>
              );
            }
            if (page === RIGHT_PAGE) {
              return (
                <li key={index} className="page-item">
                  <Button
                    className="page-link"
                    aria-label="Next"
                    onClick={handleMoveRight}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </Button>
                </li>
              );
            }
            return (
              <li
                key={index}
                // className={`page-item${currentPage === page ? ' active' : ''}`}
              >
                <Button
                  className="page-link"
                  onClick={handleClick(page)}
                  disabled={currentPage === page}
                  active={currentPage === page}
                >
                  {page}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default PaginationNav;
