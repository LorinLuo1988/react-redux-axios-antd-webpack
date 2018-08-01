const setStorage = (storage) => (key, value) => storage.setItem(key, JSON.stringify(value))
const getStorage = (storage) => (key, jsonParse = true) => {
  try {
    const str = storage.getItem(key)

    return jsonParse ? JSON.parse(str) : str
  } catch (err) {
    return null
  }
}

const clearStorage = (storage) => (key) => storage.removeItem(key)

const setLocalStorage = setStorage(localStorage)
const getLocalStorage = getStorage(localStorage)
const clearLocalStorage = clearStorage(localStorage)

const getSessionStorage = getStorage(sessionStorage)
const setSessionStorage = setStorage(sessionStorage)
const clearSessionStorage = clearStorage(localStorage)

export {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  setSessionStorage,
  getSessionStorage,
  clearSessionStorage
}
