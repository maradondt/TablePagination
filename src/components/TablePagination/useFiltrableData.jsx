import { useMemo, useState } from 'react';

export const useFiltrableData = (data) => {
  const [filterValue, setFilterValue] = useState('');

  const filtredData = useMemo(() => {
    const regexp = new RegExp(filterValue, 'gi');
    const filtredData = data.filter((item) => {
      const index = Object.entries(item)
        .findIndex(([, value]) => {
          return `${value}`.search(regexp) !== -1;
        });
      return index !== -1;
    });
    return filtredData;
  }, [filterValue, data]);

  const handleFilterChange = ({ target }) => {
    setFilterValue(target.value);
  };

  return { filtredData, filterValue, handleFilterChange };
};


