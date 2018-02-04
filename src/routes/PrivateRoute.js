import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import firebase from '../lib/firebase'
import { setUser } from '../redux/actions/user'
import Loading from '../components/Loading'

const Auth = firebase.auth()

class PrivateRoute extends React.Component {
  state = {
    auth: true
  }
  componentWillMount () {
    console.log(this.props)
    Auth.onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user)
        this.props.dispatch({ type: 'UNSET_LOADING' })
      } else {
        this.setState({ auth: false })
      }
    })
  }
  render () {
    if (this.props.loading) {
      return <Loading />
    }
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
      setUser,
      dispatch
    },
    dispatch
  )
}

export default connect(
  state => ({ loading: state.authLoading }),
  mapDispatchToProps
)(PrivateRoute)
