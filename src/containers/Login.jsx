import React from 'react'
import { LoginBox } from '@components/login'
import styles from '@styles/containers/login/login'

const Login = () => {
  return (
    <div className={styles['login-box']}>
      <LoginBox />
    </div>
  )
}

export default Login