import React from 'react'
import Sidebar, { NavIcon } from './styles/Sidebar'
import { withRouter } from 'next/router'
import HomeIcon from '../assets/icons/home'
import SearchIcon from '../assets/icons/search'
import ChatIcon from '../assets/icons/chat'
import AccountIcon from '../assets/icons/account'
import styled from 'styled-components'

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

const Sidemenu = (props) => {
  return (
    <Sidebar>
      <Logo>
        <img src="/static/logo.png" alt="" />
      </Logo>
      <NavIcon href="/home" active={ props.router.pathname === '/home' }>
        <HomeIcon />
      </NavIcon>
      <NavIcon href="/search" active={ props.router.pathname === '/search' }>
        <SearchIcon />
      </NavIcon>
      <NavIcon href="/social" active={ props.router.pathname === '/social' }>
        <ChatIcon />
      </NavIcon>
      <NavIcon href="/profile" active={ props.router.pathname === '/profile' }>
        <AccountIcon />
      </NavIcon>
    </Sidebar>
  )
}

export default withRouter(Sidemenu)
