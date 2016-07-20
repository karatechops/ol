import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from 'containers/App'
import BusinessListPage from './containers/BusinessListPage'
import BusinessPage from 'containers/BusinessPage'
import NotFoundPage from 'containers/NotFoundPage'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BusinessListPage} />
      <Route path="/businesses/:page" component={BusinessListPage} />
      <Route path="/business/:id" component={BusinessPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Router>
)
