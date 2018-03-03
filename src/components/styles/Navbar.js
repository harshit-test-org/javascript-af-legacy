import React from 'react'
import styled from 'styled-components'

const Nav = styled.div`
  z-index: 2;
  grid-area: navbar;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  box-shadow: 17px 0px 10px 9px rgba(0, 0, 0, 0.2);
`

const Navbar = ({ title }) => (
  <Nav>
    <h1>{title}</h1>
  </Nav>
)

export default Navbar
