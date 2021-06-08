/* eslint-disable no-shadow */
import _ from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const LEFT_PAGE = 'LEFT'
export const RIGHT_PAGE = 'RIGHT'
const range = (from, to) => _.range(from, to + 1)

export const usePagination = (totalRecords, onPageChanged, pageLimit, pageNeighbours, page) => {
  const [currentPage, setCurrentPage] = useState(page)
  const totalPages = useMemo(() => Math.ceil(totalRecords / pageLimit), [pageLimit, totalRecords])

  useEffect(() => {
    setCurrentPage(page)
  }, [page])

  const pages = useMemo(() => {
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)
      let pages = range(startPage, endPage)

      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }

      return [1, ...pages, totalPages]
    }

    return range(1, totalPages)
  }, [currentPage, pageNeighbours, totalPages])

  const gotoPage = useCallback(
    (page) => {
      const newCurrentPage = Math.max(0, Math.min(page, totalPages))
      setCurrentPage(newCurrentPage)
      onPageChanged(newCurrentPage)
    },
    [onPageChanged, totalPages]
  )

  const handleClick = useCallback(
    (page) => (e) => {
      e.preventDefault()
      gotoPage(page)
    },
    [gotoPage]
  )

  const handleMoveLeft = useCallback(
    (e) => {
      e.preventDefault()
      gotoPage(currentPage - pageNeighbours * 2 - 1)
    },
    [currentPage, gotoPage, pageNeighbours]
  )

  const handleMoveRight = useCallback(
    (e) => {
      e.preventDefault()
      gotoPage(currentPage + pageNeighbours * 2 + 1)
    },
    [currentPage, gotoPage, pageNeighbours]
  )

  return {
    pages,
    currentPage,
    handleClick,
    handleMoveLeft,
    handleMoveRight,
    totalPages
  }
}
