import React from 'react'
import { NavLink } from 'react-router-dom'
import FontAwesome from '@fortawesome/react-fontawesome'
import HomeIcon from '@fortawesome/fontawesome-free-solid/faHome'
import BriefCaseIcon from '@fortawesome/fontawesome-free-solid/faBriefcase'
import CommentsIcon from '@fortawesome/fontawesome-free-solid/faComments'
import SearchIcon from '@fortawesome/fontawesome-free-solid/faSearch'
import UserIcon from '@fortawesome/fontawesome-free-solid/faUser'
import Sidebar from './styles/Sidebar'

const Sidemenu = () => {
  return (
    <Sidebar>
      <NavLink activeClassName="active" to="/home">
        <FontAwesome icon={HomeIcon} />
      </NavLink>
      <NavLink activeClassName="active" to="/search">
        <FontAwesome icon={SearchIcon} />
      </NavLink>
      <NavLink activeClassName="active" to="/work">
        <FontAwesome icon={BriefCaseIcon} />
      </NavLink>
      <NavLink activeClassName="active" to="/social">
        <FontAwesome icon={CommentsIcon} />
      </NavLink>
      <NavLink activeClassName="active" to="/profile">
        <FontAwesome icon={UserIcon} />
      </NavLink>
    </Sidebar>
  )
}

export default Sidemenu
