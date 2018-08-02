import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

const RouteWrapper = ({ routes = [] }) => {
  const routers = routes.map(route => (
    <Route
      key={route.path}
      path={route.path}
      render={
        props => (
          <route.component routes={route.children} {...props} />
        )
      }
      exact={true}
      strict={true}>
    </Route>
  ))

  return routes.length ? (
    <Switch>
      {routers}
    </Switch>
  ) : null
}

RouteWrapper.propTypes = {
  routes: PropTypes.array.isRequired
}

export default RouteWrapper