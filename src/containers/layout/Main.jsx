import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import {
  CompanyInfo,
  RouterMenu,
  User
} from '@components/main-layout'

const { Header, Content, Sider } = Layout

class MainLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired
  }
  render () {
    return (
      <Layout className="main-layout">
        <Header className="header">
          <div className="pull-left">
            <CompanyInfo className="company-info" companyAvator={require('@/imgs/common/logo.png')}></CompanyInfo>
          </div>
          <div className="pull-right">
            <User userName={this.props.userName}></User>
          </div>
        </Header>
        <Layout className="content-layout">
          <Sider className="sider">
            <RouterMenu></RouterMenu>
          </Sider>
          <Layout className="content">
            <Content style={{ position: 'relative' }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}


export default MainLayout