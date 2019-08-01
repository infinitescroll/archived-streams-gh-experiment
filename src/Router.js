import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, ErrorPage, SignUp, Auth, AuthApp } from './pages'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/error" component={ErrorPage} />
      <Route path="/start" component={SignUp} />
      <Route path="/auth/magic-link" component={Auth} />
      <Route path="/authorize/app/:app" component={AuthApp} />
    </Switch>
  </Router>
)
