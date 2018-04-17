import React from 'react'
import getConfig from 'next/config'
import Router from 'next/router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const { publicRuntimeConfig: { BACKEND } } = getConfig()
const setUserMutation = gql`
  mutation setUser($user: User!) {
    setUser(user: $user) @client
  }
`

export default (ComposedComponent, redirect = true) =>
  graphql(setUserMutation)(
    class AuthComposed extends React.Component {
      static async getInitialProps ({ req, res, url, ...rest }) {
        let headers = {}
        if (req) {
          headers.cookie = req.headers.cookie
        }
        if (req || (!req && !window.__NEXT_DATA__.props.loggedIn)) {
          const getJson = await fetch(`${BACKEND}/me`, {
            credentials: 'include',
            headers
          })
          if (getJson.status >= 200 && getJson.status < 400) {
            const data = await getJson.json()
            if (!req) {
              window.__NEXT_DATA__.props.loggedIn = true
            }
            return { loggedIn: true, user: data, ...rest }
          } else {
            console.log(redirect)
            if (redirect) {
              if (res) {
                res.writeHead(302, {
                  Location: '/'
                })
                res.end()
                res.finished = true
              } else {
                Router.replace('/')
              }
            }
            return { loggedIn: false, user: null, ...rest }
          }
        }
        return {
          loggedIn: window.__NEXT_DATA__.props.loggedIn,
          user: window.__NEXT_DATA__.props.user,
          ...rest
        }
      }
      componentDidMount () {
        if (this.props.user) {
          this.props.mutate({
            variables: {
              user: {
                ...this.props.user,
                __typename: 'LocalUser'
              }
            }
          })
        }
      }
      render () {
        return <ComposedComponent {...this.props} />
      }
    }
  )
