// 函数防抖
export const debounce = (fn, delay = 200) => {
  let timer

  return function (...args) {
    const ctx = this
    if (timer) {
      clearTimeout(timer)
    }
    
    timer = setTimeout(() => {
      fn.apply(ctx, args)
    }, delay)
  }
}

// 函数节流
export const throttle = (fn, wait = 200) => {
  let timer,
    isFirst = true
  return function (...args) {
    const ctx = this
    if (isFirst) {
      fn.apply(ctx, args)
      return isFirst = false
    }
    if (timer) {
      return false
    }
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fn.apply(ctx, args)
    }, wait)
  }
}