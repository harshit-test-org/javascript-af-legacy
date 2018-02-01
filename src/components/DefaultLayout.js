import React, { Component } from 'react'
import firebase from '../lib/firebase'
import Homebar from './styles/Homebar'

const Fragment = React.Fragment
const Auth = firebase.auth()

export default class Layout extends Component {
  handleLogin = async () => {
    const provider = new firebase.auth.GithubAuthProvider()
    try {
      const res = await Auth.signInWithPopup(provider)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  render () {
    return (
      <Fragment>
        <Homebar handleLogin={this.handleLogin} />
        {this.props.children}
      </Fragment>
    )
  }
}
