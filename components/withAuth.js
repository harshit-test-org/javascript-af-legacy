import React from 'react'
import getConfig from 'next/config'
import Router from 'next/router'

const {
  publicRuntimeConfig: { BACKEND }
} = getConfig()

const { Provider, Consumer } = React.createContext()

export { Consumer }

export default (ComposedComponent, redirect = true) =>
  class AuthComposed extends React.Component {
    static async getInitialProps(ctx) {
      const { req, res, ...rest } = ctx
      let headers = {}
      let gprops = {}
      if (ComposedComponent.getInitialProps) {
        gprops = await ComposedComponent.getInitialProps(ctx)
      }
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
          return { loggedIn: true, user: data, ...rest, ...gprops }
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
          return { loggedIn: false, user: null, ...rest, ...gprops }
        }
      }
      return {
        loggedIn: window.__NEXT_DATA__.props.loggedIn,
        user: window.__NEXT_DATA__.props.user,
        ...rest,
        ...gprops
      }
    }

    render() {
      return (
        <Provider value={this.props.user}>
          <ComposedComponent {...this.props} />
        </Provider>
      )
    }
  }
