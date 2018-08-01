import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import MainLayout from './layout/Main'
import { PageRouterSwitchProgress, AsyncLoadComponent } from '@/components/higer-components'
import { RouteWrapper } from '@/components/common'
import { getLocalStorage, findParentsByKey } from '@utils'
import { updateRouterMenuAction } from '@redux/common'
import { commonService } from '@services'
import { loadingDecorator } from '@decorator'
import { NOT_NEED_AUTH_ROUTE_PATHS } from '@constants'

const MissWay = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@components/MissWay')))
const Login = PageRouterSwitchProgress(AsyncLoadComponent(() => import('./Login')))
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

    this.swicthLayout = this.swicthLayout.bind(this)
    this.handleRouterChange = this.handleRouterChange.bind(this)
    this.fetchUserInfo = this.fetchUserInfo.bind(this)
    this.toggleLoading = this.toggleLoading.bind(this)
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
  componentDidMount () {
    const pathname = window.location.pathname

    if (!NOT_NEED_AUTH_ROUTE_PATHS.includes(pathname)) {
      this.fetchUserInfo() 
    }
    
    setTimeout(() => {
      if (!getLocalStorage('token')) {
        window.$history && window.$history.push('/login')
      }
      
      this.updateRouterMenu()
      window.$history && window.$history.listen(this.handleRouterChange)
    }, 0)
  }
  render () {
    const { Layout, userName, loadingUserInfo } = this.state
    const router = this.props.router
    
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          {
            loadingUserInfo ? null : (
              <Route path="/">
                <Layout userName={userName}>
                  <Switch>
                    <RouteWrapper routes={router.children || []}></RouteWrapper>
                    <Redirect from='//' to='/home'/>
                    <Route component={MissWay}></Route>
                  </Switch>
                </Layout>
              </Route>
            )
          }
        </Switch>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapActionToProps)(Root)