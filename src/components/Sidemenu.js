import React from 'react'
import Sidebar, { NavIcon } from './styles/Sidebar'
import HomeIcon from '../assets/icons/home'
import SearchIcon from '../assets/icons/search'
import WorkIcon from '../assets/icons/work'
import ChatIcon from '../assets/icons/chat'
import AccountIcon from '../assets/icons/account'
import AssignmentIcon from '../assets/icons/assignment'
import styled from 'styled-components'

const Logo = styled.div`
  display: flex;
  justify-content: center;
  padding: 20% 0 20% 0;
  & > img {
    height: 40px;
    width: 40px;
  }
`

const Sidemenu = () => {
  return (
    <Sidebar>
      <Logo>
        <img src={require('../assets/logo.png')} alt="" />
      </Logo>
      <NavIcon activeClassName="active" to="/home">
        <HomeIcon />
      </NavIcon>
      <NavIcon activeClassName="active" to="/feed">
        <AssignmentIcon />
      </NavIcon>
      <NavIcon activeClassName="active" to="/jobs">
        <WorkIcon />
      </NavIcon>
      <NavIcon activeClassName="active" to="/search">
        <SearchIcon />
      </NavIcon>
      <NavIcon activeClassName="active" to="/social">
        <ChatIcon />
      </NavIcon>
      <NavIcon activeClassName="active" to="/profile">
        <AccountIcon />
      </NavIcon>
    </Sidebar>
  )
}

export default Sidemenu
