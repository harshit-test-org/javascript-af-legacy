import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import firebase from '../lib/firebase'
import { setUser } from '../redux/actions/user'

const Auth = firebase.auth()

class PrivateRoute extends React.Component {
  state = {
    auth: true
  }
  componentWillMount () {
    Auth.onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        this.props.setUser(user)
      } else {
        this.setState({ auth: false })
      }
    })
  }
  render () {
    return (
      <React.Fragment>
        {this.state.auth ? <Route {...this.props} /> : <Redirect to="/" />}
      </React.Fragment>
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

export default connect(null, mapDispatchToProps)(PrivateRoute)
