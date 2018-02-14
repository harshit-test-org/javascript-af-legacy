import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import Homebar from './styles/Homebar'
import Helmet from 'react-helmet'
import Loading from './Loading'
import Footer from './Footer'

const Fragment = React.Fragment

class Layout extends Component {
  state = {
    loading: true
  }
  componentWillMount () {
    fetch(`${process.env.REACT_APP_SERVER_URI}/me`, {
      credentials: 'include'
    })
      .then(res => {
        if (res.status !== 200) {
          this.setState({
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
            this.props.history.replace('/home')
          })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }
  handleLogin = async () => {
    window.location.href = `${
      process.env.REACT_APP_SERVER_URI
    }/auth/github/start`
  }
  render () {
    const title = this.props.title
      ? `${this.props.title} | Javascript.af`
      : 'Javascript.af'
    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {this.state.loading ? (
          <Loading />
        ) : (
          <Fragment>
            <Homebar handleLogin={this.handleLogin} />
            {this.props.children}
            <Footer />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

const setUserMutation = gql`
  mutation setUser($user: User!) {
    setUser(user: $user) @client
  }
`

export default compose(graphql(setUserMutation), withRouter)(Layout)
