import React, { Component } from 'react'
import HomePage from '../components/HomePage'
import withAuth from '../components/withAuth'
import IndexPage from '../components/IndexPage'

class Index extends Component {
  render() {
    return this.props.loggedIn ? <HomePage /> : <IndexPage />
  }
}

export default withAuth(Index, false)
