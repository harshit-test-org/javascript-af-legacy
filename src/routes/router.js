import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

const Loading = () => <h1>Loading....</h1>

const Index = Loadable({
  loader: () => import('./Index'),
  loading: Loading
})

const Router = () => (
  <Switch>
    <Route exact path={'/'} component={Index} />
  </Switch>
)

export default Router
