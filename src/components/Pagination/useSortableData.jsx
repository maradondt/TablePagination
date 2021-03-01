import _ from 'lodash';
import { useMemo, useState } from 'react';

export const useSortableData = (
  items,
  config = { key: null, direction: 'asc' }
) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    if (sortConfig !== null) {
      const { key, direction } = sortConfig;
      return _.orderBy(items, (o) => o[key], direction);
    }
    return [...items];
  }, [items, sortConfig]);

  const requestSort = (key) => {
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      setSortConfig({ key, direction: 'desc' });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  return { items: sortedItems, requestSort, sortConfig };
};
