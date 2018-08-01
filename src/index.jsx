import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'
import Root from '@/containers/Root'
import store from '@/store'
import { API_ROOT } from '@constants'

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import 'antd/dist/antd.less'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import '@/styles/common'

// 全局异步请求拦截
import '@/utils/interceptor'

// 异步请求公共配置
axios.defaults.baseURL = API_ROOT[process.env.ENV]
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 50000

const renderApp = () => {
  render(
    <Provider store={store}>
      <LocaleProvider locale={zh_CN}>
        <Root></Root>
      </LocaleProvider>
    </Provider>,
    document.getElementById('app')
  )
}

// 按需加载mock
if (process.env.ENV === 'mock') {
  require.ensure([], require => {
    require('./mock')
    renderApp()
  })
} else {
  renderApp()
}
