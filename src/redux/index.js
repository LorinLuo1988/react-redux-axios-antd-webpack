import { all, fork } from 'redux-saga/effects'
import { commonReducer } from './common'
import { loginReducer, loginSaga } from './login'

const reducers = {
  commonReducer,
  loginReducer
}

function* rootSaga () {
  yield all([
    fork(loginSaga)
  ])
}

export {
  reducers,
  rootSaga
}
