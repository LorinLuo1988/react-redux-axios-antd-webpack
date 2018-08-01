import React from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'
import styles from './style'

const PageHeader = ({title, extra}) => {
  return (
    <Card
      className={styles['page-header']}
      title={title}
      extra={extra}>
    </Card>
  )
}

PageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  extra: PropTypes.node
}

export default PageHeader