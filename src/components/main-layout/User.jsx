import React from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutAction } from '@/redux/login'

const { Item: MenuItem } = Menu

const DropdownMenu = (onClickMenu) => {
  return (
    <Menu onClick={onClickMenu}>
      <MenuItem key="changePassword">
        <Icon type="edit" />
        <span className="margin-left-xs">密码设置</span>
      </MenuItem>
      <MenuItem key="logout">
        <Icon type="logout" />
        <span className="margin-left-xs">退出登录</span>
      </MenuItem>
    </Menu>
  )
}

const User = props => {
  function handleClickMenu ({ key }) {
    switch (key) {
    case 'logout':
      props.logoutAction()
      break
    case 'changePassword':
      window.$history.push('/system-setting/password-setting')
      break
    }
  }

  return (
    <Dropdown
      overlay={DropdownMenu(handleClickMenu)}
      placement="bottomRight"
      trigger={['click']}>
      <div className="user-box" style={{ display: 'flex', alignItems: 'center' }}>
        <Icon className="margin-right-xs" type="user" style={{ fontSize: '20px' }} />
        <span>{props.userName}</span>
        <Icon className="drop-down-icon" type="down" />
      </div>
    </Dropdown>
  )
}

User.propTypes = {
  logoutAction: PropTypes.func.isRequired,
  userName: PropTypes.string
}

User.defaultProps = {
  userName: ''
}

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => {
      dispatch(logoutAction())
    }
  }
}

const mapStateToProps = () => {
  return {}
}

const WrappedUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

export default WrappedUser