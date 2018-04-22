import React, { Component } from 'react'
import Sidebar, { NavIcon } from './styles/Sidebar'
import HomeIcon from '../assets/icons/home'
import StarIcon from '../assets/icons/star'
import SearchIcon from '../assets/icons/search'
import TrendingIcon from '../assets/icons/trending'
import AccountIcon from '../assets/icons/account'
import styled from 'styled-components'
import { Consumer } from './withAuth'

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

class Sidemenu extends Component {
  render() {
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
        <Consumer>
          {user => (
            <NavIcon as={`/user/${user._id}`} href={`/user?id=${user._id}`}>
              <AccountIcon />
            </NavIcon>
          )}
        </Consumer>
      </Sidebar>
    )
  }
}

export default Sidemenu
