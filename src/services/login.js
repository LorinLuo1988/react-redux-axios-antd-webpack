import axios from 'axios'
import { API_URL } from '@/constants'

const login = settings => {
  return axios({
    url: API_URL.admin.LOGIN,
    method: 'POST',
    ...settings
  })
}

const logout = settings => {
  return axios({
    url: API_URL.admin.LOGOUT,
    method: 'POST',
    ...settings
  })
}

export {
  login,
  logout
}