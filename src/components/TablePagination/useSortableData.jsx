import _ from 'lodash'
import { useCallback, useMemo, useState } from 'react'

const defaultConfig = { key: 'id', direction: 'asc' }

const useSortableData = (items) => {
  const [sortConfig, setSortConfig] = useState(defaultConfig)

  const sortedItems = useMemo(() => {
    if (sortConfig !== null) {
      const { key, direction } = sortConfig
      return _.orderBy(items, (o) => o[key], direction)
    }
    return [...items]
  }, [items, sortConfig])

  const requestSort = useCallback(
    (key) => {
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
        setSortConfig({ key, direction: 'desc' })
      } else {
        setSortConfig({ key, direction: 'asc' })
      }
    },
    [sortConfig]
  )

  return { items: sortedItems, requestSort, sortConfig }
}

export default useSortableData
