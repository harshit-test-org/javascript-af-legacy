import React from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from './styles/Sidebar'
import HomeIcon from '../assets/icons/home'
import SearchIcon from '../assets/icons/search'
import WorkIcon from '../assets/icons/work'
import ChatIcon from '../assets/icons/chat'
import AccountIcon from '../assets/icons/account'

const Sidemenu = () => {
  return (
    <Sidebar>
      <NavLink activeClassName="active" to="/home">
        <HomeIcon />
      </NavLink>
      <NavLink activeClassName="active" to="/search">
        <SearchIcon />
      </NavLink>
      <NavLink activeClassName="active" to="/jobs">
        <WorkIcon />
      </NavLink>
      <NavLink activeClassName="active" to="/social">
        <ChatIcon />
      </NavLink>
      <NavLink activeClassName="active" to="/profile">
        <AccountIcon />
      </NavLink>
    </Sidebar>
  )
}

export default Sidemenu
