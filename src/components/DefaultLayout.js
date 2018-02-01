import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { setUser } from '../redux/actions/user'
import firebase from '../lib/firebase'
import Homebar from './styles/Homebar'

const Fragment = React.Fragment
const Auth = firebase.auth()

class Layout extends Component {
  componentWillMount () {
    Auth.onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user)
        this.props.history.replace('/user/home')
      }
    })
  }
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

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setUser
    },
    dispatch
  )
}

export default compose(connect(null, mapDispatchToProps), withRouter)(Layout)
