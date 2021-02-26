import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Table from './Table/Table';

const Pagination = (props) => {
  const {
    data,
    loadingProcessState,
  } = props;

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null});
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    setSortedData(data);
  }, [loadingProcessState, data]);

  const requestSort = (key) => {
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      setSortConfig({ key, direction: 'desc' });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  useEffect(() => {
    const { key, direction } = sortConfig;
    const newData = _.orderBy(data, (o) => o[key], direction);
    setSortedData(newData);
  }, [sortConfig, data]);

  return <Table data={sortedData} requestSort={requestSort} />
};

export default Pagination;
