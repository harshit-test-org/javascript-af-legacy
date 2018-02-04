import React, { Fragment } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav = styled.div`
  background: #fff;
  box-shadow: 0 5px 5px -5px #000;
  height: 100%;
  padding: 10px;
  text-align: center;
  overflow: auto;
  white-space: nowrap;
  & a {
    display: inline-block;
    color: #000;
    margin: 0 1vw;
    font-size: 25px;
    text-decoration: none;
    transition: 0.2s;
  }
  & a:after {
    display: block;
    content: '';
    border-bottom: 2px solid #fd267d;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  & a:hover:after {
    transform: scaleX(1);
  }
  & a.active {
    color: #fd267d;
  }

  @media (max-width: 768px) {
    .navbar a {
      margin: 0 5vw;
    }
  }
`

const Navbar = ({ links }) => (
  <Nav>
    {links.map((item, i) => (
      <Fragment key={`links-${i}`}>
        <NavLink activeClassName="active" to={item.href}>
          {item.name}
        </NavLink>
        {i !== links.length - 1 && '•'}
      </Fragment>
    ))}
  </Nav>
)

export default Navbar
