/**
 * 部分浏览器安全机制会拦截window.open
 */
const windowOpen = url => {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export {
  windowOpen
}