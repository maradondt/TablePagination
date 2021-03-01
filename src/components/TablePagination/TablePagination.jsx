import React from 'react';
import styles from './Pagination.module.less';
import Table from '../Table/Table';
import { useFiltrableData } from './useFiltrableData';
import { useSortableData } from './useSortableData';
import { useSelectData } from './useSelectData';
import PaginationNav from '../PaginationNav/PaginationNav';
import SearchInput from '../ui/SearchInput/SearchInput';

const TablePagination = (props) => {
  const { data, pageLimit = 50 } = props;

  const {
    filtredData,
    filterValue,
    handleFilterChange
  } = useFiltrableData(data);

  const { items: sortedData, requestSort, sortConfig } = useSortableData(filtredData);
  const { currentData, currentPage, onPageChanged } = useSelectData(sortedData, pageLimit);



  return (
    <div className={styles.wrapper}>
      <div className={`${styles.controlls} ${styles['controlls_top']}`}>
        <SearchInput
          id="filter"
          value={filterValue}
          onChange={handleFilterChange}
        />
        <PaginationNav
          totalRecords={sortedData.length}
          pageLimit={pageLimit}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
          page={currentPage}
        />
      </div>
      <Table data={currentData} requestSort={requestSort} sortConfig={sortConfig} />
      <div className={styles['controlls_bottom']}>
        <PaginationNav
          totalRecords={sortedData.length}
          pageLimit={pageLimit}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
          page={currentPage}
        />
      </div>
    </div>
  );
};

export default React.memo(TablePagination);
