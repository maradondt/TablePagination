import { useCallback, useMemo, useState } from 'react'

const useFiltrableData = (data) => {
  const [filterValue, setFilterValue] = useState('')
  const regexp = useMemo(() => new RegExp(filterValue, 'gi'), [filterValue])

  const filtredData = useMemo(
    () =>
      data.filter((item) => {
        const index = Object.entries(item).findIndex(
          ([, value]) => `${value}`.search(regexp) !== -1
        )
        return index !== -1
      }),
    [regexp, data]
  )

  const handleFilterChange = useCallback(({ target }) => {
    setFilterValue(target.value)
  }, [])

  return { filtredData, filterValue, handleFilterChange }
}

export default useFiltrableData
