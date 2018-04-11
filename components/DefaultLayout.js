import React, { Component } from 'react'
import Router from 'next/router'
import gql from 'graphql-tag'
import { injectGlobal } from 'styled-components'
import getConfig from 'next/config'
import { graphql } from 'react-apollo'
// import Homebar from './styles/Homebar'
import Head from 'next/head'
import Loading from './Loading'
// import Footer from './Footer'

const { publicRuntimeConfig: { BACKEND } } = getConfig()
const Fragment = React.Fragment

injectGlobal`
* {
    margin: 0;
    box-sizing:border-box;
}
html, body {
    background: #e6ecf0;
    font-family: 'Roboto', sans-serif;
}
h1, h2, h3, h4, h5, h6{
  font-family: 'Quicksand', Segoe UI, Tahoma,Verdana, sans-serif;
}
.chat{
    overflow: auto;
    grid-row: 1 / 2;
    display: flex;
    grid-column: 2 / 3;
    flex-direction: column;
}
.chat--closed{
    overflow: auto;
    grid-row: 1 / 2;
    display: flex;
    grid-column: 2 / 3;
    flex-direction: column;
}
@media all and (max-width: 550px){
.chat{
grid-column: 1 / 3;
}
.chat--closed{
   display: none;
}
}
`

class Layout extends Component {
  state = {
    loading: true
  }
  componentDidMount () {
    fetch(`${BACKEND}/me`, {
      credentials: 'include'
    }).then(res => {
      if (res.status !== 200) {
        this.setState({
          loading: false
        })
      } else {
        res
          .json()
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
                Router.replace('/home')
              })
          })
          .catch(() => {
            this.setState({
              loading: false
            })
          })
      }
    })
  }
  handleLogin = async () => {
    window.location.href = `${BACKEND}/auth/github/start`
  }
  render () {
    const title = this.props.title
      ? `${this.props.title} | Javascript.af`
      : 'Javascript.af'
    return (
      <Fragment>
        <Head>
          <title>{title}</title>
        </Head>
        {this.state.loading ? (
          <Loading />
        ) : (
          <Fragment>{this.props.children}</Fragment>
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

export default graphql(setUserMutation)(Layout)
