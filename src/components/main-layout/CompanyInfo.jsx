import React from 'react'
import PropTypes from 'prop-types'

const CompanyInfo = ({ className, companyAvator }) => {
  return (
    <div className={className}>
      <img className="avator" src={companyAvator} alt=""/>
      Chatbots智能语音机器人
    </div>
  )
}

CompanyInfo.propTypes = {
  className: PropTypes.string,
  companyAvator: PropTypes.string
}

export default CompanyInfo