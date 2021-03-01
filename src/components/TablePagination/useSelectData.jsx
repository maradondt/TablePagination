import { useEffect, useMemo, useState } from 'react';

const useSelectData = (data, pageLimit) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = useMemo(() => {
    const offset = (currentPage - 1) * pageLimit;
    return (data.slice(offset, offset + pageLimit));
  }, [currentPage, pageLimit, data]);

  const onPageChanged = (newCurrentPage) => {
    setCurrentPage(newCurrentPage);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return { currentData, currentPage, onPageChanged };
};

export default useSelectData;
