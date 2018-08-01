import { PageRouterSwitchProgress, AsyncLoadComponent, ReMountRouterComponent } from '@/components/higer-components'

const wrapperComponent = Component => (
  ReMountRouterComponent(PageRouterSwitchProgress(AsyncLoadComponent(Component)))
)

// 案件管理
const Home = wrapperComponent(() => import('@/containers/Home.jsx'))

const routerFactory = () => ({
  path: '/',
  children: [
    {
      path: '/home',
      title: '主页',
      code: '22000',
      component: Home,
      icon: 'home'
    }
  ]
})

export default routerFactory