import axios from 'axios'
import { API_URL } from '@/constants'

const { CASE_IMPORT, FETCH_USER_INFO } = API_URL.common

const caseImport = data => {
  return axios({
    url: CASE_IMPORT,
    method: 'POST',
    data
  })
}

const fetchUserInfo = () => {
  return axios({
    url: FETCH_USER_INFO,
    method: 'GET'
  })
}

export {
  caseImport,
  fetchUserInfo
}