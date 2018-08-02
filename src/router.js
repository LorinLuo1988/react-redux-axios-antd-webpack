import { PageRouterSwitchProgress, AsyncLoadComponent, ReMountRouterComponent } from '@/components/higer-components'

const wrapperComponent = Component => (
  ReMountRouterComponent(PageRouterSwitchProgress(AsyncLoadComponent(Component)))
)

// 概况
const General = wrapperComponent(() => import('@/containers/General'))

// 呼叫任务
const CallTask = wrapperComponent(() => import('@/containers/CallTask'))

// 通话清单
const CallBill = wrapperComponent(() => import('@/containers/CallBill'))

// 账户
const Account = wrapperComponent(() => import('@/containers/Account'))

// 系统管理
const SystemManage = wrapperComponent(() => import('@/containers/SystemManage'))

// 系统管理
const Setting = wrapperComponent(() => import('@/containers/Setting'))

const routerFactory = () => ({
  path: '/',
  children: [
    {
      path: '/general',
      title: '概况',
      component: General,
      icon: 'home'
    },
    {
      path: '/call-task',
      title: '呼叫任务',
      component: CallTask,
      icon: 'home'
    },
    {
      path: '/call-bill',
      title: '通话清单',
      component: CallBill,
      icon: 'home'
    },
    {
      path: '/account',
      title: '账户',
      component: Account,
      icon: 'home'
    },
    {
      path: '/system-manage',
      title: '系统管理',
      component: SystemManage,
      icon: 'home'
    },
    {
      path: '/setting',
      title: '设置',
      component: Setting,
      icon: 'home'
    }
  ]
})

export default routerFactory