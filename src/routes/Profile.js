import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Loadable from 'react-loadable'
import Layout from '../components/UserLayout'
import Navbar from '../components/styles/Navbar'

const UserCover = styled.div`
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: bottom;
  background-size: cover;
  /* Temporary */
  background-image: url(http://lorempixel.com/1920/1080/);
  height: 100%;
  text-align: center;
  & p {
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 10px;
    font-size: 36px;
  }
  & img {
    border-radius: 50%;
    border: 3px solid #fff;
    height: 120px;
    width: 120px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  & #verified {
    border: 3px solid #fd267d;
  }
`

const Loading = () => <h1 style={{ marginLeft: '25%' }}>Loading....</h1>

const SettingsRoute = Loadable({
  loader: () => import('./profile/settings'),
  loading: Loading
})

class Profile extends Component {
  render () {
    const links = [
      {
        name: 'Posts',
        href: '/profile/projects'
      },
      {
        name: 'Repos',
        href: '/profile/feed'
      },
      {
        name: 'Images',
        href: '/profile/images'
      },
      {
        name: 'Friends',
        href: '/profile/friends'
      },
      {
        name: 'Settings',
        href: '/profile/settings'
      }
    ]
    if (!this.props.user) {
      return null
    }
    const { displayName, photoURL } = this.props.user
    return (
      <Layout>
        <UserCover>
          <p>{displayName}</p>
          <img src={photoURL} alt="profile" />
        </UserCover>
        <Navbar links={links} />
        <Route
          path={`${this.props.match.url}/settings`}
          component={SettingsRoute}
        />
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile)
