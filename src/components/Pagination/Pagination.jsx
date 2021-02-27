import React from 'react';
import Table from './Table/Table';
import { useFiltrableData } from './useFiltrableData';
import { useSortableData } from './useSortableData';

const Pagination = (props) => {
  const { data } = props;

  const {
    filtredData,
    filterValue,
    handleFilterChange
  } = useFiltrableData(data);
  const { items: tableData, requestSort } = useSortableData(filtredData);

  return (
    <>
      <input
        type="text"
        name="filter"
        id="filter"
        placeholder="Enter a query to filter"
        value={filterValue}
        onChange={handleFilterChange}
      />
      <Table data={tableData} requestSort={requestSort} />
    </>
  );
};

export default Pagination;
