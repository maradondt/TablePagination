import { useMemo, useState } from 'react';

const useFiltrableData = (data) => {
  const [filterValue, setFilterValue] = useState('');
  const regexp = new RegExp(filterValue, 'gi');

  const filtredData = useMemo(() => data.filter((item) => {
    const index = Object.entries(item)
      .findIndex(([, value]) => `${value}`.search(regexp) !== -1);
    return index !== -1;
  }), [filterValue, data]);

  const handleFilterChange = ({ target }) => {
    setFilterValue(target.value);
  };

  return { filtredData, filterValue, handleFilterChange };
};

export default useFiltrableData;
