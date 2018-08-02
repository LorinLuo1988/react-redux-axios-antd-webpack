import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import MainLayout from './layout/Main'
import { PageRouterSwitchProgress, AsyncLoadComponent } from '@/components/higer-components'
import { RouteWrapper } from '@/components/common'
import { getLocalStorage, findParentsByKey } from '@utils'
import { updateRouterMenuAction } from '@redux/common'
import { commonService } from '@services'
import { loadingDecorator } from '@decorator'
import { NOT_NEED_AUTH_ROUTE_PATHS } from '@constants'

// 迷路
const MissWay = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@components/MissWay')))

// 消费记录
const ConsumeRecord = PageRouterSwitchProgress(AsyncLoadComponent(() => import('./ConsumeRecord')))

// 任务管理
const TaskManage = PageRouterSwitchProgress(AsyncLoadComponent(() => import('./TaskManage')))

// 呼叫任务详情
const CallTaskDetail = PageRouterSwitchProgress(AsyncLoadComponent(() => import('./CallTaskDetail')))

const mapStateToProps = state => {
  return {
    selectedKeys: state.commonReducer.selectedKeys,
    router: state.commonReducer.router
  }
}

const mapActionToProps = dispatch => ({
  updateRouterMenuAction: payload => dispatch(updateRouterMenuAction(payload))
})

@loadingDecorator
@autobind
class Root extends Component {
  static propTypes = {
    updateRouterMenuAction: PropTypes.func.isRequired,
    selectedKeys: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      Layout: MainLayout,
      loadingUserInfo: false,
      userName: '' // 登陆用户名
    }
  }
  swicthLayout (Layout) {
    this.setState({Layout})
  }
  updateRouterMenu () {
    const router = this.props.router
    const selectedKeys = [window.$history && window.$history.location.pathname]
    const openKeys = findParentsByKey(window.$history && window.$history.location.pathname, router, 'path') || []
    
    this.props.updateRouterMenuAction({
      openKeys,
      selectedKeys
    })
  }
  handleRouterChange ({ pathname }) {
    if (!this.props.selectedKeys.includes(pathname)) {
      this.props.updateRouterMenuAction({
        selectedKeys: [pathname]
      })
    }
  }
  fetchUserInfo () {
    this.toggleLoading(true, 'loadingUserInfo')
    commonService.fetchUserInfo().then(({ data }) => {
      this.setState({ userName: data.name })
    }).finally(() => this.toggleLoading(false, 'loadingUserInfo'))
  }
  listenerRouterChange () {
    if (this.isListenerRouterChange) {
      return false
    }

    if (!getLocalStorage('token')) {
      window.location = '/login.html'
    }

    if (window.$history) {
      this.updateRouterMenu()
      window.$history.listen(this.handleRouterChange)
      this.isListenerRouterChange = true
    }
  }
  componentDidUpdate () {
    this.listenerRouterChange()
  }
  componentDidMount () {
    const pathname = window.location.pathname

    if (!NOT_NEED_AUTH_ROUTE_PATHS.includes(pathname)) {
      this.fetchUserInfo() 
    }

    this.listenerRouterChange()
  }
  render () {
    let { Layout, userName, loadingUserInfo } = this.state
    const router = this.props.router

    return (
      <Router>
        <Switch>
          {
            loadingUserInfo ? null : (
              <React.Fragment>
                <Route path="/">
                  <Layout userName={userName}>
                    <Switch>
                      <Route
                        path="/consume-record"
                        exact={true}
                        strict={true}
                        component={ConsumeRecord}
                      />
                      <Route
                        path="/task-manage"
                        exact={true}
                        strict={true}
                        component={TaskManage}
                      />
                      <Route
                        path="/call-task/detail"
                        exact={true}
                        strict={true}
                        component={CallTaskDetail}
                      />
                      <RouteWrapper routes={router.children || []} />
                      <Route component={MissWay} />
                    </Switch>
                  </Layout>
                </Route>
              </React.Fragment>
            )
          }
        </Switch>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapActionToProps)(Root)