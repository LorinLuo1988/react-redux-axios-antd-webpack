/**
 * excel 相关操作和转换
 */

/**
 * 将excel的列的数字形式转换为字母形式
 */
const A2Z = Array.from({ length: 26 }, (item, index) => String.fromCharCode(65 + index))
const columnNumberToLetter = (num, res = '') => {
  if (num <= 0) return res
  return columnNumberToLetter(parseInt((num - 1) / 26), A2Z[(num - 1) % 26] + res)
}

export {
  columnNumberToLetter
}
