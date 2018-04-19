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
        <NavIcon href="/">
          <HomeIcon />
        </NavIcon>
        <NavIcon href="/social">
          <TrendingIcon />
        </NavIcon>
        <NavIcon href="/starred">
          <StarIcon />
        </NavIcon>
        <NavIcon href="/search">
          <SearchIcon />
        </NavIcon>
        <Query query={query} skip={typeof window === 'undefined'}>
          {({ data: { user }, loading, error }) => {
            if (loading) {
              return (
                <NavIcon href="/">
                  <AccountIcon />
                </NavIcon>
              )
            }
            if (error) {
              return (
                <NavIcon href="/">
                  <AccountIcon fill="#ff0000" />
                </NavIcon>
              )
            }
            return (
              <Fragment>
                {
                  <NavIcon
                    as={`/user/${user._id}`}
                    href={`/user?id=${user._id}`}
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
