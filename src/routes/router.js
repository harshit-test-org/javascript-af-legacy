import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import PrivateRoute from './PrivateRoute'
import Loading from '../components/Loading'

const Index = Loadable({
  loader: () => import('./Index'),
  loading: Loading
})

const UserHome = Loadable({
  loader: () => import('./UserHome'),
  loading: Loading
})
const UserProfile = Loadable({
  loader: () => import('./Profile'),
  loading: Loading
})

const Router = () => (
  <Switch>
    <Route exact path={'/'} component={Index} />
    <PrivateRoute path={'/home'} component={UserHome} />
    <PrivateRoute path={'/profile'} component={UserProfile} />
  </Switch>
)

export default Router
