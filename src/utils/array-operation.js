const noop = () => {}

const objectArrayIsIncludes = (key = 'name', value = '', arr = []) => {
  return arr.find(item => item[key] === value)
}

const arrayContainKeyValue = (arr = [], key, value) => {
  if (key === undefined || value === undefined) {
    return []
  }

  return arr.filter(item => item[key] === value)
}

/**
 * 数组去重
 * @param  {Array}  arr 原始数组
 * @param  {String} key 对象数组的key
 * @return {Array}      去重后的数组
 */
const unique = (arr = [], key) => {
  const map = new Map()

  return arr.filter(item => {
    if (key) {
      return !map.has(item[key]) && map.set(item[key], 1)
    } else {
      return !map.has(item) && map.set(item, 1)
    }
  })
}

/**
 * 遍历数组
 * @param  {Array} arr                         数组
 * @param  {Object} options                    额外参数
 * @param  {Function} options.conditionFn      条件函数
 * @param  {Function} options.matchCallback    满足条件的回掉函数
 * @param  {Function} options.mismatchCallback 不满足条件的回掉函数
 * @param  {Boolean} options.fristMatchStop    第一次满足条件时停止遍历
 * @return {undefined}                         undefined
 */
const traversalArr = (arr = [], options = {}) => {
  const conditionFn = options.conditionFn || noop
  const matchCallback = options.matchCallback || noop
  const mismatchCallback = options.mismatchCallback || noop
  const fristMatchStop = options.fristMatchStop || false

  for (let item of arr) {
    if (conditionFn(item)) {
      matchCallback(item, arr)

      if (fristMatchStop) {
        break
      }
    } else {
      mismatchCallback(item, arr)
    }
  }
}

export {
  objectArrayIsIncludes,
  arrayContainKeyValue,
  unique,
  traversalArr
}
