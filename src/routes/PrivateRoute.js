import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect, Route } from 'react-router-dom'
import Loading from '../components/Loading'

class PrivateRoute extends React.Component {
  state = {
    loading: true,
    auth: false
  }
  componentWillMount () {
    fetch(`${process.env.REACT_APP_SERVER_URI}/me`, {
      credentials: 'include'
    })
      .then(res => {
        if (res.status !== 200) {
          this.setState({
            auth: false,
            loading: false
          })
        } else {
          return res.json()
        }
      })
      .then(res => {
        this.props
          .mutate({
            variables: {
              user: {
                ...res,
                __typename: 'LocalUser'
              }
            }
          })
          .then(() => {
            this.setState({
              auth: true,
              loading: false
            })
          })
      })

      .catch(() => {
        this.setState({
          auth: false,
          loading: false
        })
      })
  }
  render () {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <React.Fragment>
        {this.state.auth ? <Route {...this.props} /> : <Redirect to="/" />}
      </React.Fragment>
    )
  }
}

const setUserMutation = gql`
  mutation setUser($user: User!) {
    setUser(user: $user) @client
  }
`

export default graphql(setUserMutation)(PrivateRoute)
