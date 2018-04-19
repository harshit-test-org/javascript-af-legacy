import React, { Fragment, Component } from 'react'
import Sidebar, { NavIcon } from './styles/Sidebar'
import HomeIcon from '../assets/icons/home'
import StarIcon from '../assets/icons/star'
import SearchIcon from '../assets/icons/search'
import TrendingIcon from '../assets/icons/trending'
import AccountIcon from '../assets/icons/account'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const Logo = styled.div`
  display: flex;
  justify-content: center;
  padding: 20% 0 20% 0;
  & > img {
    height: 40px;
    width: 40px;
  }
  @media all and (max-width: 570px) {
    display: none;
  }
`
const query = gql`
  query LocalUser {
    user @client {
      _id
    }
  }
`

class Sidemenu extends Component {
  render () {
    return (
      <Sidebar>
        <Logo>
          <img src="/static/logo.png" alt="" />
        </Logo>
        <NavIcon href="/" active={this.props.pathname === '/'}>
          <HomeIcon />
        </NavIcon>
        <NavIcon href="/social" active={this.props.pathname === '/social'}>
          <TrendingIcon />
        </NavIcon>
        <NavIcon href="/starred" active={this.props.pathname === '/starred'}>
          <StarIcon />
        </NavIcon>
        <NavIcon href="/search" active={this.props.pathname === '/search'}>
          <SearchIcon />
        </NavIcon>
        <Query query={query} skip={typeof window === 'undefined'}>
          {result => {
            if (result.loading) return <h1>Loading</h1>
            if (result.error) return <h1>AWWW Error</h1>
            console.log('sidemenu querydata: ', result)
            return (
              <Fragment>
                {
                  <NavIcon
                    href={`/user?id=${result.data.user._id}`}
                    active={this.props.pathname === '/profile'}
                  >
                    <AccountIcon />
                  </NavIcon>
                }
              </Fragment>
            )
          }}
        </Query>
      </Sidebar>
    )
  }
}

export default Sidemenu
