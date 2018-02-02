import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { setUser } from '../redux/actions/user'
import firebase from '../lib/firebase'
import Homebar from './styles/Homebar'
import Helmet from 'react-helmet'
import Loading from './Loading'

const Fragment = React.Fragment
const Auth = firebase.auth()

class Layout extends Component {
  componentWillMount () {
    Auth.onAuthStateChanged(user => {
      this.props.dispatch({ type: 'UNSET_LOADING' })
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
    const title = this.props.title
      ? `${this.props.title} | Javascript.af`
      : 'Javascript.af'
    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {this.props.loading ? (
          <Loading />
        ) : (
          <Fragment>
            <Homebar handleLogin={this.handleLogin} />
            {this.props.children}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

function mapStateToProps (state) {
  return {
    loading: state.authLoading
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Layout)
