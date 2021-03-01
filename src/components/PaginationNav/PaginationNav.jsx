/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
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
    totalPages,
    handleClick,
    handleMoveLeft,
    handleMoveRight,
  } = usePagination(
    totalRecords,
    onPageChanged,
    pageLimit,
    pageNeighbours,
    page,
  );

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles['nav-info']}>
          <span className="s">
            Page: {currentPage} / {totalPages}
          </span>
          <span className="s">Total: {totalRecords}</span>
        </div>
        <nav aria-label="Table Pagination" className={styles['pagination-nav']}>
          <ul className={styles['pagination-list']}>
            {pages.map((pageItem) => {
              if (pageItem === LEFT_PAGE) {
                return (
                  <li key={uniqueId()} className="page-item">
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
              if (pageItem === RIGHT_PAGE) {
                return (
                  <li key={uniqueId()} className="page-item">
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
                <li key={uniqueId()}>
                  <Button
                    className="page-link"
                    onClick={handleClick(pageItem)}
                    disabled={currentPage === pageItem}
                    active={currentPage === pageItem}
                  >
                    {pageItem}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

PaginationNav.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  pageLimit: PropTypes.number.isRequired,
  pageNeighbours: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default PaginationNav;
