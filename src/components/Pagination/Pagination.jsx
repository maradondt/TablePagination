import React, { useState } from 'react';
import styles from './Pagination.module.less';
import Table from '../Table/Table';
import { useFiltrableData } from './useFiltrableData';
import { useSortableData } from './useSortableData';
import { useSelectData } from './useSelectData';
import PaginationNav from '../PaginationNav/PaginationNav';

const Pagination = (props) => {
  const { data } = props;

  const {
    filtredData,
    filterValue,
    handleFilterChange
  } = useFiltrableData(data);

  const [pageLimit, setPageLimit] = useState('10');;
  const handlePageLimit = ({ target }) => {
    setPageLimit(target.value || 1);
    onPageChanged(1);
  };

  const { items: sortedData, requestSort } = useSortableData(filtredData);
  const { currentData, currentPage, onPageChanged } = useSelectData(sortedData, pageLimit);



  return (
    <div className={styles.wrapper}>
    <input type="number" value={pageLimit || 1} onChange={handlePageLimit} />
      <div className={styles.filter}>
        <span className={styles['filter-icon']}>
          <svg
            width="22"
            height="25"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21.6992 20.7516L17.4152 16.0781C17.2219 15.8672 16.9598 15.75 16.6848 15.75H15.9844C17.1703 14.0953 17.875 12.0141 17.875 9.75C17.875 4.36406 13.8746 0 8.9375 0C4.00039 0 0 4.36406 0 9.75C0 15.1359 4.00039 19.5 8.9375 19.5C11.0129 19.5 12.9207 18.7313 14.4375 17.4375V18.2016C14.4375 18.5016 14.5449 18.7875 14.7383 18.9984L19.0223 23.6719C19.4262 24.1125 20.0793 24.1125 20.4789 23.6719L21.6949 22.3453C22.0988 21.9047 22.0988 21.1922 21.6992 20.7516ZM8.9375 15.75C5.89961 15.75 3.4375 13.0688 3.4375 9.75C3.4375 6.43594 5.89531 3.75 8.9375 3.75C11.9754 3.75 14.4375 6.43125 14.4375 9.75C14.4375 13.0641 11.9797 15.75 8.9375 15.75Z" />
          </svg>
        </span>
        <input
          type="text"
          name="filter"
          id="filter"
          className={styles['filter-input']}
          placeholder="Enter a query to filter"
          value={filterValue}
          onChange={handleFilterChange}
        />
      </div>
      <PaginationNav
        totalRecords={sortedData.length}
        pageLimit={pageLimit}
        pageNeighbours={1}
        onPageChanged={onPageChanged}
        page={currentPage}
      />
      <Table data={currentData} requestSort={requestSort} />
      <PaginationNav
        totalRecords={sortedData.length}
        pageLimit={pageLimit}
        pageNeighbours={1}
        onPageChanged={onPageChanged}
        page={currentPage}
      />
    </div>
  );
};

export default Pagination;
