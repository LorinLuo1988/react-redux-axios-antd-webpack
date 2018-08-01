import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]

const { FETCH_USER_INFO } = API_URL.common

Mock.mock(`${HTTP_ROOT}/${FETCH_USER_INFO}`, 'get', {
  code: 200,
  ok: true,
  data: {
    id: '@id()',
    name: '@cname(2, 3)',
    phone: /^1(3|4|5|7|8)\d{9}$/,
    loginName: '@email()',
    perms: [
      {name: '我的案件', code: '21000'},
      {name: '案件管理', code: '22000'},
      {name: '任务管理', code: '24000'},
      {name: '系统设置', code: '23000'},
      {name: '委托方管理', code: '23500'},
      {name: '密码设置', code: '23400'},
      {name: '人员管理', code: '23200'},
      {name: '部门管理', code: '23300'},
    ]
  }
})
