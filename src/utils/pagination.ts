/**
 * @description Calculate the number of pages.
 * @param count Number of data
 * @param perPageCount Number of data per page
 * @returns pageNum the number of pages
 */
const calculatePageNum = (count: number, perPageCount = 10): number => {
  // console.log('count', count)
  // console.log('perPageCount', perPageCount)

  let pageNum = 0

  if (count < 0 || perPageCount < 0) {
    throw new RangeError('Pagination Algorithm Parameter Range Error')
  }

  if (count !== 0) {
    pageNum = Math.ceil(count / perPageCount)
  }

  // console.log('pageNum', pageNum)

  return pageNum
}

export default calculatePageNum
