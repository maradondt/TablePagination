import React, { useState } from 'react';
import Table from './Table/Table';

const Pagination = (props) => {
  const {
    data,
  } = props;

  const [sortedField, setSortedField] = useState(null);

  const sortBy = (field) => {

  };

  const handleSort = (field) => () => {
    sortBy(field);
  };

  return <Table data={data} handleSort={handleSort} />
};

export default Pagination;
