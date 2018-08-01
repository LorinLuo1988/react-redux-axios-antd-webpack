import { createReducer } from '@/utils/redux'
import { put, call, takeEvery } from 'redux-saga/effects'
import {
  LOGIN,
  LOGOUT,
  UPDATE_TOKEN
} from '@/constants/action-name'
import { getLocalStorage, setLocalStorage, clearLocalStorage } from '@utils/storage-operation'
import { loginService } from '@services'

function stateFactory () {
  return {
    token: getLocalStorage('token') || '',
    permissions: [] // 路由权限
  }
}

// action
export const updateTokenAction = (token = '') => {
  return {
    type: UPDATE_TOKEN,
    payload: token
  }
}

export const loginAction = (option = {}) => {
  return {
    type: LOGIN,
    payload: option
  }
}

export const logoutAction = () => {
  return {
    type: LOGOUT
  }
}

// reducer
function updateToken (state, action) {
  return {
    ...state,
    token: action.payload
  }
}

// saga
function* login(option) {
  try {
    const {data: {token: token}} = yield call(loginService.login, { data: option.payload })
    setLocalStorage('token', token)
    yield put(updateTokenAction(token))
    window.location.href = '/home'
  } catch (error) {
    console.log(error)
  }
}

function* logout() {
  yield call(loginService.logout)
  clearLocalStorage('token')
  window.location.href = '/login'
}

export function* loginSaga () {
  console.log('login saga')
  yield takeEvery(LOGIN, login)
  yield takeEvery(LOGOUT, logout)
}

export const loginReducer = createReducer(stateFactory(), {
  [UPDATE_TOKEN]: updateToken
})