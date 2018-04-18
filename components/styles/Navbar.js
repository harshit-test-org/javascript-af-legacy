import React from 'react'
import styled from 'styled-components'

const Nav = styled.div`
  z-index: 120;
  position: absolute;
  top: 0;
  height: 72px;
  width: 100%;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 96px;
  box-shadow: 17px 0px 10px 9px rgba(0, 0, 0, 0.2);
  @media all and (max-width: 570px) {
    padding-left: 1rem;
    height: 50px;
  }
`

const Navbar = ({ title }) => (
  <Nav>
    <h1>{title}</h1>
  </Nav>
)

export default Navbar
